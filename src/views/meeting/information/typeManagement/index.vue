<template>
  <div class="card">
    <div class="card-list-container">
      <div class="swiper" ref="swiperRef">
        <div class="slide" v-for="(item, index) of meetingTypeA" :key="index">
          <card-box :item="item" @editMeetingType="editMeetingType"></card-box>
        </div>
      </div>
      <div class="click-area" v-if="meetingTypeA.length > 0">
        <div class="right" @click="handlePreClick">&lt;</div>
        <div class="left" @click="handleNextClick">&gt;</div>
      </div>
    </div>
    <actionButtons @add="add" />
    <i-table-custom
      :data="tableData"
      :columns="tableColumns"
      @editType="editType"
    />
    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="page.currPage"
      :page-size="page.pageSize"
      :page-sizes="page.pages"
      layout="prev, pager, next, jumper"
      :prev-text="$t('MT_SHANGYIYE')"
      :next-text="$t('MT_XIAYIYE')"
      :total="page.totalCount"
    />

    <addOrEditTypeDialog
      :openDialog="openDialog"
      @closeDialog="closeDialog"
      :editOrAdd="editOrAdd"
      :meetingTypeAll="meetingTypeAll"
      :meetingType="meetingType"
      v-if="openDialog"
      :clickScope="clickScope"
      @flushTable="flushTable"
    ></addOrEditTypeDialog>
    <editMeetingInformationDialog
      :openEditMeetingDialog="openEditMeetingDialog"
      @closeEditMeetingDialog="closeEditMeetingDialog"
      v-if="openEditMeetingDialog"
      @flushCard="flushCard"
      :clickMeetingTypeScope="clickMeetingTypeScope"
    ></editMeetingInformationDialog>
  </div>
</template>

<script>
import { iPagination } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {
  getDocumentTypeServiceByPage,
  deleteDocumentType,
  findMeetingDocuments
} from '@/api/meeting/information'
import { getMettingType } from '@/api/meeting/type'
import {
  actionButtons,
  addOrEditTypeDialog,
  editMeetingInformationDialog,
  cardBox
} from './components'
import { pageMixins } from '@/utils/pageMixins'
export default {
  mixins: [pageMixins],
  components: {
    iPagination,
    iTableCustom,
    actionButtons,
    addOrEditTypeDialog,
    editMeetingInformationDialog,
    cardBox
  },
  data() {
    return {
      tableColumns: [
        {
          type: 'index',
          label: '序号',
          i18n: 'MT_XUHAO2',
          width: 69,
          tooltip: false
        },
        {
          prop: 'name',
          label: '资料类型',
          i18n: 'MT_ZILIAOLEIXING',
          align: 'left',
          width: 399,
          tooltip: true
        },
        {
          prop: 'meetingTypes',
          label: '所属会议',
          i18n: 'MT_SUOSHUHUIYI',
          align: 'left',
          customRender: (h, scope) => {
            let fh = '，'
            return scope.row.meetingTypes
              .map(function (obj) {
                if (obj != null) {
                  if (obj.name != null) {
                    return obj.name
                  } else {
                    fh = ''
                  }
                } else {
                  fh = ''
                }
              })
              .join(fh)
            // return scope.row.meetingTypes && scope.row.meetingTypes[0] && scope.row.meetingTypes[0].name
          },
          tooltip: true
        },
        {
          label: '操作',
          i18n: 'MT_CAOZUO2',
          width: 154,
          tooltip: false,
          customRender: (h, scope) => {
            return h('span', [
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    color: '#1660f1'
                  },
                  class: 'el-icon-edit-outline open-link-text',
                  on: {
                    click: () => {
                      this.editType(scope.row)
                    }
                  }
                },
                this.$t('MT_XIUGAI')
              ),
              h(
                'a',
                {
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    color: '#1660f1'
                  },
                  class: 'open-link-text'
                },
                '|'
              ),
              h(
                'a',
                {
                  style: {
                    cursor: 'pointer',
                    color: '#1660f1'
                  },
                  class: 'el-icon-delete open-link-text',
                  on: {
                    click: () => {
                      this.deleteDocumentType(scope.row)
                    }
                  }
                },
                this.$t('MT_SHANCHU')
              )
            ])
          }
        }
      ],
      tableData: [],
      openDialog: false,
      editOrAdd: 'add',
      tableLoading: false,
      openEditMeetingDialog: false,
      meetingType: '',
      meetingTypeAll: [],
      clickScope: [],
      meetingTypeA: [],
      clickMeetingTypeScope: [],
      curIndex: 1
    }
  },
  mounted() {
    this.query()
    this.getMetting()
  },

  methods: {
    handlePreClick() {
      if (this.curIndex > 1) {
        this.curIndex--
      }
      this.translateX(this.$refs.swiperRef, this.curIndex)
      // console.log("this.cur", this.curIndex);
    },
    handleNextClick() {
      if (this.curIndex < this.meetingTypeAll.length - 2) {
        this.curIndex++
      }
      this.translateX(this.$refs.swiperRef, this.curIndex)
      // console.log("this.cur", this.curIndex);
    },
    //移动
    translateX(refDom, curIndex) {
      if (refDom) {
        refDom.style.transform = `translateX(${(1 - curIndex) * 32.125}rem)`
      }
    },

    // 会议类型
    async getMetting(type) {
      const data = {
        pageNum: 1,
        pageSize: 100,
        isCurrentUser: true
      }
      // getMettingType(data)
      //   .then((res) => {
      //     this.meetingTypeAll = [];
      //     this.meetingTypeAll = res.data;
      //     // console.log("this", this.meetingTypeAll);
      //     this.meetingType = this.meetingTypeAll.map((item) => {
      //       // console.log("item", item.name);
      //       return item.name;
      //     });
      //   })
      //   .catch((err) => {
      //     this.tableLoading = false;
      //   });
      const res = await getMettingType(data)
      this.meetingTypeAll = []
      this.meetingTypeAll = res.data
      // console.log("this", this.meetingTypeAll);
      this.meetingType = this.meetingTypeAll.map((item) => {
        // console.log("item", item.name);
        return item.name
      })
      if (type) {
        this.meetingTypeA = []
      }
      findMeetingDocuments({}).then((res) => {
        this.meetingTypeA = this.meetingTypeAll.filter((i) => {
          return res.map((item) => {
            if (item.meetingType.name == i.name) {
              i.word = item.documents.map((node) => {
                return { name: node.name, id: node.attachmentId }
              })
              // console.log("1", i);
            }
          })
        })
      })
    },

    editMeetingType(type) {
      this.clickMeetingTypeScope = type
      this.openEditMeetingDialog = true
      // console.log("type", type);
    },

    editType(scope) {
      this.clickScope = scope
      this.openDialog = true
      this.editOrAdd = 'edit'
      // console.log(scope);
    },
    deleteDocumentType(e) {
      // console.log(e);
      this.$confirm(this.$t('MT_QINGQUERENSHIFOUXUYAOSHANCHUGAIZILIAO?'), this.$t('MT_TISHI'), {
        confirmButtonText: this.$t('MT_SHI'),
        cancelButtonText: this.$t('MT_FOU'),
        type: 'warning'
      }).then(() => {
        deleteDocumentType({ id: e.id })
          .then((res) => {
            if (res.code === 200) {
              this.$message.success(this.$t('MT_SHANCHUCHENGGONG'))
            }
            this.query()
          })
          .catch(() => {
            //  this.$message.error("删除失败!");
          })
      })
    },
    query() {
      const data = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      getDocumentTypeServiceByPage(data)
        .then((res) => {
          // console.log(res);
          const { data, pageNum, pageSize, total, pages } = res
          this.page.currPage = pageNum
          this.page.pageSize = pageSize
          this.page.totalCount = total
          this.page.pages = pages
          this.tableData = data
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    add() {
      this.openDialog = true
      this.editOrAdd = 'add'
    },
    flushTable() {
      this.query()
    },
    flushCard() {
      this.getMetting('data')
    },
    closeDialog(bol) {
      this.openDialog = bol
    },
    closeEditMeetingDialog(bol) {
      this.openEditMeetingDialog = bol
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  // padding: 40px 0;
  .card-list-container {
    // position: relative;
    width: 98.875rem;
    padding-bottom: 200px;
    overflow: hidden;
    .click-area {
      top: 100px;
      height: 300px;
      opacity: 0.5;
      position: absolute;
      width: 100%;
      z-index: 100;
      .left,
      .right {
        display: none;
      }
    }
    .click-area:hover {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left,
      .right {
        display: block;
        width: 50px;
        height: 50px;
        background-color: #000;
        color: #fff;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 102;
      }
    }
  }
}
.swiper {
  margin-left: -15px;
  display: flex;
  // justify-content: space-between;
  transition: 0.5s;
  position: relative;
  .slide {
    width: 500px;
    height: 420px;
    flex-shrink: 0;
    flex-grow: 0 !important;
    z-index: 1;
    transition: 0.5s;
  }
  .slide + .slide {
    margin-left: 15px;
  }
}
</style>
