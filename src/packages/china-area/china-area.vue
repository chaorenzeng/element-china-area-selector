<template>
  <el-form-item :label="areaLabel" :prop="areaProp" v-bind="options">
    <el-select
      v-model="province"
      placeholder="请选择省份"
      :disabled="disabled || provinceDisabled"
      @change="changeProvince"
    >
      <el-option
        v-for="item in provinces"
        :key="item.ReginNum"
        :label="item.ReginName"
        :value="item.ReginNum"
      />
    </el-select>
    <el-select
      v-if="showCity"
      v-model="city"
      :loading="loadingCity"
      placeholder="请选择市"
      :disabled="disabled || cityDisabled"
      @change="changeCity"
    >
      <el-option
        v-for="item in cities"
        :key="item.ReginNum"
        :label="item.ReginName"
        :value="item.ReginNum"
      />
    </el-select>
    <el-select
      v-if="showRegion"
      v-model="region"
      :disabled="disabled || regionDisabled"
      placeholder="请选择区县"
      @change="changeRegion"
    >
      <el-option
        v-for="item in regions"
        :key="item.ReginNum"
        :label="item.ReginName"
        :value="item.ReginNum"
      />
    </el-select>
    <slot name="more"></slot>
  </el-form-item>
</template>

<script>
import Data from './data.json'
export default {
  name: 'ElementChinaAreaSelector',
  props: {
    options: {
      type: Object,
      default: null
    },
    // el-form-item label标签
    areaLabel: {
      type: String,
      default: ''
    },
    // el-form-item prop属性
    areaProp: {
      type: String,
      default: ''
    },
    // 省份编码
    provinceCode: {
      type: Number,
      default: null
    },
    // 城市编码
    cityCode: {
      type: Number,
      default: null
    },
    // 区县编码
    regionCode: {
      type: Number,
      default: null
    },
    // 全部不可选
    disabled: {
      type: Boolean,
      default: false
    },
    // 省份不可选
    provinceDisabled: {
      type: Boolean,
      default: false
    },
    // 城市不可选
    cityDisabled: {
      type: Boolean,
      default: false
    },
    // 区县不可选
    regionDisabled: {
      type: Boolean,
      default: false
    },
    // 显示城市下拉
    showCity: {
      type: Boolean,
      default: true
    },
    // 显示区县下拉
    showRegion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingCity: false,
      loadingRegion: false,
      province: null,
      provinceName: '',
      city: null,
      cityName: '',
      region: null,
      regionName: '',
      provinces: [],
      cities: [],
      regions: [],
      hasLoadProvince: false,
      hasLoadCities: false
    }
  },
  watch: {
    provinceCode: {
      handler() {
        this.presetArea()
      },
      immediate: true
    }
  },
  created() {
    this.getAddressData()
  },
  methods: {
    // 获取省市数据
    getAddressData() {
      this.hasLoadProvince = true
      this.provinces = Data.area
      this.presetArea()
      // getRegionList().then((res) => {
      //   this.hasLoadProvince = true
      //   this.provinces = res.response
      //   this.presetArea()
      // })
    },
    // 设置区域
    presetArea(provinceCodeIn, cityCodeIn, regionCodeIn) {
      const { provinceCode, cityCode, regionCode } = this
      this.cities = []
      this.province = provinceCodeIn || provinceCode
      this.changeProvince(this.provinceCode)
      // 不需要城市
      if (!this.showCity) return
      this.city = cityCodeIn || cityCode
      this.changeCity(this.cityCode)

      // 不需要区县
      if (!this.showRegion) return
      this.region = regionCodeIn || regionCode
      this.changeRegion(this.region)
    },
    // 获取当前结果
    getAreaRes() {
      const res = {
        provinceCode: this.province,
        provinceName: this.provinceName,
        cityCode: this.city,
        cityName: this.cityName,
        regionCode: this.region,
        regionName: this.regionName
      }
      return res
    },
    // 修改省份
    changeProvince(value) {
      if (!this.hasLoadProvince) {
        return
      }
      if (value !== '') {
        this.city = null
        this.loadingCity = true
        for (const item of this.provinces) {
          if (item.ReginNum === value) {
            this.provinceName = item.ReginName
            this.hasLoadCities = true
            this.cities = item.SubLst
            this.loadingCity = false
            break
          } else {
            continue
          }
        }
      } else {
        this.cities = []
      }
      if (this.showRegion) {
        this.region = null
      }
      this.$emit('areaSelectChange', this.getAreaRes())
    },
    // 修改城市
    changeCity(value) {
      // 加载区县
      if (!this.hasLoadCities) {
        return
      }
      if (value !== '') {
        this.region = null
        for (const item of this.cities) {
          if (item.ReginNum !== value) continue
          this.cityName = item.ReginName
          if (this.showRegion) {
            this.regions = item.SubLst
          }
          break
        }
      } else {
        this.regions = []
      }
      this.$emit('areaSelectChange', this.getAreaRes())
    },
    // 修改区县
    changeRegion(value) {
      for (const item of this.regions) {
        if (item.ReginNum === value) {
          this.regionName = item.ReginName
          break
        } else {
          continue
        }
      }
      this.$emit('areaSelectChange', this.getAreaRes())
    }
  }
}
</script>
