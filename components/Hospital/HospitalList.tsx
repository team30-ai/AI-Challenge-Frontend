"use client";

import React from "react";
import hospitals from "@/json/location.json";

type Hospital = {
  hospital: string;
  lat: number;
  lon: number;
};

type Props = {
  onHospitalClick: (hospital: Hospital) => void;
};

const HospitalList: React.FC<Props> = ({ onHospitalClick }) => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">All Hospitals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((hospital, index) => (
          <div
            key={index}
            className="rounded-lg bg-white shadow p-4 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">{hospital.hospital}</h3>
            <p className="text-sm text-gray-500">
              Lat: {hospital.lat.toFixed(2)}, Lng: {hospital.lon.toFixed(2)}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => onHospitalClick(hospital)}
            >
              View 3-days Forecast
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
