import { NextApiRequest } from "next";

export function getStrapiURL(path = "") {
    return `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:3000"
    }${path}`;
}

export function getId(req: NextApiRequest) {
    const { query, method } = req;
    const id = parseInt(query.id as string, 10);
    if (isNaN(id)) throw new Error("Invalid id!");

    return id;
}
