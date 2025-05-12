/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import HospitalMap from "./HospitalMap";
import HospitalList from "./HospitalList";
import Modal from "../Modal/Modal";

// ✅ Define types
type ForecastEntry = {
  date: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
};

type HospitalInfo = {
  hospital: string;
  [key: string]: unknown; 
};

export default function Hospital() {
  const [selectedHospital, setSelectedHospital] = useState<HospitalInfo | null>(null);
  const [forecast, setForecast] = useState<ForecastEntry[] | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleHospitalClick = async (hospital: HospitalInfo) => {
    setSelectedHospital(hospital);
    setLoading(true);
    setForecast(null);
    setExplanation(null);

    try {
      const encodedName = encodeURIComponent(hospital.hospital);
      const res = await fetch(`http://127.0.0.1:5000/forcast/${encodedName}`);
      const data: ForecastEntry[] = await res.json();
      setForecast(data);

      const forecastSummary = data
        .map(
          (entry) =>
            `Date: ${entry.date}, Predicted: ${entry.yhat}, Range: ${entry.yhat_lower}–${entry.yhat_upper}`
        )
        .join("\n");

      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `Here is a forecast of predicted patient volume at ${hospital.hospital} for the coming days:\n\n${forecastSummary}\n\nPlease analyze the forecast and explain it in a clear, human-readable format. Identify which days are likely to be busy (higher patient volume) and which are safer to visit (lower volume). Give a recommendation for which day(s) the hospital is least crowded and safest to go. Be specific.`,
            },
          ],
        }),
      });

      const groqData = await groqRes.json();
      const reply =
        groqData?.choices?.[0]?.message?.content ?? "No explanation available.";
      setExplanation(reply);
    } catch (err) {
      console.error("Error fetching forecast or explanation:", err);
      setForecast([]);
      setExplanation("Could not retrieve explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative px-4 py-3 bg-blue-50">
      <HospitalMap />
      <HospitalList onHospitalClick={handleHospitalClick} />

      <Modal
        isOpen={!!selectedHospital}
        onClose={() => {
          setSelectedHospital(null);
          setForecast(null);
          setExplanation(null);
        }}
        title={selectedHospital?.hospital || ""}
      >
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent" />
          </div>
        ) : explanation ? (
          <div className="space-y-2 max-h-64 overflow-y-auto text-sm whitespace-pre-wrap">
            {explanation}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center">No forecast data available.</p>
        )}
      </Modal>
    </div>
  );
}
