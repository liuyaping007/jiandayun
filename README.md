# 在线可视化表单设计
仓库代码地址：

【 [码云仓库](https://gitee.com/liuyaping007/vuefrom1.1.0)】
【 [文档地址](http://qifeng.321zou.com)】

【 [体验地址](http://qifeng.321zou.com:81) 用户名：liuyaping 密码：123456】

【 [博客网站地址](https://www.cnblogs.com/PlatformSolution/p/14572362.html)】

#### 介绍
简搭云可视化平台总体结构由五部分组成：表单组件，表单互动化定制，模型vue源码解析器，模型Mybatis语法解析器，表结构创建。
开发运维人员或用户通过可视化界面设计器通过“拖拉拽”的方式，设计开发业务表单和流程对象模型，其总体结构如图1所示。

![输入图片说明](https://images.gitee.com/uploads/images/2021/0913/221230_33a1cd27_5570306.png "($%}D1`C[0V~6G7}RW2MWE1.png")

开发运维人员通过拖拽设计，生成对应表单设计JSON，表单设计JSON通过JqueryTemplate模板引擎渲染成vue源码，vue源码直接渲染各种表单界面。

而表单设计JSON包含了表单提交的json格式信息，通过这些信息我们可以动态创建修改数据库中的表，生成mybatis语法增删改查逻辑sql，并保存到数据库中，通过解析mybatis语法sql的后端java代码实现数据的存贮，从而达到无码开发实现各种业务需求功能。

#### 问卷调查模块

#### 可视化表单设计

![基础表单设计](https://images.gitee.com/uploads/images/2021/0905/232340_a6fd2b19_5570306.gif "wenjuandiaocha.gif")
#### 快捷方式控件库，主题设置并手机PC端预览

![快捷方式控件库，主题设置并手机PC端预览](https://images.gitee.com/uploads/images/2021/0905/232702_06a5bfcd_5570306.gif "wenjuandiaocha1.gif")

#### 查看收录的数据，导出修改等等

![输入图片说明](https://images.gitee.com/uploads/images/2021/0906/000701_f0a9a754_5570306.gif "wenjuandiaocha2.gif")

#### 流程图

![输入图片说明](https://images.gitee.com/uploads/images/2021/0905/235651_26f59efc_5570306.png "46U_BBVNCX2~()RR(WSDSYN.png")

#### 流程表单模板设计

![输入图片说明](https://images.gitee.com/uploads/images/2021/0905/235704_6e94d7ca_5570306.png "9(ETI_EVR~K]XQM_VDVLNGW.png")

#### 流程发起界面

![输入图片说明](https://images.gitee.com/uploads/images/2021/0905/235716_04bf6d30_5570306.png "{NMLN3(P(I]_BD6R@D_OS9K.png")

#### 最终预览效果

![输入图片说明](https://images.gitee.com/uploads/images/2021/0905/235945_9374bebf_5570306.gif "wenjuandiaocha4.gif")

#### 特性。

简搭云可视化表单最大的优势是直接vue代码直接渲染，而非JSON一系列组件组合性渲染，市面上大部分vue表单都是这种渲染，如：vue-form-making，k-form-designjson，form-genetator等等，装载组件中渲染模式存在很多代码黑盒，里面很多逻辑是不清楚的，如果实现复杂一点功能需要更复杂的处理方式去解决。vue源码直接渲染模式，只要符合vue语法风格，就能渲染，充分继承了vue强大的扩展性，可读性，聚合性，复用性，封装性等特点，他也可以集成市面上所有vue组件。如echart，datav，饿了么UI，百度地图，高德地图，antUI，各种自定义组件等。
简搭云可视化表单是拖拽式设计，源码编辑逻辑双剑合并，无往不利。

1.可源码编辑js和css代码功能实现各种业务需求和界面风格。

![输入图片说明](https://images.gitee.com/uploads/images/2021/0913/221610_230969ec_5570306.png "01T0K}26@$]MD04]@1E_7$W.png")

2.提供了双击控件创建控件事件和事件tab，轻松定义事件。

3.提供源码编辑各种智能提示，右击快速生成代码模式，辅助编辑代码更简单。

4.完美的解决拖拽生成逻辑代码与手工编写代码无冲突，完美合并。

5.调试非常简单源码输入bugger，轻松进入调试一步一步定位错误，解决错误。

7.因为是符合vue语法的源码，遇到复杂的功能可下载到本地二次开发，无需从零开始。

8.每个设置好的组件，模块可以保存入控件库，可以将常用，通用，优秀设计组件入库，下次只需拖拽即可。

9.表单模板套用，设计优秀的表单可以入模板库，下次可加载模板，修改无需从零开始。

10.vue源码采用jquery+jquerytemplate模板生成，根据不同业务，框架生成不同风格，业务，框架的代码，如目前我的框架中有5个模板，分别是如适应饿了吗ui框架，阿里的ui框架，问卷调查类，大屏大数据分析类，流程表单类等等，我们可以根据不同的业务制定生成不同风格的代码。也可以生成appui，小程序语法代码等。

12.集成组件非常容易，四步完成轻松完成一个组件集成，文档中有详细介绍

1.全局注册，

2.定义组件配置，

3.可视化设计渲染，

4.vue源码生成模板增加生成块。

13.组件属性扩展，组件属性配置，组件事件配置集成只需在配置文件配置就可以了。

14.集成了在线编写mybatis语法编辑器，编写好对应mybatis语法逻辑，保存后接口就开发完成了，可以完成百分70%后端功能开发，可以不写后端代码的情况配置一套系统。

15.对后端swagger接口配置和在线接口的支持，可以更丰富的与后端交互，完成后端的二次开发。

#### 安装教程
- 确保已经安装node.js 10+
- 首次下载项目后，安装项目依赖：
```
npm install
```
- 本地开发
```
npm run start
```
- 构建
```
npm run build
```
## 交流
- QQ群 109434403
- qq联系人：329175905
后端java源码和数据库需要者私聊
微信号：danran0007或13410086061

