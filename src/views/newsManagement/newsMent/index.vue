<template>
  <iPage class="handel-top">
    <div class="form-item-top">
      {{ newsManagement === "news" ? language('NEWS_YONGHUZUXINZENG', "用户组新增") : language('NEWS_YONGHUZUSHEZHI', "用户组设置")
      }}
    </div>
    <iCard :title="language('NEWS_YONGHUZUSHEZHI', '用户组设置')" class="item-iCard" collapse>
      <el-form
          class="form"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          :hideRequiredAsterisk="true"
          :validate-on-rule-change="false"
      >
        <div class="item">
          <div class="form-item-row1-clo2">
            <iFormItem :label="language('NEWS_ZUMING', '组名')" prop="groupName">
              <iLabel :label="language('NEWS_ZUMING', '组名')" slot="label" required></iLabel>
              <iInput v-model="ruleForm.groupName"></iInput>
            </iFormItem>
            <iFormItem :label="language('NEWS_FENLEI', '分类')" prop="category">
              <iLabel :label="language('NEWS_FENLEI', '分类')" slot="label" required></iLabel>
              <iSelect v-model="ruleForm.category" multiple>
                <el-option
                    v-for="item in category"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                >
                </el-option>
              </iSelect>
            </iFormItem>
            <iFormItem :label="language('NEWS_YONGHULEIXING', '用户类型')" prop="userType">
              <iLabel :label="language('NEWS_YONGHULEIXING', '用户类型')" slot="label" required></iLabel>
              <iSelect :value="ruleForm.userType" @change="handleChange" :disabled="disabledAll">
                <el-option
                    v-for="item in userType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </div>
          <div>
            <div class="form-item-row1-button">
              <iButton @click="handleSave" :disabled="saveDisabled"
              >{{language('NEWS_BAOCUN', '保存')}}
              </iButton
              >
              <iButton @click="handleBack">{{language('NEWS_QUXIAO', '取消')}}</iButton>
            </div>
          </div>
        </div>

        <!-- 横线 -->
        <div class="link-gray"></div>

        <div class="item2">
          <div class="item-span">
            <iFormItem :label="language('NEWS_YONGHU', '用户')" prop="linieName">
              <iLabel :label="language('NEWS_YONGHU', '用户')" slot="label" required></iLabel>
            </iFormItem>
          </div>
          <div class="form-item-button">
            <iButton @click="handleOpen">{{language('NEWS_TIANJIA', '添加')}}</iButton>
            <iButton @click="handleDelete">{{language('LK_SHANCHU', '删除')}}</iButton>
          </div>
        </div>

        <!-- 用户 -->
        <div v-if="ruleForm.userType === 1">
          <!-- <commonTable
            ref="multipleTable"
            :tableTitle="userTableTitle"
            :tableLoading="tableLoading"
            :tableData="tableListUserData"
            @handleSelectionChange="handleSelectionChange"
          >
            <template slot="index" slot-scope="scope">
              <div>
                {{ scope.row.index + 1 }}
              </div>
            </template>
          </commonTable> -->
          <iTableCustom
              :columns="userTableTitle"
              :loading="tableLoading"
              :data="userPage"
              @handle-selection-change="handleSelectionChange"
          />
        </div>
        <!-- 供应商 -->
        <div v-else>
          <!-- <div> -->
          <iTableCustom
              :columns="userNewTableTitle"
              :loading="tableLoading"
              :data="supplierPage"
              @handle-selection-change="handleSelectionChange"
              @go-detail="handleGoDetail"
          />
        </div>
        <iPagination
            v-update
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :prev-text="language('NEWS_SHANGYIYE', '上一页')"
            :next-text="language('NEWS_XIAYIYE', '下一页')"
            :layout="page.layout"
            :current-page="page.currPage"
            :total="page.total"
        />

        <supplier
            v-if="openSupplier"
            :open="openSupplier"
            @handleCancel="handleSupplie"
            @handleSupplierOk="handleSupplierOk"
            @handleOpenSupplier="handleOpenSupplier"
            :suplierListData="tableListData"
        />
        <employees
            v-if="openEmployees"
            :open="openEmployees"
            @handleCancel="handleEmployees"
            @handleEmployeesOk="handleEmployeesOk"
            :userListData="tableListUserData"
        />
      </el-form>
    </iCard>
    <router-view></router-view>
  </iPage>
</template>
<script>
import {iButton, iCard, iFormItem, iInput, iLabel, iPage, iPagination, iSelect,} from "rise";
import iTableCustom from "@/components/newsComponents/iTableCustom";
// import commonTable from "@/components/newsComponents/commonTable";
import {pageMixins} from "@/utils/pageMixins";
import {infoRules, userNewTableTitle, userTableTitle, userType} from "./data";
import supplier from "./components/supplier.vue";
import employees from "./components/employees.vue";
import {findAdminPermission, findGroupById, saveGroup, updateGroup,} from "@/api/news/news";

export default {
  mixins: [pageMixins],
  components: {
    iSelect,
    iFormItem,
    iCard,
    iButton,
    iLabel,
    iInput,
    iTableCustom,
    // commonTable,
    iPagination,
    supplier,
    employees,
    iPage,
  },
  data() {
    return {
      ruleForm: {
        groupName: "",
        category: [],
        userType: "",
        userGroupDetails: [],
      },
      rules: {...infoRules},
      userNewTableTitle,
      tableLoading: false,
      tableListData: [],
      tableListUserData: [],
      selectedTableData: [],
      openSupplier: false,
      openEmployees: false,
      userType,
      userTableTitle,
      category: [],
      newsManagement: "",
      id: "",
      jsonStr: "",
      jsonSupplierData: "",
      jsonUserData: "",
      saveDisabled: false,
      addInfo: false,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.newsManagement = this.$route.query.news;
  },
  async mounted() {
    this.getTableList();
    const res = await findAdminPermission();
    this.category = res;
  },
  computed: {
    disabledAll() {
      if (this.newsManagement !== "news" && this.ruleForm.userType === 1 && this.tableListUserData && this.tableListUserData.length > 0) {
        return true;
      } else if (this.newsManagement !== "news" && this.ruleForm.userType === 0 && this.tableListData && this.tableListData.length > 0) {
        return true;
      }
      return false;
    },
    userPage() {
      const {currPage, pageSize} = this.page;
      return this.tableListUserData?.slice(
          (currPage - 1) * pageSize,
          pageSize * currPage
      );
    },
    supplierPage() {
      const {currPage, pageSize} = this.page;
      return this.tableListData?.slice(
          (currPage - 1) * pageSize,
          pageSize * currPage
      );
    },
  },
  methods: {
    getTableList() {
      this.page.currPage = 1;
      if (this.newsManagement === "news") {
        this.jsonStr = JSON.stringify(this.ruleForm);
        this.jsonSupplierData = JSON.stringify(this.tableListData);
        this.jsonUserData = JSON.stringify(this.tableListUserData);
        this.$nextTick(() => {
          this.$refs["ruleForm"].clearValidate();
        });
        return;
      } else {
        this.query();
      }
    },
    handleSizeChange(val) {
      this.page.currPage = 1;
      this.page.pageSize = val;
      // if (this.newsManagement === "news" ) {
      //   return;
      // } else {
      //   this.query();
      // }
    },
    handleCurrentChange(val) {
      this.page.currPage = val;
      // if (this.newsManagement === "news" ) {
      //   this.page.currPage = val;
      // } else {
      //   this.page.currPage = val;
      //   this.query();
      // }
    },
    handleChange(val) {
      if (this.ruleForm.userType === 0 || this.ruleForm.userType === 1) {
        this.$confirm(this.language('NEWS_QDQHHBLBNRJQBQK', "确定切换后，本列表内容将全部清空"), this.language('NEWS_SFQDQH', "是否确定切换"), {
          confirmButtonText: this.language('TERMS_SHI', '是'),
          cancelButtonText: this.language('TERMS_FOU', '否'),
          type: "warning",
        })
            .then(() => {
              this.ruleForm.userType = val;
              if (this.ruleForm.userType === 0) {
                this.tableListUserData = [];
                this.page.total = this.tableListUserData.length;
              }
              if (this.ruleForm.userType === 1) {
                this.tableListData = [];
                this.page.total = this.tableListData.length;
              }
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        this.ruleForm.userType = val;
      }
    },
    handleDelete() {
      if (this.ruleForm.userType === 0 && this.selectedTableData.length === 0) {
        return this.$message.error(this.language('NEWS_QINGGOUXUANXINXI', "请勾选信息"));
      }
      if (this.ruleForm.userType === 1 && this.selectedTableData.length === 0) {
        return this.$message.error(this.language('NEWS_QINGGOUXUANXINXI', "请勾选信息"));
      }
      this.$confirm(this.language('NEWS_SFQDSCNR', "是否确定删除 内容 ？"), this.language('NEWS_TISHI', "提示"), {
        confirmButtonText: this.language('TERMS_SHI', '是'),
        cancelButtonText: this.language('TERMS_FOU', '否'),
        type: "warning",
      })
          .then(() => {
            const id = this.selectedTableData.map((item) => {
              return item.id;
            });
            if (this.ruleForm.userType === 0) {
              this.tableListData = this.tableListData.filter((item) => {
                return !id.includes(item.id);
              });
              this.page.total = this.tableListData.length;
            }
            if (this.ruleForm.userType === 1) {
              this.tableListUserData = this.tableListUserData.filter((item) => {
                return !id.includes(item.id);
              });
              this.page.total = this.tableListUserData.length;
            }
          })
          .catch(() => {
          });
    },
    handleSupplierOk(val) {
      console.log(val);
      const tableListData = val.map((item) => {
        return {
          // ...item,
          accountId: item.accountId,
          id: item.userId,
          userId: item.userId,
          providerNameZh: item.supplierNameZh,
          providerNameEn: item.supplierNameEn,
          sapNum: item.sapNum,
          svwNum: item.svwCode,
          temporaryNum: item.temporaryNum,
          providerType: item.supplierType,
          providerRange: item.supplierScope,
        };
      });
      this.tableListData = [...tableListData];
      this.page.total = this.tableListData.length;
      this.openSupplier = false;
    },
    handleEmployeesOk(val) {
      // console.log(val);
      const tableListData = val.map((item) => {
        return {
          // ...item,
          accountId: item.accountId,
          id: item.userId,
          userId: item.userId,
          userNum: item.userNum,
          userName: item.nameZh,
          dept: item.deptNameZh,
          email: item.email,
          mobile: item.mobile,
          phone: item.phone,
        };
      });
      this.tableListUserData = [...tableListData];
      this.page.total = this.tableListUserData.length;
      this.openEmployees = false;
    },
    handleSave() {
      this.$refs["ruleForm"].validate((valid) => {
        if (this.ruleForm.userType === 0 && this.tableListData.length === 0) {
          return this.$message.error(this.language('NEWS_BXTJYTXX', "必须添加一条信息"));
        }
        if (
            this.ruleForm.userType === 1 &&
            this.tableListUserData.length === 0
        ) {
          return this.$message.error(this.language('NEWS_BXTJYTXX', "必须添加一条信息"));
        }
        if (valid) {
          // this.$confirm("是否确定保存 内容 ？", this.language('NEWS_TISHI',"提示"), {
          //   confirmButtonText: "是",
          //   cancelButtonText: "否",
          //   type: "warning",
          // }).then(() => {

          // });
          const {userType} = this.ruleForm;
          const userGroupDetails =
              userType === 0 ? this.tableListData : this.tableListUserData;
          const param = {...this.ruleForm, userGroupDetails, id: this.id};
          if (this.newsManagement === "news") {
            this.saveDisabled = true;
            saveGroup(param)
                .then((res) => {
                  if(res.id){
                    this.getTableList();
                    this.$message.success(this.language('NEWS_BAOCUNCHENGGONG', "保存成功"));
                    this.$router.push({
                      name: "newsUserManagement",
                    });
                  }
                })
                .catch((err) => {
                  this.saveDisabled = false;
                });
          } else {
            this.saveDisabled = true;
            updateGroup(param)
                .then((res) => {
                  if(res.id){
                    // console.log(res);
                    this.getTableList();
                    this.$message.success(this.language('NEWS_BAOCUNCHENGGONG', "保存成功"));
                    this.$router.push({
                      name: "newsUserManagement",
                  });
                  }
                })
                .catch((err) => {
                  this.saveDisabled = false;
                });
          }
        }
      });
    },
    handleCancel() {
      // if (this.newsManagement === "news") {
      //   this.$refs["ruleForm"].resetFields();
      // }
      // this.getTableList();
      this.$router.push({
        name: "newsUserManagement",
      });
    },
    handleBack() {
      let data = {...this.ruleForm};
      let suplierData = [...this.tableListData];
      let userData = [...this.tableListUserData];
      if (this.ruleForm.userType === 0) {
        if (
            this.jsonStr == JSON.stringify(data) &&
            this.jsonSupplierData == JSON.stringify(suplierData)
        ) {
          this.$router.push({
            name: "newsUserManagement",
          });
        } else {
          this.$confirm(this.language('NEWS_QDQXHXGNRBHBC', "确定取消后，修改内容不会保存。"), this.language('NEWS_SFQDQX', "是否确定取消？"), {
            confirmButtonText: this.language('TERMS_SHI', '是'),
            cancelButtonText: this.language('TERMS_FOU', '否'),
            type: "warning",
          })
              .then(() => {
                this.$router.push({
                  name: "newsUserManagement",
                });
              })
              .catch((err) => {
                console.log(err);
              });
        }
      } else {
        if (
            this.jsonStr == JSON.stringify(data) &&
            this.jsonUserData == JSON.stringify(userData)
        ) {
          this.$router.push({
            name: "newsUserManagement",
          });
        } else {
          this.$confirm(this.language('NEWS_QDFHHXGNRBHBC', "确定返回后，修改内容不会保存。"), this.language('NEWS_SFQDFH', "是否确定返回？"), {
            confirmButtonText: this.language('TERMS_SHI', '是'),
            cancelButtonText: this.language('TERMS_FOU', '否'),
            type: "warning",
          })
              .then(() => {
                this.$router.push({
                  name: "newsUserManagement",
                });
              })
              .catch((err) => {
                console.log(err);
              });
        }
      }
    },
    // 表格选中值集
    handleSelectionChange(val) {
      // console.log(val);
      this.selectedTableData = val;
    },
    handleOpen() {
      if (this.ruleForm.userType === 0) {
        this.openSupplier = true;
        this.addInfo = true;
      } else if (this.ruleForm.userType === 1) {
        this.openEmployees = true;
        this.addInfo = true;
      } else {
        return this.$message.error(this.language('NEWS_QINGXUANZEYONGHULEIXING', "请选择用户类型"));
      }
    },
    handleSupplie() {
      this.openSupplier = false;
    },
    handleEmployees() {
      this.openEmployees = false;
    },
    async query() {
      this.tableLoading = true;
      // const id = this.ruleForm.id;
      let param = {
        groupId: this.id,
        // pageNum: this.page.currPage,
        // pageSize: 10000,
        // pageSize: this.page.pageSize
      };
      const res = await findGroupById(param);
      const data = await findAdminPermission();
      this.ruleForm = {
        ...this.ruleForm,
        groupName: res.groupName,
        category: res.category,
        userType: res.userType,
      };
      // this.page.pages = res.userGroupDetails.pages
      this.tableLoading = false;
      if (this.ruleForm.userType === 0) {
        this.tableListData = res?.userGroupDetails;
        if (this.newsManagement === "news") {
          this.page.total = this.tableListData?.length;
        } else {
          this.page.total = res.userGroupDetails?.length;
        }
      } else if (this.ruleForm.userType === 1) {
        this.tableListUserData = res?.userGroupDetails;
        if (this.newsManagement === "news") {
          this.page.total = this.tableListUserData?.length;
        } else {
          this.page.total = res.userGroupDetails?.length;
        }
      } else {
        this.tableListData = [];
        this.tableListUserData = [];
      }
      this.jsonStr = JSON.stringify(this.ruleForm);
      this.jsonSupplierData = JSON.stringify(this.tableListData);
      this.jsonUserData = JSON.stringify(this.tableListUserData);

      this.category = res.category.map((item, key) => {
        return {code: item, name: res.categoryName[key]};
      });
      this.category = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.form-item-top {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2.5rem;
}

/* 横线 */
.link-gray {
  width: 100%;
  height: 2px;
  background: #e1e4ed;
  /* margin-top: 20px; */
  margin-bottom: 25px;
}

.item-iCard ::v-deep {
  margin-top: 1rem;

  .cardHeader {
    justify-content: flex-end !important;
    padding: 1rem 2.5rem;

    .title {
      display: none;
    }
  }
}

.handel-top {
  width: 100%;

  .item {
    display: flex;
    justify-content: space-between;

    .form-item-row1-clo2 ::v-deep {
      display: flex;
      /* margin-right: -4rem; */
      .el-form-item {
        display: flex;
        width: 100%;
        margin-right: 3rem;
      }

      .el-form-item__label {
        width: 8rem;
      }

      .el-form-item__content {
        /* width: 16rem; */
        width: 16rem;
        margin-left: -3rem;

        .el-select {
          height: auto;

          .el-select__tags {
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

    .form-item-button {
      display: flex;
    }
  }

  .form-item-row1-button {
    display: flex;
  }

  .item2 ::v-deep {
    display: flex;
    justify-content: space-between;
  }
}

::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
