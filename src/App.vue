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
    <el-form ref="form1" size="small" :model="form1Data" :inline="true" :rules="formDataRules1">
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
    <el-form ref="form2" size="small" :model="form2Data" :inline="true" :rules="formDataRules2">
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
  components: {
    ElementChinaAreaSelector: () => import('./packages/china-area/china-area')
  },
  data() {
    return {
      options: {
        size: 'mini'
      },
      formData: {
        provinceCode: 110000,
        cityCode: 110100,
        regionCode: 110105
      },
      // 验证省市
      form1Data: {
        provinceCode: 110000,
        cityCode: null
      },
      formDataRules1: {
        cityCode: [
          {
            required: true,
            message: '请选择城市',
            trigger: 'change'
          }
        ]
      },
      // 验证省市区
      form2Data: {
        provinceCode: 110000,
        cityCode: 110100,
        regionCode: null
      },
      formDataRules2: {
        regionCode: [
          {
            required: true,
            message: '请选择区县',
            trigger: 'change'
          }
        ]
      }
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
    }
  }
}
</script>
