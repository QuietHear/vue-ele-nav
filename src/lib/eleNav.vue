/*
* @Author: aFei
* @Date: 2018-07-10 16:45:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-09-26 11:35:45
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
        <router-link :class="item.active===true?'replace_active':''"
                     :to="{name:item.linkName}">
          <i class="icon iconfont"
             :class="item.iconName"></i>
          {{i18n===true?$t(item.name):item.name}}
        </router-link>
      </template>
      <!--二级菜单-->
      <el-menu-item-group>
        <el-menu-item :index=one.index
                      :key="one.index"
                      v-for="one in item.children">
          <router-link :class="one.active===true?'replace_active_child':''"
                       :to="{name:one.linkName}">
            <i class="icon iconfont"
               :class="one.iconName"></i>
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
        <router-link :class="item.active===true?'replace_active':''"
                     :to="{name:item.linkName}">
          <i class="icon iconfont"
             :class="item.iconName"></i>
          {{i18n===true?$t(item.name):item.name}}
        </router-link>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        opens: ['1'],
        normalClass: 'icon iconfont',
        mode: 1,
        i18n: false
      }
    },
    props: {
      navInformation: {
        type: Array,
        required: true
      },
      cname: {
        type: String,
        default: 'ele-nav'
      },
      myStyle: {
        type: String,
        default: ''
      },
      horizontal: {
        type: Boolean,
        default: false
      },
      accordion: {
        type: Boolean,
        default: false
      }
    },
    created() {
      if (this.$i18n !== undefined) {
        this.i18n = true
      }
      // 初始化索引
      for (let i = 0; i < this.navInformation.length; i++) {
        this.navInformation[i].index = `${i + 1}`
        if (this.navInformation[i].children !== undefined && this.navInformation[i].children.length > 0) {
          for (let y = 0; y < this.navInformation[i].children.length; y++) {
            this.navInformation[i].children[y].index = `${i + 1}-${y + 1}`
          }
        }
      }
      // 恢复当前激活的菜单
      let name = ''
      if (this.$route.meta.markName !== undefined && this.$route.meta.markName !== '') {
        name = this.$route.meta.markName
      } else {
        name = this.$route.name
      }
      let parent = this.navInformation.filter(function (item) {
        return item.linkName === name
      })
      // 如果有二级菜单
      if (parent.length === 0) {
        parent = this.navInformation.filter(function (item) {
          let bol = false
          let arr = []
          if (item.children.length > 0) {
            arr = item.children.filter(function (one) {
              return one.linkName === name
            })
          }
          if (arr.length > 0) {
            bol = true
          }
          return bol
        })
        parent[0].children.filter(function (item) {
          return item.linkName === name
        })[0].active = true
        sessionStorage.setItem('navActiveChildIndex', parent[0].children.filter(function (item) {
          return item.linkName === name
        })[0].index)
      } else {
        sessionStorage.setItem('navActiveChildIndex', '')
      }
      // 点亮一级菜单
      parent[0].active = true
      // 存储当前激活的菜单
      sessionStorage.setItem('navActiveParentIndex', parent[0].index)
      // 初始化打开项
      this.opens = [parent[0].index]
    },
    methods: {
      saveOpen(indexInside, indexOutside) {
        this.changeNavActive(indexOutside[0], indexOutside[1])
      },
      changeNavActive(parent, child) { // 更新导航的激活点亮项
        // 清除之前激活的菜单
        if (sessionStorage.getItem('navActiveChildIndex') !== '') {
          this.navInformation.filter(function (item) {
            return item.index === sessionStorage.getItem('navActiveParentIndex')
          })[0].children.filter(function (item) {
            return item.index === sessionStorage.getItem('navActiveChildIndex')
          })[0].active = false
        }
        if (sessionStorage.getItem('navActiveParentIndex') !== '') {
          this.navInformation.filter(function (item) {
            return item.index === sessionStorage.getItem('navActiveParentIndex')
          })[0].active = false
        }
        // 存储当前激活的菜单
        sessionStorage.setItem('navActiveParentIndex', parent)
        sessionStorage.setItem('navActiveChildIndex', child !== undefined ? child : '')
        // 点亮当前激活的菜单
        if (child === '' && parent === '') {
          // 存储当前激活项的name，方便为非正常跳转做对比
          sessionStorage.setItem('navActiveName', '')
        } else {
          let obj = this.navInformation.filter(function (item) {
            return item.index === parent
          })[0]
          // 如果有二级菜单
          if (child !== undefined) {
            obj.active = true // 点亮一级菜单
            obj = obj.children.filter(function (item) {
              return item.index === child
            })[0]
          }
          obj.active = true
          // 存储当前激活项的name，方便为非正常跳转做对比
          sessionStorage.setItem('navActiveName', obj.linkName)
        }
      }
    },
    watch: {
      $route() {
        let it = this
        if (this.$route.meta.markName !== undefined && this.$route.meta.markName !== '') {
          // 找到当前name对应的两个index
          let parent
          let child
          parent = this.navInformation.filter(function (item) {
            return item.linkName === it.$route.meta.markName
          })
          if (parent.length > 0) { // 第一层已经找到标记nav
            this.changeNavActive(parent[0].index)
          } else { // 标记nav在第二层
            parent = this.navInformation.filter(function (item) {
              let isTrue = false
              let arr = []
              if (item.children.length > 0) {
                arr = item.children.filter(function (one) {
                  return one.linkName === it.$route.meta.markName
                })
                if (arr.length > 0) {
                  isTrue = true
                }
              }
              return isTrue
            })
            if (parent.length > 0) { // 当前路由在导航里
              child = parent[0].children.filter(function (item) {
                return item.linkName === it.$route.meta.markName
              })
              this.changeNavActive(parent[0].index, child[0].index)
            } else { // 当前路由不在导航里
              this.changeNavActive('', '')
            }
          }
          this.opens = [sessionStorage.getItem('navActiveParentIndex')]
        } else {
          if (this.$route.name !== sessionStorage.getItem('navActiveName')) {
            // 找到当前name对应的两个index
            let parent
            let child
            parent = this.navInformation.filter(function (item) {
              return item.linkName === it.$route.name
            })
            if (parent.length > 0) {
              this.changeNavActive(parent[0].index)
            } else {
              parent = this.navInformation.filter(function (item) {
                let isTrue = false
                if (item.children.length > 0) {
                  let arr = item.children.filter(function (one) {
                    return one.linkName === it.$route.name
                  })
                  if (arr.length > 0) {
                    isTrue = true
                  }
                }
                return isTrue
              })
              child = parent[0].children.filter(function (item) {
                return item.linkName === it.$route.name
              })
              this.changeNavActive(parent[0].index, child[0].index)
            }
            this.opens = [sessionStorage.getItem('navActiveParentIndex')]
          } else {
            // 用户点击
          }
        }
      }
    }
  }
</script>

<!--基础样式-->
<style scoped>
  @import "eleNav.css";
</style>

<!--样式扩展-->
<style>
  /*必需的扩展*/
  @import "navExtra.css";
</style>

<style>
  /*默认颜色*/
  @import "cname.css";
</style>
