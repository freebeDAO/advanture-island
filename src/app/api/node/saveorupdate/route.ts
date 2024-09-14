import { NextResponse } from "next/server";
import { Node } from "../../../../models/Node";
import { SaveNode, GetNodeById, ModifyNodeById } from "../../../../services/nodeService";


export async function POST(request: Request) {
    let status = 1;
    let result;
    try {
        const newNode: Node = await request.json();
        if (isNaN(newNode.id) || typeof newNode.id == 'string') {
            result = await SaveNode(newNode);
            if (typeof result == 'number') {
                newNode.id = result;
                status = 0;
            }
        } else {
            const rows = await GetNodeById(newNode.id);
            if (null == rows) {
                result = await SaveNode(newNode);
                if (typeof result == 'number') {
                    newNode.id = result;
                    status = 0;
                }
            } else {
                result = await ModifyNodeById(newNode);
                if ('success' == result) {
                    status = 0;
                }
            }
        }
        if (0 == status) {
            return NextResponse.json({ "node": newNode }, { status: 200 });
        } else {
            return NextResponse.json({ error: '位置记录失败' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: '位置记录失败' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return NextResponse.json({ error: '不支持的方法！' }, { status: 405 });
}