### 流、元素与基本尺寸
#### 块级元素
##### 1. 块级元素和display:block不是一个概念
1. 块级元素其实就是具有换行特性，所以理论上来说是可以配合clear来进行清除浮动的
2. list-item、table、block都是符合块级元素的基本特性（一个水平流上只能单独显示一个元素，多个块级元素则换行显示）

```
.clearfixed:after {
    content: "";
    clear: both;
    display:'block',
    /* 或者是 */
    display:'table',
    /* 又或者是 */
    display:'list-item'，
    /* ie下伪元素不支持list-item就是无法创建这个标记盒子导致的 */
}
```
3. 每个元素都有两个盒子，外在盒子和内在盒子；外在盒子负责元素是否可以一行显示还是只能换行显示，内在盒子负责宽高内容呈现等。
4. 块级盒子block-level box和内联盒子inline box。块级盒子就负责结构，内联盒子就负责内容。
5. block元素的盒子实际由外在的块级盒子和内在的块级容器盒子组成;inline-block的元素由外在的内联盒子和内在的块级容器盒子组成；inline的元素则内外均是内联盒子
6. 元素都有内外两个盒子，我们平常设置的width/height都是作用在内在盒子上
##### 2. width/height
1. fill-available:充分利用可用空间,比方说div、p这些元素默认宽度是100%相对于父级元素
2. fit-content：收缩与包裹，比方说inline-block、浮动、绝对定位等，意思是收缩到合适宽度
3. min-content：收缩到最小，当空间不够时，文字能断则断
4. max-content：超出容器限制：当设置了white-space:nowrap，子元素既保持了inline-block的收缩性，又同时让内容宽度最大，直接无视父级容器的宽度限制。最大宽度实际上是最大的连续内联盒子的宽度（连续内联盒子指的是全部都是内联级别的一个或一堆元素，中间没有任何的换行标签及其它块级元素）



1. div默认宽度100%显示，就是外部尺寸，其余全部是内部尺寸；外部尺寸一旦设置了宽度，流动性就会丢失，所谓流动性是margin/border/padding/content内容区域自动分配水平空间的机制
2. 绝对定位元素的宽度表现是包裹性，宽度由内部尺寸决定
3. 对于非替换元素，当left/right或top/bottom对立方位的属性值同时存在时，元素的宽度相对于最近的具有定位特性（position不为static）的祖先元素计算
4. 图片和文字的权重要远大于布局
5. 对于普通的内联元素（非图片等替换元素）,box-sizing无论是什么值，对于渲染表现都没有任何影响
6. **box-sizing被发明出来最大的初衷就是为了解决替换元素宽度自适应问题**
- 像textarea这种替换元素，它的特性就是尺寸由内部元素决定，对于非替换元素，如果其display为block则会具有流动性，宽度由外部尺寸决定，而替换元素的宽度却不受其display水平影响
- 也就是说给textarea等替换元素设置display:block它的宽度并不会100%自适应父容器
- 而我们通过width设定textarea尺寸100%时，就需要考虑border/padding等，

```
        /* 只需要对替换元素的boxsizing重置值 */
        input,textarea,img,video,object{
            box-sizing: border-box;
        }
```

1. 百分比高度值要想起作用，其父级必须要有一个可以生效的高度值

```
        html,body{
            height: 100%;
        }
```

2. 展开收起动画，有时候height值是不确定的，这时可以将动画作用在max-height属性上，只需要将max-height使用足够安全的最小值就可以了
##### 3. 内联盒模型
1. 内容区域：指一种围绕文字看不见的盒子，其大小仅受字符本身特性控制，本质上是一个字符盒子；但是有些元素，如图片这样的替换元素，其内容显然不是文字，不存在字符盒子之类的，因此这些元素，内容区域可以看成元素本身，我们可以把文本选中的背景色区域作为内容区域
2. 内联盒子（inline box）:不会让内容成块显示，而是排成一行，这里的内联盒子实际指的是元素的外在盒子，用来决定元素是内联还是块级；并不是所有光秃秃的文字都是匿名内联盒子，其有可能是匿名块级盒子，关键要看前后的标签是内联还是块级
3. 行框盒子（line box）:每一行就是一个行框盒子
4. 包含盒子（containing box）:此盒子由一行一行的行框盒子组成
- **内联元素的所有解析和渲染就如同每个行框盒子的前面都有一个空白节点**
### 盒尺寸
#### content
###### 替换元素
- 替换元素：通过修改某个属性值呈现的内容就可以被替换的元素
- eg:img、object、video、iframe、textarea、input
- 替换元素的特性：
1. 内容的外观不受页面上的css影响
2. 有自己的尺寸
3. 在很多的css属性上有自己的一套表现规则
4. **所有的替换元素都是内联水平元素**
- 替换元素尺寸的计算优先级：CSS尺寸>HTML尺寸>固有尺寸
- 如果固有尺寸含有固定的宽高比例，同时仅设置了宽度或高度，则元素依然会按照固有的宽高比例显示
- **无法改变替换元素的固有尺寸**
#### padding
1. 内联元素的padding在垂直方向上同样会影响布局，影响视觉布局
2. padding属性是不支持负值的
3. padding支持百分比值，无论垂直水平方向都是相对于宽度计算的
4. 滚动容器底部留白使用padding是不推荐的，因为chrome浏览器是子元素超过content box尺寸触发滚动条显示，而firefox等浏览器是超过padding box尺寸才触发滚动条显示
#### margin
1. 只有元素是充分利用可用空间状态的时候，margin才可以改变元素的可视尺寸（无论是垂直方向还是水平方向）
2. 等高布局：原理是垂直方向margin无法改变元素的内部尺寸，但却能改变外部尺寸

```
.column-left,
.column-right {
    margin-bottom: -9999px;
    padding-bottom: 9999px;
}
```
3. 内联元素垂直方向的margin是没有任何影响的，既不会影响外部尺寸，也不会影响内部尺寸
4. 跟padding一样，margin的百分比值无论水平还是垂直方向都是相对于宽度计算的

##### margin合并
1. 仅对块级元素，但不包括浮动和绝对定位元素，尽管浮动和绝对定位可以让元素块状化
2. 仅发生在垂直方向
- 相邻兄弟元素margin合并
- 父级和第一个/最后一个子元素
- 空块级元素的margin合并
1. 怎么阻止margin合并
- 设置垂直方向的border
- 设置垂直方向的padding
- 里面添加内联元素（直接space空格是没用的）
- 设置height或者min-height
2. 合并计算规则：正正取大值、正负值相加、负负最负值
3. 最佳实践：**遇到列表或者模块，全部都保留上下margin设置**
##### margin auto
1. auto是用来计算应该获得的剩余间距大小
2. margin的初始值为0
3. 表格中的tr td元素或者是设置了display计算值是table-cell table-row的元素的margin是无效的
#### border
- border-width不支持百分比：原理是边框是不会因为设置大而按照比例变大的（同理outline、box-shadow、text-shadow都是不支持百分比的）
- border-style的默认值是none而非solid

```
            border: 10px;/* 无边框出现 */
            border: red;/* 无边框出现 */
            border: solid;/* 有边框出现 */
```
- 最佳实践：如果要设置边框为0的话，最好写成如下所示：

```
border-bottom: 0 none;
```
- 当没有指定border-color颜色值的时候，会使用当前元素的color计算值作为边框色（具有类似特性的还有outline、box-shadow、text-shadow等）
- 通过设置元素透明边框来优雅的控制点击区域大小


### 内联元素
1. 对于非替换的纯内联元素，其可视高度完全由line-height决定
2. “盒模块”其实约定俗成说的是块级元素
3. 内联元素的高度由固定高度和不固定高度组成，而这个不固定的部分就是行距，也就是说line-height之所以起作用，就是通过改变行距来实现的
4. 行距=line-height - font-size
5. **在计算行高时，行高值一定不要向下舍入，而要向上舍入**，比方说line-height是20px,font-size是14像素，20/14~=1.4285714285,所以我们的代码设置时为

```
        .demo {
            line-height: 1.42858;
            font-size: 14px;
        }
```

6. 基线对齐：内联元素都是沿着字母X的下边缘，对于图片等替换元素，往往使用元素本身的下边缘作为基线
7. **vertical-align:baseline等同于vertical-align:0**
8. margin和padding是相对于宽度计算的，line-height是相对于font-size计算的，vertical-align属性的百分比值则是相对于line-height计算的
9. vertical-align属性只能作用在display为inline、inline-block、inline-table、table-cell元素上，块级元素则不支持vertical-align
10. 对于table-cell元素而言，vertical-align起作用的是table-cell元素自身
### 流的破坏与保护

#### float
- float具有哪些特性
1. 包裹性
2. 块状化并格式化上下文（浮动可以让元素block化）
3. 破坏文档流
4. 没有任何margin合并
- 不要指望使用text-align属性控制浮动元素的左右对齐，因为text-align对块级元素是无效的
- float属性让父元素高度塌陷的原因就是为了实现文字环绕效果，高度塌陷只是让跟随的内容可以和浮动元素在同一个水平线上，同时行框盒子和浮动元素的不可重叠性也是实现环绕效果的必要条件
- clear ：只是**让元素盒子的边不能与前面的浮动元素相邻**。所以设置了clear属性的元素只是让自身不与float元素相邻，并没有真正清除浮动
- clear属性只有块级元素才有效，而::after等伪元素都是内联水平，这就是借助伪元素清除浮动影响时需要设置display属性值的原因
#### BFC
1. BFC元素是不可能发生margin重叠的，因为margin重叠是会影响到外面的元素的
2. BFC元素也是可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然跟BFC元素的子元素不会影响外部元素的设定
3. 具有BFC特性的元素的子元素不会受外部元素的影响，也不会影响外部元素
4. 普通流体元素在设置了overflow:hidden后，会自动填满容器中除了浮动元素以外的剩余空间，形成自适应布局效果
- 什么时候会触发BFC
1. html根元素
2. float值不为none
3. position的值不为relative和static
4. overflow的值为auto、scroll、hidden
5. display的值为table-cell、table-caption、inline-block中的任一一个
- 默认滚动条来自html而非body
- 单行溢出出省略号和多行溢出出省略号

```
        .el {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .el-rows-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
```

- 锚点跳转的方式有两种，一种是通过name，一种是通过id（前提是这个锚链值可以找到页面上对应的元素，并且是非隐藏状态，否则不会有任何的定位行为发生）
```
    <a href="#1">锚点跳转</a>
    <a name='1'></a>
```

```
    <a href="#1">锚点跳转</a>
    <a id='1'></a>
```
- URL地址锚链定位是让元素定位在浏览器窗体的上边缘
- focus锚点定位是让元素在浏览器窗体范围内显示即可，不一定要在上边缘
- 锚点定位行为的发生，本质上是通过改变容器滚动高度或者宽度来实现的
- **overflow:hidden的元素是可滚动的**,overflow:hidden跟overflow:auto或overflow:scroll的差别在于有没有那个滚动条，元素设置了overflow:hidden声明，里面内容高度溢出的时候，滚动依然存在，仅仅滚动条不存在！
#### absolute
- 绝对定位元素默认的最大宽度就是包含块的宽度，所以对于弹框这种绝对定位或固定定位的元素是没有必要设置max-width:100%
- **绝对定位元素计算和定位都是相对于祖先元素的padding box**
- absolute是非常独立的css属性值，其样式和行为表现不依赖于其它任何css属性就可以完成
- 绝对定位元素不总是被父级overflow属性剪裁，尤其当overflow在绝对定位元素及其包含块之间的时候

```
    <div style="overflow:hidden;">
        <img src="1.jpg" style="position:absolute" />
    </div>
    <!--这两种情况下的图片都不会被剪裁-->
    <div style="position:relative">
        <div style="overflow:hidden;">
            <img src="1.jpg" style="position:absolute" />
        </div>
    </div>
```

- clip属性要想起作用，元素必须是绝对定位或固定定位
#### relative
- relative absolute fiexed都能对absolute的包裹性以及定位产生限制，但是只有relative可以让元素依然保持在正常的文档流中
- relative定位的两大特性，一个是相对自身（相对于自身进行偏移定位）；二是无侵入（不会影响周围元素的布局）
- 对于无侵入，举例说明一下，如果一图片是相对定位，图片后有文字，如果对它进行top:-50的偏移定位，图片下的文字不会因为图片的偏移定位而受丝毫影响
- **相对定位元素的left/top/right/bottom的百分比值是相对于包含块计算的**
- 当元素为absolute时，同时设置了对立方向上的定位值，比方说同时设置了left right，表现为尺寸拉伸，保持流体特性
- 当元素为relative时，同时设置了对立方向上的定位值，只有一个方向的定位属性会起作用，具体表现比方说top/bottom同时使用时，bottom不生效，left/right同时使用时，right不生效。（原因是跟文档流的顺序有关，因为默认流是自上而下，从左到右的）
- 最佳实践
1. 尽量不使用relative，如果想定位某个元素，看是否能使用无依赖的绝对定位
- 如果场景受限，一定要使用relative,则该relative务必最小化
