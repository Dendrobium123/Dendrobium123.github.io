---
title: 深度学习_00
description: 深度学习小笔记
publishDate: '2024-04-14T04:20:50.000Z'
tags:
  - 知识
  - 深度学习
  - 笔记
categories:
  - 笔记
  - 知识
language: zh-CN
draft: false
comment: true
heroImage:
  src: 'https://tuchuang.dendrobiumcgk.chat/pic/深度学习00cover.jpg'
  alt: 深度学习_00
  inferSize: false
  color: '#282838'
  width: 1920
  height: 823
originalPath: post/deep learning_note_0/index.md
---

<center><iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=565970070&auto=1&height=66"></iframe></center>

## 深度学习基础知识

几种“学习”间的关系

#### 机器学习---最大的概念

<让机器通过学习的方式得到一个可以解决问题的模型>

学习方法：KNN（K近邻），k means（k均值解决聚类问题），SVM，深度学习

机器学习，隐式学习

神经网络：输入层，隐藏层，输出层

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/神经网络.jpg" style="zoom:50%;" /><center>

神经元

不改变网络层和算法的情况下，影响输出结果的是各神经元连接线路上的数值权重

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/神经元.jpg" style="zoom:50%;" /><center>

除了一系列加减乘除的线性变换外，还引入了激活函数

### 激活函数：阶跃函数（不用

希望通过梯度下降的方式求得参数更新的过程，阶跃函数无法正常求导，需要引入δ函数，因此使用别的函数作为激活函数Sigmoid，以此解决阶跃函数不可导的问题

#### Sigmoid：

$$
S(x)=\dfrac{1}{1+e^{-x}}
$$

sigmoid导数：
$$
S'(x)=\dfrac{e^{-x}}{(1+e^{-x})^2}=S(x)(1-S(x))
$$
Sigmoid函数及其导数的图像：

<center><img src="http://tuchuang.dendrobiumcgk.chat/pic/sigmoid.jpg" style="zoom:50%;" /><center>

<center>注：取值范围在0—1间的sigmoid函数叫logistic函数<center>



#### tanh：

$$
tanh=\dfrac{e^x-e^{-x}}{e^x+e^{-x}}
$$

<img src="http://tuchuang.dendrobiumcgk.chat/pic/tanh.jpg" style="zoom:50%;" />

范围在（-1，1）间的激活函数

#### Relu函数

$$
f(x)=\begin{cases}x & x\geq0 \\\0&x< 0\end{cases}
$$

<img src="http://tuchuang.dendrobiumcgk.chat/pic/relu.jpg" style="zoom:50%;" />

每个神经元所做的事：
$$
g_{output}=g(w_1\times a+w_2\times b+w_3\times c+w_4\times d)—>relu
$$
注：a,b,c,d为权重值，神经元输出结果为各参数加权后通过一个relu函数所得的值

机器学习的目的是在给定前提情况下，寻找能得到最好输出的w参数们

#### 梯度下降

如何寻找需要的W

通过当前所计算得出的结果与已知的正确结果做差，考虑到所得结果的正负号问题，采用对式子求平方的方式（平方好求导，绝对值不好求导）
$$
L=(f(x)-y)^2
$$

[^]: f(x)为机器所计算得到的结果，y为事先给定的正确结果，L为loss

L越小，模型性能越好，f(x)与参数w有关，因此L也是个关于w的函数。

可以通过调整w来使L的取值变小

动态更新W，eg：初始值w0，第一刻w1.....
$$
W_1=W_0-lr\cdot \frac{\partial L}{\partial W_0}
\\\W_2=W_1-lr\cdot \frac{\partial L}{\partial W_1}
\\\\...
$$

[^]: lr为学习率，是一个非常小的数，用来控制步长，小步长：算的巨慢，但毕竟准；大步长：扯着蛋，疯狂震荡，无法收敛

#### 局部最优/全局最优

类似高等数学函数章节中的极值和最值问题，局部导数为0的极值点不代表此处是整个函数的极值

<center>~~乐经良：说明它是一个地头蛇~~<center>


-------------



*ps:顺带吐槽一句，这个hugo对LateX数学公式的键入好像不是很友好，比如公式间的换行用要用\\\\，但是他识别代码的时候只识别一条杠\，这就导致像*
$$
f(x)=\begin{cases}x & x\geq0 \\\0&x< 0\end{cases}
$$
*这种分段的函数会显示成这样*
$$
f(x)=\begin{cases}x & x\geq0 \\0&x< 0\end{cases}
$$


*byd后来我发现你只需要打3个\就能解决问题了。*

