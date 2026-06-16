"use client";

import { useState } from "react";

export default function MatchPage() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState<any[]>([]);

  const jobs = [
    { title: "Frontend Developer", skills: "react,next.js,javascript" },
    { title: "Backend Developer", skills: "node,express,javascript" },
    { title: "Full Stack Developer", skills: "react,node,next.js,javascript" },
  ];

  // SMART AI WEIGHTS
  const skillWeights: any = {
    javascript: 1,
    js: 1,
    react: 2,
    "next.js": 2,
    node: 2,
    express: 2,
    frontend: 3,
    backend: 3,
    "full stack": 5,
  };

  // normalize input
  const normalize = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, ",")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // AI MATCH LOGIC
  const calculateMatch = (jobSkills: string) => {
    const resumeSkills = normalize(resume);
    const jobSkillsArr = normalize(jobSkills);

    let total = 0;
    let score = 0;

    jobSkillsArr.forEach((skill) => {
      const weight = skillWeights[skill] || 1;
      total += weight;

      if (resumeSkills.includes(skill)) {
        score += weight;
      }
    });

    return Math.round((score / total) * 100);
  };

  // CLICK BUTTON
  const handleMatch = () => {
    if (!resume.trim()) {
      alert("Please enter your skills first ❌");
      return;
    }

    const results = jobs
      .map((job) => ({
        ...job,
        score: calculateMatch(job.skills),
      }))
      .sort((a, b) => b.score - a.score);

    setResult(results);
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        background: "#f4f6fb",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>AI Resume Match 🤖</h1>

      {/* INPUT */}
      <div
        style={{
          maxWidth: "500px",
          margin: "20px auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <textarea
          placeholder="Enter skills: react, node, javascript"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={handleMatch}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Check Match 🚀
        </button>
      </div>

      {/* RESULTS */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          display: "grid",
          gap: "15px",
        }}
      >
        {result.map((job, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ margin: 0 }}>{job.title}</h2>

            <p>🛠 Skills: {job.skills}</p>

            {/* PROGRESS BAR */}
            <div
              style={{
                width: "100%",
                height: "12px",
                background: "#e5e7eb",
                borderRadius: "20px",
                marginTop: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${job.score}%`,
                  height: "100%",
                  background:
                    job.score > 70
                      ? "#22c55e"
                      : job.score > 40
                      ? "#f59e0b"
                      : "#ef4444",
                  transition: "width 0.5s ease",
                }}
              />
            </div>

            <h3
              style={{
                marginTop: "10px",
                color:
                  job.score > 70
                    ? "green"
                    : job.score > 40
                    ? "orange"
                    : "red",
              }}
            >
              Match Score: {job.score}%
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}