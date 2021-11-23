<template>
  <div class="handel-top">
    <el-form
      class="form"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      :hideRequiredAsterisk="true"
      :validate-on-rule-change="false"
      :disabled="!handleSave"
    >
      <iCard style="margin-top: 1rem">
        <div class="item">
          <el-row :gutter="20">
            <el-col :span="20">
              <div class="form-item-row1-clo2">
                <iFormItem :label="language('NEWS_TTXWGLY', '头条新闻管理员')" prop="headlineAdmins">
                  <iLabel :label="language('NEWS_TTXWGLY', '头条新闻管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.headlineAdmins"
                    @visible-change="handleChange1"
                    filterable
                    multiple
                  >
                    <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
                    <el-option
                      v-for="item in moduleAdminList.headlineAdmins"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput v-else :value="headlineAdminsName"></iInput>
                </iFormItem>
                <iFormItem :label="language('NEWS_GYJXGLY', '供应简讯管理员')" prop="briefAdmins">
                  <iLabel :label="language('NEWS_GYJXGLY', '供应简讯管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.briefAdmins"
                    @visible-change="handleChange2"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in moduleAdminList.briefAdmins"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput v-else :value="briefAdminsName"></iInput>
                </iFormItem>
              </div>
              <div class="form-item-row1-clo2">
                <iFormItem
                  :label="language('NEWS_GYSXWGLY', '供应商新闻管理员')"
                  prop="supplierNewsAdmins"
                >
                  <iLabel :label="language('NEWS_GYSXWGLY', '供应商新闻管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.supplierNewsAdmins"
                    @visible-change="handleChange3"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in moduleAdminList.supplierNewsAdmins"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput v-else :value="supplierNewsAdminsName"></iInput>
                </iFormItem>
                <iFormItem :label="language('NEWS_YXZQGLY', '影像专区管理员')" prop="imageAdmin">
                  <iLabel :label="language('NEWS_YXZQGLY', '影像专区管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.imageAdmin"
                    @visible-change="handleChange4"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in moduleAdminList.imageAdmin"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput v-else :value="imageAdminName"></iInput>
                </iFormItem>
              </div>
              <div class="form-item-row1-clo2">
                <iFormItem
                  :label="language('NEWS_CGGGGLY', '采购公告管理员')"
                  prop="purchaseNoticeAdmins"
                >
                  <iLabel :label="language('NEWS_CGGGGLY', '采购公告管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.purchaseNoticeAdmins"
                    @visible-change="handleChange5"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in moduleAdminList.purchaseNoticeAdmins"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput v-else :value="purchaseNoticeAdminsName"></iInput>
                </iFormItem>
                <iFormItem
                  :label="language('NEWS_WLGGGLY', '物流公告管理员')"
                  prop="physicalDistributionNoticeAdmins"
                >
                  <iLabel :label="language('NEWS_WLGGGLY', '物流公告管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.physicalDistributionNoticeAdmins"
                    @visible-change="handleChange6"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in moduleAdminList.physicalDistributionNoticeAdmins"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput
                    v-else
                    :value="physicalDistributionNoticeAdminsName"
                  ></iInput>
                </iFormItem>
              </div>
              <div class="form-item-row1-clo2">
                <iFormItem
                  :label="language('NEWS_ZBGGGLY', '质保公告管理员')"
                  prop="qualityGuaranteeNoticeAdmins"
                >
                  <iLabel :label="language('NEWS_ZBGGGLY', '质保公告管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.qualityGuaranteeNoticeAdmins"
                    @visible-change="handleChange7"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in moduleAdminList.qualityGuaranteeNoticeAdmins"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput
                    v-else
                    :value="qualityGuaranteeNoticeAdminsName"
                  ></iInput>
                </iFormItem>
                <iFormItem
                  :label="language('NEWS_CGWJGLY', '采购问卷管理员')"
                  prop="purchaseSurveyAdmins"
                >
                  <iLabel :label="language('NEWS_CGWJGLY', '采购问卷管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.purchaseSurveyAdmins"
                    @visible-change="handleChange8"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in moduleAdminList.purchaseSurveyAdmins"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput v-else :value="purchaseSurveyAdminsName"></iInput>
                </iFormItem>
              </div>
              <div class="form-item-row1-clo2">
                <iFormItem
                  :label="language('NEWS_WLWJGLY', '物流问卷管理员')"
                  prop="physicalDistributionSurveyAdmins"
                >
                  <iLabel :label="language('NEWS_WLWJGLY', '物流问卷管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.physicalDistributionSurveyAdmins"
                    @visible-change="handleChange9"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in moduleAdminList.physicalDistributionSurveyAdmins"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput
                    v-else
                    :value="physicalDistributionSurveyAdminsName"
                  ></iInput>
                </iFormItem>
                <iFormItem
                  :label="language('NEWS_ZBWJGLY', '质保问卷管理员')"
                  prop="qualityGuaranteeSurveyAdmins"
                >
                  <iLabel :label="language('NEWS_ZBWJGLY', '质保问卷管理员')" slot="label"></iLabel>
                  <iSelect
                    v-if="handleSave"
                    v-model="ruleForm.qualityGuaranteeSurveyAdmins"
                    @visible-change="handleChange10"
                    filterable
                    multiple
                  >
                    <el-option
                      v-for="item in moduleAdminList.qualityGuaranteeSurveyAdmins"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.userId"
                    >
                    </el-option>
                  </iSelect>
                  <iInput
                    v-else
                    :value="qualityGuaranteeSurveyAdminsName"
                  ></iInput>
                </iFormItem>
              </div>
            </el-col>
            <el-col :span="4">
              <el-form>
                <div class="form-item-button">
                  <template v-if="handleSave">
                    <iButton @click="handleOK">{{language('NEWS_BAOCUN', '保存')}}</iButton>
                    <iButton @click="handleCancel">{{language('NEWS_QUXIAO', '取消')}}</iButton>
                  </template>
                  <template v-else>
                    <iButton @click="handleEdit">{{language('NEWS_BIANJI', '编辑')}}</iButton>
                  </template>
                </div>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </iCard>
    </el-form>
  </div>
</template>
<script>
import {
  iSelect,
  iFormItem,
  iCard,
  iButton,
  iLabel,
  iInput,
  // iPagination,
} from "rise";
import {
  findModuleAdminUserList,
  findModuleAdminList,
  saveModuleAdmin,
} from "@/api/news/news";

export default {
  components: {
    iSelect,
    iFormItem,
    iCard,
    iButton,
    iLabel,
    iInput,
  },
  data() {
    return {
      ruleForm: {
        headlineAdmins: [],
        briefAdmins: [],
        supplierNewsAdmins: [],
        imageAdmin: [],
        purchaseNoticeAdmins: [],
        physicalDistributionNoticeAdmins: [],
        qualityGuaranteeNoticeAdmins: [],
        purchaseSurveyAdmins: [],
        physicalDistributionSurveyAdmins: [],
        qualityGuaranteeSurveyAdmins: [],
      },
      headlineAdmins: [],
      rules: {},
      ModuleAdmin: [],
      handleSave: false,
      moduleAdminList: {
        headlineAdmins: [],
        briefAdmins: [],
        supplierNewsAdmins: [],
        imageAdmin: [],
        purchaseNoticeAdmins: [],
        physicalDistributionNoticeAdmins: [],
        qualityGuaranteeNoticeAdmins: [],
        purchaseSurveyAdmins: [],
        physicalDistributionSurveyAdmins: [],
        qualityGuaranteeSurveyAdmins: [],
      },
      headlineAdminsName: "",
      briefAdminsName: "",
      supplierNewsAdminsName: "",
      imageAdminName: "",
      purchaseNoticeAdminsName: "",
      physicalDistributionNoticeAdminsName: "",
      qualityGuaranteeNoticeAdminsName: "",
      purchaseSurveyAdminsName: "",
      physicalDistributionSurveyAdminsName: "",
      qualityGuaranteeSurveyAdminsName: "",
    };
  },
  created() {},
  mounted() {
    this.getTableList();
  },
  watch: {
    ruleForm: {
      // deep: true,
      // immediate:true,
      handler(val) {
        const {
          headlineAdmins,
          briefAdmins,
          supplierNewsAdmins,
          imageAdmin,
          purchaseNoticeAdmins,
          physicalDistributionNoticeAdmins,
          qualityGuaranteeNoticeAdmins,
          purchaseSurveyAdmins,
          physicalDistributionSurveyAdmins,
          qualityGuaranteeSurveyAdmins,
        } = val;
        this.headlineAdminsName = this.moduleAdminList.headlineAdmins
          .map((item) => {
            return headlineAdmins.includes(item.userId) ? item.userName : "";
          })
          .join(",");

        this.briefAdminsName = this.moduleAdminList.briefAdmins
          .map((item) => {
            return briefAdmins.includes(item.userId) ? item.userName : "";
          })
          .join(",");

        this.supplierNewsAdminsName = this.moduleAdminList.supplierNewsAdmins
          .map((item) => {
            return supplierNewsAdmins.includes(item.userId)
              ? item.userName
              : "";
          })
          .join(",");

        this.imageAdminName = this.moduleAdminList.imageAdmin
          .map((item) => {
            return imageAdmin.includes(item.userId) ? item.userName : "";
          })
          .join(",");

        this.purchaseNoticeAdminsName =
          this.moduleAdminList.purchaseNoticeAdmins
            .map((item) => {
              return purchaseNoticeAdmins.includes(item.userId)
                ? item.userName
                : "";
            })
            .join(",");

        this.physicalDistributionNoticeAdminsName =
          this.moduleAdminList.physicalDistributionNoticeAdmins
            .map((item) => {
              return physicalDistributionNoticeAdmins.includes(item.userId)
                ? item.userName
                : "";
            })
            .join(",");

        this.qualityGuaranteeNoticeAdminsName =
          this.moduleAdminList.qualityGuaranteeNoticeAdmins
            .map((item) => {
              return qualityGuaranteeNoticeAdmins.includes(item.userId)
                ? item.userName
                : "";
            })
            .join(",");

        this.purchaseSurveyAdminsName =
          this.moduleAdminList.purchaseSurveyAdmins
            .map((item) => {
              return purchaseSurveyAdmins.includes(item.userId)
                ? item.userName
                : "";
            })
            .join(",");

        this.physicalDistributionSurveyAdminsName =
          this.moduleAdminList.physicalDistributionSurveyAdmins
            .map((item) => {
              return physicalDistributionSurveyAdmins.includes(item.userId)
                ? item.userName
                : "";
            })
            .join(",");

        this.qualityGuaranteeSurveyAdminsName =
          this.moduleAdminList.qualityGuaranteeSurveyAdmins
            .map((item) => {
              return qualityGuaranteeSurveyAdmins.includes(item.userId)
                ? item.userName
                : "";
            })
            .join(",");
      },
    },
  },
  methods: {
    getTableList() {
      this.query();
    },
    handleCancel() {
      this.handleSave = false;
      this.getTableList();
      console.log(this.ruleForm.headlineAdmins);

      console.log(this.headlineAdminsName);
    },
    handleChange1(val) {
      if (val) {
        const moduleCode = { moduleCode: 0 };
        findModuleAdminUserList(moduleCode).then((res) => {
          console.log(this.moduleAdminList.headlineAdmins);
          if (this.moduleAdminList.headlineAdmins == null) {
            this.$set(this.moduleAdminList, "headlineAdmins", []);
          }
          this.moduleAdminList.headlineAdmins =
            this.moduleAdminList?.headlineAdmins?.concat(res);
          console.log(res);
          // this.moduleAdminList.headlineAdmins = [...res]
          let obj = {};
          this.moduleAdminList.headlineAdmins =
            this.moduleAdminList.headlineAdmins?.reduce(function (item, next) {
              obj[next.userId]
                ? ""
                : (obj[next.userId] = true && item.push(next));
              return item;
            }, []);
          console.log(this.moduleAdminList.headlineAdmins);
          // if (this.moduleAdminList.headlineAdmins == undefined) {
          //   this.moduleAdminList.headlineAdmins = [...res];
          // }
        });
      }
    },
    handleChange2(val) {
      if (val) {
        const moduleCode = { moduleCode: 1 };
        findModuleAdminUserList(moduleCode).then((res) => {
          if (this.moduleAdminList.briefAdmins == null) {
            this.$set(this.moduleAdminList, "briefAdmins", []);
          }
          console.log(this.moduleAdminList.briefAdmins);
          this.moduleAdminList.briefAdmins =
            this.moduleAdminList?.briefAdmins?.concat(res);
          // this.ruleForm.headlineAdmins.push()
          let obj = {};
          this.moduleAdminList.briefAdmins =
            this.moduleAdminList.briefAdmins?.reduce(function (item, next) {
              obj[next.userId]
                ? ""
                : (obj[next.userId] = true && item.push(next));
              return item;
            }, []);
          console.log(this.moduleAdminList.briefAdmins);
          // if (this.moduleAdminList.briefAdmins == undefined) {
          //   this.moduleAdminList.briefAdmins = [...res];
          // }
        });
      }
    },
    handleChange3(val) {
      if (val) {
        const moduleCode = { moduleCode: 2 };
        findModuleAdminUserList(moduleCode).then((res) => {
          if (this.moduleAdminList.supplierNewsAdmins == null) {
            this.$set(this.moduleAdminList, "supplierNewsAdmins", []);
          }
          this.moduleAdminList.supplierNewsAdmins =
            this.moduleAdminList.supplierNewsAdmins.concat(res);
          // this.ruleForm.headlineAdmins.push()
          let obj = {};
          this.moduleAdminList.supplierNewsAdmins =
            this.moduleAdminList.supplierNewsAdmins?.reduce(function (
              item,
              next
            ) {
              obj[next.userId]
                ? ""
                : (obj[next.userId] = true && item.push(next));
              return item;
            },
            []);
          console.log(this.moduleAdminList.supplierNewsAdmins);
          // if (this.moduleAdminList.supplierNewsAdmins == undefined) {
          //   this.moduleAdminList.supplierNewsAdmins = [...res];
          // }
        });
      }
    },
    handleChange4(val) {
      if (val) {
        const moduleCode = { moduleCode: 3 };
        findModuleAdminUserList(moduleCode).then((res) => {
          if (this.moduleAdminList.imageAdmin == null) {
            this.$set(this.moduleAdminList, "imageAdmin", []);
          }
          this.moduleAdminList.imageAdmin =
            this.moduleAdminList.imageAdmin.concat(res);
          // this.ruleForm.headlineAdmins.push()
          let obj = {};
          this.moduleAdminList.imageAdmin =
            this.moduleAdminList.imageAdmin?.reduce(function (item, next) {
              obj[next.userId]
                ? ""
                : (obj[next.userId] = true && item.push(next));
              return item;
            }, []);
          console.log(this.moduleAdminList.imageAdmin);
          // if (this.moduleAdminList.imageAdmin == undefined) {
          //   this.moduleAdminList.imageAdmin = [...res];
          // }
        });
      }
    },
    handleChange5(val) {
      if (val) {
        const moduleCode = { moduleCode: 4 };
        findModuleAdminUserList(moduleCode).then((res) => {
          if (this.moduleAdminList.purchaseNoticeAdmins == null) {
            this.$set(this.moduleAdminList, "purchaseNoticeAdmins", []);
          }
          this.moduleAdminList.purchaseNoticeAdmins =
            this.moduleAdminList.purchaseNoticeAdmins.concat(res);
          // this.ruleForm.headlineAdmins.push()
          let obj = {};
          this.moduleAdminList.purchaseNoticeAdmins =
            this.moduleAdminList.purchaseNoticeAdmins?.reduce(function (
              item,
              next
            ) {
              obj[next.userId]
                ? ""
                : (obj[next.userId] = true && item.push(next));
              return item;
            },
            []);
          console.log(this.moduleAdminList.purchaseNoticeAdmins);
          // if (this.moduleAdminList.purchaseNoticeAdmins == undefined) {
          //   this.moduleAdminList.purchaseNoticeAdmins = [...res];
          // }
        });
      }
    },
    handleChange6(val) {
      if (val) {
        const moduleCode = { moduleCode: 5 };
        findModuleAdminUserList(moduleCode).then((res) => {
          if (this.moduleAdminList.physicalDistributionNoticeAdmins == null) {
            this.$set(
              this.moduleAdminList,
              "physicalDistributionNoticeAdmins",
              []
            );
          }
          this.moduleAdminList.physicalDistributionNoticeAdmins =
            this.moduleAdminList.physicalDistributionNoticeAdmins.concat(res);
          // this.ruleForm.headlineAdmins.push()
          let obj = {};
          this.moduleAdminList.physicalDistributionNoticeAdmins =
            this.moduleAdminList.physicalDistributionNoticeAdmins?.reduce(
              function (item, next) {
                obj[next.userId]
                  ? ""
                  : (obj[next.userId] = true && item.push(next));
                return item;
              },
              []
            );
          console.log(this.moduleAdminList.physicalDistributionNoticeAdmins);
          // if (
          //   this.moduleAdminList.physicalDistributionNoticeAdmins == undefined
          // ) {
          //   this.moduleAdminList.physicalDistributionNoticeAdmins = [...res];
          // }
        });
      }
    },
    handleChange7(val) {
      if (val) {
        const moduleCode = { moduleCode: 6 };
        findModuleAdminUserList(moduleCode).then((res) => {
          if (this.moduleAdminList.qualityGuaranteeNoticeAdmins == null) {
            this.$set(this.moduleAdminList, "qualityGuaranteeNoticeAdmins", []);
          }
          this.moduleAdminList.qualityGuaranteeNoticeAdmins =
            this.moduleAdminList.qualityGuaranteeNoticeAdmins?.concat(res);
          // this.ruleForm.headlineAdmins.push()
          let obj = {};
          this.moduleAdminList.qualityGuaranteeNoticeAdmins =
            this.moduleAdminList.qualityGuaranteeNoticeAdmins.reduce(function (
              item,
              next
            ) {
              obj[next.userId]
                ? ""
                : (obj[next.userId] = true && item.push(next));
              return item;
            },
            []);
          console.log(this.moduleAdminList.qualityGuaranteeNoticeAdmins);
          // if (this.moduleAdminList.qualityGuaranteeNoticeAdmins == undefined) {
          //   this.moduleAdminList.qualityGuaranteeNoticeAdmins = [...res];
          // }
        });
      }
    },
    handleChange8(val) {
      if (val) {
        const moduleCode = { moduleCode: 7 };
        findModuleAdminUserList(moduleCode).then((res) => {
          if (this.moduleAdminList.purchaseSurveyAdmins == null) {
            this.$set(this.moduleAdminList, "purchaseSurveyAdmins", []);
          }
          this.moduleAdminList.purchaseSurveyAdmins =
            this.moduleAdminList.purchaseSurveyAdmins.concat(res);
          // this.ruleForm.headlineAdmins.push()
          let obj = {};
          this.moduleAdminList.purchaseSurveyAdmins =
            this.moduleAdminList.purchaseSurveyAdmins?.reduce(function (
              item,
              next
            ) {
              obj[next.userId]
                ? ""
                : (obj[next.userId] = true && item.push(next));
              return item;
            },
            []);
          console.log(this.moduleAdminList.purchaseSurveyAdmins);
          // if (this.moduleAdminList.purchaseSurveyAdmins == undefined) {
          //   this.moduleAdminList.purchaseSurveyAdmins = [...res];
          // }
        });
      }
    },
    handleChange9(val) {
      if (val) {
        const moduleCode = { moduleCode: 8 };
        findModuleAdminUserList(moduleCode).then((res) => {
          if (this.moduleAdminList.physicalDistributionSurveyAdmins == null) {
            this.$set(
              this.moduleAdminList,
              "physicalDistributionSurveyAdmins",
              []
            );
          }
          this.moduleAdminList.physicalDistributionSurveyAdmins =
            this.moduleAdminList.physicalDistributionSurveyAdmins.concat(res);
          // this.ruleForm.headlineAdmins.push()
          let obj = {};
          this.moduleAdminList.physicalDistributionSurveyAdmins =
            this.moduleAdminList.physicalDistributionSurveyAdmins?.reduce(
              function (item, next) {
                obj[next.userId]
                  ? ""
                  : (obj[next.userId] = true && item.push(next));
                return item;
              },
              []
            );
          console.log(this.moduleAdminList.physicalDistributionSurveyAdmins);
          // if (
          //   this.moduleAdminList.physicalDistributionSurveyAdmins == undefined
          // ) {
          //   this.moduleAdminList.physicalDistributionSurveyAdmins = [...res];
          // }
        });
      }
    },
    handleChange10(val) {
      if (val) {
        const moduleCode = { moduleCode: 9 };
        findModuleAdminUserList(moduleCode).then((res) => {
          if (this.moduleAdminList.qualityGuaranteeSurveyAdmins == null) {
            this.$set(this.moduleAdminList, "qualityGuaranteeSurveyAdmins", []);
          }
          this.moduleAdminList.qualityGuaranteeSurveyAdmins =
            this.moduleAdminList.qualityGuaranteeSurveyAdmins.concat(res);
          // this.ruleForm.headlineAdmins.push()
          let obj = {};
          this.moduleAdminList.qualityGuaranteeSurveyAdmins =
            this.moduleAdminList.qualityGuaranteeSurveyAdmins?.reduce(function (
              item,
              next
            ) {
              obj[next.userId]
                ? ""
                : (obj[next.userId] = true && item.push(next));
              return item;
            },
            []);
          console.log(this.moduleAdminList.qualityGuaranteeSurveyAdmins);
          // if (this.moduleAdminList.qualityGuaranteeSurveyAdmins == undefined) {
          //   this.moduleAdminList.qualityGuaranteeSurveyAdmins = [...res];
          // }
        });
      }
    },
    handleOK() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$confirm(this.language('NEWS_SFQDBCGNR',"是否确定保存该内容 ？"), this.language('NEWS_TISHI',"提示"), {
            confirmButtonText: this.language('TERMS_SHI', '是'),
            cancelButtonText: this.language('TERMS_FOU', '否'),
            type: "warning",
          })
            .then(() => {
              // 头条新闻管理员
              let headlineAdmins = this.moduleAdminList?.headlineAdmins?.filter(
                (item) => {
                  return this.ruleForm.headlineAdmins.includes(item.userId);
                }
              );
              if (headlineAdmins == undefined) {
                headlineAdmins = [];
              }
              headlineAdmins = headlineAdmins.map((item) => {
                return { ...item, moduleCode: 0 };
              });
              console.log(545, headlineAdmins);
              // 供应简讯管理员
              let briefAdmins = this.moduleAdminList?.briefAdmins?.filter(
                (item) => {
                  return this.ruleForm.briefAdmins.includes(item.userId);
                }
              );
              if (briefAdmins == undefined) {
                briefAdmins = [];
              }
              briefAdmins = briefAdmins.map((item) => {
                return { ...item, moduleCode: 1 };
              });
              // 供应商新闻管理员
              let supplierNewsAdmins =
                this.moduleAdminList?.supplierNewsAdmins?.filter((item) => {
                  return this.ruleForm.supplierNewsAdmins.includes(item.userId);
                });
              if (supplierNewsAdmins == undefined) {
                supplierNewsAdmins = [];
              }
              supplierNewsAdmins = supplierNewsAdmins.map((item) => {
                return { ...item, moduleCode: 2 };
              });
              // 影像专区管理员
              let imageAdmin = this.moduleAdminList?.imageAdmin?.filter(
                (item) => {
                  return this.ruleForm.imageAdmin.includes(item.userId);
                }
              );
              if (imageAdmin == undefined) {
                imageAdmin = [];
              }
              imageAdmin = imageAdmin.map((item) => {
                return { ...item, moduleCode: 3 };
              });
              // 采购公告管理员
              let purchaseNoticeAdmins =
                this.moduleAdminList?.purchaseNoticeAdmins?.filter((item) => {
                  return this.ruleForm.purchaseNoticeAdmins.includes(
                    item.userId
                  );
                });
              if (purchaseNoticeAdmins == undefined) {
                purchaseNoticeAdmins = [];
              }
              purchaseNoticeAdmins = purchaseNoticeAdmins.map((item) => {
                return { ...item, moduleCode: 4 };
              });
              // 物流公告管理员
              let physicalDistributionNoticeAdmins =
                this.moduleAdminList?.physicalDistributionNoticeAdmins?.filter(
                  (item) => {
                    return this.ruleForm.physicalDistributionNoticeAdmins.includes(
                      item.userId
                    );
                  }
                );
              if (physicalDistributionNoticeAdmins == undefined) {
                physicalDistributionNoticeAdmins = [];
              }
              physicalDistributionNoticeAdmins =
                physicalDistributionNoticeAdmins.map((item) => {
                  return { ...item, moduleCode: 5 };
                });
              // 质保公告管理员
              let qualityGuaranteeNoticeAdmins =
                this.moduleAdminList?.qualityGuaranteeNoticeAdmins?.filter(
                  (item) => {
                    return this.ruleForm.qualityGuaranteeNoticeAdmins.includes(
                      item.userId
                    );
                  }
                );
              if (qualityGuaranteeNoticeAdmins == undefined) {
                qualityGuaranteeNoticeAdmins = [];
              }
              qualityGuaranteeNoticeAdmins = qualityGuaranteeNoticeAdmins.map(
                (item) => {
                  return { ...item, moduleCode: 6 };
                }
              );
              // 采购问卷管理员
              let purchaseSurveyAdmins =
                this.moduleAdminList?.purchaseSurveyAdmins?.filter((item) => {
                  return this.ruleForm.purchaseSurveyAdmins.includes(
                    item.userId
                  );
                });
              if (purchaseSurveyAdmins == undefined) {
                purchaseSurveyAdmins = [];
              }
              purchaseSurveyAdmins = purchaseSurveyAdmins.map((item) => {
                return { ...item, moduleCode: 7 };
              });
              // 物流问卷管理员
              let physicalDistributionSurveyAdmins =
                this.moduleAdminList?.physicalDistributionSurveyAdmins?.filter(
                  (item) => {
                    return this.ruleForm.physicalDistributionSurveyAdmins.includes(
                      item.userId
                    );
                  }
                );
              if (physicalDistributionSurveyAdmins == undefined) {
                physicalDistributionSurveyAdmins = [];
              }
              physicalDistributionSurveyAdmins =
                physicalDistributionSurveyAdmins.map((item) => {
                  return { ...item, moduleCode: 8 };
                });
              // 物流问卷管理员
              let qualityGuaranteeSurveyAdmins =
                this.moduleAdminList?.qualityGuaranteeSurveyAdmins?.filter(
                  (item) => {
                    return this.ruleForm.qualityGuaranteeSurveyAdmins.includes(
                      item.userId
                    );
                  }
                );
              if (qualityGuaranteeSurveyAdmins == undefined) {
                qualityGuaranteeSurveyAdmins = [];
              }
              qualityGuaranteeSurveyAdmins = qualityGuaranteeSurveyAdmins.map(
                (item) => {
                  return { ...item, moduleCode: 9 };
                }
              );

              const formData = {
                ...this.ruleForm,
                briefAdmins,
                headlineAdmins,
                supplierNewsAdmins,
                imageAdmin,
                purchaseNoticeAdmins,
                physicalDistributionNoticeAdmins,
                qualityGuaranteeNoticeAdmins,
                purchaseSurveyAdmins,
                physicalDistributionSurveyAdmins,
                qualityGuaranteeSurveyAdmins,
              };
              console.log(660, formData);
              saveModuleAdmin(formData)
                .then((data) => {
                  this.$message.success(this.language('NEWS_BAOCUNCHENGGONG',"保存成功！"));
                  this.handleSave = false;
                  this.headlineAdminsName = [];
                  this.briefAdminsName = [];
                  this.supplierNewsAdminsName = [];
                  this.imageAdminName = [];
                  this.purchaseNoticeAdminsName = [];
                  this.physicalDistributionNoticeAdminsName = [];
                  this.qualityGuaranteeNoticeAdminsName = [];
                  this.purchaseSurveyAdminsName = [];
                  this.physicalDistributionSurveyAdminsName = [];
                  this.qualityGuaranteeSurveyAdminsName = [];
                  this.getTableList();
                })
                .catch(() => {
                  this.getTableList();
                  this.$message.error(this.language('NEWS_BAOCUNSHIBAI',"保存失败"));
                  this.handleSave = false;
                });
            })
            .catch(() => {
              // this.handleCancel();
              this.getTableList();
            });
        }
      });
    },
    handleEdit() {
      this.handleSave = true;
    },
    async query() {
      const res = await findModuleAdminList();
      console.log(res);
      this.moduleAdminList = { ...res };
      let headlineAdmins = res?.headlineAdmins?.map((item) => {
        return item.userId;
      });
      // headlineAdmins = [... new Set(headlineAdmins)]

      let briefAdmins = res?.briefAdmins?.map((item) => {
        return item.userId;
      });
      // briefAdmins = [... new Set(briefAdmins)]

      let supplierNewsAdmins = res?.supplierNewsAdmins?.map((item) => {
        return item.userId;
      });
      // supplierNewsAdmins = [... new Set(supplierNewsAdmins)]

      let imageAdmin = res?.imageAdmin?.map((item) => {
        return item.userId;
      });
      // imageAdmin = [... new Set(imageAdmin)]

      let purchaseNoticeAdmins = res?.purchaseNoticeAdmins?.map((item) => {
        return item.userId;
      });
      // purchaseNoticeAdmins = [... new Set(purchaseNoticeAdmins)]

      let physicalDistributionNoticeAdmins =
        res?.physicalDistributionNoticeAdmins?.map((item) => {
          return item.userId;
        });
      // physicalDistributionNoticeAdmins = [... new Set(physicalDistributionNoticeAdmins)]

      let qualityGuaranteeNoticeAdmins = res?.qualityGuaranteeNoticeAdmins?.map(
        (item) => {
          return item.userId;
        }
      );
      // qualityGuaranteeNoticeAdmins = [... new Set(qualityGuaranteeNoticeAdmins)]

      let purchaseSurveyAdmins = res?.purchaseSurveyAdmins?.map((item) => {
        return item.userId;
      });
      // purchaseSurveyAdmins = [... new Set(purchaseSurveyAdmins)]

      let physicalDistributionSurveyAdmins =
        res?.physicalDistributionSurveyAdmins?.map((item) => {
          return item.userId;
        });
      // physicalDistributionSurveyAdmins = [... new Set(physicalDistributionSurveyAdmins)]

      let qualityGuaranteeSurveyAdmins = res?.qualityGuaranteeSurveyAdmins?.map(
        (item) => {
          return item.userId;
        }
      );
      // qualityGuaranteeSurveyAdmins = [... new Set(qualityGuaranteeSurveyAdmins)]

      console.log(headlineAdmins);
      this.ruleForm = {
        ...this.ruleForm,
        ...res,
        headlineAdmins,
        briefAdmins: briefAdmins || [],
        supplierNewsAdmins: supplierNewsAdmins || [],
        imageAdmin: imageAdmin || [],
        purchaseNoticeAdmins: purchaseNoticeAdmins || [],
        physicalDistributionNoticeAdmins:
          physicalDistributionNoticeAdmins || [],
        qualityGuaranteeNoticeAdmins: qualityGuaranteeNoticeAdmins || [],
        purchaseSurveyAdmins: purchaseSurveyAdmins || [],
        physicalDistributionSurveyAdmins:
          physicalDistributionSurveyAdmins || [],
        qualityGuaranteeSurveyAdmins: qualityGuaranteeSurveyAdmins || [],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.handel-top {
  width: 100%;
  .form-item-row1-clo2 ::v-deep {
    display: flex;
    margin-right: -4rem;
    .el-form-item {
      display: flex;
      width: 100%;
      margin-right: 5rem;
      /* 禁用样式 */
      .el-input.is-disabled {
        .el-input__inner {
          text-align: center;
          color: #000;
        }
      }
      .el-select .el-input.is-disabled {
        .el-input__suffix {
          display: none;
        }
      }
    }
    .el-form-item__label {
      width: 15rem;
    }
    .el-form-item__content {
      width: 100%;
      .el-select {
        height: auto;
        .el-select__tags {
          justify-content: center;
          .el-tag {
            background-color: #f7f7f7;
            /* color: #000;
            border-radius: 20px; */
            font-size: unset;
            .el-tag__close {
              /* color: #000000;
              background-color: transparent;
              font-size: large;
              font-weight: bold; */
            }
          }
        }
      }
    }
  }
}
.form-item-button {
  display: flex;
  justify-content: flex-end;
}
</style>
