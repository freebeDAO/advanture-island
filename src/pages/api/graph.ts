import { NextApiRequest, NextApiResponse } from "next";
import pool from "src/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return getGraphAPI(req, res);
  // res.status(200).json({ message: "Hello, Next.js!" });
}

const getGraphAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const graph = await pool.query("SELECT * FROM graph_localtion");
    res.status(200).json({
      graphs: graph[0],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message ?? "error" });
  }
};
