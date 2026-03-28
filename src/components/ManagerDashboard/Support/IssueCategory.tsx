import { useState } from "react";
import { FaCaretRight } from "react-icons/fa";

const categories = [
  "Sync Issue",
  "Hardware/Printer Error",
  "Inventory/Barcode Error",
  "Payment Failure",
];

export default function IssueCategory() {
  const [selected, setSelected] = useState("Sync Issue");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const deviceData = {
    deviceId: "RENE-POS-8821",
    softwareVersion: "v2.4.1-stable",
    lastSync: "07/03/2026, 15:22:04",
  };

  const handleSubmit = () => {
    if (!description.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className=" flex items-center justify-center ">
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div className="flex gap-4 w-full items-stretch">
        {/* Main Form Card */}
        <div className="flex-1 bg-white rounded-2xl shadow-2xl p-7 flex flex-col gap-6">
          {/* Header */}
          <div>
            <h2
              className="text-xl font-semibold text-slate-800"
              style={{ letterSpacing: "-0.02em" }}
            >
              Issue Category
            </h2>
          </div>

          {/* Category Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className="py-3 px-4 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 text-left"
                style={{
                  background:
                    selected === cat
                      ? "linear-gradient(135deg, #1e2d5a 0%, #2d4080 100%)"
                      : "#f1f4f9",
                  color: selected === cat ? "#fff" : "#64748b",
                  border: selected === cat ? "none" : "1.5px solid transparent",
                  boxShadow:
                    selected === cat
                      ? "0 4px 14px rgba(30,45,90,0.25)"
                      : "none",
                  transform: selected === cat ? "scale(1.02)" : "scale(1)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Description
            </label>
            <textarea
              className="flex-1 min-h-32 w-full rounded-xl p-4 text-sm text-slate-700 resize-none outline-none transition-all duration-200"
              placeholder="Please explain what happened..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                background: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => (e.target.style.border = "1.5px solid #2d4080")}
              onBlur={(e) => (e.target.style.border = "1.5px solid #e2e8f0")}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="self-end flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: submitted
                ? "linear-gradient(135deg, #16a34a, #15803d)"
                : "linear-gradient(135deg, #1e2d5a 0%, #2d4080 100%)",
              boxShadow: "0 4px 16px rgba(30,45,90,0.3)",
              transform: submitted ? "scale(0.98)" : "scale(1)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.04)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {submitted ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Ticket Submitted!
              </>
            ) : (
              <>
                Submit Ticket to Global Dashboard
                <FaCaretRight />
              </>
            )}
          </button>
        </div>

        {/* Auto-Captured Data Panel */}
        <div
          className="w-72 rounded-2xl p-5 flex flex-col gap-5 shadow-xl"
          style={{
            background: "linear-gradient(160deg, #1a2744 0%, #0f1a35 100%)",
          }}
        >
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#7c93c3" }}
            >
              Auto-Captured Data
            </p>

            <div className="flex flex-col gap-4">
              <DataRow label="Device ID" value={deviceData.deviceId} mono />
              <DataRow
                label="Software Version"
                value={deviceData.softwareVersion}
                mono
              />
              <DataRow label="Last Sync" value={deviceData.lastSync} mono />
            </div>
          </div>

          {/* Info Box */}
          <div
            className="mt-auto rounded-xl p-3"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <p className="text-xs leading-relaxed" style={{ color: "#8fa3c8" }}>
              This diagnostic data is automatically attached to your ticket to
              help our engineers resolve your issue faster.
            </p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: "#4ade80",
                boxShadow: "0 0 6px #4ade80",
                animation: "pulse 2s infinite",
              }}
            />
            <span className="text-xs" style={{ color: "#4ade80" }}>
              Device Online
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

interface DataRowProps {
  label: string;
  value: string;
  mono?: boolean;
}

function DataRow({ label, value, mono }: DataRowProps) {
  return (
    <div>
      <p
        className="text-xs mb-0.5 uppercase tracking-widest"
        style={{ color: "#4a6490", fontSize: "0.6rem" }}
      >
        {label}
      </p>
      <p
        className="text-sm font-semibold"
        style={{
          color: "#e2eaf8",
          fontFamily: mono ? "'DM Mono', monospace" : "inherit",
          fontSize: "0.82rem",
        }}
      >
        {value}
      </p>
    </div>
  );
}
