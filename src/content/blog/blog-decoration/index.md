---
title: 博客装修日志
description: “记录一下”
publishDate: '2025-06-14T05:10:42.000Z'
tags:
  - 博客装修
  - CSS
  - 随记
categories:
  - 随记
language: zh-CN
draft: false
comment: true
heroImage:
  src: 'https://tuchuang.dendrobiumcgk.chat/pic/blog-fitment.jpg'
  alt: 博客装修日志
  inferSize: false
  color: '#080808'
  width: 2000
  height: 1037
originalPath: post/20250614博客装修/博客装修.md
---

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=22826401&auto=1&height=66"></iframe>

# 缘起

之前6月10号看了APPLE的发布会，这次新推出的主题叫液态玻璃，虽然推出后马上遭到网友狂喷说特别丑，但说实话还蛮对我胃口的，我其实蛮喜欢这种玻璃风格。一想到我的博客页面还特别简陋，就想试试能不能稍微装修一下。

### 6月14日

##### sidebar

- [x] 修改了sidebar.scss中的menu模块，改变了sidebar背景透明度，添加了一个三种颜色组合的圆形渐变层加伸缩变化来模仿光晕效果，修改了hover的border效果，使得鼠标移动上去后按钮会做x轴的位移并且border会变色，并且鼠标点击后整个按钮会弹跳一下。

- [x] 同理修改了暗色模式的toggle，鼠标放置后会做y轴的轻微位移。

##### 背景

- [x] 修改了网页背景颜色为两种混合色

##### avatar

- [x] 为头像容器加入玻璃拟态样式，包括 `blur()` 和 `border`。
- [x] 添加了头像 hover 动效，放大、光圈泛动，使头像特效类似Instagram的snap限动。
- [x] 修改了文章article的背景颜色，使其看起来是半透明的。同时添加了伸缩的hover，并且修改了原始状态和伸缩后hover的box-shadow使其在光标放上去后效果看着像悬浮起来。

### 6月15日

重新处理了域名访问过慢的问题，尝试了很多方案，包括使用cloudflare的dns服务，腾讯云的cos+cdn服务等，前者速度比原先还慢，后者因为没备案所以无法执行，本来还启用了腾讯云的cdn加速服务，但因为是回源是托管在vercel上的，所以启用cdn后被微信网页段屏蔽，后来重新解析了dns并且取消了cdn才解决，最后发现ssl证书过期了，重新申请后速度变快不少，但今天6月16日push后访问速度又变龟速了不知道为什么，真的崩溃，想充钱给域名备案了，真的无语。所以这天没有继续美化网站。

### 6月16日

- [x] 主要修改了底部分页栏pagination，修改了pagination的背景使其变为半透明，添加了hover在page-link上使其在js文件的加持下可以跟随鼠标移动，同时挪开鼠标会自动回弹

- [x] 优化了修改过程中内部的page-link滑块被父容器pagination遮挡的问题。

- [x] 在pagination上添加了keyframe使得光标放上去后数字会q弹地抖动。

- [x] 将同样的效果施加在sidebar的menu上，取消了原先的x轴移动。


### 6月18日

- [x] 添加了"开往 travelling"的博客社区链接，并在官方github里issue了申请
- [x] 重新调整了左侧menu按钮的布局
- [x] 美化了social-menu的icon和hover
- [x] 修改了几个icon的svg代码，把里面的fill=“#XXXXXX”改成fill="currentColor"就可以丝滑切换浅色和深色主题了
- [x] 移除了原先pagination的跟踪滑块

### 6月19日

- [x] 修改了sidebar右边的widget样式
  - [x] 包括tag，categories，archives的样式
- [x] 统一了所有按钮和气泡框的风格，为25px的r角，稍微拟物化的box-shadow以及粉色框框
- [x] 修改了文档界面的文章卡片
  - [x]  修改了widget-TableOfContents的样式，使其看起来更合适。

- [x] 为今天修改的widget统一加了快速抖动hover
- [x] 修改了light-theme和dark-theme的背景，分别为：
  - [x] light：machu     @ [XilmO@夕末](https://www.pixiv.net/users/19389056)（pixiv作者）
  - [x] dark：神無月、夕焼け     @[Enze_恩沢](https://www.pixiv.net/users/13750517)（pixiv作者）
  - [x] dark2：行き先、未定 @[ゲン助](https://www.pixiv.net/users/32008)（pixiv作者）

~~本来在主页添加了一个js文件好让博客能自动播放音乐，但好像因为是静态网页，所以每点击一次任意按钮，音乐都会重新播放，体验非常不好，所以就移除了。~~



## 初步装修完工，因为stack主题的框架没有改动，所以后续可能看情况会继续修改。

#### ~~关于魔改的一些css样式文件和代码后续整理之后可能会放到仓库里，再说吧~~

 

