import { NextRequest, NextResponse } from 'next/server';
import Node from '../../../models/Node'; // 导入 Node 模型
import sequelize from '../../../lib/db'; // 数据库连接

// 初始化数据库
async function initDB() {
  await sequelize.authenticate(); // 验证数据库连接
  await sequelize.sync(); // 同步模型
}

// 获取所有节点
export async function GET() {
  try {
    await initDB();
    const nodes = await Node.findAll();
    return NextResponse.json(nodes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch nodes' }, { status: 500 });
  }
}

// 创建新节点
export async function POST(req: NextRequest) {
  try {
    await initDB();
    const body = await req.json();
    const { x = 0, y = 0 } = body;

    const newNode = await Node.create({ x, y });
    return NextResponse.json(newNode, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create node' }, { status: 500 });
  }
}

// 更新节点
export async function PUT(req: NextRequest) {
  try {
    await initDB();
    const body = await req.json();
    const { id, x, y } = body;

    if (!id) {
      return NextResponse.json({ error: 'Node ID is required' }, { status: 400 });
    }

    const node = await Node.findByPk(id);
    if (!node) {
      return NextResponse.json({ error: 'Node not found' }, { status: 404 });
    }

    node.x = x ?? node.x;
    node.y = y ?? node.y;
    await node.save();

    return NextResponse.json(node, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update node' }, { status: 500 });
  }
}

// 删除节点
export async function DELETE(req: NextRequest) {
  try {
    await initDB();
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Node ID is required' }, { status: 400 });
    }

    const node = await Node.findByPk(id);
    if (!node) {
      return NextResponse.json({ error: 'Node not found' }, { status: 404 });
    }

    await node.destroy();
    return NextResponse.json({ message: 'Node deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete node' }, { status: 500 });
  }
}
