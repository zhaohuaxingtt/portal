<template>
  <div>
    <iTableML tooltip-effect="light" :data="tableListData">
      <!-- <el-table-column type="selection" align="center"></el-table-column> -->
      <el-table-column align="center" :width="48">
        <template scope="scope">
          <div class="radio-box">
            <div
              name="radio"
              :ref="'radio' + scope.row.id"
              :class="'radio' + scope.row.id"
              @click="
                () => {
                  handleRadio(scope.row, 'radio' + scope.row.id);
                }
              "
            >
              <div class="dot"></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="会议名称">
        <template scope="scope">
          <span class="open-link-text">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="会议类型">
        <template scope="scope">
          <span class="open-link-text">{{
            typeObject[scope.row.meetingTypeId]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="会议状态">
        <template scope="scope">
          <span class="circle circle1" v-if="scope.row.state === '02'">{{
            statusObj[scope.row.state]
          }}</span>
          <span class="circle circle2" v-if="scope.row.state === '03'">{{
            statusObj[scope.row.state]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="会议地点"
        prop="meetingPlace"
      ></el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="会议时间">
        <template scope="scope">
          <span>{{
            `${scope.row.startDate}
              ${scope.row.startTime ? scope.row.startTime.substring(0, 5) : ""}~
              ${scope.row.endTime ? scope.row.endTime.substring(0, 5) : ""}`
          }}</span>
        </template>
      </el-table-column>
    </iTableML>

    <iPagination
      v-update
      @current-change="handleCurrentChange($event)"
      background
      :page-sizes="page.pages"
      :page-size="page.pageSize"
      prev-text="上一页"
      next-text="下一页"
      layout="prev, pager, next, jumper"
      :current-page="page.currPage"
      :total="page.total"
    />
  </div>
</template>

<script>
import { iPagination } from "rise";
import iTableML from "@/components/iTableML";
import { statusObj } from "./data";
import resultMessageMixin from "@/mixins/resultMessageMixin";
import enclosure from "@/assets/images/enclosure.svg";
import beginVedio from "../../../../../assets/images/meeting-home/beginVedio.svg";
import closeVedio from "../../../../../assets/images/meeting-home/close-vedio.svg";
import change from "../../../../../assets/images/meeting-home/change.svg";
import doubleScreen from "../../../../../assets/images/meeting-home/doubleScreen.svg";
import endVedio from "../../../../../assets/images/meeting-home/endVedio.svg";
import importFile from "../../../../../assets/images/meeting-home/import.svg";
import newAgenda from "../../../../../assets/images/meeting-home/newAgenda.svg";
import newFile from "../../../../../assets/images/meeting-home/newFile.svg";
import openLock from "../../../../../assets/images/meeting-home/openLock.svg";
import lock from "../../../../../assets/images/meeting-home/lock.svg";
import screen from "../../../../../assets/images/meeting-home/screen.svg";
import uploadFile from "../../../../../assets/images/meeting-home/uploadFile.svg";
import upload from "../../../../../assets/images/meeting-home/upload.svg";

export default {
  components: {
    iTableML,
    iPagination,
  },
  mixins: [resultMessageMixin],
  props: {
    tableListData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    typeObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
    page: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      radio: "",
      beginVedio,
      closeVedio,
      change,
      doubleScreen,
      endVedio,
      importFile,
      newAgenda,
      newFile,
      openLock,
      lock,
      screen,
      uploadFile,
      upload,
      statusObj,
      enclosure,
      selectTableData: [],
      tableLoading: false,
      assignDialog: false,
      returnDialog: false,
      transferDialog: false,
      qualitativeScoringDialog: false,
      reScoringDialog: false,
      viewDialog: false,
      assignQualitativeScoreList: [],
      transferQualitativeScoreList: [],
      assignQualitativeScoreLoading: false,
      transferQualitativeScoreLoading: false,
      selectedRow: [],
      openAddSingle: false,
    };
  },
  methods: {
    handleRadio(row, str) {
      this.selectedRow = row;
      for (let key in this.$refs) {
        if (!this.$refs[key]) {
          continue;
        }
        this.$refs[key].classList.remove("radioed");
      }
      this.$refs[str].classList.toggle("radioed");
      this.$emit("handleSelected", [row]);
    },
    // handleChoose(e) {
    //   this.selectedRow = e;
    //   this.$emit("handleSelected", e);
    // },
    handleCurrentChange(e) {
      this.$emit("handleChangePage", e);
    },
  },
};
</script>

<style scoped lang="scss">
.radio-box {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  div[name="radio"] {
    /* flex-grow: 1;
    flex-shrink: 0; */
    width: 14px;
    height: 14px;
    border: 1px solid #666;
    border-radius: 50%;
  }
  .radioed {
    display: flex;
    justify-content: center;
    align-items: center;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #1663f6;
      transform: translate(0.3px, 0.5px);
    }
  }
  /* .haveNoRadio {
    width: 10px;
    height: 10px;
    border: 1px solid blue;
    border-radius: 50%;
  } */
}

/* ::v-deep .circle1::before {
  content: "";
  display: inline-block;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: #09bdfe;
  position: relative;
  top: 2px;
  margin-right: 10px;
}
::v-deep .circle2::before {
  content: "";
  display: inline-block;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: #f286a0;
  position: relative;
  top: 2px;
  margin-right: 10px;
} */
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep .open-link-text {
  color: #000;
}

::v-deep .attachments-box {
  display: flex;
  justify-content: center;

  .attachments-icon {
    width: 20px;
    height: 20px;
  }

  .attachments-num {
    line-height: 20px;
  }
}

::v-deep .meeting-home-action-box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > p {
    display: flex;
    img {
      margin-left: 4px;
      margin-right: 2px;
    }

    .begin-vedio {
      width: 21px;
      height: 23px;
    }
    .open-lock {
      width: 17px;
      height: 20px;
    }
    .lock {
      width: 20px;
      height: 20px;
    }
    .change {
      width: 21px;
      height: 23px;
    }
    .upload {
      width: 24px;
      height: 23px;
    }
    .new-agenda {
      width: 20px;
      height: 20px;
    }
    .import-file {
      width: 20px;
      height: 20px;
    }
    .end-vedio {
      width: 20px;
      height: 20px;
    }
    .double-screen {
      width: 25px;
      height: 20px;
    }
    .screen {
      width: 24px;
      height: 20px;
    }
    .close-vedio {
      width: 20px;
      height: 20px;
    }
    .new-file {
      width: 18px;
      height: 20px;
    }
    .upload-file {
      width: 18px;
      height: 20px;
    }
  }
}
</style>
