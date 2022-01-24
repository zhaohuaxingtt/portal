<template>
  <iPage>
    <pageHeader class="margin-bottom20">
      {{ language($route.query.id ? '编辑' : '新增')
      }}{{ language('模具材料组') }}
    </pageHeader>
    <theDetailBase />
    <div v-if="$route.query.id">
      <tableTransfer
        :title="language('零件材料组')"
        :sub-left-title="language('零件材料组列表')"
        :sub-right-title="language('已有关联列表')"
        :placeholder="language('请输入零件材料组编号/名称')"
        :left-null-select-tips="language('请选择源零件材料组')"
        :right-null-select-tips="language('请选择已关联零件材料组')"
        :table-columns="tableColumnGroup"
        :query-left-fun="queryLeftFun"
        :query-right-fun="queryRightFun"
        :save-right-fun="saveRightFun"
        :right-data-filter-keys="['categoryCode', 'categoryNameZh']"
        edit-permission-key="BUTTON_MATERIEL_DATA_MOULD_PARTS_MODIFY"
        left-disabled-prop="isUse"
      />
    </div>
  </iPage>
</template>

<script>
import { tableTransfer } from '@/views/mtzDataManage/mtzMaterielGroupInfor/components'
import { DETAIL_PARTS_GROUP_COLUMNS } from './components/data'
import { iPage } from 'rise'
import { theDetailBase } from './components'
import pageHeader from '@/components/pageHeader'
import { queryCategoryVo4MoldGroup } from '@/api/materiel/mould'
import {
  queryMouldRelationsByGroupByCode,
  saveMouldRelationByGroupId
} from '@/api/materiel/mould'
export default {
  name: 'theDetail',
  components: { theDetailBase, iPage, pageHeader, tableTransfer },
  data() {
    return {
      tableColumnGroup: DETAIL_PARTS_GROUP_COLUMNS
    }
  },
  methods: {
    queryLeftFun(params) {
      /* const requestData = {
        keyWord: key
      } */
      return queryCategoryVo4MoldGroup({ ...params, keyWordNeedDeptFlag: true })
    },
    queryRightFun(key) {
      if (this.$route.query.code) {
        let requestData = {
          modelCode: this.$route.query.code
        }
        if (key) {
          requestData = {
            ...requestData,
            keyWord: key
          }
        }
        return queryMouldRelationsByGroupByCode(requestData)
      }
    },
    saveRightFun(data) {
      const requestData = {
        categoryCodes: data.map((e) => e.categoryCode),
        moldGroupCode: this.$route.query.code
      }
      return saveMouldRelationByGroupId(requestData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
