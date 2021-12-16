<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:22
 * @LastEditTime: 2021-12-16 11:03:03
 * @LastEditors: caopeng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal-new\src\views\bpm\task\components\detailProcessForm.vue
-->
<template>
  <div ref="iframe" v-if="url" class="margin-bottom20">
    <!-- <iTabsList v-model="tabsValue" @tab-click="tableChange" type="card" slot="components" calss="margin-top20 iTabsList">
        <el-tab-pane :name="1" label="Production Purchasing"></el-tab-pane>
        <el-tab-pane :name="2" label="MTZ Rules&Parts"></el-tab-pane>
    </iTabsList> -->
    <!-- v-show="tabsValue == 1" -->
    <!-- src='http://localhost:8080/portal/#/changeOrder?mtzAppId=157821' -->

    <iframe
      :src="url"
      id="flowForm"
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      scrolling="no"
      allowtransparency="yes"
      :style="{
        height: autoFrameHeight ? autoFrameHeight + 'px' : frameHeight
      }"
    />
    <!-- <iCard v-show="tabsValue == 2">
      <div class="infor_futitle">
        <span class="big_font">Regulation:</span>
        <br />
        <span class="big_font">MTZ Payment=(Effective Price-Base Price)*Raw Material Weight*Settle accounts Quantity*Ratio</span>
        <span class="big_small">When:effective price > base price *(1+threshold)</span>
      </div>

      <p class="tableTitle">MTZ Rules</p>
      <tableList class="margin-top20"
                  :tableData="ruleTableListData"
                  :tableTitle="ruleTableTitle"
                  :index="true"
                  :selection="false"
                  >
        <template slot-scope="scope"
                  slot="compensationPeriod">
          <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
        </template>
        <template slot-scope="scope"
                  slot="thresholdCompensationLogic">
          <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
        </template>
        <template slot-scope="scope"
          slot="supplierId">
          <span>{{scope.row.supplierId}}</span><br/>
          <span>{{scope.row.supplierName}}</span>
        </template>
      </tableList>

      <p class="tableTitle">MTZ Parts</p>
      <tableList class="margin-top20"
                  :tableData="partTableListData"
                  :tableTitle="partTableTitle"
                  :index="true"
                  :selection="false"
                  >
        <template slot-scope="scope"
                  slot="compensationPeriod">
          <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
        </template>
        <template slot-scope="scope"
                  slot="thresholdCompensationLogic">
          <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
        </template>
        <template slot-scope="scope"
          slot="supplierId">
          <span>{{scope.row.supplierId}}</span><br/>
          <span>{{scope.row.supplierName}}</span>
        </template>
      </tableList>
    </iCard> -->
  </div>
</template>

<script>
import { iTabsList,iCard } from "rise";
import { ruleTableTitle,partTableTitle } from "./data";
import tableList from '@/components/commonTable/index.vue'
export default {
  name: 'flowForm',
  components:{
    iTabsList,
    iCard,
    tableList
  },
  props: {
    flowFormUrl: {
      type: String
    },
    formHeight: {
      type: String
    }
  },
  computed: {
    url() {
      if (!this.flowFormUrl) {
        return ''
      }
      if (this.flowFormUrl && this.flowFormUrl.indexOf('http') > -1) {
        return this.flowFormUrl
      }
      return 'http://' + this.flowFormUrl
    }
  },
  data() {
    return {
      frameHeight: '500px',
      autoFrameHeight: 0,
      tabsValue:2,
      ruleTableListData: [],
      partTableListData:[],
      partTableTitle,
      ruleTableTitle
    }
  },
  watch: {
    formHeight() {
      if (this.formHeight) {
        this.frameHeight = this.formHeight
      }
    }
  },
  created() {
    if (this.formHeight) {
      this.frameHeight = this.formHeight
    }
    let i=0
    window.addEventListener('message', this.setHeight)
         console.log( i=this.autoFrameHeight ? 111  : 222)

  },
  destroyed() {
    window.removeEventListener('message', this.setHeight)
  },
  updated() {
    this.$nextTick(() => {
      console.log(this.$refs.iframe)
      console.log(this.url)
      console.log(this.url.indexOf(window.location.origin) > -1)
      if (
        this.$refs.iframe &&
        this.url &&
        this.url.indexOf(window.location.origin) > -1
      ) {
        window.requestAnimationFrame(() => this.initIframeDomObserver())
      }
    })
  },
  methods: {
    tableChange(val){
      console.log(val)
    },
    setHeight(e) {
      if (e && e.data) {
        try {
          const data = e.data
          if (data.value && data.key === 'setFormHeight') {
            this.frameHeight = data.value
             console.log(data)
          }
        } catch (error) {
          console.log('error', error)
        }
      }
    },
    initIframeDomObserver() {
      const iframe = document.querySelector('#flowForm')
      iframe.contentWindow.addEventListener('load', () => {
        const iframeAppDom = iframe.contentWindow.document.querySelector('#app') // sourcing vue根DOM
        if (iframeAppDom) {
          const appDomObserver = new MutationObserver(() => {
            const tabsBoxWrap = iframeAppDom.querySelector('#tabsBoxWrap')
            if(tabsBoxWrap){
              this.autoFrameHeight = tabsBoxWrap ? tabsBoxWrap.clientHeight || 0 : 0
            }else{
              const iframeAppContentDom = iframeAppDom.querySelector('#appRouterView') // sourcing vue根一级router-view
              this.autoFrameHeight = iframeAppContentDom ? iframeAppContentDom.clientHeight || 0 : 0
            }
          })
          appDomObserver.observe(iframeAppDom, {
            childList: true,
            attributes: true,
            subtree: true
          })
          console.log(this.autoFrameHeight)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#flowForm {
  width: 100%;
  //   min-height: 500px;
}

.infor_futitle{
  padding:0.5rem 0;
  font-size:15px!important;
  line-height:25px;
  .big_font{
    font-weight: bold;
  }
  .big_small{
    padding-left:15px;
  }
}
.tableTitle {
  display: inline-block;
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
::v-deep .el-tabs--card .el-tabs__header{
  margin-bottom:10px!important;
}

::v-deep .el-table__header-wrapper{
  .el-table__header{
    .has-gutter{
      .cell{
        span{
          font-weight: bold!important;
        }
      }
    }
  }
}
</style>
