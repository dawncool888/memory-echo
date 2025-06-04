# Memory Echo

一个基于 Next.js 的回忆记录和分享平台。

## 功能特点

- 创建和编辑回忆记录
- 支持图片和音频上传
- 分享功能，支持设置过期时间
- 实时通知系统
- 响应式设计，支持移动端

## 技术栈

- Next.js 15
- TypeScript
- tRPC
- Drizzle ORM
- PostgreSQL
- Tailwind CSS
- Framer Motion
- NextAuth.js

## 开始使用

1. 克隆仓库

```bash
git clone https://github.com/yourusername/memory-echo.git
cd memory-echo
```

2. 安装依赖

```bash
npm install
```

3. 设置环境变量

```bash
cp .env.example .env
```
然后编辑 `.env` 文件，填入必要的环境变量。

4. 初始化数据库

```bash
npm run db:push
```

5. 运行开发服务器

```bash
npm run dev
```

现在你可以在浏览器中访问 http://localhost:3000 查看应用。

## 项目结构

```
src/
├── app/                 # Next.js 应用路由
├── components/         # React 组件
├── server/            # 服务器端代码
│   ├── api/          # tRPC API 路由
│   └── db/           # 数据库配置和模型
├── styles/           # 全局样式
└── utils/            # 工具函数
```

## 部署

1. 构建项目

```bash
npm run build
```

2. 启动生产服务器

```bash
npm start
```

## 贡献

欢迎提交 Pull Request 或创建 Issue。

## 许可证

MIT
