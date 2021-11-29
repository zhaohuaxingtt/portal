<!--
 * @Date: 2021-11-29 14:47:24
 * @LastEditors: caopeng
 * @LastEditTime: 2021-11-29 15:28:52
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\userTable.vue
-->
<template>
  <iCard tabCard
         collapse>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language('JICHUXINXI', '基础信息')
      }}</span>
      <div class="floatright">
        <i-button v-if="edit"
                  @click="add">{{ language('XINZENG', '新增') }}
        </i-button>
        <i-button v-if="edit"
                  @click="remove">{{ language('SHANCHU', '删除') }}
        </i-button>
        <i-button v-if="edit"
                  @click="cancelBtn">{{ language('QUXIAO', '取消') }}
        </i-button>
        <i-button v-if="edit"
                  @click="save">{{ language('BAOCUN', '保存') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="editBtn">{{ language('BIANJI', '编辑') }}
        </i-button>
         <i-button v-if="!edit"
                  @click="editBtn">{{ language('DONGJIE', '冻结') }}
        </i-button>
         <i-button v-if="!edit"
                  @click="editBtn">{{ language('JIEDONG', '解冻') }}
        </i-button>
         <i-button v-if="!edit"
                  @click="editBtn">{{ language('TONGBULDAP', '同步LDAP') }}
        </i-button>
          <i-button v-if="!edit"
                  @click="editBtn">{{ language('JIHUO', '激活') }}
        </i-button>
          <i-button v-if="!edit"
                  @click="editBtn">{{ language('XUQI', '续期') }}
        </i-button>
          <i-button v-if="!edit"
                  @click="download">{{ language('XIAZAIMOBAN', '下载模板') }}
        </i-button>
          <i-button v-if="!edit"
                  @click="exportFile">{{ language('TONGBULDAP', '导出') }}
        </i-button>
      </div>
    </div>
    <table-list :tableData="tableListData"
                :tableTitle="edit?tableTitleEdit:tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :index="true"
                ref="commonTable">
      <template #position="scope">
        <iInput v-if="!scope.row.id"
                v-model="scope.row.position"
                :placeholder="language('QINGSHURU', '请输入')" />
        <p v-if="scope.row.id">{{ scope.row.position }}</p>
      </template>
    </table-list>
  </iCard>
</template>

<script>
import tableList from '@/components/commonTable'
import { tableTitle,tableTitleEdit } from './data'
import { iCard, iButton, iSelect, iInput } from 'rise'
export default {
  components: {
    iCard,
    iButton,
    iSelect,
    iInput,
    tableList
  },
  data() {
    return {
      edit: false,
      tableLoading: false,
      selectTableData: [],
      tableTitle: tableTitle,
      tableTitleEdit:tableTitleEdit,
      tableListData: [{ position: '111', id: '1' }]
    }
  },
  methods: {
    editBtn() {
      this.edit = true
    },
    cancelBtn() {
      this.edit = false
    },
    add() {
      this.tableListData.push({})
      this.editMode = true
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val
    }
  }
}
</script>

<style></style>
