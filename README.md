# VUE Echarts 基础组件

## 支持多个图表共存

```
//安装依赖
npm i -S echarts
npm i -S vue-echarts-sedu
//运行项目
npm run dev
```

> 调用

```
main.js:   加入
  import seduEcharts from 'vue-echarts-sedu'

  Vue.use(seduEcharts);

---

具体视图：
<template>
  <sedu-echarts domId="aaaa"
                :option=option1 />

  <sedu-echarts domId="bbb"
                :option=option1 />  
</template>

<script>
export default {
  data () {
    return {
      option1: {}
    }
  },
  created(){
    setTimeout(() => {
      this.option1 = {
        title: { text: "ECharts Gauge" },
        tooltip: { formatter: "{a} <br/>{b} : {c}%" },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50 }]
          }
        ]
      };
      }, 3000);
  }
}
</script>
```

> 参数

```
props: {
    // 自定义class
    cname: {
      type: String,
      default: ''
    },
    // 自定义行内样式
    myStyle: {
      type: String,
      default: ''
    },
    // echarts的配置参数
    option: {
      type: Object,
      required: true
    },
    // dom元素的id，区分多个图表
    domId: {
      type: String,
      required: true
    }
```
