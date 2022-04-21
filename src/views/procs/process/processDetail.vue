<template>
  <div class="main" v-loading="loading">
    <div class="list">
      <el-popover placement="right" trigger="click">
        <el-tree
          class="tree"
          :data="directory"
          :expand-on-click-node="false"
          default-expand-all
          @node-click="dirClick"
        >
          <span class="custom-tree-node" slot-scope="{ data }">
            <span>{{ data.name.ch }}</span>
          </span>
        </el-tree>
        <el-button
          size="mini"
          title="流程目录"
          style="height: 32px"
          slot="reference"
          icon="el-icon-s-fold"
        ></el-button>
      </el-popover>

      <el-button
        style="margin-top: 8px; height: 32px"
        title="打印"
        size="mini"
        icon="el-icon-printer"
        @click="print.show = true"
      ></el-button>
    </div>

    <LayHeader title="流程管理"></LayHeader>
    <div class="flex justify-between items-center mt20">
      <div class="title">
        {{ detail.name }}
        <el-popover
          placement="right"
          trigger="click"
          v-show="detail.workFlowFile && detail.workFlowFile.length > 0"
        >
          <div
            class="cursor"
            v-for="file in detail.workFlowFile"
            :key="file.id"
            style="margin: 10px 0"
            @click="
              downAttach(file.attachMents[0] ? file.attachMents[0].url : '')
            "
          >
            {{ file.name }} {{ file.publishDate }}
          </div>
          <span slot="reference"><i class="cursor el-icon-download"></i></span>
        </el-popover>
      </div>
      <div class="expert">
        <div class="flex">
          <span>流程专家： </span>
          <span
            class="name"
            v-for="item in detail.experts"
            :key="item.id"
            @click="openExpert(item)"
            >{{ item.name }}</span
          >
        </div>
        <div>版本：{{ detail.version }} 最后更新 {{ detail.updateDt }}</div>
      </div>
    </div>

    <div class="subtitle">
      <div class="tlt">{{ pageDetail.name }}</div>
      <!-- <div>分页</div> -->
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="currentPage"
        :page-size="1"
        layout="prev, pager, next, jumper"
        :total="detail.pageIds ? detail.pageIds.length : 0"
      >
      </el-pagination>
    </div>
    <div class="mt20 flex">
      <div class="flex-1 mr20" v-loading="pageLoading">
        <div class="card-l mb20">
          <div class="content w-e-text" v-html="pageDetail.richContent"></div>
          <div class="card-bottom flex justify-between items-center">
            <span><i class="el-icon-view"></i> {{ pageDetail.pageView }}</span>
            <!-- <span>分页</span> -->
            <el-pagination
              @current-change="handlePageChange"
              :current-page.sync="currentPage"
              :page-size="1"
              layout="prev, pager, next, jumper"
              :total="detail.pageIds ? detail.pageIds.length : 0"
            >
            </el-pagination>
          </div>
        </div>
        <UiCard
          title="常见问题"
          v-if="faqList.length > 0"
          class="process-img"
          :color="false"
        >
          <iButton
            slot="head-right"
            @click="
              $router.push({
                path: '/cf-ProCS/collect',
                query: { processId: id }
              })
            "
            >MORE</iButton
          >
          <template slot="content">
            <iQuestion :list="faqList" @queryFAQ="queryFAQ"></iQuestion>
          </template>
        </UiCard>
      </div>
      <div class="side">
        <UiCard
          title="ProD文档"
          class="process-img"
          nameKey="title"
          :list="detail.proDocsList"
          :color="false"
          @row-click="openDoc"
        >
          <div slot="item-right" slot-scope="{ data }">
            {{ data.publishTime }}
          </div>
        </UiCard>
        <UiCard
          title="流程图"
          v-if="detail.flowChart"
          class="process-img"
          :color="false"
        >
          <div slot="content" class="draw cursor" @click="view('img')">
            <img
              style="width: 100%"
              :src="detail.flowChart ? fileFmt(detail.flowChart.filePath) : ''"
              alt=""
            />
          </div>
        </UiCard>
        <UiCard title="系统操作" class="process-img" :color="false">
          <div
            slot="head-right"
            class="video-btn cursor"
            v-if="
              pageDetail.attachMentsKV &&
              pageDetail.attachMentsKV['operatorVideo']
            "
            @click="view('video')"
          >
            <i class="el-icon-video-play"></i>
            视频
          </div>
          <template slot="content">
            <div
              class="draw cursor"
              v-if="
                pageDetail.attachMentsKV &&
                pageDetail.attachMentsKV['operatorImage']
              "
              @click="
                downAttach(
                  pageDetail.attachMentsKV['operatorFile']
                    ? pageDetail.attachMentsKV['operatorFile'].url
                    : ''
                )
              "
            >
              <img
                style="width: 100%"
                :src="
                  pageDetail.attachMentsKV &&
                  pageDetail.attachMentsKV['operatorImage'] &&
                  fileFmt(pageDetail.attachMentsKV['operatorImage'].url)
                "
                alt=""
              />
            </div>
            <template>
              <div class="file-tlt">流程附件</div>
              <div
                class="flex row cursor"
                v-for="l in sampleList"
                :key="l.id"
                @click="
                  downAttach(l.attachMents[0] ? l.attachMents[0].url : '')
                "
              >
                <span>{{ l.name }}</span>
                <span>{{ l.version }} {{ l.publishDate }}</span>
              </div>
              <div class="no-data" v-if="sampleList.length == 0">暂无数据</div>
            </template>
          </template>
        </UiCard>
      </div>
    </div>
    <!-- 专家信息 -->
    <expertInfo :show.sync="showInfo" :info="exInfo"></expertInfo>

    <iDialog
      :title="dialog.type == 'img' ? '流程图' : '视频'"
      :visible.sync="dialog.show"
      width="70%"
      @close="closeDialog"
      append-to-body
      class="qs-dialog"
    >
      <div class="pb20 content">
        <ProcessDraw
          v-if="dialog.type == 'img'"
          :data="dialog.drawInfo"
          @change="clickDraw"
        ></ProcessDraw>
        <video
          style="width: 100%"
          ref="video"
          controls
          v-else
          :src="dialog.url"
        ></video>
      </div>
    </iDialog>
    <!-- 打印 -->
    <iDialog
      title="打印预览"
      :visible.sync="print.show"
      width="70%"
      @close="closeDialog"
      append-to-body
    >
      <div class="pb20 print" id="process-print">
        <h3 class="title1">{{ detail.name }}</h3>
        <div class="title2">{{ pageDetail.name }}</div>
        <div class="content w-e-text" v-html="pageDetail.richContent"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <iButton @click="print.show = false">取消</iButton>
        <iButton @click="printHandle">打印</iButton>
      </span>
    </iDialog>
  </div>
</template>

<script>
import LayHeader from './../components/LayHeader.vue'
import UiCard from './../components/UiCard.vue'
import { iButton, iDialog } from 'rise'
import expertInfo from './components/expertInfo'
import iQuestion from './components/iQuestion.vue'
import {
  getWorkFlow,
  queryPageSample,
  queryPageFAQ,
  getWorkFlowPage,
  getProcessCatalog
} from '@/api/procs'
import mixin from './../mixins'
import ProcessDraw from './../components/ProcessDraw'

import print from 'print-js'
import 'print-js/dist/print.css'
export default {
  components: {
    LayHeader,
    UiCard,
    iButton,
    expertInfo,
    iQuestion,
    iDialog,
    ProcessDraw
  },
  mixins: [mixin],
  data() {
    return {
      list: [
        { name: 'TFW生产运营绩效评价管理办法', id: 1 },
        { name: 'TFW生产运营绩效评价管理办法', id: 1 },
        { name: 'TFW生产运营绩效评价管理办法', id: 1 }
      ],
      detail: {},
      showInfo: false,
      exInfo: {},
      currentPage: 1,
      dialog: {
        show: false,
        type: 'img',
        url: '',
        drawInfo: {}
      },
      print: {
        show: false
      },
      loading: false,
      pageLoading: false,
      id: this.$route.query.id,
      pageId: this.$route.query.pageId,
      sampleList: [],
      faqList: [],

      pageDetail: {},
      directory: []
    }
  },
  created() {
    this.queryDetail()
    this.getProcessCatalog()
  },
  methods: {
    // 详情
    async queryDetail() {
      this.loading = true
      try {
        this.detail = await getWorkFlow(this.id)
        let id = ''
        // this.detail.pageIds = this.detail.pageIds ? JSON.parse(this.detail.pageIds) : []
        if (this.detail.pageIds && this.detail.pageIds.length > 0) {
          if (this.pageId) {
            let index = this.detail.pageIds.findIndex((e) => e == this.pageId)
            if (index !== -1) {
              id = this.detail.pageIds[index]
              this.currentPage = index + 1
            } else {
              id = this.detail.pageIds[0]
            }
          } else {
            id = this.detail.pageIds[0]
          }
          this.init(id)
        }
      } finally {
        this.loading = false
      }
    },
    init(id) {
      this.queryPageSample(id)
      this.getPageDetail(id)
      this.queryPageFAQ(id)
    },
    // 查询目录
    async getProcessCatalog() {
      let res = await getProcessCatalog(this.id)
      this.directory = res?.children || []
    },
    // 流程附件
    async queryPageSample(id) {
      let res = await queryPageSample(id)
      this.sampleList = res.content
    },
    // 流程问题
    async queryPageFAQ(id) {
      let res = await queryPageFAQ(id)
      this.faqList = res.content
    },
    // 流程页面详情
    async getPageDetail(id) {
      this.pageLoading = true
      try {
        this.pageDetail = await getWorkFlowPage(id)
        if (this.pageDetail.attachMents) {
          this.pageDetail.attachMentsKV = {}
          this.pageDetail.attachMents.forEach((e) => {
            this.pageDetail.attachMentsKV[e.name] = e
          })
        }
      } finally {
        this.pageLoading = false
      }
    },
    async queryFAQ() {
      this.queryPageFAQ(this.detail.pageIds[0])
    },
    clickDraw(v) {
      this.$router.push({
        path: '/cf-ProCS/processDetail',
        query: { id: this.id, pageId: v.contentId }
      })
    },
    openDoc(row) {
      window.open(row.docUrl)
    },
    // 专家信息
    openExpert(info) {
      this.exInfo = info
      this.showInfo = true
    },
    handlePageChange(curPage) {
      this.init(this.detail.pageIds[curPage - 1])
    },
    view(t) {
      this.dialog.type = t
      if (t == 'img') {
        this.dialog.drawInfo = this.detail.flowChart
      } else {
        let url = this.pageDetail.attachMentsKV['operatorVideo'].url
        this.dialog.url = this.fileFmt(url)
      }
      this.dialog.show = true
    },
    closeDialog() {
      this.$refs.video && this.$refs.video.pause()
      this.dialog.show = false
    },
    downAttach(url) {
      if (!url) return
      let downLoadUrl = url.split('uploader/')[1]
      window.open(downLoadUrl)
    },
    dirClick(v) {
      this.init(v.pageId)
      this.currentPage = this.detail.pageIds.indexOf(v.pageId) + 1
    },
    printHandle() {
      print({
        printable: 'process-print',
        type: 'html',
        targetStyles: ['*'] // 打印内容使用所有HTML样式，没有设置这个属性/值，设置分页打印没有效果
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../comon';

$line-color: #bbc4d6;
.main {
  position: relative;
}
.list {
  position: fixed;
  left: 105px;
  top: 47%;
  z-index: 999;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.expert {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .name {
    margin-right: 10px;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #1660f1;
    }
  }
}

.subtitle {
  margin-top: 10px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid $line-color;
  border-bottom: 1px solid $line-color;
  .tlt {
    font-size: 18px;
    color: #1660f1;
    font-weight: bold;
  }
}

.process-img {
  height: auto !important;
  .draw {
    padding: 10px 20px;
  }

  .file-tlt {
    padding: 10px 20px;
    border-bottom: 1px solid $line-color;
  }

  .row {
    padding: 15px 20px;
    justify-content: space-between;
    align-items: center;
  }
}
.print {
  .title1 {
    font-size: 30px;
  }
  .title2 {
    padding: 10px 0;
    font-size: 20px;
    border-top: 1px solid $line-color;
    border-bottom: 1px solid $line-color;
    font-weight: bold;
    color: #1660f1;
  }
  .content {
    padding: 10px;
  }
}
.video-btn {
  color: #1660f1;
  i {
    font-size: 20px;
  }
}
.card-l {
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
  border-radius: 10px;
  .content {
    padding: 20px;
  }

  .card-bottom {
    padding: 20px;
    border-top: 1px solid $line-color;
  }
}

.tree {
  ::v-deep .el-tree-node__content {
    margin: 5px 0;
  }
}
.side {
  width: 450px;
}
</style>
