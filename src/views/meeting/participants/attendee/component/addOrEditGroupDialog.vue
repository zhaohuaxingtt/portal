<template>
  <iDialog
    :title="editOrAdd === 'add' ? $t('MT_CHUANGJIANYUHUIRENFENZU') : $t('MT_XIUGAIYUHUIRENFENZU')"
    :visible.sync="openDialog"
    width="39rem"
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
        <iFormItem label="组名" class="name" prop="groupName">
          <iLabel :label="$t('MT_ZUMING')" slot="label" required></iLabel>
          <div class="form-row">
            <iInput v-model="ruleForm.groupName"></iInput>
          </div>
        </iFormItem>

        <iFormItem label="与会人" class="attendee" prop="attendeeName">
          <iLabel :label="$t('MT_YUHUIREN')" slot="label" required></iLabel>
          <div class="form-row">
            <iInput
              type="textarea"
              :rows="3"
              v-model="ruleForm.attendeeName"
            ></iInput>
          </div>
        </iFormItem>

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
import { saveGroup, updateGroup, getMettingType } from "@/api/meeting/type";
import { baseRules } from "./data";
export default {
  components: {
    iDialog,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm,
    iSelect,
  },
  props: {
    loading: { type: Boolean, default: false },
    openDialog: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    editOrAdd: {
      type: String,
      default: () => {
        return "add";
      },
    },
    clickScope: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      meetingTypeList: [],
      rules: baseRules,
      ruleForm: {
        groupName: "",
        attendeeName: "",
        meetingType: "",
      },
    };
  },
  mounted() {
    if (this.editOrAdd === "edit") {
      this.getAllSelectList().then(() => {
        const meetingType = this.meetingTypeList.find(
          (item) => Number(item.id) === Number(this.clickScope.meetingTypeId)
        );
        this.ruleForm = {
          ...this.clickScope,
          meetingType,
        };
      });
    } else {
      this.getAllSelectList();
    }
  },
  methods: {
    async getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
        isCurrentUser: true,
      };
      const res = await getMettingType(param);
      this.meetingTypeList = res.data;
      console.log(this.meetingTypeList);
    },
    close() {
      this.$emit("closeDialog", false);
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = {
            ...this.ruleForm,
            meetingTypeId: this.ruleForm.meetingType.id,
          };
          if (this.editOrAdd === "edit") {
            updateGroup(formData)
              .then((data) => {
                if (data) {
                  this.close();
                  this.$message.success(this.$t("保存成功！"));
                  this.$emit("flushTable");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            saveGroup(formData)
              .then((data) => {
                if (data) {
                  this.close();
                  this.$message.success(this.$t("创建成功！"));
                  this.$emit("flushTable");
                } else {
                  // this.$message.error(data.message);
                  this.$emit("flushTable");
                }
              })
              .catch((err) => {
                // this.$message.error("创建失败！");
                console.log(err);
              });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
