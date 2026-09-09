---
title: 基于PReNet渐近递归网络与gam注意力机制的图像去雨
description: “一种融合了GAM模块的RNN去雨网络”
publishDate: '2024-05-24T05:10:42.000Z'
tags:
  - 深度学习
  - 知识
categories:
  - 知识
language: zh-CN
draft: false
comment: true
heroImage:
  src: 'https://tuchuang.dendrobiumcgk.chat/pic/image-20240524215731380.png'
  alt: 基于PReNet渐近递归网络与gam注意力机制的图像去雨
  inferSize: false
  color: '#f8f8f8'
  width: 853
  height: 769
originalPath: post/20240426/PReNet渐近递归网络+模块改进.md
---



### 背景+摘要

图像作为视觉信息的主要传播媒介，在拍摄过程中常常会受到如雨、雾、雪等 外界因素的干扰，这些因素会显著降低图像的质量或掩盖关键信息，进而影响图像 的后续处理和应用。图像去雨便成为了亟需解决的问题，其主要挑战包括准确识别 各种大小和形状的雨滴，并在保持图像细节的同时去除这些干扰元素。因为除雨对于确保图像信息的准确传达至关重要，尤其是在交通监控和自动驾驶系统等对视觉精度要求较高的应用中。在雨天拍摄的未经处理的图像可能会导致视觉系统错误识别或遗漏关键信息，从而影响决策和操作的安全性和效率。

在图像去雨的研究中，传统方法和基于深度学习的策略是两种主流技术。

而随着深度学习今年 来在计算视觉领域的逐步应用，基于深度学习的去雨技术已成为近年来的研究热点。 这种方法利用大规模数据集对深度网络模型进行训练，然后将训练好的模型应用于 待处理的图像，从而有效地去除图像中的雨滴。 

本论文围绕对单画幅图像去雨展开研究，采用深度学习的方法，在PReNet算法 基础上提出了一种通过集成GAM注意力机制来增强去雨性能的新方法。PReNet是 一个高效的递归网络，专注于去除图像中的雨滴，但在处理复杂场景时仍存在一些 局限性。为了解决这一问题，本文在每个残差模块后引入了GAM注意力机制，通 过加强网络对有雨区域的感知能力，从而更精准地去除雨迹。本文在Rain100L和 Rain1400 等主流去雨数据集上进行了广泛的实验，实验结果显示，与原始PReNet模 型相比，集成了GAM注意力机制的新模型在峰值信噪比（PSNR）和结构相似性指 数（SSIM）上都有显著提高。结果证明了GAM注意力机制在去雨任务中的有效性 和潜在的应用价值。

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240525000452595.png" alt="image-20240525000452595" style="zoom:80%;" /></center>



### **PReNet是什么**

以下为PReNet论文原文：

<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
  <p><a href="https://arxiv.org/abs/1901.09221">[1901.09221] Progressive Image Deraining Networks: A Better and Simpler Baseline (arxiv.org)</a></p>
</div>


PReNet是一种渐进递归网络，通过在基于ResNet的网络中引入递归层，以及将阶段性结果和原始多雨图像作为每个ResNet的输入，来提高去雨的性能。该网络能够有效地去除雨滴，对于图像去雨领域的研究具有重要意义，并可作为未来图像去雨研究的合适基础。



PReNet，全称为Progressive Recurrent Network，是一个专门为单图像去雨任务设计的深度学习架构。这种网络采用了递归神经网络的设计思想，通过逐步精细化的方式去除图像中的雨滴，逐渐恢复干净的背景图像。本文选取PReNet模型作为图像去雨算法的基本框架，接下来对PReNet网络结构进行介绍。

### PReNet结构



#### (1) 输入层

输入卷积层由一个核大小为3*3、填充大小为1的标准卷积层构成，其后跟随有ReLU非线性激活函数,该层输入为6通道,输出为32通道。

```python
    (conv0): Sequential(
    (0): Conv2d(6, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (1): ReLU()
    )
```

#### (2) 循环层

循环层使用的是LSTM(Long short-term memory),LSTM结构有两个传输状态$c^t$和$h^t$。通过前一个阶段传递下来的状态 $h^{t-1}$以及当前的输入状态 $x^t$拼接训练得到四个状态。LSTM的内部结构如下图所示,图中第一个公式得到的$c^t$是传给下一个阶段的状态，$h^t$表示该阶段的隐藏状态，$y^t$表示输出。
  <img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524221149862.png" alt="" />

⊙表示表示矩阵中对应元素相乘的操作,而相乘的两个矩阵为同型矩阵,⊕表示矩阵加法操作。LSTM结构内部有忘记、选择记忆和输出这三个阶段。



LSTM的输入为64通道，输出为32通道,卷积核大小为3*3,填充大小为1。

```python
  (conv_i): Sequential(
    (0): Conv2d(64, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (1): Sigmoid()
  )
  (conv_f): Sequential(
    (0): Conv2d(64, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (1): Sigmoid()
  )
  (conv_g): Sequential(
    (0): Conv2d(64, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (1): Tanh()
  )
  (conv_o): Sequential(
    (0): Conv2d(64, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (1): Sigmoid()
  )
```

#### (3) ResBlocks

ResBlocks是通过递归展开一个残差块5次来实现的。每个这样的残差块包括两个普通的卷积层，每层后接一个ReLU激活函数,ResBlocks中的每个卷积层输入输出通道数均为32,核大小为3*3,填充大小为1。整个ResBlocks的结构如图3.2所示,图中的5个ResBlock具有相同结构,且参数共享。而单个残差块以残差块1为例，结构如下方代码所示。由于整个模型网络参数主要来自ResBlocks,因此使得模型整体大小由于重复计算而显著减小。

```python
    (res_conv1): Sequential(
    (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (1): ReLU()
    (2): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (3): ReLU()
  )
```

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524221312386.png" style="zoom:67%;" /></center>



#### (4) 输出层

输出层是由一个核大小为3*3的标准卷积层构成,填充大小为1,输入为32通道,输出为3通道。

```python
    (conv): Sequential(
    (0): Conv2d(32, 3, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
  )

```

#### (5) 损失函数

在网络训练方面,PReNet使用了负结构相似性(-SSIM)损失函数。

#### (6) 总体结构

PReNet模型的6个阶段共享相同的网络参数,将一个ResBlock在一个阶段内反复展开5次,以显著减少网络的参数。PReNet模型包含四个部分:输入卷积层、循环层、ResBlocks和输出卷积层,其整体结构如图3.3所示,左边的图为单个阶段的具体结构,右边图为PReNet模型的整体结构。PReNet模型阶段t的结构的推导公式如下:
$$
x^{t-0.5} =f_{\\text{in}}(x^{t-1}, y), \\\
s^t = f_{\\text{recurrent}}(s^{t-1}, x^{t-0.5}), \\\
x^t = f_{\\text{out}}(f_{\\text{res}}(s_t)).
$$
其中, $f_{\text{in}}$$x^{t-1} $和待去雨图像 y 的拼接结果,第一阶段的输入是两个待去雨图像的拼接, $x^{t-0.5}$ 即为输入层的输出, $s^{t-1}$为上一阶段循环层$LSTM$ 传递过来的信息,$f_{\text{recurrent}} $ 表示循环层的作用,$s^t$表示当前阶段循环层的输出,$f_{\text{res}}$表示$Resblocks$, $f_{\text{out}} $表示输出层, $x^t$表示当前阶段的去雨结果。

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524221729723.png" alt="image-20240524221729723" style="zoom:80%;" /></center>





### GAM模块

论文《Global Attention Mechanism: Retain Information to Enhance Channel-Spatial Interactions》

<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
  <p><a href="https://arxiv.org/abs/2112.05561">[2112.05561] Global Attention Mechanism: Retain Information to Enhance Channel-Spatial Interactions(arxiv.org)</a></p>
</div>

#### 1、作用

这篇论文提出了全局注意力机制（Global Attention Mechanism, GAM），旨在通过保留通道和空间方面的信息来增强跨维度交互，从而提升深度神经网络的性能。GAM通过引入3D排列与多层感知器（MLP）用于通道注意力，并辅以卷积空间注意力子模块，提高了图像分类任务的表现。该方法在CIFAR-100和ImageNet-1K数据集上的图像分类任务中均稳定地超越了几种最新的注意力机制，包括在ResNet和轻量级MobileNet模型上的应用。



#### 2、机制

<img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524222051713.png" alt="image-20240524222051713" />
$$
F_2 = M_c(F_1) \otimes F_1
\\\
F_3 = M_s(F_2) \otimes F_2
$$
1、**通道注意力子模块**：

利用3D排列保留跨三个维度的信息，并通过两层MLP放大跨维度的通道-空间依赖性。这个子模块通过编码器-解码器结构，以一个缩减比例r（与BAM相同）来实现。

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524222841628.png" alt="image-20240524222841628" style="zoom:80%;" /></center>

2、**空间注意力子模块**：

为了聚焦空间信息，使用了两个卷积层进行空间信息的融合。同时，为了进一步保留特征图，移除了池化操作。此外，为了避免参数数量显著增加，当应用于ResNet50时，采用了分组卷积与通道混洗。

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524222939131.png" alt="image-20240524222939131" style="zoom:80%;" /></center>



#### 3、独特优势

1、**效率与灵活性**：

GAM展示了与现有的高效SR方法相比，如IMDN，其模型大小小了3倍，同时实现了可比的性能，展现了在内存使用上的高效性。

2、**动态空间调制**：

通过利用独立学习的多尺度特征表示并动态地进行空间调制，GAM能够高效地聚合特征，提升重建性能，同时保持低计算和存储成本。

3、**有效整合局部和非局部特征**：

GAM通过其层和CCM的结合，有效地整合了局部和非局部特征信息，实现了更精确的图像超分辨率重建。

#### 4、代码

```python
import torch.nn as nn
import torch

class GAM_Attention(nn.Module):
    def __init__(self, in_channels, rate=4):
        super(GAM_Attention, self).__init__()

        # 通道注意力子模块
        self.channel_attention = nn.Sequential(
            # 降维，减少参数数量和计算复杂度
            nn.Linear(in_channels, int(in_channels / rate)),
            nn.ReLU(inplace=True),  # 非线性激活
            # 升维，恢复到原始通道数
            nn.Linear(int(in_channels / rate), in_channels)
        )

        # 空间注意力子模块
        self.spatial_attention = nn.Sequential(
            # 使用7x7卷积核进行空间特征的降维处理
            nn.Conv2d(in_channels, int(in_channels / rate), kernel_size=7, padding=3),
            nn.BatchNorm2d(int(in_channels / rate)),  # 批归一化，加速收敛，提升稳定性
            nn.ReLU(inplace=True),  # 非线性激活
            # 使用7x7卷积核进行空间特征的升维处理
            nn.Conv2d(int(in_channels / rate), in_channels, kernel_size=7, padding=3),
            nn.BatchNorm2d(in_channels)  # 批归一化
        )

    def forward(self, x):
        b, c, h, w = x.shape  # 输入张量的维度信息
        # 调整张量形状以适配通道注意力处理
        x_permute = x.permute(0, 2, 3, 1).view(b, -1, c)
        # 应用通道注意力，并恢复原始张量形状
        x_att_permute = self.channel_attention(x_permute).view(b, h, w, c)
        # 生成通道注意力图
        x_channel_att = x_att_permute.permute(0, 3, 1, 2).sigmoid()

        # 应用通道注意力图进行特征加权
        x = x * x_channel_att

        # 生成空间注意力图并应用进行特征加权
        x_spatial_att = self.spatial_attention(x).sigmoid()
        out = x * x_spatial_att

        return out

# 示例代码：使用GAM_Attention对一个随机初始化的张量进行处理
if __name__ == '__main__':
    x = torch.randn(1, 64, 20, 20)  # 随机生成输入张量
    b, c, h, w = x.shape  # 获取输入张量的维度信息
    net = GAM_Attention(in_channels=c)  # 实例化GAM_Attention模块
    y = net(x)  # 通过GAM_Attention模块处理输入张量
    print(y.shape)  # 打印输出张量的维度信息

```





### SE Net模块

论文《Squeeze-and-Excitation Networks》

<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
  <p><a href="https://arxiv.org/abs/1709.01507">[1709.01507] Squeeze-and-Excitation Networks(arxiv.org)</a></p>
</div>



#### 1、作用

SE 模块通过引入一个新的结构单元——“Squeeze-and-Excitation”（SE）块——来增强卷积神经网络的代表能力。是提高卷积神经网络（CNN）的表征能力，通过显式地建模卷积特征通道之间的依赖关系，从而在几乎不增加计算成本的情况下显著提升网络性能。SE模块由两个主要操作组成：压缩（Squeeze）和激励（Excitation）



### 2、**机制**

**1、压缩操作：**

SE模块首先通过全局平均池化操作对输入特征图的空间维度（高度H和宽度W）进行聚合，为每个通道生成一个通道描述符。这一步有效地将全局空间信息压缩成一个通道向量，捕获了通道特征响应的全局分布。这一全局信息对于接下来的重新校准过程至关重要。

**2、激励操作：**

在压缩步骤之后，应用一个激励机制，该机制本质上是由两个全连接（FC）层和一个非线性激活函数（通常是sigmoid）组成的自门控机制。第一个FC层降低了通道描述符的维度，应用ReLU非线性激活，随后第二个FC层将其投影回原始通道维度。这个过程建模了通道间的非线性交互，并产生了一组通道权重。

**3、特征重新校准：**

激励操作的输出用于重新校准原始输入特征图。输入特征图的每个通道都由激励输出中对应的标量进行缩放。这一步骤有选择地强调信息丰富的特征，同时抑制不太有用的特征，使模型能够专注于任务中最相关的特征。

 <center><img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524230759056.png" alt="image-20240524230759056" style="zoom:80%;" /></center>



### 3、**独特优势**

1、**通道间依赖的显式建模**：

SE Net的核心贡献是通过SE块显式建模通道间的依赖关系，有效地提升了网络对不同通道特征重要性的适应性和敏感性。这种方法允许网络学会动态地调整各个通道的特征响应，以增强有用的特征并抑制不那么重要的特征。

2、**轻量级且高效**：

尽管SE块为网络引入了额外的计算，但其设计非常高效，额外的参数量和计算量相对较小。这意味着SENet可以在几乎不影响模型大小和推理速度的情况下，显著提升模型性能。

3、**模块化和灵活性**：

SE块可以视为一个模块，轻松插入到现有CNN架构中的任何位置，包括ResNet、Inception和VGG等流行模型。这种模块化设计提供了极大的灵活性，使得SENet可以广泛应用于各种架构和任务中，无需对原始网络架构进行大幅度修改。

4、**跨任务和跨数据集的泛化能力**：

SENet在多个基准数据集上展现出了优异的性能，包括图像分类、目标检测和语义分割等多个视觉任务。这表明SE块不仅能提升特定任务的性能，还具有良好的泛化能力，能够跨任务和跨数据集提升模型的效果。

5、**增强的特征表征能力**：

通过调整通道特征的重要性，SENet能够更有效地利用模型的特征表征能力。这种增强的表征能力使得模型能够在更细粒度上理解图像内容，从而提高决策的准确性和鲁棒性。



### 4、**代码：**

```python
import numpy as np
import torch
from torch import nn
from torch.nn import init

class SEAttention(nn.Module):
    # 初始化SE模块，channel为通道数，reduction为降维比率
    def __init__(self, channel=512, reduction=16):
        super().__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)  # 自适应平均池化层，将特征图的空间维度压缩为1x1
        self.fc = nn.Sequential(  # 定义两个全连接层作为激励操作，通过降维和升维调整通道重要性
            nn.Linear(channel, channel // reduction, bias=False),  # 降维，减少参数数量和计算量
            nn.ReLU(inplace=True),  # ReLU激活函数，引入非线性
            nn.Linear(channel // reduction, channel, bias=False),  # 升维，恢复到原始通道数
            nn.Sigmoid()  # Sigmoid激活函数，输出每个通道的重要性系数
        )

    # 权重初始化方法
    def init_weights(self):
        for m in self.modules():  # 遍历模块中的所有子模块
            if isinstance(m, nn.Conv2d):  # 对于卷积层
                init.kaiming_normal_(m.weight, mode='fan_out')  # 使用Kaiming初始化方法初始化权重
                if m.bias is not None:
                    init.constant_(m.bias, 0)  # 如果有偏置项，则初始化为0
            elif isinstance(m, nn.BatchNorm2d):  # 对于批归一化层
                init.constant_(m.weight, 1)  # 权重初始化为1
                init.constant_(m.bias, 0)  # 偏置初始化为0
            elif isinstance(m, nn.Linear):  # 对于全连接层
                init.normal_(m.weight, std=0.001)  # 权重使用正态分布初始化
                if m.bias is not None:
                    init.constant_(m.bias, 0)  # 偏置初始化为0

    # 前向传播方法
    def forward(self, x):
        b, c, _, _ = x.size()  # 获取输入x的批量大小b和通道数c
        y = self.avg_pool(x).view(b, c)  # 通过自适应平均池化层后，调整形状以匹配全连接层的输入
        y = self.fc(y).view(b, c, 1, 1)  # 通过全连接层计算通道重要性，调整形状以匹配原始特征图的形状
        return x * y.expand_as(x)  # 将通道重要性系数应用到原始特征图上，进行特征重新校准

# 示例使用
if __name__ == '__main__':
    input = torch.randn(50, 512, 7, 7)  # 随机生成一个输入特征图
    se = SEAttention(channel=512, reduction=8)  # 实例化SE模块，设置降维比率为8
    output = se(input)  # 将输入特征图通过SE模块进行处理
    print(output.shape)  # 打印处理后的特征图形状，验证SE模块的作用

```

### 消融实验ablation

#### 实验环境

本文的实验平台为64位windows11系统，GPU为NVIDIA GeForce RTX 4070(12GB/华硕)，搭配的处理器为intel i5-13490F。Anaconda版本为23.7.4。cuda版本为12.1。Pytorch版本2.1.2。Python版本为3.9.18。tensorboard版本为2.16.2。

本实验中所有的网络都使用相同的训练设置,填充大小是100*100,batchsize大小是18,本文使用优化器为ADAM来训练模型,对Rain100L数据集的训练周期为100个epoch(对于其他大数据集如Rain1400等由于时间问题，并没有达到这个迭代周期),初始学习率设置为0.001,当epoch分别为30、50、80时,学习率均乘以0.2。

#### 评估指标

本文使用图像去雨领域常用的图像质量评价指标PSNR、SSIM来对算法进行有效评估与比较。

##### 峰值信噪比PSNR

PSNR 的计算基于均方误差（MSE）。首先计算 MSE，它是原始图像和失真图像对应像素差的平方值的平均值。PSNR的值越高表示处理后的图像与原图越接近。PSNR通过下面的公式计算：


​    
$$
PSNR = 10\\cdot\\log_{10}\\left(\\frac{{MAX}^2}{{MSE}}\\right)
$$
其中，$\text{MAX}$是可能的最大像素值，通常对于8位图像是255，$\text{MSE}$（Mean Squared Error）表示均方误差。而MSE的计算方式如下：

$$
MSE = \\frac{1}{mn} \\sum_{i=1}^m \\sum_{j=1}^n(I(i, j) - K(i, j))^2
$$
其中，$m$ 和 $n$ 分别是图像的行数和列数，$I(i, j)$ 是原始图像在位置 $(i, j)$ 的像素值，$K(i, j)$ 是失真或重建图像在位置 $(i, j)$ 的像素值。

##### 结构相似性SSIM

SSIM基于三个比较维度：亮度（luminance）、对比度（contrast）和结构（structure）。SSIM指数通过比较两幅图像的亮度、对比度和结构的相似性来计算。SSIM的值范围从-1到1，其中1表示两图像完全相同。其计算方式如下：

$$
\\text{SSIM}(x, y) = \\left( \\frac{2 \\mu_x \\mu_y + C_1}{\\mu_x^2 + \\mu_y^2 + C_1} \\right) \\times \\left( \\frac{2 \\sigma_{xy} + C_2}{\\sigma_x^2 + \\sigma_y^2 + C_2} \\right) \\times \\left( \\frac{\\sigma_{xy} + C_3}{\\sigma_x \\sigma_y + C_3} \\right)
$$

其中
 $\\mu_x$ 和 $\\mu_y$ 分别是图像 $x$ 和 $y$ 的平均亮度。
$\\sigma_x^2$ 和 $\\sigma_y^2$ 分别是图像 $x$ 和 $y$ 的方差。
$\\sigma_{xy}$ 是图像 $x$ 和 $y$ 的协方差。
 $C_1, C_2, C_3$ 是小常数，用以维持稳定性，通常 $C_3 = \frac{C_2}{2}$。

#### 实验数据集

本文的所有的消融实验都是在合成的小雨数据集Rain100L上进行的，Rain100L数据集里面包含有雨图片和对应的无雨图片,雨纹的密度较小,其训练集有200张有雨图片,测试集有100张有雨图片。对比实验在Rain100L，Rain1400以及Rain12上进行。

#### 损失函数



本文的loss function选择与原PReNet论文一直，采用negative SSIM作为loss，通过取负，我们可以将最大化SSIM的问题转化为最小化负SSIM的问题从而符合求最小损失这个前提。且ssim的评估方式更符合人眼直觉。本loss function表达式为：
$$
L_s=-SSIM
$$




 我在第一层卷积层后缝合了gam模块

```python
class PReNet(nn.Module):
    def __init__(self, recurrent_iter=6, use_GPU=True):
        super(PReNet, self).__init__()
        self.iteration = recurrent_iter
        self.use_GPU = use_GPU
		...
        ...
        ...   
        self.gam=GAM_Attention(in_channels=32)#GAM
    def forward(self, input):
        batch_size, row, col = input.size(0), input.size(2), input.size(3)
        ...
    	...
        for i in range(self.iteration):
            x = torch.cat((input, x), 1)
            x = self.conv0(x)
            x = self.gam(x)
            x = torch.cat((x, h), 1)
            ...
            ...
        return x, x_list
```



#### 实验设计

本部分通过引入SE通道注意力机制模块以及GAM全局注意力机制模块，分别安插在PReNet网络的不同位置进行性能比对，从而筛选出更优质的改进方案。嵌入位置如下图：

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524231523089.png" alt="image-20240524231448362" style="zoom:80%;" /></center>



对于不同注意力模块以及其在网络中嵌入的不同位置，后以不同名字指代如表1.1所示。

|         注意力模块的相对位置         |    后续的网络命名     |
| :----------------------------------: | :-------------------: |
|          GAM模块在残差块内           |     PReNet_GAM_R      |
|          SE 模块在残差块内           |      PReNet_SE_R      |
|          GAM模块在输入层后           | PReNet_GAM_afterConv0 |
|          SE 模块在输入层后           | PReNet_SE_afterConv0  |
| GAM模块在输入层后，SE模块在残差块内  |     PReNet_GAM_SE     |
| SE 模块在输入层后，GAM模块在残差块内 |     PReNet_SE_GAM     |
|  GAM模块同时在输入层后以及残差块内   |    PReNet_GAM_GAM     |



#### 在Rain100L上的消融实验结果



|       模型名称        |                PSNR                |                SSIM                |
| :-------------------: | :--------------------------------: | :--------------------------------: |
|        PReNet         |               37.48                |               0.979                |
|     PReNet_GAM_R      | <font color="#dd0000">37.97</font> | <font color="#006600">0.980</font> |
|      PReNet_SE_R      |               37.69                |               0.979                |
| PReNet_GAM_afterConv0 |               37.49                |               0.979                |
| PReNet_SE_afterConv0  |               37.49                |               0.979                |
|     PReNet_GAM_SE     |               37.45                |               0.979                |
|     PReNet_SE_GAM     | <font color="#006600">37.92</font> | <font color="#dd0000">0.981</font> |
|    PReNet_GAM_GAM     |               37.91                |               0.980                |

针对Rain100L数据集的实验结果表明，当GAM模 块单独集成在每个残差块内时，网络性能提升最为明显。这一发现表明GAM模块在 处理图像中的全局信息方面具有显著优势，能够有效地提升去雨效果。



### 对比实验

将上文所提的PReNet_GAM_R方案在Rain1400、Rain100L和Rain12这 三个合成数据集上与3种经典的基于深度学习的图像去雨算法JORDER、RESCAN、 PReNet 算法以及本文提的PReNet_GAM_R方案进行定性定量评估比较。

并在真实雨 图上进行主观感觉上的比较,来验证本方案的有效性。



####  (1) 合成数据集 



本文方案与上述4种去雨算法的定量比较如表4.6所示,红色标注即为最高值。 从表中可以看出,PReNet_GAM_R方案在三个合成数据集上均能取得较高的PSNR和 SSIM 指标值,且其在三个合成数据集上的指标值基本高于其他四个去雨算法。 需要说明的是本对比实验中，PReNet_GAM_R 针对 Rain1400 数据集的训练 epoch 仅为 8 个 epochs，主要原因为 Rain1400 数据集庞大从而导致训练时间长的 问题，在RTX4070显卡夜以继日地连续72小时的工作情况下也仅仅训练到了第8 个epoch，因此此处的对比数据比原先PReNet性能略低一筹。

| **Dataset** | **Measure** | **JORDER**  | **RESCAN**  |                **PReNet**                |             **PReNet_GAM_R**              |
| :---------: | :---------: | :---------: | :---------: | :--------------------------------------: | :---------------------------------------: |
|  Rain100L   |  PSNR/SSIM  | 36.61/0.974 | 29.80/0.881 |               37.48/0.979                | <font color="#dd0000">37.97/0.980</font>  |
|   Rain12    |  PSNR/SSIM  | 33.92/0.953 |    -----    |               36.66/0.961                | <font color="#dd0000"> 37.04/0.962</font> |
|  Rain1400   |  PSNR/SSIM  |    -----    |    -----    | <font color="#dd0000">32.60/0.946</font> |                32.41/0.945                |

#### (2) 真实雨图

接下来将改进的PReNet_GAM_R与原先的PReNet在真实雨图上的去雨效果进 行比对，如下方图所示，从左到右依次为原始图像，PReNet图像，PReNet_GAM_R 图像，从上到下一共展示三组真实雨图，此处所用于测试的模型为在Rain1400数据 集上训练8epochs的PReNet_GAM_R网络 。

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524234636220.png" alt="image-20240524234528791"  /></center>

通过观察可以发现，PReNet_GAM_R改进后的去雨图像在清晰度上比PReNet的 去雨图像更为清晰，在细节部分没有出现丢失的情况，整幅图片看起来更为透彻，在 图像的清晰度提高和细节保留更完整，从而提供了更加令人满意的视觉效果。此外， 从感官体验的角度来看，图像的细节，如建筑线条、环境纹理和边缘清晰度等，在去 除雨水后都被更好地保留了下来，几乎与无雨的原始场景无异。

### 最后的网络结构

<img src="http://tuchuang.dendrobiumcgk.chat/pic/image-20240524215731380.png" alt="" />

### 总结与展望

#### 总结 

本文介绍了在PReNet网络中集成不同的注意力机制模块的融合实验。通过详细的实验设计，分析了SE和GAM模块单独插入原网络输入层后和残差块内的效果，还考察了这两种模块同时使用时的性能变化。实验结果通过PSNR和 SSIM 指标进行量化，以评估不同配置对去雨效果的影响。针对Rain100L数据集的 实验结果表明，当GAM模块单独集成在每个残差块内时，网络性能提升最为明显。 本文的研究表明，注意力机制，尤其是全局注意力机制在提高深度网络处理复 杂去雨任务中的有效性。GAM模块通过其对全局信息的高效整合，使得网络能够更 准确地识别和去除图像中的雨滴，同时保留更多的背景细节。这一点在图像去雨的应用中尤为重要，因为背景信息的保留直接关系到去雨图像的视觉质量和实用价值。 

#### 展望 

本文改进的GAM融合PReNet去雨算法在进行单幅图像去雨工作时有一定的 提升效果,但与最新发布的去雨研究相比，仍存在一定的差距。此外，受限于硬件 资源和时间成本，本研究未能对多个大型数据集进行深入分析，甚至在唯一使用的 Rain1400 数据集上的训练周期也仅限于8个epochs。这些限制使得研究结果可能未 能完全体现潜在的优化效果。因此，未来研究的方向和展望可以从以下几个方面进 行扩展和深化：

 (1) 本文已经尝试了集成不同的注意力机制以优化去雨性能。未来工作可以继续 在这一方向上进行创新，例如探索新的神经网络架构或改进现有的深度学习模块，以适应去雨处理的特定需求。此外，调整和优化模型参数也是实现更有效去雨处理的 关键途径。

 (2) 尽管通过合成的虚拟雨图可以以更多样本地进行全监督学习，但这些数据往 往无法完全复现真实雨景的复杂性和多样性。因此，开发和使用更接近真实世界条 件的雨图数据集将是未来研究的重要方向。这将帮助模型更好地理解和处理实际场 景中的雨效应，提高去雨技术的实际应用价值。

 (3) 目前常用的图像质量评估指标如PSNR和SSIM虽然提供了量化的性能评估， 但并不能完全代表人类的视觉感知。应该设计一种更符合人类视觉感知的评价方法， 能更准确地反映去雨效果的优劣，这对于推动去雨技术的发展具有重要意义。

 (4) 考虑到降雨的复杂性，将模型驱动方法与数据驱动方法结合起来，可能是解 决去雨问题的一种有效策略。这种融合方法可以充分利用两种学习方式的优势，提高去雨算法的准确性和鲁棒性。 希望未来通过在上述几方面的努力，可以使得去雨研究有望实现更大的突破，为相关领域带来更深远的影响。



## 写在最后的ps

所谓的毕设就这么莫名其妙的搞完了，其实工作量很小，多半的工作量是前期阅读论文以及复现各种其他的去雨算法来选择一个比较合适的改进平台，后期所有的实验基本上只花了几天的功夫，反正现在答辩也弄完了，后面空闲的时间可能会做几个开源项目，然后再次投入那场“永恒轮回”的地狱中。



复旦get out，中科院 come instead！
