<template>
  <iPage class="partLifeCycleStar" ref="partLifeCycleStar">
    <div class="navmvp">
      <iNavMvp
        :lev='1'
        :routerPage="true"
        :list="tabtitle"
      ></iNavMvp>
      <icon @click.native="favoritesShow = true" symbol name="iconshoucangjia"></icon>
    </div>

    <iSearch
      class="partLifeCycleStar_search"
      @sure="getPartsCollect"
      @reset="reset"
      :icon="false"
      :resetKey="PARTSPROCURE_RESET"
      :searchKey="LK_CHAXUN"
      v-loading="loadingiSearch"
    >
      <el-form>
        <el-form-item :label="language('LK_LINGJIANHAO', '零件号')">
          <iInput v-model="partsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item :label="language('LK_LINGJIANMINGCHENG', '零件名称')">
          <iInput v-model="partsName" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item :label="language('LK_AEKOHAO', 'Aeko号')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            collapse-tags
            multiple
            :filter-method="remoteMethod"
            :loading="AekoLoading"
            v-model="aekoNum"
          >
            <el-option
              :value="item"
              :label="item"
              v-for="(item, index) in AekoPullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_GONGYINGSHANG', '供应商')">
          <iInput v-model="supplierName" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item :label="language('LK_CAILIAOZU', '材料组')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            collapse-tags
            multiple
            v-model="categoryCode"
          >
            <el-option
              :value="item.categoryCode"
              :label="item.categoryShowName"
              v-for="(item, index) in CategoryPullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_KESHI', '科室')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            collapse-tags
            multiple
            v-model="deptId"
            @change="getCategoryPullDown"
          >
            <el-option
              :value="item.deptId"
              :label="item.commodity"
              v-for="(item, index) in DepartmentPullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CAIGOUYUAN', '采购员')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            collapse-tags
            multiple
            v-model="purchaserId"
          >
            <el-option
              :value="item.linieNum"
              :label="item.purchaserShowName"
              v-for="(item, index) in PurchaserPullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!--        <el-form-item :label="language('LK_CAIGOUZU', '采购组')">-->
        <!--          <iInput v-model="procurementGroupId" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>-->
        <!--        </el-form-item>-->
        <el-form-item :label="language('LK_CAIGOUGONGCHANG', '采购工厂')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            collapse-tags
            multiple
            v-model="factoryCode"
          >
            <el-option
              :value="item.factoryShowName"
              :label="item.factoryShowName"
              v-for="(item, index) in FactoryPullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_EOPZHUANGTAI', 'EOP状态')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            v-model="eop"
          >
            <el-option
              :value="item.code"
              :label="item.eop"
              v-for="(item, index) in EopPullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_DINGDIANZHUANGTAI', '定点状态')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            v-model="fixedPoint"
          >
            <el-option
              :value="item.code"
              :label="item.fixedPoint"
              v-for="(item, index) in FixedPointPullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_DINGDIANRIQIQI', '定点日期起')">
          <el-date-picker
            v-model="businessDateStart"
            type="date"
            :placeholder="language('LK_QINGXUANZHE', '请选择')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="language('LK_DINGDIANRIQIZHI', '定点日期止')">
          <el-date-picker
            v-model="businessDateEnd"
            type="date"
            :placeholder="language('LK_QINGXUANZHE', '请选择')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="language('LK_SAPHETONGHAO', 'SAP合同号')">
          <iInput v-model="contractSapCode" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item :label="language('LK_RISEHETONGHAO', 'RiSE合同号')">
          <iInput v-model="contractCode" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item :label="language('LK_PINGPAI', '品牌')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            collapse-tags
            multiple
            v-model="brandName"
            @change="getCarTypeDown"
          >
            <el-option
              :value="item.brandCode"
              :label="item.brandNameZh"
              v-for="(item, index) in BrandPullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CHEXING', '车型')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            collapse-tags
            multiple
            v-model="modelNameZh"
          >
            <el-option
              :value="item.id"
              :label="item.modelNameZh"
              v-for="(item, index) in CarTypeDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CHEXINGXIANGMU', '车型项目')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            collapse-tags
            multiple
            v-model="carTypeProjectName"
          >
            <el-option
              :value="item.id"
              :label="item.carTypeProjectName"
              v-for="(item, index) in CarTypePullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_FSHAO', 'FS号')">
          <iInput v-model="fsNum" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
        </el-form-item>
        <el-form-item :label="language('LK_DANGNIANZAIGONG', '当年在供')">
          <iSelect
            class="multipleSelect"
            :placeholder="language('LK_QINGXUANZHE', '请选择')"
            filterable
            clearable
            v-model="isSupply"
          >
            <el-option
              :value="item.code"
              :label="item.isSupply"
              v-for="(item, index) in IsSupplyPullDown"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <div class="partLifeCycleStar_main">
      <div class="partLifeCycleStar_main_header">
        <div class="left">{{ language('LK_WODESHOUCANG', '我的收藏') }}</div>
        <div class="right">
          <iButton v-show="isEdit" @click="isEdit = false">{{ language('LK_TUICHU', '退出') }}</iButton>
          <iButton v-show="isEdit" @click="toClaim">{{ language('LK_QUERENRENLING', '确认认领') }}</iButton>
          <iButton v-show="!isEdit" @click="isEdit = true">{{ language('LK_RENLINGLINGJIAN', '认领零件') }}</iButton>
          <icon @click.native="changeRelevantPart" symbol
                :name="expandRelevantPart ? 'iconxiangguanlingjianyizhankai' : 'iconxiangguanlingjianyishouqi'"></icon>
        </div>
      </div>
      <div class="partLifeCycleStar_main_content">
        <div class="left" v-loading="leftLoading">
          <div v-for="(item, index) in defaultPartsList" :key="index" :class="{ isExpand: expandRelevantPart }"
               @click="currentDefaultPart = item.partsNum;getRelationParts()">
            <div class="title">
              <span class="link" @click.stop="toPartLifeCycle(item.partsNum)">{{ item.partsNum }}</span>
              <span>{{ item.deptName }}</span>
              <icon v-show="!isEdit" symbol @click.native.stop.prevent="cancelOrCollect(item)"
                    :name="Number(item.isDefaultFolder) === 1 ? 'iconyishoucanglingjian' : 'iconweishoucanglingjian'"></icon>
              <icon v-show="isEdit" symbol @click.native.stop.prevent="checkClaim(item)"
                    :name="item.isClaim ? 'iconlingjianyixuanzhong' : 'iconlingjianweixuanzhong'"></icon>
            </div>
            <div class="gray">{{ item.partsName }}</div>
            <div class="item">
              <span>{{ language('LK_GONGYINGSHANG', '供应商') }}</span>
              <span>{{ item.supplierName }}</span>
            </div>
            <div class="item">
              <span>{{ language('LK_TOUCHANZHOUQI', '投产周期') }}</span>
              <span v-show="item.startDate || item.endDate">{{ item.startDate }} - {{ item.endDate }}</span>
            </div>
            <div class="item">
              <span>{{ language('LK_CHEXING', '车型') }}</span>
              <span>{{ item.productName }}</span>
            </div>
            <div class="item">
              <span>{{ language('LK_ZHUANYECAIGOUYUAN', '专业采购员') }}</span>
              <span>{{ item.linieName }}</span>
            </div>

          </div>
        </div>
        <transition name="bounce">
          <iCard class="right" v-if="expandRelevantPart" v-loading="rightLoading">
            <div slot="header" class="right_header">
              <span>{{ language('LK_XIANGGUANLINGJIAN', '相关零件') }}</span>
              <icon @click.native="expandRelevantPart = false" symbol name="iconxiangguanlingjianguanbi"></icon>
            </div>
            <div class="right_content">
              <div v-for="(item, index) in relationPartsList" :key="index" class="right_content_item">
                <div>
                  <p>{{ item.partsNum }}</p>
                  <p>{{ item.partsNumNameZh }}</p>
                </div>
                <icon symbol @click.native="toPartLifeCycle(item.partsNum)" name="iconxiangguanlingjian-gengduo"></icon>
              </div>
            </div>
          </iCard>
        </transition>
      </div>
    </div>
    <claimParts :value="claimPartsShow" :claimNum="claimNum" @sure="claimPartsShow = false;defaultParts()"
                @clearDiolog="claimPartsShow = false"></claimParts>
    <transition name="slide-fade">
      <favorites v-if="favoritesShow" @deleteItem="cancelOrCollect" @closeFavorites="favoritesShow = false"></favorites>
    </transition>
  </iPage>

</template>

<script>
import {
  iPage,
  iNavMvp,
  iSearch,
  iInput,
  iSelect,
  iButton,
  icon,
  iCard,
  iMessage
} from 'rise'
import { tabtitle } from './components/data'
import claimParts from './components/claimParts'
import favorites from './components/favorites'
import {
  getAekoPullDown,
  getCategoryPullDown,
  getDepartmentPullDown,
  getFactoryPullDown,
  getEopPullDown,
  getFixedPointPullDown,
  getBrandPullDown,
  getCarTypeDown,
  getCarTypePullDown,
  getIsSupplyPullDown,
  defaultParts,
  cancelOrCollect,
  removeCollect,
  getRelationParts,
  getPurchaserPullDown,
  getPartsCollect,
} from '@/api/partLifeCycle/partLifeCycleStar'


export default {
  name: 'partLifeCycleStar',
  components: {
    iPage,
    iNavMvp,
    iSearch,
    iInput,
    iSelect,
    iButton,
    icon,
    iCard,
    claimParts,
    favorites
  },
  data() {
    return {
      tabtitle,
      aekoNum: [],
      categoryCode: [],
      deptId: [],
      purchaserId: [],
      factoryCode: [],
      modelNameZh: [],
      carTypeProjectName: [],
      eop: '',
      fixedPoint: '',
      brandName: [],
      isSupply: '',
      partsNum: '',
      partsName: '',
      supplierName: '',
      businessDateStart: '',
      businessDateEnd: '',
      contractSapCode: '',
      contractCode: '',
      fsNum: '',
      defaultPartsList: [],
      relationPartsList: [],
      currentDefaultPart: '',
      claimNum: 0,
      isEdit: false,
      expandRelevantPart: true,
      claimPartsShow: false,
      favoritesShow: false,
      loadingiSearch: false,
      leftLoading: false,
      rightLoading: false,
      isScroll: false,
      AekoLoading: false,
      loading: true,
      AekoPullDown: [],
      AekoPullDownClone: [],
      CategoryPullDown: [],
      DepartmentPullDown: [],
      FactoryPullDown: [],
      EopPullDown: [],
      FixedPointPullDown: [],
      BrandPullDown: [],
      CarTypeDown: [],
      CarTypePullDown: [],
      IsSupplyPullDown: [],
      PurchaserPullDown: [],
      current: 1,
      size: 9
    }
  },
  mounted() {
    this.getSeletes()
    this.defaultParts()
    this.$refs.partLifeCycleStar.$el.addEventListener("scroll", this.scrollGetData); //this.setHeadPosition方法名
  },
  destroyed() {
    this.$refs.partLifeCycleStar.$el.removeEventListener("scroll", this.scrollGetData, true);
  },
  methods: {
    remoteMethod(val){
      this.AekoPullDown = this.AekoPullDownClone.filter(item => {
        if(item.includes(val)){
          return item
        }
      }).slice(0, 40)
    },
    scrollGetData(e){
      const { scrollTop, clientHeight, scrollHeight } = e.target
      if((scrollTop + clientHeight) === scrollHeight){
        if(this.leftLoading || !this.isScroll){
          return
        }
        this.leftLoading = true
        this.current++
        getPartsCollect({
          partsNum: this.partsNum,
          partsName: this.partsName,
          aekoNum: this.aekoNum,
          supplierName: this.supplierName,
          categoryCode: this.categoryCode,
          categoryShowName: this.categoryShowName,
          deptId: this.deptId,
          purchaserId: this.purchaserId,
          purchaserShowName: this.purchaserShowName,
          // procurementGroupId: this.procurementGroupId,
          factoryCode: this.factoryCode,
          factoryShowName: this.factoryShowName,
          eop: this.eop,
          fixedPoint: this.fixedPoint,
          businessDateStart: this.businessDateStart,
          businessDateEnd: this.businessDateEnd,
          contractSapCode: this.contractSapCode,
          contractCode: this.contractCode,
          brandName: this.brandName,
          modelNameZh: this.modelNameZh,
          carTypeProjectName: this.carTypeProjectName,
          fsNum: this.fsNum,
          isSupply: this.isSupply,
          current : this.current ,
          size: this.size,
        }).then(res => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 200) {
            if(res.data.length < 9){
              this.isScroll = false
            }
            let data = res.data.map(item => {
              item.isClaim = false
              return item
            })
            this.defaultPartsList = this.defaultPartsList.concat(data)
          } else {
            iMessage.error(result)
          }
          this.leftLoading = false
        }).catch(() => {
          this.leftLoading = false
        })
      }
    },
    reset(){
      this.current = 1
      this.isScroll = false
      this.partsNum = ''
      this.partsName = ''
      this.aekoNum = []
      this.supplierName = ''
      this.categoryCode = []
      this.categoryShowName = []
      this.deptId = []
      this.purchaserId = []
      this.purchaserShowName = []
      // this.procurementGroupId = ''
      this.factoryCode = []
      this.factoryShowName = []
      this.eop = ''
      this.fixedPoint = ''
      this.businessDateStart = ''
      this.businessDateEnd = ''
      this.contractSapCode = ''
      this.contractCode = ''
      this.brandName = []
      this.modelNameZh = []
      this.carTypeProjectName = []
      this.fsNum = ''
      this.isSupply = ''
      this.defaultParts()
    },
    getPartsCollect(){
      this.current = 1
      this.isScroll = true
      this.leftLoading = true
      getPartsCollect({
        partsNum: this.partsNum,
        partsName: this.partsName,
        aekoNum: this.aekoNum,
        supplierName: this.supplierName,
        categoryCode: this.categoryCode,
        categoryShowName: this.categoryShowName,
        deptId: this.deptId,
        purchaserId: this.purchaserId,
        purchaserShowName: this.purchaserShowName,
        // procurementGroupId: this.procurementGroupId,
        factoryCode: this.factoryCode,
        factoryShowName: this.factoryShowName,
        eop: this.eop,
        fixedPoint: this.fixedPoint,
        businessDateStart: this.businessDateStart,
        businessDateEnd: this.businessDateEnd,
        contractSapCode: this.contractSapCode,
        contractCode: this.contractCode,
        brandName: this.brandName,
        modelNameZh: this.modelNameZh,
        carTypeProjectName: this.carTypeProjectName,
        fsNum: this.fsNum,
        isSupply: this.isSupply,
        current : this.current ,
        size: this.size,
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.defaultPartsList = res.data.map(item => {
            item.isClaim = false
            return item
          })
          if (this.defaultPartsList.length > 0) {
            this.currentDefaultPart = this.defaultPartsList[0].partsNum
          }
          this.getRelationParts()
        } else {
          iMessage.error(result)
        }
        this.leftLoading = false

      }).catch(() => {
        this.leftLoading = false
      })
    },
    getCategoryPullDown(val){
      getCategoryPullDown(val).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.CategoryPullDown = res.data
          let categoryCode = [...this.categoryCode]
          let arr = []
          categoryCode.map(item => {
            if(this.CategoryPullDown.map(item => item.categoryCode).includes(item)){
              arr.push(item)
            }
          })
          this.categoryCode = arr
        } else {
          iMessage.error(result)
        }
      })
    },
    getCarTypeDown(val){
      getCarTypeDown(val).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.CarTypeDown = res.data
          let modelNameZh = [...this.modelNameZh]
          let arr = []
          modelNameZh.map(item => {
            if(this.CarTypeDown.map(item => item.id).includes(item)){
              arr.push(item)
            }
          })
          this.modelNameZh = arr
        } else {
          iMessage.error(result)
        }
      })
    },
    getSeletes() {
      this.loadingiSearch = false
      Promise.all([
        getAekoPullDown(),
        getCategoryPullDown([]),
        getDepartmentPullDown(),
        getFactoryPullDown(),
        getEopPullDown(),
        getFixedPointPullDown(),
        getBrandPullDown(),
        getCarTypeDown([]),
        getCarTypePullDown(),
        getIsSupplyPullDown(),
        getPurchaserPullDown()
      ]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn
        const result4 = this.$i18n.locale === 'zh' ? res[4].desZh : res[4].desEn
        const result5 = this.$i18n.locale === 'zh' ? res[5].desZh : res[5].desEn
        const result6 = this.$i18n.locale === 'zh' ? res[6].desZh : res[6].desEn
        const result7 = this.$i18n.locale === 'zh' ? res[7].desZh : res[7].desEn
        const result8 = this.$i18n.locale === 'zh' ? res[8].desZh : res[8].desEn
        const result9 = this.$i18n.locale === 'zh' ? res[9].desZh : res[9].desEn
        const result10 = this.$i18n.locale === 'zh' ? res[10].desZh : res[10].desEn
        if (Number(res[0].code) === 200) {
          this.AekoPullDownClone = res[0].data
          this.AekoPullDown = this.AekoPullDownClone.slice(0, 40)
        } else {
          iMessage.error(result0)
        }
        if (Number(res[1].code) === 200) {
          this.CategoryPullDown = res[1].data
        } else {
          iMessage.error(result1)
        }
        if (Number(res[2].code) === 200) {
          this.DepartmentPullDown = res[2].data
        } else {
          iMessage.error(result2)
        }
        if (Number(res[3].code) === 200) {
          this.FactoryPullDown = res[3].data
        } else {
          iMessage.error(result3)
        }
        if (Number(res[4].code) === 200) {
          this.EopPullDown = res[4].data
        } else {
          iMessage.error(result4)
        }
        if (Number(res[5].code) === 200) {
          this.FixedPointPullDown = res[5].data
        } else {
          iMessage.error(result5)
        }
        if (Number(res[6].code) === 200) {
          this.BrandPullDown = res[6].data
        } else {
          iMessage.error(result6)
        }
        if (Number(res[7].code) === 200) {
          this.CarTypeDown = res[7].data
        } else {
          iMessage.error(result7)
        }
        if (Number(res[8].code) === 200) {
          this.CarTypePullDown = res[8].data
        } else {
          iMessage.error(result8)
        }
        if (Number(res[9].code) === 200) {
          this.IsSupplyPullDown = res[9].data
        } else {
          iMessage.error(result9)
        }
        if (Number(res[10].code) === 200) {
          this.PurchaserPullDown = res[10].data
        } else {
          iMessage.error(result10)
        }
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      })
    },
    toClaim() {
      let claimNum = this.defaultPartsList.filter(item => item.isClaim).map(item => item.partsNum)
      if (claimNum.length > 0) {
        this.claimPartsShow = true
        this.claimNum = claimNum
      } else {
        iMessage.warn(this.language('LK_QINGGOUXUANHOUZAIQUERENRENLING', '请勾选后再确认认领'))
      }
    },
    toPartLifeCycle(partsNum) {
      let routeData = this.$router.resolve({
        path: '/partLifeCycle',
        query: { partsNum: partsNum }
      })
      window.open(routeData.href)
    },
    checkClaim(item) {
      item.isClaim = !item.isClaim
    },
    cancelOrCollect(item) {
      let operationType = Number(item.isDefaultFolder) === 1 ? 2 : 1
      this.leftLoading = true
      let promiseDelete = Number(item.isDefault === 1) ? removeCollect : cancelOrCollect
      promiseDelete({
        operationType: operationType,
        partsCollectId: item.partsCollectId,
        partsNum: item.partsNum
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.defaultPartsList.forEach(obj => {
            if (obj.partsNum === item.partsNum)
              obj.isDefaultFolder = operationType
          })
          // item.isDefaultFolder = operationType
          iMessage.success(result)
        } else {
          iMessage.error(result)
        }
        this.leftLoading = false

      }).catch(() => {
        this.leftLoading = false
      })
    },
    defaultParts() {
      this.leftLoading = true
      defaultParts().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.defaultPartsList = res.data.map(item => {
            item.isClaim = false
            return item
          })
          if (this.defaultPartsList.length > 0) {
            this.currentDefaultPart = this.defaultPartsList[0].partsNum
          }
          this.getRelationParts()
        } else {
          iMessage.error(result)
        }
        this.leftLoading = false
      }).catch(() => {
        this.leftLoading = false
      })
    },
    getRelationParts() {
      this.rightLoading = true
      getRelationParts({ partsNum: this.currentDefaultPart }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.relationPartsList = res.data
        } else {
          iMessage.error(result)
        }
        this.rightLoading = false
      }).catch(() => {
        this.rightLoading = false
      })
    },
    changeRelevantPart() {
      this.expandRelevantPart = !this.expandRelevantPart
    }
  }
}
</script>

<style scoped lang="scss">
.multipleSelect {
  ::v-deep .el-tag {
    max-width: calc(100% - 75px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
// VUE过渡 start
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    width: 0;
    transform: scale(0);
  }
  100% {
    width: calc(25% - 30px);
    transform: scale(1);
  }
}

.navmvp {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    cursor: pointer;
  }
}

// VUE过渡 end
.partLifeCycleStar {
  .partLifeCycleStar_search {
    margin-top: 20px;
  }

  .partLifeCycleStar_main {
    font-size: 18px;
    color: #131523;
    margin-top: 16px;

    .partLifeCycleStar_main_header {
      display: flex;
      justify-content: space-between;
      line-height: 34px;
      margin-bottom: 7px;

      .left {
        font-size: 20px;
        font-weight: bold;
        color: #000000;
      }

      .right {
        .icon {
          width: 24px;
          height: 24px;
          vertical-align: -6px;
          margin-left: 20px;
          margin-right: 5px;
          cursor: pointer;
        }
      }
    }

    .partLifeCycleStar_main_content {
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        transition: all 0.5s;
        width: 100%;
        > div {
          width: calc(25% - 30px);
          height: 263px;
          background: linear-gradient(180deg, #FFFFFF 0%, #DBE1EF 100%);
          box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
          opacity: 1;
          border-radius: 10px;
          padding: 20px 30px;
          margin-right: 40px;
          margin-bottom: 30px;
          cursor: pointer;

          &:nth-of-type(4n) {
            margin-right: 0;
          }

          &.isExpand {
            width: calc(33.3333% - 40px);

            &:nth-of-type(4n) {
              margin-right: 40px;
            }

            //&:nth-of-type(3n) {
            //  margin-right: 0;
            //}
          }

          .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;

            .link {
              color: #1660F1;
              margin-right: 20px;
            }

            .icon {
              width: 25px;
              height: 24px;
              float: right;
              cursor: pointer;
            }
          }

          .gray {
            height: 24px;
            color: #333333;
          }

          .item {
            font-size: 16px;
            margin-top: 20px;

            span {
              display: inline-block;
              vertical-align: top;

              &:nth-of-type(1) {
                width: 116px;
                color: #333333;
              }

              &:nth-of-type(2) {
                font-weight: bold;
                max-width: calc(100% - 116px);
                white-space: nowrap;
                overflow-x: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }

      .right {
        width: calc(25% - 30px);
        flex-shrink: 0;

        ::v-deep .cardHeader {
          padding: 20px 30px;
          margin-bottom: 10px;

          .right_header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            font-size: 20px;
            font-weight: bold;
            color: #000000;

            .icon {
              width: 24px;
              height: 24px;
              cursor: pointer;
            }
          }
        }

        ::v-deep .cardBody {
          padding: 30px;
          font-size: 18px;
          font-weight: 400;
          color: #131523;

          .right_content {
            .right_content_item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 20px;
              margin-bottom: 20px;
              border-bottom: 1px solid #DBE1EF;

              p {
                margin-bottom: 5px;
              }

              .icon {
                height: 24px;
                margin-right: -17px;
                cursor: pointer;
              }
            }
          }
        }


      }
    }
  }
}

</style>