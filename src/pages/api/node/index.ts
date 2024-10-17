"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { create, getAll, getPage, getTotal } from "@/lib/data/nodes";
import { handlerWrapper } from "@/lib/utils/handler-wrapper";
import { z } from "zod";
import { connect } from "http2";
import { pages } from "next/dist/build/templates/app-page";
import { get } from "http";

const FormSchema = z.object({
    // id: z.string(),
    x: z.number({
        invalid_type_error: "Please set x.",
    }),
    y: z.number({
        invalid_type_error: "Please set y.",
    }),
});
const createNode = FormSchema.omit({ x: true, y: true });

export default handlerWrapper({
    GET: async function handler(req: NextApiRequest, res: NextApiResponse) {
        const { query, method } = req;
        let data;
        let result;
        if (query.page) {
            const page = parseInt(query.page as string, 10);
            const pageSize = parseInt(query.pageSize as string, 10);
            let total = await getTotal();
            if (total > 0) {
                data = await getPage(page, pageSize);
            }
            result = {
                data: data,
                page: page,
                pageSize: pageSize,
                total: total,
            };
        } else {
            data = await getAll();
        }
        return result;
    },
    POST: async function handler(req: NextApiRequest, res: NextApiResponse) {
        console.log(req.body);
        let node = req.body;
        const validatedFields = createNode.safeParse({
            x: node.x,
            y: node.y,
        });
        if (!validatedFields.success) {
            throw new Error("error");
        }
        let data = await create(node);
        return data;
    },
});
