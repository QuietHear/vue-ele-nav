# 基于element、权限、国际化的vue nav组件（展示最深4层）

## 安装
	npm i vue-ele-nav

## 0. 组件说明
##### ①. 依赖组件
* element-ui
* vue-router（router文件第一层首页name必须为main）
>
	const routes = [
		{
			path: '/',
			name: 'main',
			component: ...,
			children: [
				...子业务路由
			]
		},
		...其余功能路由
	];
>

##### ②. 支持扩展
* i18n
* iconfont(class形式)

## 1. 修改之前路由的meta属性(展示属性全靠meta控制)
* `title:''`：导航展示的标题内容
* `icon:''`：图标class
* `show:false`：是否展示在导航栏，只有false才不展示
* `showSelf:true`：展示在导航栏的父级菜单点击时是否展示其页面内容，只有true才展示，否则跳转到子菜单第一个
* `markName:''`：代替当前路由点亮的导航的name，一般给show:false时使用
* `redirectName:''`：父元素为空，子元素有权限但是不展示到菜单中时，指向到想要跳转的菜单name即可，如需点亮菜单子菜单必须加*markName*

## 2. 参数
* `start-name`：菜单为main的某个直接子路由的路由名-->String;非必传;默认*""*,取main下所有菜单
* `only-first`：只展示当前菜单第一层-->Boolean;非必传;默认*false*
>
	此时点击菜单不会进行跳转，只会返回一个change事件，参数为当前点击的菜单
>

* `@change`：菜单点击回调-->参数返回当前点击的菜单详情
* `open-permission`：是否开启菜单权限-->Boolean;非必传;默认*false*
* `permission-template`：权限对照表-->Object;非必传;默认*{}*
>
	// 所有路由平级展开，键值必须是路由文件的name，例如：
	const permissionTemplate = {
		firstChild: '1',
		firstChildHome: '1-1',
		secondChild: '2',
		secondChildA: '2-1',
		secondChildB: '2-2'
	};
>

* `permission-list`：当前权限-->String;非必传;默认*''*
>
	// 给结果join()之后前后加上','，例如：
	",1,1-1,"
>

* `i18n`：标题开启国际化-->Boolean;非必传;默认*false*
* `cname`：自定义class-->String;非必传;默认*'extra'*
* `iconfont`：图标开启iconfont格式-->Boolean;非必传;默认*false*
>
	// 未开启
	icon:"tuihuobaozhang" -->icon:"tuihuobaozhang"
	// 开启后的变化
	icon:"tuihuobaozhang" -->icon:"iconfont icon-tuihuobaozhang"
>

* `collapse`：是否水平折叠收起菜单(仅竖直菜单生效)-->Boolean;非必传;默认*false*
* `collapse-transition`：是否开启折叠动画-->Boolean;非必传;默认*true*
* `horizontal`：是否开启横向导航-->Boolean;非必传;默认*false*
* `menu-trigger`：子菜单打开的触发方式(仅横向菜单生效)-->String;非必传;默认*'hover'*
>
	hover / click
>

* `accordion`：是否开启手风琴模式-->Boolean;非必传;默认*false*

## 3. 自定义class（demo）
>
	@primary_background_color: #1e2836; // 导航背景颜色，只建议加横向的，竖直方向height不会占满
	@nav_text_color:#a2adb8; // 导航字体颜色
	@sle_color:#a2adb8; // 下拉颜色
	@primary_color: #f49900; // 导航激活颜色
	@nav_item_height: 60px; // 导航每级高度--也是横向导航高度
	@nav_item_else_height: 40px; // 横向次级导航每级高度
	.el-menu.extra  {
	  &.el-menu--horizontal {
	    background: @primary_background_color;
	    .replace-active{
	      &:after{
	        width: 100%;
	        opacity: 1;
	        background-image: none;
	        animation: navGradient1 0.4s 1 ease-in-out;
	        border-bottom: 4px solid @primary_color;
	      }
	    }
	  }
	  a{
	    color: @nav_text_color;
	    i{
	      color: @nav_text_color;
	    }
	  }
	  .el-submenu__icon-arrow{
	    line-height: @nav_item_height;
	    color: @sle_color;
	  }
	  .el-menu-item,
	  .el-submenu__title {
	      height: @nav_item_height;
	      line-height: @nav_item_height;
	      &:hover{
	        background-color: lighten(@primary_background_color, 5%);
	      }
	      &:focus{
	        background-color: @primary_background_color;
	      }
	  }
	  .el-submenu{
	    &.first{
	      .el-menu{
	        background-color: darken(@primary_background_color, 3%);
	      } 
	    }
	    &.second{
	      .el-menu{
	        background-color: darken(@primary_background_color, 6%);
	      } 
	    }
	    &.third{
	      .el-menu{
	        background-color: darken(@primary_background_color, 9%);
	      } 
	    }
	  }
	  .replace-active{
	    &:after{
	      content: '';
	      position: absolute;
	      top: 0;
	      left: 0;
	      width: 150%;
	      height: 100%;
	      opacity: 0.4;
	      z-index: 1;
	      background-image: -webkit-linear-gradient(0deg,@primary_color 0%,transparent 25%);
	      box-sizing: border-box;
	      animation: navGradient 1s 1;
	    }
	  }
	  .replace-active,
	  .replace-active-child {
	    color: @primary_color;
	    i{
	      color: @primary_color;
	    }
	  }
	}
	// 竖直动画
	@keyframes navGradient {
	  0% {
	    left: -50%;
	  }
	  100% {
	    left: 0;
	  }
	}
	// 横向动画
	@keyframes navGradient1 {
	  0% {
	    left: 50%;
	    width: 0;
	  }
	  100% {
	    left: 0;
	    width: 100%;
	  }
	}
	body>.el-menu--horizontal {
	  .el-menu{
	    .el-menu-item,
	    .el-submenu__title{
	      height: @nav_item_else_height;
	      line-height: @nav_item_else_height;
	    }
	  }
	  .el-submenu__title:hover{
	    background-color: lighten(@primary_background_color, 5%)
	  }
	  .el-menu-item:hover, 
	  .el-menu-item:focus{
	    background-color: lighten(@primary_background_color, 5%)
	  }
	  .el-submenu{
	    &.second{
	      .el-menu{
	        background-color: darken(@primary_background_color, 6%);
	      } 
	    }
	    &.third{
	      .el-menu{
	        background-color: darken(@primary_background_color, 9%);
	      } 
	    }
	  }
	  .el-menu{
	    background-color: darken(@primary_background_color, 3%);
	  }
	  a{
	    color: @nav_text_color;
	    i{
	      color: @nav_text_color;
	    }
	  }
	  .replace-active,
	  .replace-active-child {
	    color: @primary_color;
	    i{
	      color: @primary_color;
	    }
	  }
	  .el-submenu__icon-arrow{
	    line-height: @nav_item_else_height;
	    color: @sle_color;
	  }
	}
>	