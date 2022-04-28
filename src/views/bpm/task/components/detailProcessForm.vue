<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:22
 * @LastEditTime: 2021-12-06 12:00:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\bpm\task\components\detailProcessForm.vue
-->
<template>
  <div ref="iframe" v-if="url" class="margin-bottom20">
    <!-- <iTabsList v-model="tabsValue" @tab-click="tableChange" type="card" slot="components" calss="margin-top20 iTabsList">
        <el-tab-pane :name="1" label="Production Purchasing"></el-tab-pane>
        <el-tab-pane :name="2" label="MTZ Rules&Parts"></el-tab-pane>
    </iTabsList> -->
    <!-- v-show="tabsValue == 1" -->
    <!-- <iframe
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
    /> -->
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
      // return "http://localhost:8080/portal/#/approval/frmRatingApproval/depthReportApproval?id=277&name=苏州和泰模塑有限公司"
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
      ruleTableTitle,
      iframeDom: null
    }
  },
  watch: {
    formHeight() {
      if (this.formHeight) {
        this.frameHeight = this.formHeight
      }
    },
    url(val) {
      if (!val) return
      this.$nextTick(() => {
        this.updateIframe()
      })
    }
  },
  created() {
    if (this.formHeight) {
      this.frameHeight = this.formHeight
    }

    window.addEventListener('message', this.setHeight)
  },
  destroyed() {
    window.removeEventListener('message', this.setHeight)
  },
  updated() {
    this.$nextTick(() => {
      // console.log(this.$refs.iframe)
      // console.log(this.url)
      // console.log(this.url.indexOf(window.location.origin) > -1)
      if (
        this.$refs.iframe &&
        this.url &&
        this.url.indexOf(window.location.origin) > -1
      ) {
        window.requestAnimationFrame(() => this.updateIframe())
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
          }
        } catch (error) {
          console.log('error', error)
        }
      }
    },
    initIframeDomObserver() {
      const iframeAppDom =  this.iframeDom.contentWindow.document.querySelector('#app') // sourcing vue根DOM

      if (iframeAppDom) {
        const appDomObserver = new MutationObserver(() => {
          const tabsBoxWrap = iframeAppDom.querySelector('#tabsBoxWrap')
          iframeAppDom.style.height = "auto";
          if (tabsBoxWrap) {
            this.autoFrameHeight = tabsBoxWrap ? tabsBoxWrap.clientHeight || 0 : 0
          } else {
            const iframeAppContentDom = iframeAppDom.querySelector('#appRouterView') // sourcing vue根一级router-view
            this.autoFrameHeight = iframeAppContentDom ? iframeAppContentDom.clientHeight || 0 : 0
          }

          this.iframeDom.style.height = `${ this.autoFrameHeight }px`
        })

        appDomObserver.observe(iframeAppDom, {
          childList: true,
          attributes: true,
          subtree: true
        })
      }
    },
    updateIframe() {
      if (this.iframeDom) this.$refs.iframe.removeChild(this.iframeDom)

      this.iframeDom = document.createElement('iframe')
      this.iframeDom.addEventListener('load', () => {
        this.initIframeDomObserver()
      })

      this.iframeDom.id = 'flowForm'
      this.iframeDom.setAttribute('frameborder', 'no')
      this.iframeDom.setAttribute('border', '0')
      this.iframeDom.setAttribute('marginwidth', '0')
      this.iframeDom.setAttribute('marginheight', '0')
      this.iframeDom.setAttribute('scrolling', 'no')
      this.iframeDom.setAttribute('allowtransparency', 'yes')
      this.iframeDom.setAttribute('width', '100%')
      this.iframeDom.style.height = this.frameHeight
      this.iframeDom.src = this.url

      this.$refs.iframe.appendChild(this.iframeDom)
    }
  }
}
</script>

<style lang="scss" scoped>
#flowForm {
  width: 100%;
  //   min-height: 500px;
  border: 0;
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
