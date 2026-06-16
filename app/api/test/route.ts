export async function GET() {
  console.log("TEST API WORKING 🚀");

  return Response.json({
    message: "API is working"
  });
}