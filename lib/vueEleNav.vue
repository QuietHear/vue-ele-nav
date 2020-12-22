/*
* @Author: aFei
* @Date: 2018-07-10 16:45:29
*/
/*
 * @LastEditors: afei
 * @LastEditTime: 2020-12-22 16:23:19
*/
<template>
  <el-menu
    ref="tab"
    :class="['vue-ele-nav', cname]"
    :collapse="collapse"
    :collapse-transition="collapseTransition"
    :mode="horizontal === true ? 'horizontal' : 'vertical'"
    :menu-trigger="menuTrigger"
    :unique-opened="accordion"
    :default-openeds="horizontal === true ? [] : opens"
  >
    <!-- 一级菜单 -->
    <div class="out-box" :key="item1.index" v-for="item1 in navInformation">
      <el-submenu
        class="first"
        :index="item1.index"
        v-if="!onlyFirst && item1.children.length > 0"
      >
        <template slot="title">
          <router-link
            :class="[item1.active === true ? 'replace-active' : '']"
            :to="{ name: item1.linkName }"
          >
            <i
              :class="[
                iconfont ? 'iconfont icon-' + item1.iconName : item1.iconName,
              ]"
              v-if="item1.iconName"
            ></i>
            {{ i18n ? $t(item1.name) : item1.name }}
          </router-link>
        </template>
        <!-- 二级菜单 -->
        <div class="out-box" :key="item2.index" v-for="item2 in item1.children">
          <el-submenu
            class="second"
            :index="item2.index"
            v-if="item2.children.length > 0"
          >
            <template slot="title">
              <router-link
                :class="[item2.active === true ? 'replace-active-child' : '']"
                :to="{ name: item2.linkName }"
              >
                <i
                  :class="[
                    iconfont
                      ? 'iconfont icon-' + item2.iconName
                      : item2.iconName,
                  ]"
                  v-if="item2.iconName"
                ></i>
                {{ i18n ? $t(item2.name) : item2.name }}
              </router-link>
            </template>
            <!-- 三级菜单 -->
            <div
              class="out-box"
              :key="item3.index"
              v-for="item3 in item2.children"
            >
              <el-submenu
                class="third"
                :index="item3.index"
                v-if="item3.children.length > 0"
              >
                <template slot="title">
                  <router-link
                    :class="[
                      item3.active === true ? 'replace-active-child' : '',
                    ]"
                    :to="{ name: item3.linkName }"
                  >
                    <i
                      :class="[
                        iconfont
                          ? 'iconfont icon-' + item3.iconName
                          : item3.iconName,
                      ]"
                      v-if="item3.iconName"
                    ></i>
                    {{ i18n ? $t(item3.name) : item3.name }}
                  </router-link>
                </template>
                <!-- 四级菜单 -->
                <div
                  class="out-box"
                  :key="item4.index"
                  v-for="item4 in item3.children"
                >
                  <el-menu-item :index="item4.index">
                    <template slot="title">
                      <router-link
                        :class="[
                          item4.active === true ? 'replace-active-child' : '',
                        ]"
                        :to="{ name: item4.linkName }"
                      >
                        <i
                          :class="[
                            iconfont
                              ? 'iconfont icon-' + item4.iconName
                              : item4.iconName,
                          ]"
                          v-if="item4.iconName"
                        ></i>
                        {{ i18n ? $t(item4.name) : item4.name }}
                      </router-link>
                    </template>
                  </el-menu-item>
                </div>
              </el-submenu>
              <el-menu-item :index="item3.index" v-else>
                <template slot="title">
                  <router-link
                    :class="[
                      item3.active === true ? 'replace-active-child' : '',
                    ]"
                    :to="{ name: item3.linkName }"
                  >
                    <i
                      :class="[
                        iconfont
                          ? 'iconfont icon-' + item3.iconName
                          : item3.iconName,
                      ]"
                      v-if="item3.iconName"
                    ></i>
                    {{ i18n ? $t(item3.name) : item3.name }}
                  </router-link>
                </template>
              </el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item :index="item2.index" v-else>
            <template slot="title">
              <router-link
                :class="[item2.active === true ? 'replace-active-child' : '']"
                :to="{ name: item2.linkName }"
              >
                <i
                  :class="[
                    iconfont
                      ? 'iconfont icon-' + item2.iconName
                      : item2.iconName,
                  ]"
                  v-if="item2.iconName"
                ></i>
                {{ i18n ? $t(item2.name) : item2.name }}
              </router-link>
            </template>
          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item :index="item1.index" v-else>
        <template slot="title">
          <router-link
            :class="[item1.active === true ? 'replace-active' : '']"
            :to="{ name: item1.linkName }"
            v-if="!onlyFirst"
          >
            <i
              :class="[
                iconfont ? 'iconfont icon-' + item1.iconName : item1.iconName,
              ]"
              v-if="item1.iconName"
            ></i>
            {{ i18n ? $t(item1.name) : item1.name }}
          </router-link>
          <a
            :class="[item1.active === true ? 'replace-active' : '']"
            @click="senMsg(item1)"
            v-else
          >
            <i
              :class="[
                iconfont ? 'iconfont icon-' + item1.iconName : item1.iconName,
              ]"
              v-if="item1.iconName"
            ></i>
            {{ i18n ? $t(item1.name) : item1.name }}
          </a>
        </template>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: "VueEleNav",
  data() {
    return {
      opens: [],
      navInformation: [],
    };
  },
  props: {
    startName: {
      // 菜单为main的某个直接子路由的路由名
      type: String,
      default: "",
    },
    onlyFirst: {
      // 只展示当前菜单第一层
      type: Boolean,
      default: false,
    },
    openPermission: {
      // 是否开启菜单权限
      type: Boolean,
      default: false,
    },
    permissionTemplate: {
      // 权限对照表
      type: Object,
      default: () => {
        return {};
      },
    },
    permissionList: {
      // 当前权限
      type: String,
      default: "",
    },
    i18n: {
      // 标题开启国际化
      type: Boolean,
      default: false,
    },
    cname: {
      // 自定义class
      type: String,
      default: "extra",
    },
    iconfont: {
      // 图标开启iconfont格式
      type: Boolean,
      default: false,
    },
    collapse: {
      // 是否水平折叠收起菜单(仅竖直菜单生效)
      type: Boolean,
      default: false,
    },
    collapseTransition: {
      // 是否开启折叠动画
      type: Boolean,
      default: true,
    },
    horizontal: {
      // 开启横向导航
      type: Boolean,
      default: false,
    },
    menuTrigger: {
      // 子菜单打开的触发方式(仅横向菜单生效)
      type: String,
      default: "hover",
    },
    accordion: {
      // 是否开启手风琴模式
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.initMenu();
  },
  methods: {
    // 初始化菜单
    initMenu() {
      let routeMsg = JSON.parse(
        JSON.stringify(
          this.$router.options.routes.filter((item) => {
            return item.name === "main";
          })[0].children
        )
      );
      // 设置了起始菜单
      if (this.startName !== "") {
        let lin = routeMsg.filter((item) => {
          return item.name === this.startName;
        });
        routeMsg = lin.length > 0 ? lin[0].children : [];
      }
      // 检查菜单show属性
      this.checkShow(routeMsg);
      // 开启了权限
      if (this.openPermission) {
        // 只展示第一层
        if (this.onlyFirst) {
          this.checkPermissionElse(routeMsg);
        } else {
          this.checkPermission(routeMsg);
        }
      }
      // 格式化数据
      this.sortData(routeMsg);
      this.navInformation = [...routeMsg];
      // 菜单状态格式化
      this.changeRouter();
    },
    // show筛选
    checkShow(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].meta.show !== false) {
          // 展示该菜单
          if (list[i].children && list[i].children.length > 0) {
            this.checkShow(list[i].children);
          } else {
            // 统一格式化，后面就不用了做多余判断了
            list[i].children = [];
          }
        } else {
          // 不展示该菜单
          list.splice(i, 1);
          i -= 1;
        }
      }
    },
    // 权限筛选
    checkPermission(list) {
      for (let i = 0; i < list.length; i++) {
        if (
          this.permissionList.indexOf(
            `,${this.permissionTemplate[list[i].name]},`
          ) !== -1
        ) {
          // 存在该菜单权限
          if (list[i].children.length > 0) {
            this.checkPermission(list[i].children);
          }
        } else {
          // 不存在该菜单权限
          list.splice(i, 1);
          i -= 1;
        }
      }
    },
    // 仅第一层权限筛选
    checkPermissionElse(list) {
      for (let i = 0; i < list.length; i++) {
        if (
          this.permissionList.indexOf(
            `,${this.permissionTemplate[list[i].name]},`
          ) === -1
        ) {
          // 不存在该菜单权限
          list.splice(i, 1);
          i -= 1;
        }
      }
    },
    // 格式化数据
    sortData(list, parentIndex) {
      for (let i = 0; i < list.length; i++) {
        let obj = {
          linkName: list[i].name,
          path: `/${list[i].path}`,
          index: `${parentIndex ? parentIndex + "-" : ""}${i + 1}`,
          name: list[i].meta.title,
          iconName: list[i].meta.icon,
          active: false,
          children: list[i].children,
        };
        list[i] = { ...obj };
        if (list[i].children.length > 0) {
          this.sortData(list[i].children, list[i].index);
        }
      }
    },
    // 路由改变
    changeRouter(type) {
      const router = this.$route;
      if (this.onlyFirst) {
        // 需要代替点亮
        if (router.meta.markName) {
          this.lightMenu(
            this.$router.resolve({ name: router.meta.markName }).route
          );
        } else {
          // 不需要代替点亮
          this.lightMenu(router);
        }
      } else {
        // 需要代理跳转
        if (router.name === "main") {
          this.$router.push({
            name: this.navInformation[0].linkName,
            params: { ...router.params },
            query: { ...router.query },
          });
        } else if (router.meta.redirectName) {
          this.$router.push({
            name: router.meta.redirectName,
            params: { ...router.params },
            query: { ...router.query },
          });
        } else {
          // 需要代替点亮
          if (router.meta.markName) {
            this.lightMenu(
              this.$router.resolve({ name: router.meta.markName }).route
            );
          } else {
            // 不需要代替点亮
            this.lightMenu(router);
          }
        }
      }
    },
    // 点亮菜单
    lightMenu(route) {
      // 熄灭之前菜单
      this.shutMenu(this.navInformation);
      // 点亮当前菜单
      this.findPath(route).then((res) => {
        const routeMsg = res;
        // 初始化时展开当前激活菜单
        if (this.opens.length === 0) {
          let arr = [...routeMsg.list];
          for (let i = 0; i < arr.length - 1; i++) {
            this.opens.push(arr.slice(0, i + 1).join("-"));
          }
        }
        // 有自己菜单的默认跳转到其下第一个子菜单
        if (
          route.meta.showSelf !== true &&
          routeMsg.detail.children.length > 0
        ) {
          if (!this.onlyFirst) {
            this.$router.push({
              name: routeMsg.detail.children[0].linkName,
              params: { ...route.params },
              query: { ...route.query },
            });
          }
        } else {
          routeMsg.list.forEach((item, index) => {
            let lin = routeMsg.list.slice(0, index + 1);
            this.lightChildMenu(this.navInformation, lin);
          });
        }
      });
    },
    // 熄灭菜单
    shutMenu(list) {
      list.forEach((item) => {
        item.active = false;
        if (item.children.length > 0) {
          this.shutMenu(item.children);
        }
      });
    },
    // 返回当前路由路径
    findPath(route) {
      return new Promise((resolve) => {
        this.searchRoute(this.navInformation, route).then((res) => {
          let obj = {
            detail: { ...res },
            list: [],
          };
          obj.list = res.index.split("-");
          resolve(obj);
        });
      });
    },
    // 找到当前路径
    searchRoute(list, route) {
      return new Promise((resolve) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].linkName === route.name) {
            resolve(list[i]);
          } else if (list[i].children.length > 0) {
            this.searchRoute(list[i].children, route).then((res) => {
              resolve(res);
            });
          }
        }
      });
    },
    // 点亮子菜单
    lightChildMenu(list, arr) {
      if (arr.length > 1) {
        let lin = arr.slice(1, arr.length + 1);
        this.lightChildMenu(list[arr[0] - 1].children, lin);
      } else {
        list[arr[0] - 1].active = true;
      }
    },
    // 只展示第一层时抛出路由信息
    senMsg(route) {
      this.$emit("change", route);
    },
  },
  watch: {
    startName() {
      this.initMenu();
    },
    $route() {
      this.changeRouter();
    },
  },
};
</script>

<!--基础样式-->
<style>
@import "style/vueEleNav.css";
</style>

<style>
/*默认颜色*/
@import "style/cname.css";
</style>
