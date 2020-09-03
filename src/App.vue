<template>
  <div style="margin: 20px auto; width: 50%;">
    <h3>使用示例</h3>
    <el-form size="small">
      <ChinaArea
        area-label="所属省份："
        :provinceCode="formData.provinceCode"
        :show-city="false"
        @areaSelectChange="changeArea"
      />
      <ChinaArea
        area-label="所属省市："
        :provinceCode="formData.provinceCode"
        :cityCode="formData.cityCode"
        @areaSelectChange="changeArea"
      />
      <ChinaArea
        area-label="所属省市区"
        :show-region="true"
        :provinceCode="formData.provinceCode"
        :cityCode="formData.cityCode"
        :regionCode="formData.regionCode"
        @areaSelectChange="changeArea"
      />
      <ChinaArea
        area-label="所属省市区"
        :show-region="true"
        :province-disabled="true"
        :city-disabled="true"
        :provinceCode="formData.provinceCode"
        :cityCode="formData.cityCode"
        :regionCode="formData.regionCode"
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
      <ChinaArea
        area-label="所属省市："
        area-prop="cityCode"
        :options="options"
        :provinceCode="form1Data.provinceCode"
        :cityCode="form1Data.cityCode2"
        @areaSelectChange="changeArea1"
      />
      <el-form-item>
        <el-button type="primary" @click="subForm1">提交</el-button>
      </el-form-item>
    </el-form>
    <el-form
      ref="form2"
      size="small"
      :model="form2Data"
      :inline="true"
      :rules="formDataRules2"
    >
      <ChinaArea
        area-label="所属省市区"
        area-prop="regionCode"
        :options="options"
        :show-region="true"
        :provinceCode="form2Data.provinceCode"
        :cityCode="form2Data.cityCode"
        :regionCode="form2Data.regionCode2"
        @areaSelectChange="changeArea2"
      />
      <el-form-item>
        <el-button type="primary" @click="subForm2">提交</el-button>
      </el-form-item>
    </el-form>
    <h3>插槽拓展</h3>
    <el-form size="small">
      <ChinaArea
        area-label="所在地址："
        :provinceCode="formData.provinceCode"
        :cityCode="formData.cityCode"
        @areaSelectChange="changeArea"
      >
        <template slot="more">
          <div style="display: inline-block;">
            <el-form-item prop="address">
              <el-input placeholder="请输入详细地址" />
            </el-form-item>
          </div>
        </template>
      </ChinaArea>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {
    ChinaArea: () => import("./packages/china-area/china-area"),
  },
  data() {
    return {
      options: {
        size: "mini",
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
        regionCode: 110105,
      },
      formDataRules1: {
        cityCode: [
          {
            required: true,
            message: "请选择城市",
            trigger: "change",
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
            message: "请选择区县",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    changeArea(areaObj) {
      console.warn("-> ChangeArea", areaObj);
    },
    changeArea1(areaObj) {
      this.form1Data.provinceCode = areaObj.provinceCode;
      this.form1Data.cityCode = areaObj.cityCode;
      this.form1Data.regionCode = areaObj.regionCode;
    },
    changeArea2(areaObj) {
      this.form2Data.provinceCode = areaObj.provinceCode;
      this.form2Data.cityCode = areaObj.cityCode;
      this.form2Data.regionCode = areaObj.regionCode;
    },
    subForm1() {
      this.$refs.form1.validate((res) => {
        if (res) {
          console.log("验证通过");
        }
      });
    },
    subForm2() {
      this.$refs.form2.validate((res) => {
        if (res) {
          console.log("验证通过");
        }
      });
    },
  },
};
</script>
