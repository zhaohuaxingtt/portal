<template>
  <div class="role-modal">
    <i-dialog :title="language('角色选择')" :visible.sync="isShow" width="80%">
      <div class="flex">
        <i-select
          v-model="roleCheckedIds"
          multiple
          :placeholder='language("请选择")'
          class="margin-right15"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.fullNameZh"
            :value="item.id"
          >
            <div class="flex-center-center">
              <div style="width: 25%">{{ item.code }}</div>
              <div style="width: 50%">{{ language(item.fullNameZh) }}</div>
              <div style="width: 25%">{{ language(item.shortNameZh) }}</div>
            </div>
          </el-option>
        </i-select>
        <iButton @click="handleDialogConfirm">{{language('确认')}}</iButton>
      </div>
      <!-- <searchBox :query="query" /> -->
      <!-- <div class="flex-center-center">
        <iText class="margin-right15 margin-bottom20 flex">
          <el-tag type="info" class="tags" v-for="(item, index) in roleChecked" :key="index" >{{item.fullNameZh}}</el-tag>
        </iText>
        <iButton @click="handleDialogConfirm">确认</iButton>
      </div>
      <iTableCustom
        :ref="'multipleTable'"
        :loading="tableLoading"
        :data="roleList"
        :columns="tableSetting"
        @handle-selection-change="handleSelectionChange"
      >
      </iTableCustom> -->
    </i-dialog>
  </div>
</template>

<script>
import { iDialog, iButton, iSelect } from 'rise'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      value: [],
      tableLoading: false,
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
          label: '角色代码',
          align: 'center',
          tooltip: false,
          emit: 'go-detail',
          customRender: (h, scope) => {
            return <span class="open-link-text">{scope.row.fullNameEn}</span>
          }
        },
        {
          prop: 'fullNameZh',
          label: '角色名称',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'description',
          label: '角色描述',
          align: 'center',
          tooltip: false
        }
      ]
    }
  },
  computed: {
    query() {
      return this.$store.state.position.pos.roleQuery
    },
    roleList() {
      return this.$store.state.position.pos.roleList
    },
    roleCheckedIds: {
      get() {
        return this.$store.state.position.pos.roleSelectedIds || []
      },
      set(val) {
        this.$store.commit('SET_ROLEIDS_SELECTED', val)
      }
    },
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update-show', val)
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$store.commit('SET_ROLE_SELECTED', val)
    },
    handleDialogConfirm() {
      this.$store.commit('SET_ROLE_SELECTED')
      this.$store.commit('SET_POSITION_DETAIL_ROLE')
      this.isShow = false
    }
  }
}
</script>
