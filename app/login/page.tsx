"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim()) {
      alert("Enter email ❌");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    setLoading(false);

    if (error) {
      alert("Login failed ❌");
      return;
    }

    alert("Check your email 📩");

    // redirect hint page (user goes to dashboard after login link click)
    router.push("/dashboard");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
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
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          background: loading ? "gray" : "#4f46e5",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Sending..." : "Login"}
      </button>
    </div>
  );
}