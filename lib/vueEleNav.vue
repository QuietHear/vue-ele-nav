/*
* @Author: aFei
* @Date: 2018-07-10 16:45:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2019-04-29 09:21:21
*/
<template>
  <el-menu ref="tab"
           @select="saveOpen"
           :unique-opened="accordion===true? true:false"
           class="extra"
           :class=cname
           :style=myStyle
           :default-openeds="horizontal===true? [] : opens "
           :mode="horizontal===true? 'horizontal':'vertical'">
    <!--带子元素的-->
    <el-submenu :index=item.index
                :key="item.index"
                v-for="item in navInformation"
                v-if="item.children!==undefined && item.children.length>0">
      <!--一级菜单-->
      <template slot="title">
        <router-link :class="[item.active===true?'replace_active':'',item.iconName?'hasIcon':'']"
                     :to="{name:item.linkName}">
          <i class="icon iconfont" :class="item.iconName"></i>
          {{i18n===true?$t(item.name):item.name}}
        </router-link>
      </template>
      <!--二级菜单-->
      <el-menu-item-group>
        <el-menu-item :index=one.index
                      :key="one.index"
                      v-for="one in item.children">
          <router-link :class="one.active===true?'replace_active_child':''" :to="{name:one.linkName}">
            <i class="icon iconfont" :class="one.iconName"></i>
            {{i18n===true?$t(one.name):one.name}}
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!--不带子元素的-->
    <el-menu-item-group :index=item.index
                        :key="item.index"
                        class="else"
                        v-else>
      <el-menu-item :index=item.index>
        <router-link :class="[item.active===true?'replace_active':'',item.iconName?'hasIcon':'']"
                     :to="{name:item.linkName}">
          <i class="icon iconfont" :class="item.iconName"></i>
          {{i18n===true?$t(item.name):item.name}}
        </router-link>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<script>
  export default {
    name: 'VueEleNav',
    data() {
      return {
        opens: ['1'],
        normalClass: 'icon iconfont',
        navInformation: [],
        mode: 1
      }
    },
    props: {
      permissionTemplate: { // 权限对照表
        type: Object,
        required: true
      },
      permissionList: { // 当前权限
        type: String,
        required: true
      },
      cname: { // 自定义class
        type: String,
        default: 'ele-nav'
      },
      myStyle: { // 自定义内联样式
        type: String,
        default: ''
      },
      horizontal: { // 开启横向导航
        type: Boolean,
        default: false
      },
      accordion: { // 开启手风气模式
        type: Boolean,
        default: false
      },
      i18n: { // 标题开启国际化
        type: Boolean,
        default: false
      }
    },
    created() {
      const routeMsg = this.$router.options.routes.filter(item => {
        return item.name === 'main';
      })[0].children;
      // 初始化导航
      let it = this;
      this.navInformation = routeMsg.filter(item => {
        return item.meta.show !== false && it.permissionList.indexOf(`,${it.permissionTemplate[item.name]},`) !== -1;
      }).map((item, i) => {
        let arr = [];
        if (item.children !== undefined && item.children.length > 0) {
          arr = item.children.filter(item => {
            return item.meta.show !== false && it.permissionList.indexOf(`,${it.permissionTemplate[item.name]},`) !== -1;
          }).map((one, y) => {
            return {
              linkName: one.name,
              path: `/${item.path}/${one.path}`,
              index: `${i + 1}-${y + 1}`,
              iconName: one.meta.icon,
              active: false,
              name: one.meta.title
            }
          });
        }
        return {
          linkName: item.name,
          path: `/${item.path}`,
          index: `${i + 1}`,
          name: item.meta.title,
          iconName: item.meta.icon,
          active: false,
          children: arr
        }
      });
      // 判断是否是首页然后跳转
      if (this.$route.name === 'main') {
        sessionStorage.setItem('vueNavActiveParentIndex', '1');
        sessionStorage.setItem('vueNavActiveChildIndex', this.navInformation[0].children.length > 0 ? '1-1' : '');
        this.$router.push({name: this.navInformation[0].linkName});
      } else {
        if (sessionStorage.getItem('vueNavActiveName') !== '') {
          // 恢复当前激活的菜单
          let name = '';
          if (this.$route.meta.markName !== undefined && this.$route.meta.markName !== '') {
            name = this.$route.meta.markName;
          } else {
            name = this.$route.name;
          }
          let parent = this.navInformation.filter(item => {
            return item.linkName === name;
          });
          // 如果有二级菜单
          if (parent.length === 0) {
            parent = this.navInformation.filter(item => {
              let bol = false;
              let arr = [];
              if (item.children.length > 0) {
                arr = item.children.filter(one => {
                  return one.linkName === name;
                })
              }
              if (arr.length > 0) {
                bol = true;
              }
              return bol;
            });
            parent[0].children.filter(item => {
              return item.linkName === name;
            })[0].active = true;
            sessionStorage.setItem('vueNavActiveChildIndex', parent[0].children.filter(item => {
              return item.linkName === name;
            })[0].index);
          } else {
            sessionStorage.setItem('vueNavActiveChildIndex', '');
          }
          // 点亮一级菜单
          parent[0].active = true;
          // 存储当前激活的菜单
          sessionStorage.setItem('vueNavActiveParentIndex', parent[0].index);
          // 初始化打开项
          this.opens = [parent[0].index];
        }
      }
    },
    methods: {
      saveOpen(indexInside, indexOutside) {
        this.changeNavActive(indexOutside[0], indexOutside[1]);
      },
      changeNavActive(parent, child) { // 更新导航的激活点亮项

        // 清除之前激活的菜单
        if (sessionStorage.getItem('vueNavActiveChildIndex') !== '') {
          this.navInformation.filter(item => {
            return item.index === sessionStorage.getItem('vueNavActiveParentIndex');
          })[0].children.filter(item => {
            return item.index === sessionStorage.getItem('vueNavActiveChildIndex');
          })[0].active = false;
        }
        if (sessionStorage.getItem('vueNavActiveParentIndex') !== '') {
          this.navInformation.filter(item => {
            return item.index === sessionStorage.getItem('vueNavActiveParentIndex');
          })[0].active = false;
        }
        // 存储当前激活的菜单
        sessionStorage.setItem('vueNavActiveParentIndex', parent);
        sessionStorage.setItem('vueNavActiveChildIndex', child !== undefined ? child : '');
        // 点亮当前激活的菜单
        if (child === '' && parent === '') {
          // 存储当前激活项的name，方便为非正常跳转做对比
          sessionStorage.setItem('vueNavActiveName', '');
        } else {
          let obj = this.navInformation.filter(item => {
            return item.index === parent;
          })[0];
          // 如果有二级菜单
          if (child !== undefined) {
            obj.active = true; // 点亮一级菜单
            obj = obj.children.filter(item => {
              return item.index === child;
            })[0];
          }
          obj.active = true;
          // 存储当前激活项的name，方便为非正常跳转做对比
          sessionStorage.setItem('vueNavActiveName', obj.linkName);
        }
      }
    },
    watch: {
      $route() {
        let it = this;
        let lin = this.navInformation.filter(item => {
          return item.linkName === it.$route.name;
        });
        if (lin.length > 0 && lin[0].children.length > 0) { // 有二级菜单的自动跳转到第一个子菜单
          this.$router.push({name: lin[0].children[0].linkName});
        } else {
          if (this.$route.meta.markName !== undefined && this.$route.meta.markName !== '') {
            // 找到当前name对应的两个index
            let parent;
            let child;
            parent = this.navInformation.filter(item => {
              return item.linkName === it.$route.meta.markName;
            });
            if (parent.length > 0) { // 第一层已经找到标记nav
              this.changeNavActive(parent[0].index);
            } else { // 标记nav在第二层
              parent = this.navInformation.filter(item => {
                let isTrue = false;
                let arr = [];
                if (item.children.length > 0) {
                  arr = item.children.filter(one => {
                    return one.linkName === it.$route.meta.markName;
                  });
                  if (arr.length > 0) {
                    isTrue = true;
                  }
                }
                return isTrue;
              });
              if (parent.length > 0) { // 当前路由在导航里
                child = parent[0].children.filter(item => {
                  return item.linkName === it.$route.meta.markName;
                });
                this.changeNavActive(parent[0].index, child[0].index);
              } else { // 当前路由不在导航里
                this.changeNavActive('', '');
              }
            }
            this.opens = [sessionStorage.getItem('vueNavActiveParentIndex')];
          } else {
            if (this.$route.name !== sessionStorage.getItem('vueNavActiveName')) {
              // 找到当前name对应的两个index
              let parent;
              let child;
              parent = this.navInformation.filter(item => {
                return item.linkName === it.$route.name;
              });
              if (parent.length > 0) {
                this.changeNavActive(parent[0].index);
              } else {
                parent = this.navInformation.filter(item => {
                  let isTrue = false;
                  if (item.children.length > 0) {
                    let arr = item.children.filter(one => {
                      return one.linkName === it.$route.name;
                    });
                    if (arr.length > 0) {
                      isTrue = true;
                    }
                  }
                  return isTrue;
                });
                child = parent[0].children.filter(item => {
                  return item.linkName === it.$route.name;
                });
                this.changeNavActive(parent[0].index, child[0].index);
              }
              this.opens = [sessionStorage.getItem('vueNavActiveParentIndex')];
            } else {
              // 用户点击
            }
          }
        }
      }
    }
  }
</script>

<!--基础样式-->
<style scoped>
  @import "style/vueEleNav.css";
</style>

<!--样式扩展-->
<style>
  /*必需的扩展*/
  @import "style/navExtra.css";
</style>

<style>
  /*默认颜色*/
  @import "style/cname.css";
</style>
