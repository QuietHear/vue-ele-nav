# 基于element、权限、国际化的vue nav组件

### 1. 适用范围
* 所有模块路由平级展开，每个模块只有一个入口文件index.vue放置<router-view/>
* 路由都是按照规范编写
* 兼容i18n

### 2. meta属性扩展
> `title:''`必须有，导航和面包屑展示的标题内容
>
> `show:false`是否展示在导航栏，只有false才不展示
>
> `markName:''`代替点亮的导航name，show:false
>
>`parents:['a']`当前页面show：false，且它的前一个页面也是show:false的，以此类推，
从展示的页面开始，按照层级依次push对应的出自己外的隐藏页面的name
>
>`replaceIndex: true`当前页面是否在面包屑上与容器的名字合并，只有true才合并不显示自己的name
>
> `changeMark:''/['a']`替换指定name的markName，可以使用字符串，也可以使用数组来改变多个公共页面，适用于多个页面同时使用同一个公共隐藏页面
，每个调公共页面的都需要写
>
> `keepAlive:true`永久开启页面缓存，只有为true为开启
>
> `defaultAlive: true`动态操作缓存时，想要复原初始化，必须写该属性才能恢复原值
>>
	//举个例子
	//现在实现从a-b时关闭其缓存功能，其余页面进入时正常缓存（b默认时开启的）
	//
	//打开a页面，并编写js
	beforeRouteLeave (to, from, next) {
		if (to.name === 'b') {
			to.meta.keepAlive = false;
		}
		next();
	}
	//打开b页面，并编写js
	beforeRouteLeave (to, from, next) {
		if (from.meta.defaultAlive !== undefined) {
			from.meta.keepAlive = from.meta.defaultAlive;
		}
		next();
	}
>
> 如果有子路由会被权限隐藏掉，需要给父路由加
>>
	redirect: to => {
    	let navInformation = JSON.parse(sessionStorage.getItem('navInformation'));
	    navInformation = navInformation.filter(function (item) {
	      return item.linkName === to.name;
	    })[0];
    	return navInformation.children[0].path;
	}
>

### 3. 安装依赖
> npm i vue-ele-nav

### 4. 声明
>
	//根目录下src--main.js文件中
	import eleNav from 'vue-ele-nav'
	//底下引用
	Vue.use(eleNav)
>

### 5. 使用
>
	//进入到使用页面，一般是main.vue文件
	<ele-nav :navInformation="navInformation"></ele-nav>
	//navInformation获取demo
          let navInformation = [];
          let routeMsg = this.$router.options.routes.filter(function (item) {
            return item.name === 'main' // 根据当前项目最外层name容器修改
          })[0].children;
          navInformation = routeMsg
            .filter(function (item) {
              return item.meta.show !== false
            })
            .map(function (item) {
              let arr = [];
              if (item.children !== undefined && item.children.length > 0) {
                arr = item.children
                  .filter(function (item) {
                    return item.meta.show !== false
                  })
                  .map(function (one) {
                    return {
                      linkName: one.name,
                      path: `/${item.path}/${one.path}`,
                      iconName: one.meta.icon,
                      active: false,
                      name: one.meta.title
                    }
                  });
              }
              return {
                linkName: item.name,
                path: `/${item.path}`,
                name: item.meta.title,
                iconName: item.meta.icon,
                active: false,
                children: arr
              }
            });
>

### 6. 参数
> * 导航信息:*navInformation*-->Array;必传
> * 自定义class:*cname*-->String;非必传;默认`'ele-nav'`
> * 自定义内联样式:*myStyle*-->String;非必传;默认`''`
> * 是否开启横向导航:*horizontal*-->Boolean;非必传;默认`false`
> * 是否开启手风琴模式:*accordion*-->Boolean;非必传;默认`false`

### 7. 样式
> * 自定义颜色:组件上绑定cname后，复制原本的*.ele-nav*样式进行颜色，注意 在.el-menu--horizontal{}外层一定要加一层body，不然没法自定义横向样式
