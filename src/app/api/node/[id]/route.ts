import { NextResponse } from "next/server";
import Joi, { string } from "joi";
import { GetNodeById } from '../../../../services/nodeService'


interface IParams { params: { id: string } }

const validateNumber = (value: string) => {
    const schema = Joi.string().required().regex(/^\d+$/);
    let { error } = schema.validate(value);
    if (error) {
        return NextResponse.json({ msg: `id必须是数字` }, { status: 400 });
    }
    return parseInt(value);
};

export default validateNumber;


export async function GET(request: Request, { params }: IParams) {
    const id = validateNumber(params.id);
    if (id instanceof NextResponse) return id;

    try {
        const rows = await GetNodeById(id);
        if (null == rows) {
            return NextResponse.json({ msg: '未找到数据' }, { status: 200 });
        } else {
            return NextResponse.json({ rows }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: '查询失败' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    return NextResponse.json({ error: '不支持的方法！' }, { status: 405 });
}