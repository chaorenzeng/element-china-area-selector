# element-china-area-selector

[![npm](https://img.shields.io/npm/v/element-china-area-selector.svg)](https://www.npmjs.com/package/element-china-area-selector)
[![npm](https://img.shields.io/npm/dt/element-china-area-selector.svg)](https://www.npmjs.com/package/element-china-area-selector)

> Element 中国省市区级联

![示例](https://s1.ax1x.com/2020/09/12/wUIhBd.png)

### 安装

```js
npm install --save element-china-area-selector
```

### 使用

在 `main.js` 文件中引入插件并注册

```js
import ElementChinaAreaSelector from 'element-china-area-selector'
Vue.use(ElementChinaAreaSelector)
```

### 可选参数

| 参数名           | 默认值 | 类型    | 是否必填 | 说明                                                                             |
| ---------------- | ------ | ------- | -------- | -------------------------------------------------------------------------------- |
| province-code    | null   | Number  | 是       | 省份编码                                                                         |
| city-code        | null   | Number  | 否       | 城市编码                                                                         |
| region-code      | null   | Number  | 否       | 区县编码                                                                         |
| show-city        | true   | Boolean | 否       | 是否显示城市下拉                                                                 |
| show-region      | false  | Boolean | 否       | 是否显示区县下拉                                                                 |
| area-label       | ''     | String  | 否       | el-form-item 文字标签                                                            |
| area-prop        | ''     | String  | 否       | el-form-item prop 属性                                                           |
| disabled         | false  | Boolean | 否       | 是否全部不可选                                                                   |
| provinceDisabled | false  | Boolean | 否       | 是否省份不可选                                                                   |
| cityDisabled     | false  | Boolean | 否       | 是否城市不可选                                                                   |
| regionDisabled   | false  | Boolean | 否       | 是否区县不可选                                                                   |
| options          | null   | Object  | 否       | [更多配置](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes) |

### 事件

| 事件名           | 说明               |
| ---------------- | ------------------ |
| areaSelectChange | 返回选中项城市信息 |

### 返回

| 属性名       | 说明     |
| ------------ | -------- |
| provinceCode | 省份编码 |
| provinceName | 省份名   |
| cityCode     | 市编码   |
| cityName     | 市名     |
| regionCode   | 区县编码 |
| regionName   | 区县名   |

### 案例

> 注意省市区初始化无值时应传入 null

```html
<template>
  <div style="margin: 20px auto; width: 50%;">
    <h3>使用示例</h3>
    <el-form size="small">
      <ElementChinaAreaSelector
        area-label="所属省份："
        :province-code="formData.provinceCode"
        :show-city="false"
        @areaSelectChange="changeArea"
      />
      <ElementChinaAreaSelector
        area-label="所属省市："
        :province-code="formData.provinceCode"
        :city-code="formData.cityCode"
        @areaSelectChange="changeArea"
      />
      <ElementChinaAreaSelector
        area-label="所属省市区"
        :show-region="true"
        :province-code="formData.provinceCode"
        :city-code="formData.cityCode"
        :region-code="formData.regionCode"
        @areaSelectChange="changeArea"
      />
      <ElementChinaAreaSelector
        area-label="所属省市区"
        :show-region="true"
        :province-disabled="true"
        :city-disabled="true"
        :province-code="formData.provinceCode"
        :city-code="formData.cityCode"
        :region-code="formData.regionCode"
        @areaSelectChange="changeArea"
      />
    </el-form>
    <h3>表单验证</h3>
    <el-form
      ref="form1"
      size="small"
      :model="form1Data"
      :inline="true"
      :rules="formDataRules1"
    >
      <ElementChinaAreaSelector
        area-label="所属省市："
        area-prop="cityCode"
        :options="options"
        :province-code="form1Data.provinceCode"
        :city-code="form1Data.cityCode2"
        @areaSelectChange="changeArea1"
      />
      <el-form-item>
        <el-button type="primary" @click="subForm1">提交</el-button>
        <el-button @click="clearForm1">清空</el-button>
      </el-form-item>
    </el-form>
    <el-form
      ref="form2"
      size="small"
      :model="form2Data"
      :inline="true"
      :rules="formDataRules2"
    >
      <ElementChinaAreaSelector
        area-label="所属省市区"
        area-prop="regionCode"
        :options="options"
        :show-region="true"
        :province-code="form2Data.provinceCode"
        :city-code="form2Data.cityCode"
        :region-code="form2Data.regionCode2"
        @areaSelectChange="changeArea2"
      />
      <el-form-item>
        <el-button type="primary" @click="subForm2">提交</el-button>
      </el-form-item>
    </el-form>
    <h3>插槽拓展</h3>
    <el-form size="small">
      <ElementChinaAreaSelector
        area-label="所在地址："
        :province-code="formData.provinceCode"
        :city-code="formData.cityCode"
        @areaSelectChange="changeArea"
      >
        <template slot="more">
          <div style="display: inline-block;">
            <el-form-item prop="address">
              <el-input placeholder="请输入详细地址" />
            </el-form-item>
          </div>
        </template>
      </ElementChinaAreaSelector>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        options: {
          size: 'mini',
        },
        formData: {
          provinceCode: 110000,
          cityCode: 110100,
          regionCode: 110105,
        },
        // 验证省市
        form1Data: {
          provinceCode: 110000,
          cityCode: null,
        },
        formDataRules1: {
          cityCode: [
            {
              required: true,
              message: '请选择城市',
              trigger: 'change',
            },
          ],
        },
        // 验证省市区
        form2Data: {
          provinceCode: 110000,
          cityCode: 110100,
          regionCode: null,
        },
        formDataRules2: {
          regionCode: [
            {
              required: true,
              message: '请选择区县',
              trigger: 'change',
            },
          ],
        },
      }
    },
    methods: {
      changeArea(areaObj) {
        console.warn('-> ChangeArea', areaObj)
      },
      changeArea1(areaObj) {
        this.form1Data.provinceCode = areaObj.provinceCode
        this.form1Data.cityCode = areaObj.cityCode
        this.form1Data.regionCode = areaObj.regionCode
      },
      changeArea2(areaObj) {
        this.form2Data.provinceCode = areaObj.provinceCode
        this.form2Data.cityCode = areaObj.cityCode
        this.form2Data.regionCode = areaObj.regionCode
      },
      subForm1() {
        this.$refs.form1.validate((res) => {
          if (res) {
            console.log('验证通过')
          }
        })
      },
      clearForm1() {
        this.form1Data.cityCode = null
        this.$refs.form1.clearValidate()
      },
      subForm2() {
        this.$refs.form2.validate((res) => {
          if (res) {
            console.log('验证通过')
          }
        })
      },
    },
  }
</script>
```
