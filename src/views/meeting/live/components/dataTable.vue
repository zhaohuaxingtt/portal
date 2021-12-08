<template>
  <div class="my-topics-box">
    <el-row class="row-el">
      <iButton @click="handleDownLoad" :disabled="selectVal.length < 1">{{
     $t('MT_XIAZAI')
      }}</iButton>
    </el-row>
    <iTableML
      tooltip-effect="light"
      :data="tableData"
      @selectionChange="handleSelectionChange"
    >
      <el-table-column
        prop="follow"
        align="center"
        label="No."
        width="40"
        type="selection"
      >
      </el-table-column>
      <el-table-column
        prop="follow"
        align="center"
        label="No."
        width="68"
        type="index"
      >
      </el-table-column>
      <el-table-column prop="name" align="center" :label="$t('MT_XAIZAIMINGCHENG')" width="756">
        <template slot-scope="scope">
          <span class="doc-name" @click="handleDownLoadSingle(scope.row)">{{
            scope.row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createUserName"
        align="center"
        :label="$t('MT_SHANGCHUANFUJIANREN')"
        width="402"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createDate"
        align="center"
        :label="$t('MT_SHANGCHUANFUJIANSHIJIAN')"
      >
      </el-table-column>
    </iTableML>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="page.pageNum"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      :prev-text="$t('MT_SHANGYIYE')"
      :next-text="$t('MT_XIAYIYE')"
      :total="total"
    />
  </div>
</template>

<script>
import { iPagination, iMessage } from "rise";
import { iButton } from "rise";
import iTableML from "@/components/iTableML";
// import { MOCK_FILE_URL } from "@/constants";
import { download } from "@/utils/downloadUtil";
import { getFileByIds } from "@/api/file/filedownload.js";
import { MIME_TYPE } from "@/api/file/type.js";
import dayjs from "dayjs";
export default {
  components: {
    iButton,
    iPagination,
    iTableML,
  },
  data() {
    return {
      selectVal: [],
      tableData: [],
      page: {
        pageSize: 10,
        pageNum: 1,
      },
      total: 1,
    };
  },
  props: {
    documents: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    documents: {
      async handler(docs) {
        //let p = [];
        // for (let item of docs) {
        //   let a = new Promise((resolve, reject) => {
        //     this.getDocType(item.attachmentId).then((suffix) => {
        //       resolve(suffix);
        //     });
        //   });
        //   p.push(a);
        // }
        // Promise.all(p).then((typeArrSuffix) => {
        //   docs = docs.map((it, index) => {
        //     return {
        //       ...it,
        //       name: it.name + "." + typeArrSuffix[index],
        //       updateDate: dayjs(it.updateDate).format("YYYY-MM-DD HH:mm"),
        //     };
        //   });
        //   this.tableData = docs.slice(0, 1 * this.page.pageSize);
        //   console.log(this.tableData);
        //   this.total = docs.length;
        // });
        let d = [];
        for (let item of docs) {
          let a = new Promise((resolve) => {
            getFileByIds([item.attachmentId]).then((data) => {
              resolve(data[0]);
            });
          });
          d.push(a);
        }
        Promise.all(d).then((dArr) => {
          console.log("dArr", dArr);
          dArr = dArr
            .filter((item) => {
              return item;
            })
            .map((it) => {
              return {
                ...it,
                updateDate: dayjs(it.createDate).format("YYYY-MM-DD HH:mm"),
              };
            });
          this.tableData = dArr.slice(0, 1 * this.page.pageSize);
          this.total = dArr.length;
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.selectVal = [...val];
    },
    // 下载更多
    handleDownLoad() {
      let promiseList = [];
      this.selectVal.forEach((item) => {
        const arr = item.name.split(".");
        const suffix = arr[arr.length - 1];
        let p = new Promise((resolve, reject) => {
          download({
            // url: MOCK_FILE_URL + item.attachmentId,
            fileIds: item.id,
            filename: item.name,
            callback: (e) => {
              if (!e) {
                reject(e);
                iMessage.error("下载失败");
              }
              resolve(e);
            },
            type: MIME_TYPE[suffix],
          });
        });
        promiseList.push(p);
      });
      Promise.all(promiseList);
    },
    // async getDocType(id) {
    //   const res = await getDoucumentsById(id);
    //   if (res) {
    //     const arr = res.name.split(".");
    //     let suffix = res.name.split(".")[arr.length - 1];
    //     if (suffix === "3gp") {
    //       suffix = "gp3";
    //     } else if (suffix === "3g2") {
    //       suffix = "g23";
    //     } else if (suffix === "7z") {
    //       suffix = "z7";
    //     }
    //     return suffix;
    //   }
    //   return "";
    // },
    handleDownLoadSingle(item) {
      const arr = item.name.split(".");
      const suffix = arr[arr.length - 1];
      download({
        // url: MOCK_FILE_URL + item.attachmentId,
        fileIds: item.id,
        filename: item.name,
        callback: (e) => {
          if (!e) {
            iMessage.error("下载失败");
          }
        },
        type: MIME_TYPE[suffix],
      });
    },
    //选择页数
    handleCurrentChange(curPage) {
      this.page.pageNum = curPage;
      this.currentChangePage(this.documents, this.page.pageNum);
    },
    // 分页方法
    currentChangePage(data, pageNum) {
      let from = (pageNum - 1) * this.page.pageSize;
      let to = pageNum * this.page.pageSize;
      this.tableData = data.slice(from, to);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .cell {
  padding: 0;
}
.doc-name {
  color: #1763f7;
  cursor: pointer;
}
.img-word {
  display: flex;
  justify-content: center;
  div:first-child {
    width: 30px;
    text-align: center;
    margin-right: 9.42px;
  }
}
::v-deep .open-link-text {
  cursor: pointer;
}

.row-el {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
  .add-topic {
    margin-right: 20px;
  }
}

::v-deep .unuse-row {
  color: #acb8cf;
}
::v-deep .active-row {
  background: #1660f1 !important;
  color: #fff;
}
::v-deep .el-table--enable-row-hover .el-table__body .active-row:hover > td {
  background: #1660f1;
  color: #fff;
}
::v-deep .el-table__body tr.active-row > td {
  background: #1660f1;
  color: #fff;
}
::v-deep .card .cardBody {
  padding: 0;

  .iSearch-content {
    justify-content: space-between;
  }
}
</style>
