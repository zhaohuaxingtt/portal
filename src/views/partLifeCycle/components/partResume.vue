<!--
 * @Author: yz
 * @Date: 2021-09-28
-->
<template>
    <iCard class="partResume">
        <div slot="header" class="head">
            <h3> {{ language('LK_LINGJIANLVLI', '零件履历') }}</h3>
            <iButton @click="exportFile" v-loading="exportLoading">{{ language('LK_DAOCHU', '导出') }}</iButton>
        </div>
        <div class="partResume_main" v-loading="mainLoading">
            <div class="left">
                <div v-for="(a, index1) in bookmarkNodes" :key="index1">
                    <div class="title"
                         :class="{ triangle : (a.children && a.children.length > 0), checked: checkedIndex1 === index1, isChecked: a.toggle }">
                        <span @click="clickItemA(index1, a)">{{ a.title }}</span>
                    </div>
                    <div class="itemChild" :class="{itemChildisChecked: a.toggle}"
                         :style="{maxHeight: a.toggle ? '500px' : '0'}">
                        <div class="child" :class="{ checked: a.index === index2 }" v-for="(b, index2) in a.children"
                             :key=index2
                             @click="clickItemB(a, b, index2)">
                            {{ b.title }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="middle">
                <div v-for="(item, index) in mainSpindleNodes" :key="index" class="item"
                     :class="{ checked: (checkedIndex3 === index) || currentItem.linkIds.includes(item.id), isHalf: Number(item.type) === 11 }">
                    <div class="time">{{ item.date }}</div>
                    <div class="round2" v-if="Number(item.type) === 11">
                        <icon class="icon" symbol name="iconlingjianlvlifenzhijiedian"></icon>
                    </div>
                    <div class="round" :class="{ future: !item.pass }" @click="getRecordDetail(item, index)" v-else>
                        <div></div>
                    </div>
                    <div class="name" v-if="Number(item.type) !== 11">{{ item.typeName }}</div>
                    <div class="version type7" v-if="Number(item.type) === 11">
                        <Popover
                                placement="bottom"
                                :trigger="item.parts.length > 1 ? 'hover': ''">
                            <div style="max-height: 300px; overflow-y: auto;" v-if="item.parts&&item.parts.length>1">
                                <div style="cursor: pointer; margin-bottom: 5px;" @click="jumpUrl(a)"
                                     v-for="(a, key) in item.parts" :key="key">{{ a }}
                                </div>
                            </div>
                            <div slot="reference">
                                <span v-if="item.parts.length==1" @click="jumpUrl(item.parts[0])">{{ item.parts[0]}}</span>
                                <span v-if="item.parts.length>1">{{ item.parts[0] + '...' }}</span>
                            </div>
                        </Popover>
                    </div>
                    <div class="version" :title="item.title" v-if="Number(item.type) === 5"> — {{ item.title }}</div>
                    <icon class="icon label1" v-if="Number(item.type) === 2" symbol
                          name="iconlingjianlvlibiaoqian"></icon>
                    <icon class="icon label2" v-if="item.label" symbol name="iconlingjianlvliAekoyishishibiaoji"></icon>
                </div>
            </div>
            <div class="right" v-loading="rightLoading">
                <div class="title" v-if="currentItem&&currentItem.typeName">
                    <i></i>
                    <span style="text-decoration: none">{{ currentItem.typeName }}</span>
                    <span style="text-decoration: none" v-if="currentItem.title" @click="toUrl(currentItem)"> - {{ currentItem.title }}</span>
                </div>
                <div class="partResume_right_content">
                    <!--          //Sourcing-->
                    <div class="divItem" v-show="currentType === 2">
                        <span>{{ language('LK_SHOUCIXUNJIASHIJIAN', '首次询价时间') }}：</span>
                        <span>{{ infoData.businessDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 2">
                        <span>{{ language('LK_RFQBIANHAO', 'RFQ编号') }}：</span>
                        <span class="link" @click="toUrl(infoData,'RFQ')">{{ infoData.businessTitle }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 2">
                        <span>{{ language('LK_RFQLEIXING', 'RFQ类型') }}：</span>
                        <span>{{ infoData.rfqType }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 2">
                        <span>{{ language('LK_XUNJIALEIXING', '询价类型') }}：</span>
                        <span>{{ infoData.inquiryType }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 2">
                        <span>{{ language('LK_LINGJIANCAIGOUXIANGMULEIXING', '零件采购项目类型') }}：</span>
                        <span>{{ infoData.purchaseTypeName }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 2">
                        <span>{{ language('LK_GONGCHANG', '工厂') }}：</span>
                        <span>{{ infoData.purchaseFactorys }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 2">
                        <span>{{ language('LK_CHEXINGXIANGMU', '车型项目') }}：</span>
                        <span>{{ infoData.carTypeProCode }} - {{ infoData.carTypeProName }}</span>
                    </div>

                    <!--          //LOI（意向书）-->
                    <div class="divItem" v-show="currentType === 3">
                        <span>{{ language('LK_SHIJIAN', '时间') }}：</span>
                        <span>{{ infoData.businessDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 3">
                        <span>{{ language('LK_GONGYINGSHANG', '供应商') }}：</span>
                        <span :title="infoData.loiSupplierCode + '-' + infoData.loiSupplierName">{{ infoData.loiSupplierCode }} - {{ infoData.loiSupplierName }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 3">
                        <span>{{ language('LK_YIXIANGSHUBIANHAO', '意向书编号') }}：</span>
                        <span>{{ infoData.loiIntentLetterCode }}</span>
                    </div>

                    <!--          //定点-->
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_DINDDIANSHIJIAN', '定点时间') }}：</span>
                        <span>{{ infoData.businessDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_FSHAO', 'FS号') }}：</span>
                        <span class="link" @click="toUrl(infoData,'fsNum')">{{ infoData.fsNum }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_RS_DANHAO', 'RS单号') }}：</span>
                        <span class="link" @click="toUrl(infoData,'rsNum')">{{ infoData.rsNum }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_AJIA', 'A价') }}：</span>
                        <span>{{ infoData.pricePermission ? infoData.priceA : '-' }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_BJIA', 'B价') }}：</span>
                        <span>{{ infoData.pricePermission ? infoData.priceB : '-' }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_BNKJIAGE', 'BNK价格') }}：</span>
                        <span>{{ infoData.pricePermission ? infoData.priceBnk : '-' }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_QIANDUANBAOZHUANGFEI', '前段包装费') }}：</span>
                        <span>{{ infoData.headerPartPackageFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_HOUDUANBAOZHUANGFEI', '后段包装费') }}：</span>
                        <span>{{ infoData.footerPartPackageFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_CUOZUOFEI', '操作费') }}：</span>
                        <span>{{ infoData.operationFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_YUNSHUFEI', '运输费') }}：</span>
                        <span>{{ infoData.carriageFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_TOUZIFEI', '投资费') }}：</span>
                        <span>{{ infoData.rsInvestmentFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_KAIFAFEI', '开发费') }}：</span>
                        <span>{{ infoData.rsDevelopmentFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                         <span>{{ language('LK_GONGYINGSHANG', '供应商') }}：</span>
                        <span :title="infoData.rsSupplierCode + '-' + infoData.rsSupplierName">{{ infoData.rsSupplierCode }} - {{ infoData.rsSupplierName }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_WULIUFUWUSHANG', '物流服务商') }}：</span>
                        <span>{{ infoData.rsLogisticsSupplierCode }} - {{ infoData.rsLogisticsSupplierName }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_CHEXINGXIANGMU', '车型项目') }}：</span>
                        <span>{{ infoData.rsCarTypeProCode }} - {{ infoData.rsCarTypeProName }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_XUNJIACHANGLIANG', '询价产量') }}：</span>
                        <span>{{ infoData.rsInquiryQty }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_DINGDIANSHICHANNENG', '定点时产能') }}：</span>
                        <span>{{ infoData.rsProCapacity }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>{{ language('LK_SHIFOUZUOGUOCHENGBENFENXI', '是否做过零件成本分析') }}：</span>
                        <span :class="infoData.isIngredientAnalyze?'link':''"  @click="toUrl(infoData,'isIngredientAnalyze')">{{ infoData.isIngredientAnalyze ? language('LK_SHI', '是') : language('LK_FOU', '否')
                            }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>MTZ {{ language('LK_RS_DANHAO', 'RS单号') }}：</span>
                        <span class="link"  @click="toUrl(infoData,'mtzRsNum')">{{ infoData.mtzRsNum }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 4">
                        <span>MTZ {{ language('LK_DINGDIANXINBIANHAO', '定点信编号') }}：</span>
                        <span class="link"  @click="toUrl(infoData,'rsNlNum')">{{ infoData.rsNlNum }}</span>
                    </div>

                    <!--          //Kick off-->
                    <div class="divItem" v-show="currentType === 1">
                        <span>Kick off {{ language('LK_HUIYIBIANHAO', '会议编号') }}：</span>
                        <span :title="infoData.businessTitle">{{ infoData.businessTitle }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 1">
                        <span>Kick off {{ language('LK_SHIJIAN', '时间') }}：</span>
                        <span>{{ infoData.businessDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 1">
                         <span>{{ language('LK_FSHAO', 'FS号') }}：</span>
                        <span class="link" @click="toUrl(infoData,'fsNum')">{{ infoData.fsNum }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 1">
                        <span>SOP {{ language('LK_SHIJIAN', '时间') }}：</span>
                        <span>{{ infoData.kickOffSopDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 1">
                         <span>{{ language('LK_GONGYINGSHANG', '供应商') }}：</span>
                        <span :title="infoData.kickOffSupplierCode + '-' + infoData.kickOffSupplierName">{{ infoData.kickOffSupplierCode }} - {{ infoData.kickOffSupplierName }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 1">
                        <span>1st tryout {{ language('LK_SHIJIAN', '时间') }}：</span>
                        <span>{{ infoData.fstTryoutDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 1">
                        <span>OTS {{ language('LK_SONGYANGSHIJIAN', '送样时间') }}：</span> 
                        <span>{{ infoData.otsSendSamplesDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 1">
                        <span>EM {{ language('LK_SONGYANGSHIJIAN', '送样时间') }}：</span>
                        <span>{{ infoData.emSendSamplesDate }}</span>
                    </div>

                    <!--          //配件定点-->
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_DINDDIANSHIJIAN', '定点时间') }}：</span>
                        <span>{{ infoData.businessDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                         <span>{{ language('LK_FSHAO', 'FS号') }}：</span>
                        <span class="link" @click="toUrl(infoData,'fsNum')">{{ infoData.fsNum }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_RS_DANHAO', 'RS单号') }}：</span>
                        <span class="link"  @click="toUrl(infoData,'rsNum')">{{ infoData.accessoriesRsNum }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_PEIJIANAJIA', '配件A价') }}：</span>
                        <span>{{ infoData.pricePermission ? infoData.accessoriesPriceA : '-' }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_PEIJIANBJIA', '配件B价') }}：</span>
                        <span>{{ infoData.pricePermission ? infoData.accessoriesPriceB : '-' }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_BNKJIAGE', 'BNK价格') }}：</span>
                        <span>{{ infoData.pricePermission ? infoData.accessoriesPriceBnk : '-' }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_QIANDUANBAOZHUANGFEI', '前段包装费') }}：</span>
                        <span>{{ infoData.headerPartPackageFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_HOUDUANBAOZHUANGFEI', '后段包装费') }}：</span>
                        <span>{{ infoData.footerPartPackageFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_CUOZUOFEI', '操作费') }}：</span>
                        <span>{{ infoData.operationFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_YUNSHUFEI', '运输费') }}：</span>
                        <span>{{ infoData.carriageFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                         <span>{{ language('LK_GONGYINGSHANG', '供应商') }}：</span>
                        <span :title="infoData.accessoriesSupplierCode + '-' + infoData.accessoriesSupplierName">{{ infoData.accessoriesSupplierCode }} - {{ infoData.accessoriesSupplierName }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_CHEXINGXIANGMU', '车型项目') }}：</span>
                        <span>{{ infoData.accessoriesCarTypeProCode }} - {{ infoData.accessoriesCarTypeProName }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 6">
                        <span>{{ language('LK_DINGDIANXINGQIANSHUSHIJIAN', '定点信签署时间') }}(NL)：</span>
                        <span>{{ infoData.nlDate }}</span>
                    </div>

                    <!--          //SOP-->
                    <div class="divItem" v-show="currentType === 8">
                        <span>{{ language('LK_SHOUCI', '首次') }}SOP：</span>
                        <span>{{ infoData.sopDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 8">
                        <span>{{ language('LK_CHEXINGMINGCHENG', '车型名称') }}：</span>
                        <span>{{ infoData.sopCarTypeProName }}</span>
                    </div>

                    <!--          //Aeko-->
                    <div class="divItem" v-show="currentType === 5">
                        <span>{{ language('LK_AEKOHAO', 'AEKO号') }}：</span>
                        <span class="link" @click="toUrl(infoData,'aekoCode')">{{ infoData.aekoCode }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>{{ language('LK_YUANLINGJIANHAO', '原零件号') }}：</span>
                        <span>{{ infoData.originalPartNum }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>{{ language('LK_CAIGOUGONGCHANG', '采购工厂') }}：</span>
                        <span :title="infoData.aekoPurchaseFactorys">{{ infoData.aekoPurchaseFactorys }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>{{ language('LK_DAORURIQI', '导入日期') }}：</span>
                        <span>{{ infoData.aekoImportDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>{{ language('LK_JIAGESHISIRIQI', '价格实施日期') }}：</span>
                        <span>{{ infoData.aekoExecuteDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>{{ language('LK_TOUCHANRIQI', '投产日期') }}：</span>
                        <span>{{ infoData.aekoEsProductDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>ES{{ language('LK_QUXIAORIQI', '取消日期') }}：</span>
                        <span>{{ infoData.aekoEsCancelDate }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                         <span>{{ language('LK_GONGYINGSHANG', '供应商') }}：</span>
                        <span :title="infoData.aekoSupplierCode + '-' + infoData.aekoSupplierName">{{ infoData.aekoSupplierCode }} - {{ infoData.aekoSupplierName }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>AEKO{{ language('LK_ZHUANGTAI', '状态') }}：</span>
                        <span>{{ infoData.aekoSupplierStatus }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>{{ language('LK_SHISIJIAGE', '实施价格') }}：</span>
                        <span>{{ infoData.pricePermission ? infoData.aekoCarryPrice : '-' }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>{{ language('LK_AJIA', 'A价') }}：</span>
                        <span>{{ infoData.pricePermission ? infoData.aekoPriceA : '-' }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>Δ{{ language('LK_AJIA', 'A价') }}：</span>
                        <span>{{ infoData.aekoDeltaPriceA }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>Δ{{ language('LK_MOJUTOUZIFEIYONG', '模具投资费用') }}：</span>
                        <span>{{ infoData.aekoDeltaMouldInvestmentFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>Δ{{ language('LK_KAIFAFEI', '开发费') }}：</span>
                        <span>{{ infoData.aekoDeltaDelevopmentFee }}</span>
                    </div>
                    <div class="divItem" v-show="currentType === 5">
                        <span>{{ language('LK_YANGJIANJIAGE', '样件价格') }}：</span>
                        <span>{{ infoData.pricePermission ? infoData.aekoSimplePrice : '-' }}</span>
                    </div>

                    <!--   MTZ-->
                    <div v-for="(item, key) in infoData.mtzVos" :key="key" v-show="currentType === 7">
                        <div class="divItem">
                            <span>MTZ {{ language('LK_GUIZEBIANHAO', '规则编号') }}{{ key + 1 }}：</span>
                            <span>{{ item.mtzRuleCode }}</span>
                        </div>
                        <div class="divItem">
                            <span>MTZ {{ language('LK_CAILIAOZU', '材料组')}}：</span>
                            <span>{{ item.mtzCategoryZh + '-' + item.mtzCategoryDe }}</span>
                        </div>
                        <div class="divItem">
                            <span>{{ language('LK_YUANCAILIAO', '原材料')}}：</span>
                            <span>{{ item.mtzMaterialCode + '-' + item.mtzMaterialName }}</span>
                        </div>
                        <div class="divItem">
                            <span>{{ language('LK_YONGLIANG', '用量')}}：</span>
                            <span>{{ item.dosage }}{{ item.dosageMeasureUnit }}</span>
                        </div>
                        <div class="divItem">
                            <span>{{ language('LK_JIJIA', '基价')}}：</span>
                            <span>{{ item.price }}{{ item.tcCurrence }}</span>
                        </div>
                        <div class="divItem">
                            <span>{{ language('LK_BUCAIZHOUQI', '补差周期')}}：</span>
                            <span>{{ item.supplementCycle }}</span>
                        </div>
                        <div class="divItem">
                            <span>{{ language('LK_SHICHANGJIALAIYUAN', '市场价来源')}}：</span>
                            <span>{{ item.priceSource }}</span>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </iCard>
</template>

<script>
  import {iCard, iButton, icon, iMessage} from 'rise'
  import {Popover} from 'element-ui'
  import {getPartsRecordNodes, getRecordDetail, exportFile} from '@/api/partLifeCycle'

  export default {
    name: 'partResume',
    components: {
      iCard,
      iButton,
      icon,
      Popover
    },
    data() {
      return {
        checkedIndex1: '',
        checkedIndex2: '',
        checkedIndex3: '',
        bookmarkNodes: '',
        infoData: '',
        currentItem: {},
        currentType: 0,
        mainLoading: false,
        middleLoading: false,
        rightLoading: false,
        exportLoading: false,
        baseUrl:process.env.NODE_ENV== 'dev'?'http://10.122.17.38':process.env.NODE_ENV!= 'production' ? process.env.VUE_APP_HOST: 'http://rise-nginx-internal.apps.vmocp-test.csvw.com'
      }
    },
    created() {
      this.getPartsRecordNodes()
    },
    methods: {
      jumpUrl(item) {
        let routeData = this.$router.resolve({
          query: {partsNum: item}
        })
        window.open(routeData.href, '_blank')
      },
      exportFile() {
        this.exportLoading = true
        exportFile({partsNum: this.$route.query.partsNum}).then(res => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 200) {
          } else {
            iMessage.error(result)
          }
          this.exportLoading = false
        }).catch(() => {
          this.exportLoading = false
        })
      },
      getRecordDetail(item, index) {
        if (this.checkedIndex3 === index) {
          return
        }
        this.checkedIndex3 = index
        this.currentItem = item
        this.currentType = item.type
        if (Number(item.type) === 10 || Number(item.type) === 9) {
          return
        }
        this.rightLoading = true
        getRecordDetail({id: item.id, type: item.type}).then(res => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 200) {
            this.infoData = res.data
          } else {
            iMessage.error(result)
          }
          this.rightLoading = false
        }).catch(() => {
          this.rightLoading = false
        })
      },
      getPartsRecordNodes() {
        this.mainLoading = true
        getPartsRecordNodes({partsNum: this.$route.query.partsNum}).then(res => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 200) {
            this.bookmarkNodes = res.data.bookmarkNodes
            // 初始选中第一条
            if (this.bookmarkNodes && this.bookmarkNodes[0]) {
              if (this.bookmarkNodes[0].children && this.bookmarkNodes[0].children[0]) {
                this.getRecordDetail(this.bookmarkNodes[0].children[0], 0)
                this.bookmarkNodes[0].index = 0
              } else {
                this.getRecordDetail(this.bookmarkNodes[0], 0)
                this.checkedIndex1 = 0
              }
            }
            this.mainSpindleNodes = res.data.mainSpindleNodes
          } else {
            iMessage.error(result)
          }
          this.mainLoading = false
        }).catch(() => {
          this.mainLoading = false
        })
      },

      clickItemA(index, item) {
        // if (this.checkedIndex1 === index) {
        //   return
        // }
        this.checkedIndex1 = index
        if (item.children && item.children.length > 0) {
          item.toggle = !item.toggle
          // 解决DOM不渲染的问题
          this.bookmarkNodes = [...this.bookmarkNodes]
        } else {
          this.bookmarkNodes.forEach(item => {
            item.index = ''
          })
          this.mainSpindleNodes.map((a, aIndex) => {
            if (a.id === item.id) {
              this.getRecordDetail(item, aIndex)
            }
          })
        }
      },
      clickItemB(a, b, index) {
        if (a.index === index) {
          return
        }
        this.bookmarkNodes.forEach(item => {
          item.index = ''
        })
        this.mainSpindleNodes.map((a, aIndex) => {
          if (a.id === b.id) {
            this.getRecordDetail(b, aIndex)
          }
        })
        a.index = index
        this.bookmarkNodes = [...this.bookmarkNodes]
      },
      toUrl(item,typeName) {
        console.log(item,'')
        let {type,id,title,rsNlNum,mtzRsNum,isIngredientAnalyze,rfqType ,businessTitle,fsNum,accessoriesRsNum,rsNum,businessType,aekoCode} = item
        let path = ''
        if(type==1) path = ''                        // 会议
        if(type==2) path = `/sourcing/#/sourceinquirypoint/sourcing/partsrfq/editorInfo?id=${title}` // 寻源 ok
        if(type==3) path = `/sourcing/#/sourceinquirypoint/sourcing/partsletter/loidetail?id=${title}` // LOI
        if(type==4) path = `/sourcing/#/sourceinquirypoint/sourcing/partsprocure/editordetail?projectId=${id}&businessKey=${type}` // 定点
        if(type==5) path = `/sourcing/#/aeko/aekodetail?from=check&requirementAekoId=${title}` // Aeko
        if(type==6) path = `/sourcing/#/sourceinquirypoint/sourcing/accessorypartdetail?spNum=${title}` // 配件定点
        if(type==7) path = `/sourcing/#/designate/decisiondata/mtz?desinateId=${id}` // mtz定点
        if(typeName == 'aekoCode' && aekoCode) path = `/sourcing/#/aeko/aekodetail?from=check&requirementAekoId=${aekoCode}` // 定点信编号
        if(typeName == 'rsNlNum' && rsNlNum) path = `/sourcing/#/sourceinquirypoint/sourcing/partsletter/letterdetail?id=${rsNlNum}` // 定点信编号
        if(typeName == 'mtzRsNum' && mtzRsNum) path = `/sourcing/#/designate/decisiondata/mtz?desinateId=${id}` // mtz rs编号
        if(typeName == 'isIngredientAnalyze' && isIngredientAnalyze && rfqType ==2 && businessTitle) path = `/sourcing/#/targetpriceandscore/costanalysismanage/costanalysis?rfqId=${businessTitle}` // 成本分析
        if(typeName == 'RFQ' && businessTitle) path = `/sourcing/#/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${businessTitle}` // rfq编号
        if(typeName == 'fsNum' && fsNum) path = `/sourcing/#/sourceinquirypoint/sourcing/partsprocure/editordetail?projectId=${id}&businessKey=${businessType}` // fs编号
//        if(typeName == 'accessoriesRsNum' && accessoriesRsNum) path = `/sourcing/#/sourcing/designate/rsSingleMaintenance?${id}&designateType=${businessType}` // RS单号
        if(typeName == 'rsNum' && rsNum) path = `/sourcing/#/sourcing/designate/rsSingleMaintenance?desinateId=${id}&designateType=${businessType}` // RS单号
        if(path){
          window.open(this.baseUrl + path, '_blank');
        }

      },
    }
  }
</script>

<style scoped lang="scss">
    // 滚动条样式
    ::-webkit-scrollbar {
        width: 3px;
        height: 5px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px transparent;
        background: #E2EAFC;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px transparent;
        border-radius: 5px;
        background: transparent;
    }

    .partResume {
        ::v-deep .cardHeader {
            padding: 20px 30px;
        }

        h3 {
            color: #131523;
            font-size: 18px;
            font-weight: bold;
        }

        .head {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .partResume_main {
            display: flex;

            .left {
                font-size: 16px;
                font-weight: bold;
                color: #000000;
                width: 110px;
                margin-right: 50px;
                > div {
                    padding-bottom: 30px;
                    text-align: right;
                    border-right: 2px solid #E7E7E7;
                    padding-right: 22px;
                    .itemChild {
                        overflow: hidden;
                        transition: all 0.3s ease;

                        &.itemChildisChecked {
                            margin-top: 20px;
                        }
                    }

                    &:last-of-type {
                        border-right: none;
                    }

                    .title {
                        position: relative;
                        min-width: 85px;
                        max-width: 85px;

                        span {
                            position: relative;
                            top: -10px;
                            cursor: pointer;
                        }

                        &::after {
                            content: '';
                            display: block;
                            width: 6px;
                            height: 3px;
                            background: #E7E7E7;
                            border-radius: 1px;
                            position: absolute;
                            right: -27px;
                            bottom: 18px;
                        }

                        &.triangle span::before {
                            content: '';
                            display: block;
                            width: 0;
                            height: 0;
                            border-left: 6px solid transparent;
                            border-right: 6px solid transparent;
                            border-bottom: 6px solid transparent;
                            border-top: 6px solid #1660F1;
                            position: absolute;
                            left: -20px;
                            top: 7px;
                        }

                        &.checked {
                            &::after {
                                width: 6px;
                                height: 14px;
                                background: #1660F1;
                                bottom: 13px;
                            }

                            span {
                                color: #1660F1;
                            }

                        }

                        &.isChecked {

                            &.triangle span::before {
                                border-top: 6px solid transparent;
                                border-bottom: 6px solid #1660F1;
                                top: 2px;
                            }
                        }
                    }

                    .child {
                        font-family: Arial;
                        font-size: 12px;
                        font-weight: 420;
                        color: #000000;
                        min-width: 85px;
                        max-width: 85px;
                        margin-bottom: 10px;
                        cursor: pointer;

                        &.checked {
                            color: #1660F1;
                        }
                    }
                }

            }

            .middle {
                width: 35%;
                max-height: 800px;
                overflow-y: auto;
                min-width: 400px;
                .item {
                    display: flex;
                    line-height: 28px;
                    margin-bottom: 70px;

                    .time {
                        font-size: 18px;
                        font-weight: 400;
                        color: #41434A;
                    }

                    .name {
                        font-size: 20px;
                        font-weight: bold;
                        color: #000000;
                    }

                    .version {
                        font-size: 14px;
                        font-weight: 400;
                        color: #000000;
                        margin-left: 10px;
                        width: 100px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        &.type7 {
                            color: #41434A;
                            margin-left: 0;
                            ::v-deep .el-popover__reference {
                                width: 180px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                cursor: pointer;
                            }
                        }
                    }

                    .label1 {
                        width: 93px;
                        height: 20px;
                        margin-left: 20px;
                        margin-top: 6px;
                    }

                    .label2 {
                        width: 35px;
                        height: 14px;
                        margin-left: 10px;
                        margin-top: 6px;
                    }

                    .round {
                        width: 28px;
                        height: 28px;
                        background: #C9DCFF;
                        box-shadow: 0px 0px 8px rgba(31, 96, 222, 0.2);
                        border-radius: 50%;
                        position: relative;
                        cursor: pointer;
                        margin-left: 30px;
                        margin-right: 20px;
                        position: relative;

                        > div {
                            width: 16px;
                            height: 16px;
                            background: #FFFFFF;
                            border-radius: 50%;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            position: absolute;
                        }

                        &::after {
                            content: '';
                            display: block;
                            width: 6px;
                            height: 70px;
                            background-color: #739ff6;
                            position: absolute;
                            left: 11px;
                            top: 28px;
                        }

                        &.future {
                            background: #E2E8F4;

                            &::after {
                                background: #CCD2E6;
                            }
                        }

                    }

                    .round2 {
                        width: 24px;
                        height: 24px;
                        position: relative;
                        cursor: pointer;
                        margin-left: 30px;
                        margin-right: 20px;
                        position: relative;

                        .icon {
                            width: 24px;
                            height: 24px;
                            position: absolute;
                            left: 2px;
                        }

                        &::after {
                            content: '';
                            display: block;
                            width: 6px;
                            height: 35px;
                            background-color: #739ff6;
                            position: absolute;
                            left: 11px;
                            top: 23px;
                        }
                    }

                    &.checked {
                        .round {

                            background: #C9DCFF;

                            > div {
                                background: #1660F1;
                            }
                        }

                        .name {
                            color: #1660F1;
                        }
                    }

                    &:last-of-type .round::after, &:last-of-type .round2::after {
                        background-color: #ffffff;
                    }

                    &.isHalf {
                        margin-top: -47px;

                        & + .item {
                            margin-top: -47px;
                        }
                    }
                }
            }

            .right {
                font-size: 16px;
                font-weight: 400;
                color: #000000;
                padding-left: 80px;
                margin-left: 6px;
                border-left: 1px solid #DBE1EF;
                width: 48%;

                .title {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 40px;

                    i {
                        display: inline-block;
                        width: 6px;
                        height: 16px;
                        background: #1660F1;
                        border-radius: 1px;
                        margin-right: 10px;
                    }

                    span {
                        color: #1660F1;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }

                .partResume_right_content {

                    .divItem {
                        margin-left: 16px;
                        margin-bottom: 30px;
                        font-size: 14px;
                        span {
                            display: inline-block;
                            width: 40%;
                            max-width: 40%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            text-align: left;

                            &:last-of-type {
                                width: 60%;
                                max-width: 60%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
    .link :hover{
        cursor:pointer
    }

</style>