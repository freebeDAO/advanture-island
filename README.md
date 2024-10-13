
## 项目说明

本项目集成了 Phantom Wallet，并实现了前后端的基于钱包签名的认证功能。用户可以通过 Phantom Wallet 登录，首次登录时可以创建用户并设置个人信息（昵称、头像等）。

### 功能流程：
1. **获取验证消息**：前端通过 Phantom Wallet 向后端请求验证消息（例如 nonce）。
2. **钱包签名**：用户通过 Phantom Wallet 对验证消息进行签名，前端将钱包地址、公钥和签名后的消息发送给后端。
3. **后端校验**：后端验证签名的有效性，成功后生成 JWT token 并返回给前端。JWT token 将作为用户后续请求的鉴权标识。
4. **用户创建/更新**：第一次登录的用户会在数据库中创建新用户，并提示输入昵称和上传头像。已存在的用户会直接跳转到个人主页。
5. **信息更新**：用户设置个人信息后，后端会将更新的数据存入数据库。

### 项目架构

- **数据库**：本项目使用 MySQL 作为数据库，并通过 Prisma 进行数据映射和管理。
- **前端**：使用 Phantom Wallet 提供的 API 集成钱包功能，获取验证消息并进行签名。
- **后端**：基于 `Next.js` App Router 模式实现，包括用户创建、登录认证、以及用户信息更新。

### 环境变量配置

请确保在项目根目录下创建 `.env` 文件，并配置 `DATABASE_URL` 以连接到本地的 MySQL 数据库。例如：
```env
DATABASE_URL="mysql://username:password@localhost:3306/mydatabase"
JWT_SECRET="your_jwt_secret"
```

### 安装步骤

1. 安装项目依赖：
   ```bash
   npm install
   ```

2. 配置 `.env` 文件，确保 `DATABASE_URL` 指向本地的 MySQL 数据库。

3. 运行数据库迁移：
   ```bash
   npx prisma migrate dev --name init
   ```

4. 启动开发服务器：
   ```bash
   npm run dev
   ```

5. 打开浏览器访问 [http://localhost:3000](http://localhost:3000) 进入主页。

6. **注意**：首次登录需要下载并安装 Phantom Wallet 插件，并在 Phantom Wallet 中导入自己的钱包进行测试。

### 技术栈

- **前端**：Next.js, Phantom Wallet API
- **后端**：Next.js API Routes, Prisma ORM
- **数据库**：MySQL

### 其他命令

- 同步 Prisma 模型至数据库：
  ```bash
  npx prisma db push
  ```

- 打开 Prisma Studio 管理数据库：
  ```bash
  npx prisma studio
  ```

### 项目结构

```
/src
  /app
    /api
      /v1
        /user
          /getDetail
            - route.ts (获取用户详情)
          /profile
            - route.ts (更新用户详情)
          /wallet
            /login
              - route.ts (钱包登录验证)
            /verifyCode
              - route.ts (后端生成验证码)
    /profile
      - page.tsx (用户个人主页)
    /setupProfile
      - page.tsx (设置个人信息页)
    - page.tsx (首页)
  /api
    - login.ts (封装前端登录调用)
    - user.ts (封装前端用户类)
```

### 注意事项

- **Phantom Wallet**：项目目前仅支持 Phantom Wallet 进行认证测试，确保钱包已连接并导入测试账户。
- **头像上传**：用户可以上传头像，服务器会保存头像文件到指定的文件夹中。

---

通过该项目，您可以体验 Phantom Wallet 与 Next.js 的集成，并学习如何通过钱包签名进行用户认证和权限管理。
