import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Kanonlas Rattanapak",
    studentId: "650610743",
  });
};
