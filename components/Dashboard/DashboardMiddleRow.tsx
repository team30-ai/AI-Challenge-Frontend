"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import rawData from "@/json/hospitalChartData.json";
import {
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";


type HospitalDataEntry = {
  date: string;
  [key: string]: number | string;
};


type HospitalAvg = {
  name: string;
  avg: number;
};


type LineChartRow = {
  time: string;
  [hospital: string]: string | number;
};

const data = rawData as HospitalDataEntry[];

const BAR_COLORS = ["#4f46e5", "#22c55e", "#e11d48", "#f59e0b", "#0ea5e9"];
const LINE_COLORS = [
  "#ff6384",
  "#36a2eb",
  "#4bc0c0",
  "#9966ff",
  "#ff9f40",
  "#8bc34a",
  "#e91e63",
  "#00bcd4",
];

const VISIBLE_POINTS = 4;

const DynamicLineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);

export default function DashboardMiddleRow() {
  const [topHospitals, setTopHospitals] = useState<HospitalAvg[]>([]);
  const [visibleData, setVisibleData] = useState<LineChartRow[]>([]);
  const [hospitals, setHospitals] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dataIndexRef = useRef(0);

  useEffect(() => {
    if (!data.length) return;

    const keys = Object.keys(data[0]);

    const surgeKeys = keys.filter((k) => k.endsWith("_surge_open"));
    const hospitalNames = surgeKeys.map((k) => k.replace("_surge_open", ""));


    const totals: Record<string, number> = {};
    data.forEach((row) => {
      hospitalNames.forEach((hospital) => {
        const key = `${hospital}_surge_open`;
        const value = row[key];
        if (typeof value === "number") {
          totals[hospital] = (totals[hospital] || 0) + value;
        }
      });
    });

    const averages: HospitalAvg[] = hospitalNames.map((h) => ({
      name: h,
      avg: Math.round((totals[h] || 0) / data.length),
    }));

    const top5 = averages.sort((a, b) => b.avg - a.avg).slice(0, 5);
    setTopHospitals(top5);

    const now = new Date();
    const currentMonthData = data.filter((d) => {
      const date = new Date(d.date);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    });


    const edHospitals = keys
      .filter((k) => k.endsWith("_ed_trolleys"))
      .map((k) => k.replace("_ed_trolleys", ""));
    setHospitals(edHospitals);


    const initialData: LineChartRow[] = currentMonthData
      .slice(0, VISIBLE_POINTS)
      .map((entry) => {
        const row: LineChartRow = { time: entry.date };
        edHospitals.forEach((hospital) => {
          const val = entry[`${hospital}_ed_trolleys`];
          row[hospital] = typeof val === "number" ? val : 0;
        });
        return row;
      });

    setVisibleData(initialData);
    dataIndexRef.current = VISIBLE_POINTS;


    timerRef.current = setInterval(() => {
      if (dataIndexRef.current >= currentMonthData.length) {
        dataIndexRef.current = 0;
      }

      const nextEntry = currentMonthData[dataIndexRef.current];
      const newPoint: LineChartRow = { time: nextEntry.date };

      edHospitals.forEach((hospital) => {
        const val = nextEntry[`${hospital}_ed_trolleys`];
        newPoint[hospital] = typeof val === "number" ? val : 0;
      });

      setVisibleData((prev) => [...prev.slice(1), newPoint]);
      dataIndexRef.current += 1;
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="px-4 py-3">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">

        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">
            Top 5 Hospitals by Avg Surge Capacity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topHospitals}
              layout="vertical"
              barCategoryGap="20%"
              margin={{ top: 10, left: 50, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={180} />
              <Tooltip />
              <Bar dataKey="avg">
                {topHospitals.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>


        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold mb-2">
            Live ED Trolley Trend (This Month)
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            Showing latest {VISIBLE_POINTS} data points
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <DynamicLineChart data={visibleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                angle={-45}
                textAnchor="end"
                height={80}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              {hospitals.map((hospital, i) => (
                <Line
                  key={hospital}
                  type="monotone"
                  dataKey={hospital}
                  stroke={LINE_COLORS[i % LINE_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  isAnimationActive={true}
                  animationDuration={500}
                />
              ))}
            </DynamicLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
