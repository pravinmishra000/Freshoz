"use client";
import React, { useState } from "react";

export default function TestAI() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setOutput(""); // Clear previous output
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Hello Freshoz! AI order system ready?" }),
      });

      if (!res.ok) throw new Error(`API failed with status ${res.status}`);

      const data = await res.json();
      console.log("Client received:", data);

      setOutput(data.output || "No response");
    } catch (err: any) {
      console.error("Client error:", err);
      setOutput(`⚠️ Error: Unable to get AI response. ${err.message || ""}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`px-6 py-3 rounded-xl text-white font-semibold shadow-md transition
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
      >
        {loading ? "Processing..." : "Run AI Test"}
      </button>

      {output && (
        <p className="mt-6 text-lg text-gray-800 font-medium text-center">
          AI Response: {output}
        </p>
      )}
    </div>
  );
}
