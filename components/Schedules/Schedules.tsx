/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { firestore, auth } from "@/firebase/firebase";
import hospitals from "@/json/location.json";
import { 
  doc, 
  getDoc, 
  updateDoc, 
  arrayUnion 
} from "firebase/firestore";

const ScheduleManagement = () => {
  // Form state
  const [hospital, setHospital] = useState("");
  const [type, setType] = useState<"time" | "date" | "">("");
  const [timeInterval, setTimeInterval] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Schedules state
  const [schedules, setSchedules] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user schedules on component mount
  useEffect(() => {
    const fetchUserSchedules = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("User not logged in");
        return;
      }

      setUserId(currentUser.uid);

      try {
        const userRef = doc(firestore, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setSchedules(userData.schedules || []);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchUserSchedules();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const userRef = doc(firestore, "users", userId);

    const schedule = {
      hospital,
      type,
      ...(type === "time"
        ? { interval: timeInterval }
        : { date: selectedDate }),
      createdAt: new Date()
    };

    try {
      await updateDoc(userRef, {
        schedules: arrayUnion(schedule),
      });

      // Optimistically update local state
      setSchedules(prev => [...prev, schedule]);

      alert("Schedule saved!");
      // Reset form
      setHospital("");
      setType("");
      setTimeInterval("");
      setSelectedDate("");
    } catch (error) {
      console.error("Error saving schedule:", error);
      alert("Failed to save schedule.");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 p-4">
      {/* Schedule Form */}
      <div className="bg-white p-6 rounded-xl shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Set Notification Schedule</h2>

          <div>
            <label className="block mb-1 font-medium">Select Hospital:</label>
            <select
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Choose --</option>
              {hospitals.map((hosp) => (
                <option key={hosp.hospital} value={hosp.hospital}>
                  {hosp.hospital}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Notify by:</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="time"
                  checked={type === "time"}
                  onChange={() => setType("time")}
                />
                <span className="ml-1">Time</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="date"
                  checked={type === "date"}
                  onChange={() => setType("date")}
                />
                <span className="ml-1">Date</span>
              </label>
            </div>
          </div>

          {type === "time" && (
            <div>
              <label className="block mb-1 font-medium">Interval:</label>
              <select
                value={timeInterval}
                onChange={(e) => setTimeInterval(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">-- Choose --</option>
                <option value="1min">1 Minute</option>
                <option value="2min">2 Minutes</option>
                <option value="5min">5 Minutes</option>
              </select>
            </div>
          )}

          {type === "date" && (
            <div>
              <label className="block mb-1 font-medium">Date:</label>
              <input
                type="date"
                className="w-full border p-2 rounded"
                min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // tomorrow
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Save Schedule
          </button>
        </form>
      </div>

      {/* Schedules List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Your Schedules</h2>
        {schedules.length === 0 ? (
          <p className="text-gray-500 text-center">No schedules yet</p>
        ) : (
          <div className="space-y-4">
            {schedules.map((schedule, index) => (
              <div 
                key={index} 
                className="border p-4 rounded bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{schedule.hospital}</p>
                    <p className="text-sm text-gray-600">
                      {schedule.type === 'time' 
                        ? `Interval: ${schedule.interval}` 
                        : `Date: ${schedule.date}`}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {schedule.createdAt 
                      ? new Date(schedule.createdAt).toLocaleString() 
                      : 'N/A'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleManagement;