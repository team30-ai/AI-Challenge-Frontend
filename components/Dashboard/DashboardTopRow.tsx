"use client";

import {
  FaHospitalAlt,
  FaChartBar,
  FaUserInjured,
  FaProcedures,
} from "react-icons/fa";
import rawData from "@/json/hospitalChartData.json";
import React from "react";


type HospitalDataEntry = {
  date: string;
  [key: string]: number | string;
};


const data = rawData as HospitalDataEntry[];

function DashboardTopRow() {
  if (!data.length) return null; 

  const edKeys = Object.keys(data[0]).filter((key) =>
    key.endsWith("_ed_trolleys")
  );
  const hospitalNames = edKeys.map((key) =>
    key.replace("_ed_trolleys", "")
  );


  let totalEDTrolleys = 0;
  data.forEach((row) => {
    hospitalNames.forEach((hospital) => {
      const value = row[`${hospital}_ed_trolleys`];
      if (typeof value === "number") {
        totalEDTrolleys += value;
      }
    });
  });

  const latest = data[data.length - 1];
  const yesterdayCrowd = hospitalNames.map((hospital) => {
    const value = latest[`${hospital}_ed_trolleys`];
    return {
      name: hospital,
      count: typeof value === "number" ? value : 0,
    };
  });
  const mostCrowded = yesterdayCrowd.sort((a, b) => b.count - a.count)[0];


  const avgPerDay = Math.round(totalEDTrolleys / data.length);

  const stats = [
    {
      label: "Total ED Trolleys",
      value: totalEDTrolleys,
      icon: <FaProcedures className="text-red-600" />,
    },
    {
      label: "Avg ED Trolleys / Day",
      value: avgPerDay,
      icon: <FaChartBar className="text-blue-600" />,
    },
    {
      label: "Hospitals Reporting",
      value: hospitalNames.length,
      icon: <FaHospitalAlt className="text-green-600" />,
    },
    {
      label: "Most Crowded Yesterday",
      value: `${mostCrowded.name} (${mostCrowded.count})`,
      icon: <FaUserInjured className="text-yellow-600" />,
    },
  ];

  return (
    <div className="px-4 py-3">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="h-32 bg-white flex items-center justify-between px-4"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
              <div className="text-left">
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-lg font-semibold text-gray-800">
                  {stat.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardTopRow;
