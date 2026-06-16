"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert("Error sending login link ❌");
    } else {
      alert("Check your email for login link 📩");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Login 🔐</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          display: "block",
          marginTop: "10px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          background: "#4f46e5",
          color: "white",
          border: "none",
        }}
      >
        Login
      </button>
    </div>
  );
}