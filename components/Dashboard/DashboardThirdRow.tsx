"use client";

import rawData from "@/json/hospitalChartData.json";
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

type HospitalDataEntry = {
  date: string;
  [key: string]: number | string;
};

const data = rawData as HospitalDataEntry[];

const SPARKLINE_LIMIT = 10;
const DONUT_COLORS = ["#3b82f6", "#22c55e", "#f97316"]; // blue, green, orange

function DashboardThirdRow() {
  const { hospitalSparklines, capacityData } = useMemo(() => {
    const keys = Object.keys(data[0]);
    const edHospitals = keys
      .filter((k) => k.endsWith("_ed_trolleys"))
      .map((k) => k.replace("_ed_trolleys", ""));

    const hospitalSparklines = edHospitals.map((hospital) => {
      const points = data.map((entry) => ({
        time: entry.date,
        value: (entry[`${hospital}_ed_trolleys`] as number) ?? 0
      }));
      return { name: hospital, data: points };
    });

    const latest = data[data.length - 1];
    let ed = 0, ward = 0, surge = 0;

    Object.entries(latest).forEach(([key, value]) => {
      if (typeof value !== "number") return;
      if (key.endsWith("_ed_trolleys")) ed += value;
      if (key.endsWith("_ward_trolleys")) ward += value;
      if (key.endsWith("_surge_open")) surge += value;
    });

    const capacityData = [
      { name: "ED Trolleys", value: ed },
      { name: "Ward Trolleys", value: ward },
      { name: "Surge Capacity", value: surge }
    ];

    return { hospitalSparklines, capacityData };
  }, []);

  return (
    <div className="px-4 py-3">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="bg-white p-4 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-3">Mini Sparklines - ED Trolleys</h3>
          <div className="max-h-[320px] overflow-y-auto space-y-4 pr-2">
            {hospitalSparklines.slice(0, SPARKLINE_LIMIT).map((hospital, index) => (
              <div key={index}>
                <div className="text-sm font-medium text-gray-700 mb-1">{hospital.name}</div>
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={hospital.data}>
                    <XAxis dataKey="time" hide />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold mb-3">Current Capacity Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                dataKey="value"
                data={capacityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                label
              >
                {capacityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardThirdRow;
