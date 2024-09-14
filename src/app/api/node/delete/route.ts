import { NextResponse } from "next/server";
import { DeleteNodeById } from '../../../../services/nodeService'
import { Node } from "../../../../models/Node"


export async function POST(request: Request) {
    const newNode: Node = await request.json();
    if (isNaN(newNode.id) || (typeof newNode.id == 'string' && '' == newNode.id)) {
        return NextResponse.json({ msg: 'id参数异常' }, { status: 200 });
    }
    try {
        const result = await DeleteNodeById(newNode.id);
        if ('success' == result) {
            return NextResponse.json({ msg: '删除成功' }, { status: 200 });
        } else {
            return NextResponse.json({ msg: '对应记录未被删除' }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: '删除失败' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return NextResponse.json({ error: '不支持的方法！' }, { status: 405 });
}