<template>
  <iPage>
    <div class="content" v-loading="loading">
      <div class="leftContent" ref="box">
        <div v-for="(item, idx) in projectInfoData" :key="idx">
          <div
            v-show="item.xco"
            :ref="'point' + (idx + 1)"
            :class="item.id === currProId ? 'shadow' : ''"
            class="drag-box"
            :id="`testDiv${idx}`"
            :style="{
              width: item.width + 'px',
              height: item.height + 'px',
              top: item.yco + 'px',
              left: item.xco + 'px',
              display: 'block'
            }"
          ></div>
        </div>
        <!-- <img src="~@/assets/images/mainProcess.png" class="img-process" /> -->
        <div
          @mousedown.capture="mouseStart"
          @mouseup.capture="mouseEnd"
          :style="imgStyle"
        >
          <div style="user-select: none">
            <img :src="filePath" class="img-process" ref="imgProcess" />
          </div>
        </div>
      </div>
      <div class="rightContent">
        <el-tabs
          v-model="activeName"
          class="tabs"
          @tab-click="handleClick($event)"
        >
          <el-tab-pane :label="language('基本信息')" name="baseInfo">
            <BaseInfo
              :name="baseInfoName"
              :currId="currId"
              @updateFlowchartFun="updateFlowchartFun"
              @createFlowchart="createFlowchart"
            />
          </el-tab-pane>
          <el-tab-pane
            :label="language('项目信息')"
            name="projectInfo"
            class="tab-project"
          >
            <ProjectInfo
              ref="project"
              :listData="projectInfoData"
              :processList="processList"
              @handelStyle="handelStyle"
              @getProjectIdx="getProjectIdx"
              @addData="addData"
              @delData="delData"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import BaseInfo from './components/baseInfo'
import ProjectInfo from './components/projectInfo'
import {
  getFlowchartInfo,
  loadProcessPageList,
  createFlowchartInfo,
  updateFlowchart,
  queryCanUseProcessList,
  queryProcessList,
  addFlowchartNode,
  delFlowchartNode,
  updateFlowchartNode,
  getProcessFlowchart,
  createProcessFlowchart
} from '@/api/adminProCS'

export default {
  name: 'mainProcess',
  components: {
    iPage,
    BaseInfo,
    ProjectInfo
  },
  computed: {
    imgStyle() {
      const style = {}
      if (this.imgWidth) {
        style.width = this.imgWidth + 'px'
      }
      return style
    }
  },
  data() {
    return {
      startX: null,
      startY: null,
      endX: null,
      endY: null,
      currWidth: null,
      currHeight: null,
      clickFlag: false,
      activeName: 'baseInfo',
      baseInfoName: null,
      projectInfoData: [],
      currIndex: 0,
      modifyFlag: false,
      canDrawFlag: false,
      filePath: null, // 流程图路径
      currId: null, // 主流程id
      currProId: null,
      hotAreas: [], // 热点区域列表
      processList: null, // 项目链接
      loading: false,
      flowChartId: this.$route.query.flowChartId,
      processId: this.$route.query.processId,
      delFlag: false,
      imgWidth: 0
    }
  },
  created() {
    this.getMainChartInfo()
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.imgProcess) {
        this.$refs.imgProcess.onload = () => {
          if (this.$refs.imgProcess.width) {
            this.imgWidth = this.$refs.imgProcess.width
          }
        }
      }
    })
  },
  methods: {
    async getMainChartInfo() {
      try {
        this.loading = true
        let res = ''
        if (this.processId) {
          if (this.flowChartId) {
            res = await getProcessFlowchart(this.flowChartId)
          }
        } else {
          res = await getFlowchartInfo()
        }
        if (res) {
          this.dealData(res)
          this.loading = false
        }
      } finally {
        this.loading = false
      }
    },
    // 创建基本信息
    async createFlowchart(name, file) {
      let params = {
        name: name,
        file: file,
        category: this.processId ? 'flowchart.auxiliar' : 'flowchart.main'
      }
      this.loading = true
      try {
        let formData = new FormData()
        Object.keys(params).forEach((item) => {
          formData.append(item, params[item])
        })
        if (this.processId) {
          // 添加子流程图
          let res = await createProcessFlowchart(this.processId, formData)
          this.dealData(res)
        } else {
          await createFlowchartInfo(formData).then((res) => {
            this.dealData(res)
          })
        }
      } finally {
        this.loading = false
      }
    },
    // 修改基本信息
    async updateFlowchartFun(name, file) {
      let params = {
        name: name,
        file: file,
        category: 'flowchart.main'
      }
      let formData = new FormData()
      Object.keys(params).forEach((item) => {
        formData.append(item, params[item])
      })
      try {
        this.loading = true
        await updateFlowchart(this.currId, formData).then((res) => {
          this.dealData(res)
          this.loading = false
        })
      } finally {
        this.loading = false
      }
    },
    dealData(res) {
      console.log(res)
      this.filePath = res.filePath?.split('/uploader/')[1] || ''
      this.baseInfoName = res.name
      // 第一次新增子流程时 流程列表还没flowChartId 需要从新建里的详情获取
      if (!this.flowChartId) {
        this.flowChartId = res.id || ''
      }
      this.currId = res?.id || ''
      let hotAreas = res.hotAreas || []
      hotAreas.map((item) => {
        item.flowId = item.flowId + ''
      })
      hotAreas.unshift({
        name: 'add',
        height: '',
        width: ''
      })
      this.projectInfoData.splice(0, 0)
      this.$nextTick(() => {
        this.projectInfoData = hotAreas
      })
      this.$forceUpdate()
    },
    handleClick(event) {
      if (event.index == '1') {
        if (this.processId) {
          this.loadProcessPageList()
        } else {
          // 获取流程列表
          this.getProcessList()
        }
        this.canDrawFlag = true
      } else {
        this.canDrawFlag = false
      }
    },
    async getProcessList() {
      const params = {
        page: 0,
        size: 1000
      }
      //  CIRW2-708 换接口
      // 【Pro CS】流程管理，主流程图添加跳转流程时，下架的流程不能选择
      // const res = await queryCanUseProcessList(params)
      const res = await queryProcessList(params)
      this.processList = res.content || []
    },
    async loadProcessPageList() {
      let params = {
        page: 0,
        size: 1000
      }
      let res = await loadProcessPageList(this.processId, params)
      this.processList = res.content || []
    },

    mouseStart(e) {
      console.log('canDrawFlag', this.canDrawFlag)
      if (!this.canDrawFlag) return
      this.startX = e.layerX
      this.startY = e.layerY
      this.clickFlag = true
    },
    mouseEnd(e) {
      // if (!this.canDrawFlag) return
      this.endX = e.layerX
      this.endY = e.layerY
      this.clickFlag = false
      console.log('mouseEnd', this.startX, this.startY, this.endX, this.endY)
      if (this.startX && this.startY && this.endX && this.endY) {
        this.currWidth = Math.abs(this.endX - this.startX)
        this.currHeight = Math.abs(this.endY - this.startY)
        // this.$nextTick(()=> {
        console.log(`testDiv${this.currIndex}`)
        let divIndex = null
        if (this.modifyFlag) {
          console.log('modify')
          divIndex = this.currIndex
        } else {
          console.log('add', this.projectInfoData.length)
          divIndex = 0
        }
        let testDiv = document.getElementById(`testDiv${divIndex}`)
        let X = this.$refs.box.scrollLeft
        let Y = this.$refs.box.scrollTop
        testDiv.style.display = 'block'
        testDiv.style.top = `${this.startY + Y}px`
        testDiv.style.left = `${this.startX + X}px`
        testDiv.style.width = `${this.currWidth}px`
        testDiv.style.height = `${this.currHeight}px`
        // })
        let obj = {
          yco: parseInt(this.startY + Y),
          xco: parseInt(this.startX + X),
          width: parseInt(this.currWidth),
          height: parseInt(this.currHeight)
        }
        if (this.modifyFlag) {
          obj.name = this.projectInfoData[this.currIndex + 1].name
          obj.contentId = this.projectInfoData[this.currIndex + 1].contentId
          let testArrData = JSON.parse(JSON.stringify(this.projectInfoData))
          // this.projectInfoData.splice(this.currIndex + 1, 1, obj)
          testArrData[this.currIndex + 1] = obj
          this.projectInfoData.splice(0, 0)
          this.projectInfoData = testArrData
          /* this.$nextTick(() => {
                        this.projectInfoData = testArrData
                        this.$forceUpdate()
                    }) */
          // debugger
        }
        // this.modifyFlag = false
        this.$refs.project.initItem(obj)
      }
    },
    handelStyle(e, va) {
      let testDiv = document.getElementById(`testDiv${this.currIndex}`)
      if (va === 'x') {
        testDiv.style.left = `${e}px`
      } else if (va === 'y') {
        testDiv.style.top = `${e}px`
      } else if (va === 'width') {
        testDiv.style.width = `${e}px`
      } else {
        testDiv.style.height = `${e}px`
      }
    },
    getCircleId(idx) {
      this.currIndex = idx - 1
    },
    getProjectIdx(index, row) {
      this.currProId = row.id
      if (index !== 0) {
        this.modifyFlag = true
      } else {
        this.getMainChartInfo()
        this.modifyFlag = false
      }
      this.currIndex = index - 1
      this.$refs[`point${index + 1}`][0].scrollIntoViewIfNeeded()
    },
    async addData(row) {
      if (row.id) {
        // 修改
        let obj = {
          name: row.name,
          xco: row.xco,
          width: row.width,
          yco: row.yco,
          height: row.height
        }
        if (this.processId) {
          //子流程图
          obj.pageId = row.flowId
        } else {
          obj.flowId = row.flowId
        }
        let formData = new FormData()
        Object.keys(obj).forEach((item) => {
          formData.append(item, obj[item])
        })
        let currProId = row.id || ''
        try {
          this.loading = true
          await updateFlowchartNode(this.currId, currProId, formData).then(
            (res) => {
              if (res) {
                this.$message({ type: 'success', message: '修改项目信息成功' })
                this.getMainChartInfo()
              }
            }
          )
        } finally {
          this.loading = false
        }
      } else {
        // 新增
        let data = JSON.parse(JSON.stringify(row))
        if (this.processId) {
          //子流程图
          data.pageId = row.flowId
        }
        let formData = new FormData()
        Object.keys(data).forEach((item) => {
          formData.append(item, data[item])
        })
        try {
          this.loading = true
          await addFlowchartNode(this.currId, formData).then((res) => {
            if (res) {
              this.$message({ type: 'success', message: '新增项目信息成功' })
              this.getMainChartInfo()
            }
          })
        } finally {
          this.loading = false
        }
      }
    },
    async delData() {
      let divZeroElement = document.getElementById('testDiv0')
      if (divZeroElement) {
        divZeroElement.style.display = 'none'
      }
      await delFlowchartNode(this.currProId).then((res) => {
        if (res?.success) {
          this.delFlag = true
          this.modifyFlag = false
          this.$message({ type: 'success', message: '删除当前项目信息成功' })
          this.getMainChartInfo()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100%;
  .leftContent {
    width: 80%;
    height: 900px;
    margin-right: 10px;
    border-right: 1px solid rgb(190, 184, 184);
    overflow: auto;
    position: relative;
    .img-process {
      pointer-events: none;
    }
    .drag-box {
      position: absolute;
      display: none;
      background-color: rgba(235, 59, 90, 0.5);
      pointer-events: none;
    }
  }
  .rightContent {
    // width: 20%;
    // height: 90%;
  }
}

::v-deep .tabs {
  height: 100%;
  .el-tab-pane {
    height: 100%;
  }
  .el-tabs__content {
    // height: 100%;
    overflow: auto;
  }
  .el-tab-pane {
    height: 100%;
  }
}
// .shadow {
//   box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.65);
// }
</style>
