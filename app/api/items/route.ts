import getAll from "@/app/queries/getAll";
import pool from "@/app/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const client = await pool.connect();

  try {
    const result = await client.query(getAll);
    return Response.json({ messages: result.rows });
  } catch (err) {
    return Response.json({ message: "Error", error: err });
  } finally {
    client.release();
  }
}
