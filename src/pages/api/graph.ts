import pool from "src/database";
import { NextApiRequest, NextApiResponse } from "next";

// CREATE TABLE graph_localtion (id INT AUTO_INCREMENT PRIMARY KEY, x DOUBLE(16, 2) NOT NULL, y DOUBLE(16, 2) NOT NULL);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.method);
  if (req.method === "GET") {
    return req.query.id ? findGraphAPI(req, res) : getGraphAPI(req, res);
  } else if (req.method === "POST") {
    return createGraphAPI(req, res);
  } else if (req.method === "PATCH") {
    return updateGraphAPI(req, res);
  } else if (req.method === "DELETE") {
    return deleteGraphAPI(req, res);
  }
  res.status(200).json({ message: "Hello, Next.js!" });
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

const findGraphAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = req.query;
    if (payload.id === undefined) {
      return res.status(500).json({ error: "missing id parameter" });
    }
    const graph = await pool.query(
      `SELECT * FROM graph_localtion WHERE id = ${payload.id}`
    );
    res.status(200).json({
      graphs: graph[0],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message ?? "error" });
  }
};

const deleteGraphAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = req.query;
    if (payload.id === undefined) {
      return res.status(500).json({ error: "missing id parameter" });
    }
    const graph = await pool.query(
      `DELETE FROM graph_localtion WHERE id = ${payload.id}`
    );
    res.status(200).json({
      graphs: graph[0],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message ?? "error" });
  }
};

const createGraphAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = JSON.parse(req.body);
    const graph = await pool.query(
      `INSERT INTO graph_localtion(x,y) VALUES (${payload.x}, ${payload.y})`
    );
    res.status(200).json({
      graphs: graph[0],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message ?? "error" });
  }
};

const updateGraphAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = JSON.parse(req.body);
    if (payload.id === undefined) {
      return res.status(500).json({ error: "missing id parameter" });
    }

    const graph = await pool.query(`UPDATE graph_localtion
      SET x = ${payload.x}, y = ${payload.y}
      WHERE id = ${payload.id}`);
    res.status(200).json({
      graphs: graph[0],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message ?? "error" });
  }
};
