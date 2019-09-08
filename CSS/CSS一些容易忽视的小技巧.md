##### 1.css对id选择器的匹配不是唯一的
在html中如果出现多个相同id的html节点，如果css有对此id做过样式声明，则此样式声明不仅仅是对第一个具有此id的html节点有作用，而是所有
##### 2. 属性选择器
1. attribute属性中包含value
- [attribute~="value"] 属性中包含独立的单词为value

```
eg:[title~=flower]  
<img src="/i/eg_tulip.jpg" title="tulip flower" />

```

- [attribute*=value] 属性中做字符串拆分，只要能拆出来value这个词就行

```
[title*=flower]
<img src="/i/eg_tulip.jpg" title="ffffflowerrrrrr" />
```
2. attribute属性以value开头
- [attribute|=value] 属性中必须是完整且唯一的单词，或者以-分隔开

```
eg:[lang|=en]
<p lang="en">
<p lang="en-us">
```

- [attribute^=value] 属性的前几个字母是value就可以

```
eg:lang^=en]  
<p lang="ennn">
```

3. attribute属性以value结尾
- [attribute$=value] 属性的后几个字母是value就可以

```
eg:[src$=".pdf"]
<img src="test.pdf">
```

##### 3. 关系选择器
1. \+ 相邻兄弟选择器：仅仅匹配当前元素相信的那个合乎规则的兄弟元素
2. ~ 兄弟选择器：选择当前元素后面**所有**合乎规则的兄弟元素
3. 
##### 4. button和input type='button'的区别
- button标签按钮会自动换行，而input type='button'默认是white-space:pre是不会换行的
##### 5. 一行居左，两行居右，css实现方案

```
.box {
  text-align: center;
}
.content {
  display: inline-block;
  text-align: left;
}


<div class="box">
    <p class="content">文字内容</p>
</div>
```
##### 6. 不存在box-sizing:margin-box的原因
1. margin的背影永远是透明的，因此不可能作为background-clip或background-origin属性值存在
2. margin一旦设定具体宽度和高度值，其本身的尺寸并不会因为margin的变化而变化，因此作为box-sizing的属性值存在也就没有意义

##### 7. 绝对定位的宽高百分比计算是相对于paddingbox的，而非绝对定位元素则是相对于contentbox

```
.box {
  height: 160px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #beceeb;
}
.child {
  height: 100%;
  /* 非绝对定位元素：实际计算下来的高度是160-30*2=100*/
  background: #cd0000;
}
```

```
.box {
  height: 160px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #beceeb;
  position: relative;
}
.child {
  position: absolute;
  width: 100%;
  height: 100%;
  /* 绝对定位元素：实际计算下来的高度是160*/
  background: #cd0000;
}
```
##### 8. 当min-width的值大于max-width的值时，起作用的是min-width设置的值

```
.demo{
    min-width: 1400px;
    max-width: 1200px;
    /* 最终.demo元素的宽度为1400 */
}
```
##### 9. min-width/max-width超越!important,同理min-height/max-height

```
img {
  max-width: 256px;
}
<img src="1.jpg" style="width:480px!important;">
/* 最终这张图片的宽度是256 */
```
```
img {
  min-width: 256px;
}
<img src="1.jpg" style="width:120px!important;">
/* 最终这张图片的宽度是256 */
```
##### 10. img直接没有src，是直接没有src而不是src=""
1. 在很多浏览器下如果图片设置为src=""依然会有请求，而且请求的是当前页面数据
2. 当图片的src属性缺省的时候，图片不会有任何请求

##### 11. 利用content实现seo友好的标题隐藏显示图片
```
<h1>这里可以写上想让seo抓取的任何文字</h1>

h1:before {
    /*
    因为这里使用了content属性，就可以把普通标签元素变成替换元素
    */
    content: url(1.jpg);
    display: block;
    /* 最终页面上展示的是图片而非文字
       这种方式唯一的缺点就是图片的宽高是固定的，不能通过width/height来改变
    */
}
```
- content生成的文本无法被屏幕阅读设备读取，也无法被搜索引擎抓取，同样，不用担心原本重要的文字信息会被content替换，替换的仅仅是视觉层
- content生成的内容也无法被选中和复制
- **content生成内容无法影响:empty伪类**
- 其实也可以通过text-indent缩进，但是文字如果缩进过大，大到屏幕之外，屏幕阅读设备也是不会读取的
- 另外，推荐的一种方式

```
h1{
    position:absolute;
    clip:rect(0 0 0 0);
}
```
- clip隐藏仅仅是决定了哪部分是可见的，非可见部分无法响应点击事件，然而视觉上隐藏但是元素尺寸依然是原来的尺寸
##### 12. 替换元素不支持before/after等伪元素，图片没有src属性时是普通元素，增加src属性后就变成了替换元素
##### 13. 在chrome浏览器下，所有元素都支持content属性，而其它浏览器仅在::before、::after伪元素当中才支持
##### 14. 利用伪元素来生成换行符

```
        .test::before{
            content: '\A';
            white-space: pre;/* white-space也必须设置 也可以设置为pre-wrap*/    
        }
```
- \A不区分大小写，也可以写成\a，将光标垂直移到到下一行
- \D也能实现换行，它实现的效果是将光标移动到当前行的开头
##### 15. 想让某个块状元素右对齐，最佳实践应该是margin-left:auto而非float:right
##### 16. line-height:1.5和line-height:150%、line-height:1.5em的区别
- line-height:1.5所有子元素都是继承的这个值
- line-height:150%和line-height:1.5em 所有子元素都是继承的最终的计算值
##### 17. 当absolute和float同时存在的时候，float是没有任何效果的
##### 18. 基于父容器的scrollTop值改变来实现滚动效果，无须做边界处理
- 把scrollTop设为-300，浏览器依然会按照0来渲染
- 要想滚动到底部，直接把scrollTop设置为一个很大的值就可以了

##### 19. height:100%和height:inherit的区别
- 对于普通元素来说，这俩没啥区别
- 对于绝对定位元素则不一样height:100%是第一个具有定位属性值的祖先元素的高度，而height:inherit则是单纯的父元素的高度继承
- 

