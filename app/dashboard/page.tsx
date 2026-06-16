"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };

    checkUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard 📊</h1>

      {user && (
        <div>
          <p>👤 Logged in as: {user.email}</p>

          <button
            onClick={logout}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}