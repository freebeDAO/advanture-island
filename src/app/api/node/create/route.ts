import { NextResponse } from "next/server";
import { Node } from "../../../../models/Node";
import { SaveNode } from "../../../../services/nodeService";


export async function POST(request: Request) {
    try {
        const newNode: Node = await request.json();
        const result = await SaveNode(newNode);
        if (typeof result == 'number') {
            newNode.id = result;
            return NextResponse.json({ "node": newNode }, { status: 200 });
        } else {
            return NextResponse.json({ error: '插入数据失败' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: '插入数据失败' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return NextResponse.json({ error: '不支持的方法！' }, { status: 405 });
}

export default function handler(request: Request) {
    console.log("ss"); return NextResponse.json({ error: '插入数据失败' }, { status: 500 });
}