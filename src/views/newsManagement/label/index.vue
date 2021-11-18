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
    >
      <iCard class="form-icard">
        <div class="item">
          <div class="form-item-row1-clo2">
            <iFormItem :label="language('NEWS_BIAOQIANNEIRONG', '标签内容')" prop="content">
              <iLabel :label="language('NEWS_BIAOQIANNEIRONG', '标签内容')" slot="label"></iLabel>
              <iInput :placeholder="language('LK_QINGSHURU', '请输入')" v-model="ruleForm.content"></iInput>
            </iFormItem>

            <iFormItem :label="language('NEWS_SUOSHUFENLEI', '所属分类')" prop="categoryList">
              <iLabel :label="language('NEWS_SUOSHUFENLEI', '所属分类')" slot="label"></iLabel>
              <iSelect ref='select' multiple clearable v-model="ruleForm.categoryList"
                       @keydown.native.capture.enter.stop.prevent>
                <el-option
                    v-for="item in userNewsList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                >
                </el-option>
              </iSelect>
            </iFormItem>

            <iFormItem :label="language('NEWS_TIANJIAREN', '添加人')" prop="createBy">
              <iLabel :label="language('NEWS_TIANJIAREN', '添加人')" slot="label"></iLabel>
              <iInput :placeholder="language('LK_QINGSHURU', '请输入')" v-model="ruleForm.createBy">
              </iInput>
            </iFormItem>
          </div>
          <div class="form-item-button">
            <template>
              <iButton @click="getTableList">{{ language('LK_INQUIRE', '查询') }}</iButton>
              <iButton @click="handleSearchReset">{{language('LK_ZHONGZHI', '重置')}}</iButton>
            </template>
          </div>
        </div>
      </iCard>

      <iCard style="margin-top: 1rem">
        <div class="form-bottom-button">
          <template>
            <iButton @click="handleAddLabel" :disabled="!newDisabled"
            >{{language('NEWS_XINJIANBIAOQIAN', '新建标签')}}
            </iButton
            >
            <iButton
                :disabled="selectedTableData.length === 0"
                @click="handleDeleteLabel"
            >{{language('LK_SHANCHU', '删除')}}
            </iButton
            >
          </template>
        </div>
        <iTableCustom
            :columns="labelTableTitle"
            :loading="tableLoading"
            :data="tableListData"
            @handle-selection-change="handleSelectionChange"
        />

        <!-- <iTableML
          tooltip-effect="light"
          :data="tableListData"
          :tableLoading="tableLoading"
          @selectionChange="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column width="70" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" align="center" label="标签内容">
            <template slot-scope="scope">
              <div :title="scope.row['content']">
                {{
                  scope.row["content"].length > 7
                    ? scope.row["content"].substring(0, 7) + "..."
                    : scope.row["content"]
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="所属分类">
            <template slot-scope="scope">
              <div>
                {{ scope.row["categoryName"].toString() }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="添加人">
            <template slot-scope="scope">
              <div>
                {{ scope.row["createUserName"] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="添加日期">
            <template slot-scope="scope">
              <div>
                {{ scope.row["createDate"].substring(0, 10) }}
              </div>
            </template>
          </el-table-column>
        </iTableML> -->

        <iPagination
            v-update
            @current-change="handleCurrentChange($event, query)"
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

        <addLabel
            :open="addLabel"
            :category="userNewsList"
            @clearDiolog="clearDiolog"
            @hanleAddLabel="hanleAddLabel"
            ref="addRuleForm"
        />
      </iCard>
    </el-form>
    <router-view></router-view>
  </div>
</template>
<script>
import {iButton, iCard, iFormItem, iInput, iLabel, iPagination, iSelect,} from "rise";
import iTableCustom from "@/components/newsComponents/iTableCustom";
// import iTableML from "@/components/newsComponents/iTableML";
import {labelTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {deleteTag, findAdminPermission, findTagPage, saveTag,} from "@/api/news/news";
import addLabel from "./addLabel.vue";

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
    // iTableML,
    iPagination,
    addLabel,
  },
  data() {
    return {
      ruleForm: {},
      // category,
      rules: {},
      tableLoading: false,
      tableListData: [],
      selectedTableData: [],
      labelTableTitle,
      addLabel: false,
      userNewsList: [],
      userNewsCode: [],
    };
  },
  computed: {
    newDisabled() {
      return this.userNewsCode.length > 0
    },
  },
  created() {
  },
  mounted() {
    this.getTableList();
    // 绑定enter事件
    this.enterKeyup();
  },
  destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed();
  },
  methods: {
    enterKey(event) {
      const code = event.keyCode
          ? event.keyCode
          : event.which
              ? event.which
              : event.charCode;
      if (code == 13) {
        console.log(218, this.$refs.select)
        this.$refs.select.blur();
        this.getTableList();
      }
    },
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
    // 查询
    getTableList() {
      this.page.currPage = 1;
      this.query();
    },
    // 重置
    handleSearchReset() {
      this.$refs["ruleForm"].resetFields();
      this.getTableList();
    },
    compare(value) {
      return function (a, b) {
        let value1 = a[value];
        let value2 = b[value];
        if (value1 < value2) {
          return -1;
        } else if (value1 > value2) {
          return 1;
        } else {
          return 0;
        }
      };
    },
    handleSizeChange(val) {
      console.log(val);
      this.page.currPage = 1;
      this.page.pageSize = val;
      this.query();
    },
    // 表格选中值集
    handleSelectionChange(val) {
      console.log(val);
      this.selectedTableData = val;
    },
    handleAddLabel() {
      this.addLabel = true;
    },
    handleDeleteLabel() {
      let flag = false;
      this.selectedTableData.map((item) => {
        flag = item.category.some((it) => {
          return this.userNewsCode.includes(it);
        });
      });
      if (!flag) {
        return this.$message.error(this.language('NEWS_WQXSCGBQZNSCZJDXWBQ', "无权限删除该标签，只能删除自己的新闻标签"));
      }
      this.$confirm(this.language('NEWS_SFQDSCBQNR', "是否确定删除 标签内容 ？"), this.language('NEWS_TISHI', "提示"), {
        confirmButtonText: this.language('TERMS_SHI', '是'),
        cancelButtonText: this.language('TERMS_FOU', '否'),
        type: "warning",
      }).then(() => {
        deleteTag(this.selectedTableData)
            .then((res) => {
              this.$message.success(this.language('NEWS_SHANCHUCHENGGONG', '删除成功'));
              this.getTableList();
            })
            .catch((err) => {
              this.$message.error(this.language('NEWS_SHANCHUSHIBAI', '删除失败'));
            });
      });
    },
    clearDiolog() {
      this.addLabel = false;
    },
    hanleAddLabel(formData) {
      this.$refs["addRuleForm"].$refs["ruleForm"].validate((valid) => {
        if (valid) {
          saveTag(formData)
              .then((data) => {
                this.$message.success(this.language('NEWS_XWBQCJCG', "新闻标签创建成功！"));
                this.addLabel = false;
                this.getTableList();
              })
              .catch(() => {
                this.$message.error(this.language('NEWS_XWBQCJSB', "新闻标签创建失败！"));
              });
        }
      });
    },
    query() {
      this.tableLoading = true;
      console.log(this.ruleForm);
      let param = {
        ...this.ruleForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      findTagPage(param)
          .then((res) => {
            this.tableLoading = false;
            this.tableListData = res.data;
            // this.tableListData.sort(this.compare("content"));
            this.page.total = res.total;
          })
          .catch((err) => {
            this.tableLoading = true;
            console.log(err);
          });
      findAdminPermission()
          .then((res) => {
            console.log(res);
            this.userNewsList = res?.filter((item) => item.code < 4);
            this.userNewsCode = this.userNewsList.map((item) => item.code);
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
};
</script>
<style lang="scss" scoped>
.form-icard ::v-deep {
  .cardBody {
    padding: 1rem 2.5rem;
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
        /* display: flex; */
        /* width: 100%; */
        width: 15rem;
        margin-right: 3rem;
      }

      /* .el-form-item__label {
        width: 15rem;
      } */
      .el-select {
        height: auto;
      }

      .el-form-item__content {
        width: 100%;
      }
    }

    .form-item-button {
      /* display: flex; */
      /* justify-content: flex-end; */
      margin-top: 2.5rem;
    }
  }

  .form-bottom-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
}
</style>
