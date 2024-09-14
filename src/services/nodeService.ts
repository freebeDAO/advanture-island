import pool from "../lib/dbPool";
import { Node } from "src/models/Node";
import { ResultSetHeader } from "mysql2";
import { RowDataPacket } from "mysql2";

export async function SaveNode(node: Node) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [result] = await connection.query<ResultSetHeader>('INSERT INTO Node (x, y) VALUES (?, ?)', [node.x, node.y]);
        await connection.commit();
        return result.insertId
    } catch (error) {
        await connection.rollback();
        console.log("error: " + error);
    } finally {
        connection.release();
    }
    return null;
}

export async function DeleteNodeById(id: number) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [result] = await connection.query<ResultSetHeader>('DELETE FROM Node WHERE ID = ?', id);
        await connection.commit();
        const count = result.affectedRows;
        if (count == 1) {
            return "success";
        }
    } catch (error) {
        await connection.rollback();
        console.log("error: " + error);
    } finally {
        connection.release();
    }
    return "failed";
}

export async function ModifyNodeById(node: Node) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [result] = await connection.query<ResultSetHeader>('UPDATE Node SET x=?,y=? WHERE ID = ?', [node.x, node.y, node.id]);
        await connection.commit();
        const count = result.affectedRows;
        if (count == 1) {
            return "success";
        }
    } catch (error) {
        await connection.rollback();
        console.log("error: " + error);
    } finally {
        connection.release();
    }
}

export async function GetNodeById(id: number) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM Node WHERE ID = ?', id);
        if (rows.length > 0) {
            return rows
        }
    } catch (error) {
        console.log("error: " + error);
    } finally {
        connection.release();
    }
}