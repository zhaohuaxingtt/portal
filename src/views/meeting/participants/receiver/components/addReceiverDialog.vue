<template>
  <iDialog
    :title="$t('MT_TIANJIASHOUJIANREN')"
    :visible.sync="openDialog"
    width="54.875rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
      >
        <div class="row">
          <iFormItem label="组名" class="name" prop="groupName">
            <iLabel :label="$t('MT_ZUMING')" slot="label" required></iLabel>
            <div class="form-row">
              <iInput v-model="ruleForm.groupName"></iInput>
            </div>
          </iFormItem>
          <iFormItem label="会议类型" class="name" prop="meetingType">
            <iLabel
              :label="$t('MT_HUIYILEIXING')"
              slot="label"
              required
            ></iLabel>
            <iSelect
              v-model="ruleForm.meetingType"
              :placeholder="$t('MT_QINGXUANZE')"
              value-key="id"
            >
              <el-option
                v-for="item in meetingTypeList"
                :key="item.id"
                :label="item.name"
                :value="item"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </div>
        <!-- <iFormItem label="收件人" class="receiver" prop="receiver"> -->
        <!-- <iLabel :label="$t('收件人')" slot="label"></iLabel>
          <iButton @click="$emit('addReceiverData')" class="add-receiver"
            >添加收件人</iButton
          > -->
        <div class="receiverLine">
          <div class="receiver">{{ $t('MT_SHOUJIANREN') }}</div>
          <iButton
            @click="$emit('addOrganizeData', 'add')"
            class="add-organize"
            >{{ $t('MT_TIANJIAZUZHI') }}</iButton
          >
          <iButton
            @click="$emit('addReceiverData', 'add')"
            class="add-receiver"
            >{{ $t('MT_TIANJIASHOUJIANREN') }}</iButton
          >
        </div>
        <i-table-custom
          @removeReceiverDataList="removeReceiverDataList"
          :data="selectedFilterData"
          :columns="receiverTableColumns"
          :tableLoading="!tableLoading"
        />

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
          :prev-text="$t('MT_SHANGYIYE')"
          :next-text="$t('MT_XIAYIYE')"
        >
        </el-pagination>
        <!--  </iFormItem> -->

        <div class="button-list">
          <el-form-item>
            <iButton @click="close" plain class="cancel">{{
              $t('MT_GUANBI')
            }}</iButton>
            <iButton @click="handleSubmit('ruleForm')" plain>{{
              $t('MT_BAOCUN')
            }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iFormItem, iLabel, iButton, iSelect } from 'rise'
import iEditForm from '@/components/iEditForm'
import { saveReceiver, getMettingType } from '@/api/meeting/type'
// import { baseRules } from './data'
import iTableCustom from '@/components/iTableCustom'
export default {
  components: {
    iDialog,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm,
    iTableCustom,
    iSelect
  },
  props: {
    loading: { type: Boolean, default: false },
    openDialog: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    editOrAdd: {
      type: String,
      default: () => {
        return 'add'
      }
    },
    clickScope: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectedTableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      meetingTypeList: [],
      receiverTableColumns: [
        {
          type: 'index',
          label: '#',
          i18n: '#',
          width: 68,
          tooltip: false
        },
        {
          // prop: "nameZh",
          label: '类型',
          i18n: 'MT_LEIXING',
          // width: 70,
          align: 'left',
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              'div',
              {
                style: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }
              },
              scope.row.isDept ? this.$t('组织') : this.$t('员工')
            )
          }
        },
        {
          // prop: "nameZh",
          label: '名称',
          i18n: 'MT_MINGCHENG',
          // width: 70,
          align: 'left',
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              'div',
              {
                style: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }
              },
              scope.row.nameZh ? scope.row.nameZh : ''
            )
          }
        },
        {
          // prop: "email",
          label: '电子邮箱',
          i18n: 'MT_DIANZIYOUXIANG',
          align: 'left',
          width: 200,
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              'div',
              {
                style: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }
              },
              scope.row.email ? scope.row.email : ''
            )
          }
        },
        {
          // prop: "userNum",
          label: '工号',
          i18n: 'MT_GONGHAO',
          width: 90,
          align: 'left',
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              'div',
              {
                style: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }
              },
              scope.row.userNum ? scope.row.userNum : ''
            )
          }
        },
        {
          // prop: "deptList",
          label: '所属部门',
          i18n: 'MT_SUOSHUBUMEN',
          align: 'left',
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              'div',
              {
                style: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }
              },
              scope.row.deptList ? scope.row.deptList : ''
            )
          }
        },
        {
          label: '操作',
          i18n: 'MT_CAOZUO2',
          width: 80,
          customRender: (h, scope) => {
            return h('span', [
              h(
                'a',
                {
                  class: 'open-link-text',
                  style: {
                    cursor: 'pointer',
                    color: '#67C23A'
                  },
                  on: {
                    click: () => {
                      this.removeReceiverDataList(scope.row)
                    }
                  }
                },
                this.$t('MT_YICHU')
              )
            ])
          }
        }
      ],
      rules: {
        groupName: [
          { required: true, message: this.$t('MT_BITIAN'), trigger: 'blur' },
          {
            min: 1,
            max: 64,
            message: this.$t('MT_ZUIDACHANGDU64ZIFU'),
            trigger: 'blur'
          }
        ],
        meetingType: [
          { required: true, message: this.$t('MT_BIXUAN'), trigger: 'change' }
        ]
      },
      ruleForm: {
        groupName: '',
        meetingType: ''
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentPageData: [],
      selectedFilterData: []
    }
  },
  watch: {
    selectedTableData(val) {
      // console.log("val", val);
      this.total = this.currentPageData.length
      if (this.total === 0) {
        this.currentPageData = val
        this.selectedFilterData = val
        return
      }
      let selectList = []
      this.currentPageData.forEach((item) => {
        selectList.push(item.id)
      })
      for (let i = 0; i < val.length; i++) {
        if (!selectList.includes(val[i].id)) {
          this.currentPageData.push(val[i])
          this.total = this.currentPageData.length
        }
      }
      this.currentChangePage(this.currentPageData, this.currentPage)
    }
  },
  mounted() {
    // if (this.editOrAdd === "edit") {
    //   this.getAllSelectList().then(() => {
    //     this.ruleForm = {
    //       ...this.clickScope,
    //       meetingType: this.meetingTypeList.find(
    //         (item) => Number(item.id) === Number(this.clickScope.meetingTypeId)
    //       ),
    //     };
    //   });
    // } else {
    //   this.getAllSelectList();
    // }
    this.getAllSelectList()
  },
  methods: {
    async getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
        isCurrentUser: true
      }
      const res = await getMettingType(param)
      this.meetingTypeList = res.data
      this.tableLoading = true
    },
    removeReceiverDataList(scope) {
      for (let i = 0; i < this.selectedFilterData.length; i++) {
        if (this.selectedFilterData[i].id == scope.id) {
          this.selectedFilterData.splice(i, 1)
        }
      }
      for (let j = 0; j < this.currentPageData.length; j++) {
        if (this.currentPageData[j].id == scope.id) {
          this.currentPageData.splice(j, 1)
        }
      }
    },
    handleCurrentChange: function (currentPage) {
      // 页码切换
      this.currentPage = currentPage
      this.currentChangePage(this.currentPageData, this.currentPage)
    },
    // 分页方法
    currentChangePage(currentPageData, currentPage) {
      let from = (currentPage - 1) * this.pageSize
      let to = currentPage * this.pageSize
      this.selectedFilterData = currentPageData.slice(from, to)
    },
    close() {
      this.$emit('closeDialog', false, 'add')
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = {
            ...this.ruleForm,
            meetingTypeId: this.ruleForm.meetingType.id
          }
          let res = this.currentPageData.map((item) => {
            return {
              department: item.deptList,
              email: item.email,
              jobNumber: item.userNum,
              id: item.id,
              name: item.userName,
              isDept: item.isDept
            }
          })
          formData.employeeDTOS = res
          saveReceiver(formData)
            .then((data) => {
              if (data) {
                this.close()
                this.$message.success(this.$t('MT_CHUANGJIANCHENGGONG'))
                this.$emit('flushTable')
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  .name {
    flex: 1;
  }
  .name + .name {
    margin-left: 20px;
  }
}
.button-list {
  display: flex;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  .el-form-item {
    margin-bottom: 15px;
    .el-button {
      height: 35px;
      width: 100px;
    }
    .cancel {
      margin-left: 20px;
    }
  }
}
.receiverLine {
  margin-top: 35px;
  display: flex;
  justify-content: flex-end;
  .receiver {
    position: absolute;
    left: 40px;
    height: 35px;
    line-height: 16px;
    font-size: 14px;
    color: rgb(0, 0, 0);
    display: flex;
    align-items: center;
    font-family: Arial;
    text-align: center;
  }
  .add-receiver {
    // float: right;
    height: 35px;
    width: 120px;
    margin-bottom: 15px;
  }
  .add-organize {
    height: 35px;
  }
}
::v-deep .el-pagination .btn-prev {
  width: 85px;
  height: 35px;
  margin-right: 3px;
  border-radius: 3px;
  padding-left: 10px;
  box-shadow: 0 0 3px rgb(0 38 98 / 0.2);
}
::v-deep .el-pagination .btn-next {
  width: 85px;
  height: 35px;
  margin-left: 3px;
  border-radius: 3px;
  padding-right: 10px;
  box-shadow: 0 0 3px rgb(0 38 98 / 0.2);
}
</style>
