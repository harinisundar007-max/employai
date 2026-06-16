import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>

        {/* NAVBAR */}
        <div style={{
          backgroundColor: "#111",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <b>EmployAI 🚀</b>

          <div style={{ display: "flex", gap: "15px" }}>
            <Link href="/">Home</Link>
            <Link href="/jobs">Jobs</Link>
            <Link href="/upload-resume">Upload Resume</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>

        {children}

      </body>
    </html>
  );
}