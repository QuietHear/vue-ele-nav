# 基于element的vue nav组件

### 1. 安装依赖
> npm i vue-ele-nav

### 2. 声明
>
	//根目录下src--main.js文件中
	import eleNav from 'vue-ele-nav'
	//底下引用
	Vue.use(eleNav)
>
### 3. 使用前提(路由规范)
>
	//只挑必须的字段，每一个路由地址都是如此,目前只展示到2级菜单
	name: 'CourseLibrary',//路由跳转的唯一标识
	meta: {
		title: 'components.asideNav.courseLibrary',//名字
		icon: 'el-icon-menu',//图标,可不写
		show:false//是否展示，只有为false时不展示
	},
>
### 4. 使用
>
	//进入到使用页面，一般是main.vue文件
	<ele-nav cname="navbar"
             :navInformation="navInformation">
	</ele-nav>
>
### 5. 参数
> * 导航信息:*navInformation*-->Array;必传
> * 自定义class:*cname*-->String;非必传;默认`'ele-nav'`
> * 自定义内联样式:*myStyle*-->String;非必传;默认`''`
> * 是否开启横向导航:*horizontal*-->Boolean;非必传;默认`false`
> * 是否开启手风琴模式:*accordion*-->Boolean;非必传;默认`false`
### 6. 样式
> * 自定义颜色:组件上绑定cname后，复制原本的*.ele-nav*样式进行颜色
> * 自定义激活颜色:*replace_active*，需要自己添加颜色
