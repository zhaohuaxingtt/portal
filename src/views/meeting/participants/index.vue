<template>
  <div class="width">
    <iCard>
      <iTabs>
        <el-tab-pane class="margin-bottom3" :label="$t('MT_YUHUIREN')">
          <attendee></attendee>
        </el-tab-pane>
        <el-tab-pane class="margin-bottom3" :label="$t('MT_SHOUJIANREN')">
          <receiver></receiver>
        </el-tab-pane>
      </iTabs>
    </iCard>
  </div>
</template>

<script>
import { iCard, iTabs } from "rise";
// import { actionButtons, addOrEditGroupDialog } from "./component";
import receiver from "./receiver";
import attendee from "./attendee";
// import { getAttendee, deleteGroup } from "@/api/meeting/type";
// import { pageMixins } from "@/utils/pageMixins";
// import iTableCustom from "@/components/iTableCustom";

export default {
  // mixins: [pageMixins],
  components: {
    iCard,
    iTabs,
    receiver,
    attendee,
  },
  data() {
    return {};
  },
  methods: {
    /* handleClick(tab) {
      if (tab.name === "first") {
        this.isFirst = true;
        this.isSecond = false;
      } else if (tab.name === "second") {
        this.isFirst = false;
        this.isSecond = true;
      }
    }, */
    /* handleDetailClick() {
      setTimeout(() => {
        this.$refs.receiver.doLayout();
      }, 3000);
    }, */
    /*  deleteGroup(e) {
      console.log(e);
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
      console.log(scope);
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
    }, */
  },
};
</script>

<style lang="scss" scoped>
.width {
  width: 108.75rem;
}
</style>