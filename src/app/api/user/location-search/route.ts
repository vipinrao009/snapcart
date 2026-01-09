import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5`,
    {
      headers: {
        "User-Agent": "snapcart-app",
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
