<template>
  <div>
    <iEditForm>
      <ul class="button-list">
        <li class="button-item">
          <iButton @click="handleAdd">新增</iButton>
        </li>
        <li class="button-item">
          <iButton
            @click="handleDelete"
            :disabled="selectedRow.length > 0 ? false : true"
            >删除</iButton
          >
        </li>
        <li class="button-item">
          <iButton @click="cancel">{{ $t("取消") }}</iButton>
        </li>
        <li class="button-item">
          <iButton @click="handleSubmit('ruleForm')">{{ $t("保存") }}</iButton>
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        class="form meeting-info"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        :rules="baseRule"
      >
        <iTableML
          tooltip-effect="light"
          :data="ruleForm.meetingInfo"
          @selectionChange="handleChoose"
          class="margin-bottom20"
        >
          <el-table-column
            type="selection"
            min-width="50"
            align="center"
          ></el-table-column>
          <el-table-column
            align="center"
            label="会议类型"
            :render-header="renderHeader"
          >
            <template slot-scope="scope">
              <iFormItem
                :prop="'meetingInfo.' + scope.$index + '.meetingTypeId'"
                :hideRequiredAsterisk="true"
                :rules="baseSelect"
              >
                <iSelect
                  v-model="scope.row.meetingTypeId"
                  :placeholder="$t('请选择会议类型')"
                  value-key="id"
                  @change="hanldeChange"
                  @visible-change="
                    (e) => {
                      handleOptionChange(e);
                    }
                  "
                >
                  <el-option
                    v-for="item of meetingTypeListCopy"
                    :value="item"
                    :label="item.name"
                    :key="item.id"
                  ></el-option>
                </iSelect>
              </iFormItem> </template
          ></el-table-column>
          <el-table-column
            align="center"
            label="部门"
            :render-header="renderHeader"
          >
            <template slot-scope="scope">
              <iFormItem
                :prop="'meetingInfo.' + scope.$index + '.dept'"
                :hideRequiredAsterisk="true"
                :rules="baseRule"
              >
                <iInput v-model="scope.row.dept" />
              </iFormItem>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="办公室"
            :render-header="renderHeader"
          >
            <template slot-scope="scope">
              <iFormItem
                :prop="'meetingInfo.' + scope.$index + '.office'"
                :rules="baseRule"
                :hideRequiredAsterisk="true"
              >
                <iInput v-model="scope.row.office" />
              </iFormItem>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="电话"
            :render-header="renderHeader"
          >
            <template slot-scope="scope">
              <iFormItem
                :prop="'meetingInfo.' + scope.$index + '.phone'"
                :rules="rulePhone"
                :hideRequiredAsterisk="true"
              >
                <iInput v-model="scope.row.phone" />
              </iFormItem>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="邮件"
            :render-header="renderHeader"
          >
            <template slot-scope="scope">
              <iFormItem
                :prop="'meetingInfo.' + scope.$index + '.email'"
                :rules="ruleEmail"
                :hideRequiredAsterisk="true"
              >
                <iInput v-model="scope.row.email" />
              </iFormItem>
            </template>
          </el-table-column>
        </iTableML>
      </el-form>
    </iEditForm>
  </div>
</template>

<script>
import {
  getMeetingContact,
  updateMeetingContact,
  saveMeetingContact,
  deleteMeetingContact,
} from "@/api/meeting/information";
import { iFormItem, iButton, iInput, iSelect } from "rise";
import iEditForm from "@/components/iEditForm";
import iTableML from "@/components/iTableML";
import { getMettingType } from "@/api/meeting/type";
export default {
  components: { iEditForm, iFormItem, iButton, iTableML, iInput, iSelect },
  data() {
    const validatePhone = (rule, value, callback) => {
      var reg = /(^[0-9-]{1,})/;
      if (value.trim() === "") {
        callback(new Error("必填"));
      } else {
        if (!reg.test(value)) {
          callback(new Error("电话格式不正确"));
        } else {
          callback();
        }
      }
    };
    const validateEmail = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
      if (value.trim() === "") {
        callback(new Error("必填"));
      } else {
        if (!reg.test(value)) {
          callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      }
    };
    const validateBase = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("必填"));
      } else {
        callback();
      }
    };
    return {
      originRes: [],
      meetingTypeList: [],
      meetingTypeListCopy: [],
      ruleForm: {
        meetingInfo: [],
      },
      selectedRow: [],
      baseRule: [{ validator: validateBase, trigger: "blur" }],
      rulePhone: [{ validator: validatePhone, trigger: "blur" }],
      ruleEmail: [{ validator: validateEmail, trigger: "blur" }],
      baseSelect: [{ required: true, message: "必选", trigger: "change" }],
    };
  },
  mounted() {
    this.getAllSelectList().then(() => {
      this.query().then(() => {
        this.meetingTypeListCopy = [...this.meetingTypeList];
      });
    });
  },
  methods: {
    handleOptionChange(bol) {
      if (bol) {
        this.hanldeChange();
      } else {
        this.meetingTypeListCopy = [...this.meetingTypeList];
      }
    },
    hanldeChange() {
      this.meetingTypeListCopy = this.meetingTypeList.filter((item) => {
        return !this.ruleForm.meetingInfo.some((it) => {
          return it.meetingTypeId ? it.meetingTypeId.id === item.id : false;
        });
      });
    },
    // 获取会议类型列表
    async getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
        isCurrentUser: true,
      };
      const res = await getMettingType(param);
      this.meetingTypeList = res.data;
    },
    handleChoose(e) {
      this.selectedRow = e;
    },
    handleAdd() {
      this.ruleForm.meetingInfo.push({
        uniqueId: "a" + Math.random() + Math.random(),
        meetingTypeId: "",
        dept: "",
        office: "",
        phone: "",
        email: "",
      });
    },
    handleDelete() {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.ruleForm.meetingInfo = this.ruleForm.meetingInfo.filter((item) => {
          return !this.selectedRow.some((it) => {
            return it.uniqueId === item.uniqueId;
          });
        });
        let shouldDelete = this.originRes.filter((item) => {
          return this.selectedRow.some((it) => {
            return Number(item.id) === Number(it.id);
          });
        });
        if (shouldDelete && shouldDelete.length > 0) {
          let promiseArr = [];
          shouldDelete.forEach((item) => {
            promiseArr.push(
              new Promise((resolve) => {
                deleteMeetingContact(item).then((data) => {
                  resolve(data);
                });
              })
            );
          });
          Promise.all(promiseArr).then((res) => {
            this.$message.success(res && res[0] && res[0].message);
          });
        }
      });
    },
    renderHeader(h, { column }) {
      return h("div", {
        attrs: {
          class: "cell-header",
        },
        domProps: {
          innerHTML: column.label + '<span class="red">*</span>',
        },
      });
    },
    async query() {
      await new Promise((resolve, reject) => {
        getMeetingContact()
          .then((res) => {
            if (res.length == 0) {
              resolve();
              return;
            } else {
              this.ruleForm.meetingInfo = [...res].map((it) => {
                return {
                  ...it,
                  meetingTypeId: this.meetingTypeList.find((item) => {
                    return Number(it.meetingTypeId) === Number(item.id);
                  }),
                  uniqueId: "a" + Math.random() + Math.random(),
                };
              });
              this.originRes = [...res];
            }
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
            this.$message.error("获取失败！");
          });
      });
    },
    cancel() {
      this.query();
    },
    async saveOrUpdate() {
      let promiseArr = [];
      // let shouldDelete = this.originRes
      //   .filter((item) => {
      //     return !this.ruleForm.meetingInfo.some((it) => {
      //       return Number(item.id) === Number(it.id);
      //     });
      //   })
      //   .map((item) => {
      //     return {
      //       ...item,
      //       shouldDelete: true,
      //     };
      //   });
      let dataArr = this.ruleForm.meetingInfo.map((item) => {
        return {
          ...item,
          meetingTypeId: item.meetingTypeId.id,
        };
      });

      [...dataArr].forEach((item) => {
        promiseArr.push(
          new Promise((resolve) => {
            if (item.id) {
              updateMeetingContact({ ...item })
                .then((data) => {
                  resolve(data);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              saveMeetingContact({ ...item })
                .then((data) => {
                  resolve(data);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
        );
      });
      return Promise.all(promiseArr).then((data) => {
        this.ruleForm.meetingInfo = [...data].map((item) => {
          return {
            ...item,
            uniqueId: "a" + Math.random() + Math.random(),
          };
        });
        this.$message.success("保存成功！");
      });
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveOrUpdate().then(() => {
            this.query();
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item__error {
  transform: translateY(-2px);
}
::v-deep .cell {
  overflow: initial !important;
}
::v-deep .meeting-info {
  .el-form-item {
    margin-bottom: 0;
  }
}
.button-list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 55px;
  margin-bottom: 8px;
  .button-item {
    margin-left: 20px;
  }
}
::v-deep .cell-header {
  .red {
    color: #e30d0d;
    margin-left: 4px;
  }
}
.form {
  display: flex;
  justify-content: space-between;
  width: 1660px;
  // position: absolute;
  .form-row {
    margin: 20px 15px 0 10px;
    .center {
      font-weight: bold;
      display: inline-block;
      /* margin-left: 20px; */
    }
    .box-center {
      width: 24.25rem;
      height: 35px;
      line-height: 35px;
      border-radius: 4px;
      box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
      border: 1px;
      /* text-align: center; */
      padding-left: 20px;
    }
  }
}

.operation-btn {
  float: right;
  display: flex;
  margin-bottom: 22px;
  text-align: right;
}
</style>
