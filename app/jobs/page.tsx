import { supabase } from "@/lib/supabase";

async function deleteJob(id: number) {
  "use server";

  await supabase.from("jobs").delete().eq("id", id);
}

export default async function JobsPage() {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return <div>Error loading jobs ❌</div>;
  }

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f6fb",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Jobs List 🧑‍💼
      </h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {jobs?.map((job: any) => (
          <div
            key={job.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              borderLeft: "5px solid #4f46e5",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>{job.title}</h2>

            <p>🏢 {job.company}</p>
            <p>🛠 {job.skills}</p>

            <form action={deleteJob.bind(null, job.id)}>
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete ❌
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}