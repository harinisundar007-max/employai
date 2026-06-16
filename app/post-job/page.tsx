"use client";

import { useState } from "react";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting:", form);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log("Response:", data);

    if (res.ok) {
      alert("Job Posted Successfully 🚀");

      setForm({
        title: "",
        company: "",
        skills: "",
      });
    } else {
      alert("Error while posting job ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Post a Job 🧑‍💼</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (React, Node...)"
          value={form.skills}
          onChange={handleChange}
        />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}