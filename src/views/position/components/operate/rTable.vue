<template>
  <div class="r-table">
    <div class="flex-end-center margin-bottom20">
      <iButton
        @click="handleAdd"
        v-if="type !== 'detail'"
        :disabled="roleInDel && roleInDel.length"
        >{{language('增加角色')}}</iButton
      >
      <iButton
        @click="del"
        v-if="type !== 'detail'"
        :disabled="roleInDel && !roleInDel.length"
        class="margin-right20"
        >{{language('删除角色')}}</iButton
      >
    </div>
    <iTableCustom
      v-if="this.$route.query.editable == 1"
      :loading="tableLoading"
      :data="roles"
      :columns="tableSetting[type]"
      @handle-selection-change="handleSelectionChange"
      @go-detail="handleGoDetail"
      ref="roleTable"
    />
    <iTableCustom
      v-if="this.$route.query.editable == 2"
      :loading="tableLoading"
      :data="roles"
      :columns="tableSettingNotEmit[type]"
      @handle-selection-change="handleSelectionChange"
    />
    <!-- <role-modal
      :show="dialogRoleVisible"
      @update-show="handleUpdateShow"
    ></role-modal> -->
    <i-selector-dialog
      :show.sync="dialogRoleVisible"
      @change="handleCallback"
      v-model="roles"
      :tableSetting="selectorTableSetting"
      :filter="selectorQuery"
      :title="'角色选择'"
      :search-method="handleSearch"
      :tag-label="'fullNameZh'"
    ></i-selector-dialog>
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import iSelectorDialog from '@/components/iSelector/iSelectorDialog.vue'
import { pageMixins } from '@/utils/pageMixins'
import { iButton } from 'rise'
import { fetchRoles } from '@/api/role'
export default {
  components: { iTableCustom, iButton, iSelectorDialog },
  mixins: [pageMixins],
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      dialogRoleVisible: false,
      selectorQuery: [
        {
          value: 'code',
          label: this.language('角色代码'),
          type: 'input',
          initVal: ''
        },
        {
          value: 'fullNameZh',
          label: this.language('角色名称'),
          type: 'input',
          initVal: ''
        }
        // {
        //   value: 'selectValue',
        //   label: '测试',
        //   type: 'select',
        //   initVal: '',
        //   options: [
        //     { label: '1111', value: '1' },
        //     { label: '2222', value: '2' }
        //   ]
        // }
      ],
      selectorTableSetting: [
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
            return <span class="open-link-text">{scope.row.code}</span>
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
      ],
      tableSettingNotEmit:{
        detail: [
          {
            type: 'index',
            label: '序号',
            width: 80
          },
          {
            prop: 'fullNameEn',
            label: '角色代码',
            align: 'center',
            tooltip: false,
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
        ],
        edit: [
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
          },
          {
            prop: 'fullNameZh',
            label: '角色名称',
            align: 'center',
            tooltip: false
          },
          {
            prop: 'desciption',
            label: '角色描述',
            align: 'center',
            tooltip: false
          }
        ],
        add: [
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
          },
          {
            prop: 'fullNameZh',
            label: '角色名称',
            align: 'center',
            tooltip: false
          },
          {
            prop: 'desciption',
            label: '角色描述',
            align: 'center',
            tooltip: false
          }
        ]
      },
      tableSetting: {
        detail: [
          {
            type: 'index',
            label: '序号',
            width: 80
          },
          {
            prop: 'roleCode',
            label: '角色代码',
            i18n:'角色代码',
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
            i18n:'角色名称',
            align: 'center',
            tooltip: false
          },
          {
            prop: 'description',
            label: '角色描述',
            i18n:'角色描述',
            align: 'center',
            tooltip: false
          }
        ],
        edit: [
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
            i18n:'角色代码',
            align: 'center',
            tooltip: false,
            emit: 'go-detail',
            customRender: (h, scope) => {
              return <span class="open-link-text">{scope.row.code}</span>
            }
          },
          {
            prop: 'fullNameZh',
            label: '角色名称',
            i18n:'角色名称',
            align: 'center',
            tooltip: false
          },
          {
            prop: 'desciption',
            label: '角色描述',
            i18n:'角色描述',
            align: 'center',
            tooltip: false
          }
        ],
        add: [
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
            i18n:'角色代码',
            align: 'center',
            tooltip: false,
            emit: 'go-detail',
            customRender: (h, scope) => {
              return <span class="open-link-text">{scope.row.code}</span>
            }
          },
          {
            prop: 'fullNameZh',
            label: '角色名称',
            i18n:'角色名称',
            align: 'center',
            tooltip: false
          },
          {
            prop: 'desciption',
            label: '角色描述',
            i18n:'角色描述',
            align: 'center',
            tooltip: false
          }
        ]
      },
      tabelLoading: false
    }
  },
  computed: {
    roles() {
      return this.$store.state.position.pos.positionDetail.roleDTOList || []
    },
    roleInDel() {
      return this.$store.state.position.pos.roleDeling
    }
  },
  methods: {
    async handleSearch(val) {
      const res = await fetchRoles(val)
      return res
    },
    handleCallback(val) {
      console.log(val)
      this.$store.commit('SET_ROLE_SELECTED', val)
      this.$store.commit('SET_POSITION_DETAIL_ROLE')
    },
    handleGoDetail(val) {
      this.$router.push({ path: `/role/view/${val.id}` })
    },
    handleSelectionChange(val) {
      this.$store.commit('SET_ROLE_DEL', val)
    },
    handleAdd() {
      this.dialogRoleVisible = true
    },
    del() {
      this.$store.commit('DEL_ROLE')
      this.$refs.roleTable.clearSelection()
    },
    handleUpdateShow() {
      this.dialogRoleVisible = false
    }
  }
}
</script>
