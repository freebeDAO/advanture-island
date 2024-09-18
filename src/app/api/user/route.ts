import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../../models/User';
import sequelize from '../../../lib/db'; // 导入 Sequelize 实例

// 处理 POST 请求
export async function POST(req: NextRequest) {
  try {
    // 将数据库初始化放入一个异步函数中
    await initDB();

    const body = await req.json();
    const { address, nickname, avatar } = body;

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    // 查找或创建用户
    let user = await User.findOne({ where: { address } });

    if (user) {
      user.nickname = nickname || user.nickname;
      user.avatar = avatar || user.avatar;
      await user.save();
    } else {
      user = await User.create({ address, nickname, avatar });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Failed to create/update user:', error);
    return NextResponse.json({ error: 'Failed to create/update user' }, { status: 500 });
  }
}

// 初始化数据库连接和同步
async function initDB() {
  try {
    await sequelize.authenticate(); // 确认数据库连接
    await sequelize.sync(); // 同步数据库表
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}
