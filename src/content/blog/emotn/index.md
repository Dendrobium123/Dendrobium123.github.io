---
title: OPPO-K9安装emotn报错
description: “报错解决”
publishDate: '2026-02-14T05:10:42.000Z'
tags:
  - 技术
  - 安卓
  - 随记
categories:
  - 随记
language: zh-CN
draft: false
comment: true
originalPath: post/oppo电视安装emotnUI/emotn.md
---

<img src="https://tuchuang.dendrobiumcgk.chat/image-20260215211256234.png" alt="image-20260215211256234" style="zoom:50%;" />

**反编译 (Decompile)**：

- 将你的 Emotn APK 文件拖入工具界面。
- 点击 **Decompile**（反编译）按钮。
- 等待下方日志显示“Decompile successful”。

**编辑清单文件**：

- 点击工具界面上的 **Decompiled APK directory**（反编译文件夹）按钮，直接进入源码目录。
- 找到根目录下的 `AndroidManifest.xml`。
- 右键使用记事本或 Notepad++ 打开。

**删除冲突代码**：

- 搜索并删掉这一整行：`<category android:name="android.intent.category.HOME" />`。
- 保存文件并关闭。

<img src="https://tuchuang.dendrobiumcgk.chat/image-20260215211317946.png" alt="image-20260215211317946" style="zoom:50%;" />

<img src="https://tuchuang.dendrobiumcgk.chat/image-20260215212604969.png" alt="image-20260215212604969" />

### 第三步：打包与签名 (Compile & Sign)

1. **回编译 (Compile)**：
   - 回到 APK Easy Tool 界面，点击 **Compile**（编译）按钮。
   - 工具会将修改后的文件夹重新打包。
2. **签名 (Sign)**：
   - 编译完成后，点击 **Sign APK**（签名）。
   - **注意**：如果不签名，OPPO 电视会识别为“非法安装包”。
3. **提取文件**：
   - 点击 **Recompiled APK directory** 按钮，你会看到一个带有 `_signed` 后缀的 APK 文件，这就是成品。

<img src="https://tuchuang.dendrobiumcgk.chat/image-20260215213811457.png" alt="image-20260215213811457" style="zoom:50%;" />

<img src="https://tuchuang.dendrobiumcgk.chat/image-20260215213905832.png" alt="image-20260215213905832" style="zoom:50%;" />
