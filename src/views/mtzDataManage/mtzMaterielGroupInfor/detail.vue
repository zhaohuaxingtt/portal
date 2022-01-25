<template>
  <iPage>
    <pageHeader>
      {{ language($route.query.id ? '编辑' : '新增')
      }}{{ language('MTZ材料组信息') }}
    </pageHeader>

    <theDetailBase class="margin-top20" />

    <tableTransfer
      v-if="$route.query.id"
      :title="language('零件材料组')"
      :sub-left-title="language('零件材料组列表')"
      :sub-right-title="language('已有关联列表')"
      :placeholder="language('请输入零件材料组编号/名称/科室')"
      :left-null-select-tips="language('请选择源零件材料组')"
      :right-null-select-tips="language('请选择已关联零件材料组')"
      :table-columns="tableColumnGroup"
      :query-left-fun="queryMaterielGroupFun"
      :query-right-fun="queryMaterielGroupRelationFun"
      :save-right-fun="saveMaterielGroupRelationFun"
      :right-data-filter-keys="['categoryCode', 'categoryNameZh', 'deptCodes']"
      left-disabled-prop="isUse"
      edit-permission-key="BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_PARTS_MODIFY"
    />

    <tableTransfer
      v-if="$route.query.id"
      :title="language('零件六位号')"
      :sub-left-title="language('零件六位号列表')"
      :sub-right-title="language('已有关联列表')"
      :placeholder="language('请输入零件材料组编号或名称')"
      :left-null-select-tips="language('请选择源零件六位号')"
      :right-null-select-tips="language('请选择已关联零件六位号')"
      :table-columns="tableColumnSixNo"
      :query-left-fun="querySixNumListFun"
      :query-right-fun="querySixNumPartsRelationFun"
      :save-right-fun="saveSixNumPartsRelationFun"
      :right-data-filter-keys="['categoryCode', 'categoryName']"
      left-disabled-prop="isUse"
      edit-permission-key="BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_SIX_NUM_MODIFY"
    />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import { theDetailBase, tableTransfer } from './components'
import pageHeader from '@/components/pageHeader'
import {
  DETAIL_PARTS_GROUP_COLUMNS,
  DETAIL_PARTS_SIX_NO_COLUMNS
} from './components/data'
import {
  fetchMaterialGroupRelation,
  saveMaterialGroupRelation,
  fetchSixNumPartsRelation,
  saveSixNumPartsRelation,
  queryCategoryVo4MtzMaterialGroup,
  querySixNumPart4MtzMaterialGroup
} from '@/api/materiel/mtzMaterielGroup'
export default {
  name: 'mtzMaterielGroupDetail',
  components: { iPage, theDetailBase, pageHeader, tableTransfer },
  data() {
    return {
      tableColumnGroup: DETAIL_PARTS_GROUP_COLUMNS,
      tableColumnSixNo: DETAIL_PARTS_SIX_NO_COLUMNS
    }
  },
  methods: {
    // 查询零件材料组
    queryMaterielGroupFun(params) {
      return queryCategoryVo4MtzMaterialGroup({
        ...params,
        keyWordNeedDeptFlag: true
      })
    },
    // 查询零件材料组已关联列表
    queryMaterielGroupRelationFun(key) {
      if (this.$route.query.code) {
        const params = {
          mtzMaterialGroupCode: this.$route.query.code,
          keyWord: key
        }
        return fetchMaterialGroupRelation(params)
      }
    },
    // 保存零件材料组已关联列表
    saveMaterielGroupRelationFun(data) {
      const requestData = {
        categoryCodes: data.map((e) => e.categoryCode),
        materialGroupCode: this.$route.query.code
      }
      return saveMaterialGroupRelation(requestData)
    },
    // 查询零件材料组
    querySixNumListFun(params) {
      return querySixNumPart4MtzMaterialGroup({
        ...params,
        keyWordNeedDeptFlag: true
      })
    },
    // 查询六位号已关联列表
    querySixNumPartsRelationFun(key) {
      if (this.$route.query.code) {
        const params = {
          mtzMaterialGroupCode: this.$route.query.code,
          keyWord: key
        }
        return fetchSixNumPartsRelation(params)
      }
    },
    // 保存六位号已关联列表
    saveSixNumPartsRelationFun(data) {
      const requestData = {
        materialGroupCode: this.$route.query.code,
        sixPartCodes: data.map((e) => e.sixPartCode)
      }
      return saveSixNumPartsRelation(requestData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
