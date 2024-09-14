import { NextResponse } from "next/server";
import { Node } from "../../../../models/Node"
import {  ModifyNodeById } from '../../../../services/nodeService'

export async function POST(request: Request) {
    try {
        const newNode: Node = await request.json();
        if (isNaN(newNode.id) || (typeof newNode.id == 'string' && '' == newNode.id)) {
            return NextResponse.json({ msg: 'id参数异常' }, { status: 200 });
        }
        const result = await ModifyNodeById(newNode);
        if ('success' == result) {
            return NextResponse.json({ msg: '更新成功' }, { status: 200 });
        } else {
            return NextResponse.json({ msg: '未成功更新' }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: '更新失败' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return NextResponse.json({ error: '不支持的方法！' }, { status: 405 });
}