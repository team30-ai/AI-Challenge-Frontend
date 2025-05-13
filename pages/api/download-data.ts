/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

interface RawCSVRow {
  hospital: string;
  date: string;
  [key: string]: string;
}

interface ParsedRecord {
  hospital: string;
  date: string;
  [key: string]: string | number;
}

interface GroupedDateRecord {
  date: string;
  [key: string]: string | number;
}

const knownHospitals = [
  "Beaumont Hospital", "Cavan General Hospital", "Connolly Hospital",
  "Louth County Hospital", "Mater Misericordiae University Hospital",
  "National Orthopaedic Hospital Cappagh", "Our Lady of Lourdes Hospital",
  "Our Lady's Hospital Navan", "CHI at Crumlin", "CHI at Tallaght",
  "CHI at Temple Street", "MRH Mullingar", "MRH Portlaoise", "MRH Tullamore",
  "Naas General Hospital", "St. James's Hospital",
  "St. Luke's Radiation Oncology Network", "Tallaght University Hospital",
  "National Rehabilitation Hospital", "St. Columcille's Hospital",
  "St Luke's General Hospital Kilkenny", "St. Michael's Hospital",
  "St. Vincent's University Hospital", "Tipperary University Hospital",
  "UH Waterford", "Wexford General Hospital", "Bantry General Hospital",
  "Cork University Hospital", "Mallow General Hospital", "Mercy University Hospital",
  "South Infirmary Victoria University Hospital", "UH Kerry", "Ennis Hospital",
  "Nenagh Hospital", "St. John's Hospital Limerick", "UH Limerick",
  "Galway University Hospital", "Letterkenny University Hospital",
  "Mayo University Hospital", "Portiuncula University Hospital",
  "Roscommon University Hospital", "Sligo University Hospital"
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fileName = 'combined_hospital_data.csv';
    const csvPath = path.join(process.cwd(), 'json', fileName);
    const jsonPath = path.join(process.cwd(), 'json', 'hospitalChartData.json');

    fs.mkdirSync(path.dirname(csvPath), { recursive: true });

    const privateKey = process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
    const projectId = process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID;
    const bucketName = process.env.NEXT_PUBLIC_GOOGLE_BUCKET_NAME;

    if (!privateKey || !clientEmail || !projectId || !bucketName) {
      throw new Error("Missing Google Cloud credentials or bucket name in environment variables.");
    }

    const storage = new Storage({
      projectId,
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });

    await storage.bucket(bucketName).file(fileName).download({ destination: csvPath });
    console.log(`Downloaded CSV to ${csvPath}`);

    let csvContent = fs.readFileSync(csvPath, 'utf8');

    // Repair line breaks between rows by inserting them before known hospital names
    knownHospitals.slice(1).forEach((hospital) => {
      const regex = new RegExp(`(?<!\\n)(${hospital})`, 'g');
      csvContent = csvContent.replace(regex, '\n$1');
    });

    const rawRecords: RawCSVRow[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const parsedRecords: ParsedRecord[] = [];

    rawRecords.forEach((row, index) => {
      if (!row.date || row.date.trim() === '') {
        console.warn(`Skipping row ${index} due to missing date:`, row);
        return;
      }

      const parsedDate = new Date(row.date);
      if (isNaN(parsedDate.getTime())) {
        console.warn(`Skipping row ${index} due to invalid date:`, row.date, row);
        return;
      }

      const cleaned: ParsedRecord = { ...row };
      cleaned.date = parsedDate.toISOString().split('T')[0];

      for (const key in cleaned) {
        if (key !== 'hospital' && key !== 'date') {
          cleaned[key] = parseInt(cleaned[key] as string, 10) || 0;
        }
      }

      parsedRecords.push(cleaned);
    });

    const groupedByDate: Record<string, GroupedDateRecord> = {};

    parsedRecords.forEach((record) => {
      if (!groupedByDate[record.date]) {
        groupedByDate[record.date] = { date: record.date };
      }

      const hospital = record.hospital;

      for (const key in record) {
        if (key !== 'hospital' && key !== 'date') {
          groupedByDate[record.date][`${hospital}_${key}`] = record[key];
        }
      }
    });

    const chartData = Object.values(groupedByDate).sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    fs.writeFileSync(jsonPath, JSON.stringify(chartData, null, 2));
    console.log(`Saved JSON to ${jsonPath} with ${chartData.length} entries`);

    res.status(200).json({
      success: true,
      records: parsedRecords.length,
      chartDataPoints: chartData.length,
      chartData,
    });
  } catch (error: any) {
    console.error('Error during download or parse:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
