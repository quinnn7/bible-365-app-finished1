"use client";

import { useState, useEffect } from "react";
import { days } from "../data/days";

export default function Page() {
  const [currentDay, setCurrentDay] = useState(1);
  const [jumpDay, setJumpDay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Load bookmark
  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedDay");
    if (saved) {
      const parsed = parseInt(saved);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 365) {
        setCurrentDay(parsed);
      }
    }
  }, []);

  // Save bookmark
  useEffect(() => {
    localStorage.setItem("bookmarkedDay", currentDay);
  }, [currentDay]);

  const day = days.find(d => d.day === currentDay);
  if (!day) return null;

  const nextDay = () => {
    if (currentDay < 365) setCurrentDay(currentDay + 1);
  };

  const prevDay = () => {
    if (currentDay > 1) setCurrentDay(currentDay - 1);
  };

  const jumpToDay = () => {
    const num = parseInt(jumpDay);
    if (!isNaN(num) && num >= 1 && num <= 365) {
      setCurrentDay(num);
      setJumpDay("");
    }
  };

  const clearBookmark = () => {
    localStorage.removeItem("bookmarkedDay");
    setCurrentDay(1);
  };

  // 📅 Calendar → Day mapping
  const handleDateChange = (value) => {
  setSelectedDate(value);

  if (!value) return;

  const pickedDate = new Date(value);
  const year = pickedDate.getFullYear();

  const startOfYear = new Date(year, 0, 1);

  const diffTime = pickedDate - startOfYear;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (diffDays >= 1 && diffDays <= 365) {
    setCurrentDay(diffDays);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FBF7F2",
        padding: 24,
        fontFamily: "Georgia, serif"
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ color: "#6B3E26", fontSize: 36 }}>
          Bible in 365 Days
        </h1>
        <p style={{ color: "#8A6A52" }}>Day {day.day}</p>
      </header>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap"
        }}
      >
        <input
          type="number"
          placeholder="Go to day"
          value={jumpDay}
          onChange={(e) => setJumpDay(e.target.value)}
          style={{ width: 110, padding: 6 }}
        />
        <button onClick={jumpToDay}>Go</button>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          style={{ padding: 6 }}
        />

        <button onClick={clearBookmark}>Clear Bookmark</button>
      </div>

      {/* Readings */}
      <section
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2D5C8",
          borderRadius: 12,
          padding: 20,
          marginBottom: 20
        }}
      >
        <h3 style={{ color: "#6B3E26" }}>📜 Old Testament</h3>
        <p style={{ fontSize: 18 }}>{day.oldTestament}</p>

        <h3 style={{ color: "#6B3E26", marginTop: 16 }}>✝️ New Testament</h3>
        <p style={{ fontSize: 18 }}>{day.newTestament}</p>
      </section>

      {/* Reflection */}
      <section
        style={{
          background: "#FFF8ED",
          borderLeft: "6px solid #6B3E26",
          padding: 20,
          marginBottom: 20,
          borderRadius: 8
        }}
      >
        <h3 style={{ fontSize: 22 }}>Reflection</h3>
        <p style={{ fontSize: 20, lineHeight: 1.6 }}>
          {day.reflection}
        </p>
      </section>

      {/* Journal Prompt */}
      <section
        style={{
          background: "#F5EFE6",
          borderLeft: "6px solid #8A6A52",
          padding: 20,
          borderRadius: 8
        }}
      >
        <h3 style={{ fontSize: 22 }}>Journaling Prompt</h3>
        <p style={{ fontSize: 20, lineHeight: 1.6 }}>
          {day.prompt}
        </p>
      </section>

      {/* Navigation */}
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button onClick={prevDay} disabled={currentDay === 1}>
          Previous
        </button>
        <button
          onClick={nextDay}
          disabled={currentDay === 365}
          style={{ marginLeft: 10 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
