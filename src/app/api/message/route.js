import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  readDB();
  const body = await request.json();
  const { roomId } = body;
  // const findroom = DB.message.find((x) => x.roomId === roomId);
  if (!roomId) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: DB.messages,
  });
};

export const POST = async (request) => {
  readDB();
  const body = await request.json();
  const { roomId, messageText } = body; //////////
  if (!roomId) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId, ///////////
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const payload = checkToken();

  const body = await request.json();
  const { messageId } = body;
  if (!payload && role !== "SUPER_ADMIN") {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  readDB();

  const foundIndex = DB.messages.findIndex((x) => x.messageId === messageId);
  if (foundIndex === -1) {
    return NextResponse.json(
      {
        ok: false,
        message: "Message is not found",
      },
      { status: 404 }
    );
  }

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
