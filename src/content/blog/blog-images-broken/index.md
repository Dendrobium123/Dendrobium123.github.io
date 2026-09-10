---
title: 突然打开blog发现图片居然全都崩坏？！
description: 图床的ssl证书过期
publishDate: '2024-07-26T05:10:42.000Z'
tags:
  - ssl证书过期
  - 随记
categories:
  - 随记
language: zh-CN
draft: false
comment: true
originalPath: post/20240726/突然打开blog发现图片全部崩坏？！.md
---





​		本来想传几张照片到博客的，结果从日本回来发现博客的照片全都裂了，一打开七牛云才发现原来是ssl证书过期了，没办法只能重新申请一个了。

<img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240728201600345.png" alt="image-20240728201600345" style="zoom:50%;" />

点开发现证书已过期。

<img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240728212705397.png" alt="image-20240728212705397" style="zoom:50%;" />

还好，七牛云上可以免费申请TrustAsia的免费域名证书。

<img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240728213319088.png" alt="image-20240728213319088" style="zoom:50%;" />

填完信息以后，只要在自己申请域名的云那边解析一下就可以用了。

<img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240728213447056.png" alt="image-20240728213447056" style="zoom:50%;" />

虽然不知道为什么，我一开始复制记录值里的3b5835...这行数字的时候，粘贴出来总是不对，感觉像是加密了一样，最后还是手打出来的，有没有懂哥能告诉我为什么。



最后吐槽一下，之前七牛云的机器人系统帮我申请的那个ssl证书，信息填的也太随便了。

<img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240728213713661.png" alt="image-20240728213713661" style="zoom:50%;" />
