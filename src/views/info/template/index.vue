<template>
  <iPage>
    <div class="template-page">
      <iCard>
        <btnBox :operations="operations" />
        <iTableCustom
          :ref="'templateTable'"
          :loading="tableLoading"
          :data="templateList"
          :columns="tableSetting"
        >
        </iTableCustom>
      </iCard>
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import iTableCustom from '@/components/iTableCustom'
import { btnBox } from './components'
export default {
  components: { iPage, iCard, iTableCustom, btnBox },
  mixins: [pageMixins],
  data() {
    return {
      tableLoading: false,
      operations: [
        {
          label: '新建模板',
          value: 'add'
        },
        {
          label: '编辑',
          value: 'edit'
        },
        {
          label: '删除',
          value: 'del'
        },
        {
          label: '导出',
          value: 'export'
        }
      ],
      tableSetting: [
        {
          type: 'selection'
        },
        {
          type: 'index',
          label: '序号',
          width: 80
        },
        {
          prop: 'code',
          label: '模板编码',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'name',
          label: '模板名称',
          tooltip: false,
          align: 'center',
          emit: 'go-detail',
          customRender: (h, scope) => {
            return <span class="open-link-text">{scope.row.name}</span>
          }
        },
        {
          prop: 'content',
          label: '模板内容',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'title',
          label: '模板标题',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'type',
          label: '模板类型',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'createdTime',
          label: '创建时间',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'updatedTime',
          label: '更新时间',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'count',
          label: '发布次数',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'lastUpdatedTime',
          label: '最后发布时间',
          align: 'center',
          tooltip: false
        }
      ]
    }
  },
  computed: {
    templateList() {
      return this.$store.state.infoTemplate.templateList || []
    }
  },
  mounted() {
    this.$store.dispatch('GetInfoTempList')
  }
}
</script>

<style lang="scss" scoped></style>
