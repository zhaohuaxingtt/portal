<template>
  <div>
    <iSelect
      :placeholder="language('请选择')"
      v-model="row.leftSelect"
      @change="handleChange"
    >
      <el-option
        v-for="item in dimensionLeftMenu"
        :key="item.id"
        :label="item.description"
        :value="item.id"
        :disabled="selectedIds.includes(item.id)"
      >
      </el-option>
    </iSelect>
  </div>
</template>

<script>
import { iSelect } from 'rise'
import { orgChildrenDimensionList, queryParts } from '@/api/organization/index'
export default {
  props: {
    dimensionLeftMenu: {
      type: Array,
      default: function () {
        return []
      }
    },
    row: {
      type: Object,
      require: true
    }
  },
  components: {
    iSelect
  },
  computed: {
    selectedIds() {
      if (this.$store.state.org.table.tableListData) {
        return this.$store.state.org.table.tableListData.map(
          (e) => e.leftSelect
        )
      }
      return []
    }
  },
  watch: {
    dimensionLeftMenu() {
      this.setRightSelectOptions(false)
    }
  },
  data() {
    return {
      value: '',
      isMock: false
    }
  },
  created() {
    this.setRightSelectOptions(false)
  },
  methods: {
    handleChange() {
      this.setRightSelectOptions(true)
    },
    setRightSelectOptions(isResetRightSelected) {
      console.log('setRightSelectOptions', this.row.leftSelect)
      if (this.row.leftSelect) {
        const obj = this.dimensionLeftMenu.filter((value) => {
          return value.id == this.row.leftSelect
        })
        console.log('dimensionLeftMenu', this.dimensionLeftMenu)
        if (obj.length > 0) {
          if (isResetRightSelected) {
            this.row.rightSelect = null
          }

          if (obj[0].url && !obj[0].valueList) {
            //没有父级组织
            this.getOrgChildrenDimesionList(obj[0].url)
          } else {
            //如果有父级组织，会返回维度可选项数据
            Vue.set(this.row, 'optionsSelect', obj[0].valueList)
          }
        }
      }
    },
    getOrgChildrenDimesionList(url) {
      console.log('this.row', this.row)
      //获取组织子维度
      // console.log("==== getOrgChildrenDimesionList1");
      // console.log("==== getOrgChildrenDimesionList2");
      if (url.includes('http://') || url.includes('https://')) {
        orgChildrenDimensionList(url, null, null)
          .then((value) => {
            if (value.code == 200) {
              const data = value.data || []
              if (this.row.originValueList && this.row.originValueList.length) {
                const dataIds = data.map((e) => e.valueId)
                const notInData = this.row.originValueList.filter(
                  (e) => !dataIds.includes(e.valueId)
                )
                data.push(...notInData)
              }
              Vue.set(this.row, 'optionsSelect', data)
            }
          })
          .catch(() => {})
      } else {
        queryParts(url)
          .then((value) => {
            if (value.code == 200) {
              const data = value.data || []
              if (this.row.originValueList && this.row.originValueList.length) {
                const dataIds = data.map((e) => e.valueId)
                const notInData = this.row.originValueList.filter(
                  (e) => !dataIds.includes(e.valueId)
                )
                data.push(...notInData)
              }
              Vue.set(this.row, 'optionsSelect', data)
            }
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
