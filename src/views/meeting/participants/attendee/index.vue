<template>
  <div>
    <actionButtons @add="addAttendee" />
    <i-table-custom
      @editAttendee="editAttendee"
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
    />
    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      :current-page="page.currPage"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
      background
      prev-text="上一页"
      next-text="下一页"
    />
    <addOrEditGroupDialog
      :openDialog="openDialog"
      @closeDialog="closeDialog"
      :editOrAdd="editOrAdd"
      v-if="openDialog"
      :clickScope="clickScope"
      @flushTable="flushTable"
    />
  </div>
</template>

<script>
import { iPagination } from "rise";
import { actionButtons, addOrEditGroupDialog } from "./component";
import { getAttendee, deleteGroup } from "@/api/meeting/type";
import { pageMixins } from "@/utils/pageMixins";
import iTableCustom from "@/components/iTableCustom";

export default {
  mixins: [pageMixins],
  components: {
    iPagination,
    actionButtons,
    addOrEditGroupDialog,
    iTableCustom,
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableColumns: [
        {
          type: "index",
          label: "序号",
          i18n: "序号",
          width: 68,
          tooltip: false,
        },
        /*  {
          width: 50,
        }, */
        {
          // prop: "meetingTypeName",
          label: "会议类型",
          i18n: "会议类型",
          align: "left",
          width: 240,
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
              scope.row.meetingTypeName ? scope.row.meetingTypeName : ""
            );
          },
        },
        {
          // prop: "groupName",
          label: "组名",
          i18n: "组名",
          align: "left",
          width: 240,
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
              scope.row.groupName ? scope.row.groupName : ""
            );
          },
        },
        /* {
          width: 50,
        }, */
        {
          // prop: "attendeeName",
          label: "与会人",
          i18n: "与会人",
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
              scope.row.attendeeName ? scope.row.attendeeName : ""
            );
          },
        },

        /* {
          width: 50,
        }, */
        {
          width: 100,
          label: "操作",
          customRender: (h, scope) => {
            return h("span", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    cursor: "pointer",
                                        color: "#1660f1",
                    
                  },
                  class: "open-link-text",
                  on: {
                    click: () => {
                      this.editAttendee(scope.row);
                    },
                  },
                },
                "修改"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    cursor: "pointer",
                                        color: "#1660f1",
                  },
                  class: "open-link-text",
                },
                "|"
              ),
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
                      this.deleteGroup(scope.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      // tableColumns,
      openDialog: false,
      editOrAdd: "add",
      clickScope: [],
    };
  },
  created() {
    this.query();
  },
  methods: {
    deleteGroup(e) {
      this.$confirm("请确认是否要删除该群组？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(() => {
        deleteGroup({ id: e.id })
          .then(() => {
            this.$message.success("删除成功!");
            this.query();
          })
          .catch((err) => {
            this.$message.error("删除失败!");
          });
      });
    },
    editAttendee(scope) {
      this.clickScope = scope;
      this.openDialog = true;
      this.editOrAdd = "edit";
    },
    flushTable() {
      this.query();
    },
    query() {
      const data = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.tableLoading = true;
      getAttendee(data)
        .then((res) => {
          this.tableLoading = false;
          const { data, pageNum, pageSize, total, pages } = res;
          this.page.currPage = pageNum;
          this.page.pageSize = pageSize;
          this.page.totalCount = total;
          this.page.pages = pages;
          this.tableData = data;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
    addAttendee() {
      this.openDialog = true;
      this.editOrAdd = "add";
    },
    closeDialog(bol) {
      this.openDialog = bol;
    },
  },
};
</script>

<style lang="scss" scoped></style>
