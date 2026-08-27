# CATAPULT 官方网站

CATAPULT 宁波官方网站项目，包含响应式主页、活动 Banner 轮播、活动详情、过往活动、音乐鉴赏三列节目阵列、相册与联系信息。

## 本地查看

1. 安装 Node.js 22 或更高版本。
2. 在本项目目录运行 `npm install`。
3. 运行 `npm run dev`。
4. 浏览器打开 `http://127.0.0.1:3000/`。

## 连接 GitHub Desktop

在 GitHub Desktop 中选择 **File → Add local repository**，然后选择本项目文件夹：

`D:\CATAPULT(kai)\CATAPULT网站\CATAPULT-site`

## 主要内容位置

- 页面内容与活动资料：`app/page.tsx`
- 颜色、排版与手机适配：`app/globals.css`
- Logo、二维码与分享封面：`public/`
- 网站标题与分享信息：`app/layout.tsx`

更换活动、音乐节目或联系电话时，可直接修改 `app/page.tsx` 中对应的数据。
