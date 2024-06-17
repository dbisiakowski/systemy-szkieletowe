import getOne from "@/app/queries/getOne";
import updateOne from "@/app/queries/updateOne";
import pool from "@/app/utils/db";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const client = await pool.connect();

  const id = parseInt(params.id, 10);

  try {
    const result = await client.query(getOne(id));
    return Response.json({ messages: result.rows });
  } catch (err) {
    return Response.json({ message: "Error", error: err });
  } finally {
    client.release();
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await pool.connect();

  try {
    const body: { message: string } = await req.json();
    const id = parseInt(params.id, 10);
    const message = body.message;

    await client.query("BEGIN");

    await client.query(updateOne(id, message));

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const result = await client.query(getOne(id));

    await client.query("COMMIT");

    return Response.json({ messages: result.rows });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return Response.json({ message: "Error", error: err });
  } finally {
    client.release();
  }
}
