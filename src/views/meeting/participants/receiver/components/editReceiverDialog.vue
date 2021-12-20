<template>
  <iDialog
   :title="$t('MT_XIUGAISHOUJIANREN')"
    :visible.sync="openEditDialog"
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
            <iLabel :label="$t('MT_HUIYILEIXING')" slot="label" required></iLabel>
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
        <div class="receiverLine">
          <div class="receiver">{{$t('MT_SHOUJIANREN')}}</div>
          <iInput
            suffix-icon="el-icon-search"
            v-model="search"
            @change="change"
            class="search"
          >
          </iInput>
          <iButton @click="$emit('addReceiverData')" class="add-receiver"
            >{{$t('MT_TIANJIASHOUJIANREN')}}</iButton
          >
        </div>
        <i-table-custom
          @removeReceiverDataList="removeReceiverDataList"
          :data="editReceiverData"
          :columns="getReceiverTableColumns"
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

        <div class="button-list">
          <el-form-item>
            <iButton @click="close" plain class="cancel">{{
              $t("MT_GUANBI")
            }}</iButton>
            <iButton @click="handleSubmit('ruleForm')" plain>{{
              $t("MT_BAOCUN")
            }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>
<script>
import { iDialog, iInput, iFormItem, iLabel, iButton, iSelect } from "rise";
import iEditForm from "@/components/iEditForm";
import {
  updateReceiver,
  getReceiverById,
  getMettingType,
} from "@/api/meeting/type";
import { baseRules } from "./data";
import iTableCustom from "@/components/iTableCustom";
export default {
  components: {
    iDialog,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm,
    iTableCustom,
    iSelect,
  },
  props: {
    openEditDialog: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    clickScope: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selectedTableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      meetingTypeList: [],
      getReceiverTableColumns: [
        {
          type: "index",
          label: "序号",
          i18n: "序号",
          width: 68,
          tooltip: false,
        },
        {
          // prop: "nameZh",
          label: "姓名",
          i18n: "姓名",
          width: 70,
          align: "left",
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              "div",
              {
                style: {
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                },
              },
              scope.row.nameZh ? scope.row.nameZh : ""
            );
          },
        },
        {
          // prop: "email",
          label: "电子邮箱",
          i18n: "电子邮箱",
          width: 200,
          align: "left",
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              "div",
              {
                style: {
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                },
              },
              scope.row.email ? scope.row.email : ""
            );
          },
        },
        {
          // prop: "userNum",
          label: "工号",
          i18n: "工号",
          width: 90,
          align: "left",
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              "div",
              {
                style: {
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                },
              },
              scope.row.userNum ? scope.row.userNum : ""
            );
          },
        },
        {
          // prop: "deptList",
          label: "所属部门",
          i18n: "所属部门",
          align: "left",
          tooltip: true,
          customRender: (h, scope) => {
            return h(
              "div",
              {
                style: {
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                },
              },
              scope.row.deptList ? scope.row.deptList : ""
            );
          },
        },
        {
          label: "操作",
          width: 80,
          customRender: (h, scope) => {
            return h("span", [
              h(
                "a",
                {
                  style: {
                    cursor: "pointer",
                          color: "#1660f1",
                  },
                  class: "open-link-text",
                  on: {
                    click: () => {
                      this.removeReceiverDataList(scope.row);
                    },
                  },
                },
                "移除"
              ),
            ]);
          },
        },
      ],
      rules: baseRules,
      ruleForm: {
        groupName: "",
        meetingType: "",
      },
      // getReceiver: "",
      editReceiverData: "",
      search: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      // tableDataAll: [],
      selectList: [],
      nowReceiverData: [],
    };
  },
  mounted() {
    this.getAllSelectList().then(() => {
      this.ruleForm = {
        ...this.clickScope,
        meetingType: this.meetingTypeList.find(
          (item) => Number(item.id) === Number(this.clickScope.meetingTypeId)
        ),
      };
    });

    console.log(this.ruleForm);
    this.query();
  },
  watch: {
    selectedTableData(val) {
      // console.log("val", val);
      for (let i = 0; i < val.length; i++) {
        if (!this.selectList.includes(val[i].id)) {
          this.editReceiverData.push(val[i]);
          this.selectList.push(val[i].id);
          this.nowReceiverData = this.editReceiverData;
        }
      }
      return this.editReceiverData;
    },
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      // 页码切换
      this.currentPage = currentPage;
      this.currentChangePage(this.editReceiverData, this.currentPage);
    },
    async getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
        isCurrentUser: true,
      };
      const res = await getMettingType(param);
      this.meetingTypeList = res.data;
    },
    // 分页方法
    currentChangePage(editReceiverData, currentPage) {
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.editReceiverData = editReceiverData.slice(from, to);
    },
    change(val) {
      // let tableDataAll = JSON.parse(JSON.stringify(this.editReceiverData));
      //过滤方法
      if (val) {
        //不区分大小写处理
        let reg = new RegExp(val, "ig");
        //es6 filter过滤匹配，有则返回当前，无则返回所有
        return (this.editReceiverData = this.nowReceiverData.filter((item) => {
          // item.employeeNo = item.employeeNo + "";
          return (
            item.nameZh?.match(reg) ||
            item.email?.match(reg) ||
            item.userNum?.match(reg)
          );
        }));
      }
      // console.log(111);
      return (this.editReceiverData = this.nowReceiverData);
    },
    query() {
      const data = {
        id: this.clickScope.id,
      };
      getReceiverById(data)
        .then((res) => {
          const { employeeDTOS } = res;
          console.log(employeeDTOS);
          this.editReceiverData = employeeDTOS.map(
            ({ id, name, email, jobNumber, department }) => ({
              deptList: department,
              email,
              id: id,
              nameZh: name,
              userNum: jobNumber,
            })
          );
          this.nowReceiverData = this.editReceiverData;
          if (this.editReceiverData.length === 0) {
            return;
          }
          // 筛选已选择列表中的id
          // let selectList = [];
          // console.log("this.editReceiverData", this.editReceiverData);
          this.editReceiverData.forEach((item) => {
            this.selectList.push(item.id);
            // console.log("select------", this.selectList);
          });
          return this.editReceiverData;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    removeReceiverDataList(scope) {
      for (var i = 0; i < this.editReceiverData.length; i++) {
        if (this.editReceiverData[i].id == scope.id)
          this.editReceiverData.splice(i, 1);
      }
      for (var item = 0; item < this.selectList.length; item++) {
        // console.log("this.selectList", this.selectList);
        if (this.selectList[item] == scope.id) {
          this.selectList.splice(item, 1);
          // console.log(this.scope.id);
        }
      }
    },
    close() {
      this.$emit("closeEditDialog", false);
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = this.ruleForm;
          this.editReceiverData = [...this.editReceiverData];
          let res = this.editReceiverData.map(
            ({ employeeNo, name, dept, email, id }) => ({
              email,
              id: id,
              deptList: dept,
              nameZh: name,
              userNum: employeeNo,
            })
          );
          formData.employeeDTOS = res;
          updateReceiver(formData)
            .then((data) => {
              if (data) {
                this.close();
                this.$message.success("修改成功！");
                this.$emit("flushTable");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
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
.receiverLine {
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  .receiver {
    height: 35px;
    line-height: 16px;
    font-size: 14px;
    color: rgb(0, 0, 0);
    display: flex;
    align-items: center;
    font-family: Arial;
    text-align: center;
  }
  .search {
    width: 570px;
    margin-bottom: 15px;
  }
  .add-receiver {
    // top: 23px;
    // float: right;
    height: 35px;
    width: 120px;
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
/* ::v-deep .is-required {
  .flex-align-center {
    position: relative;
    .start {
      position: absolute;
      display: block;
      width: 10px;
      height: 10px;
      background: #e30d0d;
      border-radius: 5px;
      left: -20px;
      overflow: hidden;
    }
  }
} */
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
