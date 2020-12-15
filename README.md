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
* `markName:''`：代替当前路由点亮的导航的name，show:false时才生效

## 2. 参数
* `start-name`：菜单为main的某个直接子路由的路由名-->String;非必传;默认*''*,取main下所有菜单
* `only-first`：只展示当前菜单第一层-->Boolean;非必传;默认*false*
* `open-permission`：是否开启菜单权限-->Boolean;非必传;默认*false*
* `permission-template`：权限对照表-->Array;非必传;默认*{}*
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
	