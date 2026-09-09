# Dendrobiumcgk · Astro Pure

这是从 `E:\my_website` 的 Hugo 博客迁移出的独立副本，主题基于 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure)。原目录不会被修改。

## 使用

```bash
npm install
npm run dev
npm run build
```

- `push.bat [提交信息]`：构建、提交并推送当前源码仓库。
- `deploy-pages.bat`：构建并将 `dist` 强制推送到 `Dendrobium123.github.io` 的 `master` 分支。
- `deploy.sh`：Linux/macOS 版本的 Pages 发布脚本。
- `fix_dates.ps1`：修复迁移后文章的紧凑日期格式。

首次使用 `push.bat` 前，请为此副本设置源码远端：

```bash
git remote add origin <你的源码仓库地址>
```

## 写文章

文章统一放在 `src/content/blog/`。建议每篇文章创建一个独立文件夹，并在里面新建 `index.md`；图片或附件可以放在同一个文件夹中。

`legacy-hugo/` 只是迁移时保留的旧 Hugo 站点备份，不参与当前 Astro 博客构建。确认不再需要旧站原始文件后可以删除。

> `npm run migrate` 仅用于从旧 Hugo 站点重新导入文章。它会先清空 `src/content/blog/`，开始在 Astro 中写新文章后不要把它当作日常启动命令运行。

如确实重新执行了旧站迁移，还需要运行一次 `npm run cache:covers`，将旧站远程封面转换为 Pure 原生的本地 `heroImage` 数据。
