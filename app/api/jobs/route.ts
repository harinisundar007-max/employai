import { supabase } from "@/lib/supabase";

// GET all jobs
export async function GET() {
  try {
    const { data, error } = await supabase.from("jobs").select("*");

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// POST new job
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          title: body.title,
          company: body.company,
          skills: body.skills,
        },
      ])
      .select();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}