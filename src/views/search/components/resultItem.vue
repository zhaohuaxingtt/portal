<!--
 * @Author: your name
 * @Date: 2021-08-19 10:58:08
 * @LastEditTime: 2021-08-20 15:07:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\search\components\resultItem.vue
-->
<template>
  <div class="result-item">
    <div class="title">
      <a
        :href="item.url"
        target="_blank"
        v-if="item.url"
        v-html="item.title"
      ></a>
      <a v-else href="javascript:void(0);" v-html="item.title"></a>
    </div>
    <p class="description">
      <span v-for="item in description" :key="item.key" class="item">
        {{ item.label }}: <span v-html="item.value"></span>
      </span>
    </p>
    <p class="url">{{ appHost }}{{ item.url }}</p>
  </div>
</template>

<script>
export default {
  name: 'resultItem',
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    description() {
      const res = []
      const content = this.item.content ? JSON.parse(this.item.content) : {}
      for (const key in content) {
        if (Object.hasOwnProperty.call(content, key)) {
          const element = content[key]
          if (element) {
            res.push({
              label: this.fieldsName[key],
              value: element,
              key
            })
          }
        }
      }
      res.sort((a, b) => {
        if (this.sorts.indexOf(a.key) > this.sorts.indexOf(b.key)) {
          return 1
        } else {
          return -1
        }
      })
      return res
    }
  },
  data() {
    return {
      fieldsName: {
        aekoNo: 'aeko号',
        analysisName: '分析路径',
        applyName: '申请单名称',
        applyNo: '申请单号',
        asmsApplyNo: 'ASMS申请单号',
        assetsApplyNo: '资产入账单申请号',
        assetsNameEn: '资产英文名称',
        assetsNameZh: '资产中文名称',
        assetsNo: '资产编号',
        bmNo: 'BM 单号',
        brand: '品牌',
        carType: '车型',
        carTypeHistory: '沿用车型',
        changeNo: '变更单号',
        contractDesc: '合同描述',
        createtime: '创建时间',
        depart: '科室',
        departPlan: '规划部门',
        departUsed: '使用部门',
        duns: 'DUNS号',
        eventName: '事件名称',
        eventTime: '事件时间',
        fsNo: 'FS号',
        inquiryNo: '询价单号',
        lastingNo: 'lasting cash',
        manufactureFactory: '制造厂家',
        manufacturer: '制造商',
        materialCategory: '原材料中类',
        materialCategoryDesc: '材料中类描述',
        materialRawBrand: '原材料牌号',
        materialRawName: '原材料名称',
        materials: '材料组',
        milestone: '车型项目milestone',
        mouldCategory: '工模具种类',
        mouldNo: '模具编号',
        mtzApplyNo: 'MTZ申请单号',
        mtzNo: 'MTZ规则编号',
        nameDe: '德文名称',
        nameEn: '英文名称',
        nameZh: '中文名称',
        orderNo: '订单编号',
        partAssemblyName: '零件总成名称',
        partAssemblyNo: '零件总成编号',
        partComponents: '零件部件名称',
        partsNo: '零件号',
        paymentNo: '一次性支付单号',
        plannerId: '规划人员工号',
        plannerName: '规划人姓名',
        plantFrom: '平台',
        productionFactory: '生产工厂',
        purchaseAgent: '采购代理',
        purchaseFactory: '采购工厂',
        purchaseGroup: '采购组',
        quotationNo: '报价单号',
        rfqNo: 'RFQ号',
        riseNo: 'RISE号',
        sap: 'SAP号',
        scrapApplyNo: '报废申请单号',
        scrapNo: '报废单号',
        section: '股',
        socialCreditCode: '公司代码',
        source: '数据源',
        stockNo: '备货表号',
        storageLocation: '存放地点',
        supplierNameDe: '供应商德文名称',
        supplierNameEn: '供应商英文名称',
        supplierNameZh: '供应商中文名称',
        supplierNo: '供应商号',
        svw: 'SVW号',
        temporary: '临时号',
        type: '类别',
        url: '跳转连接',
        voucherNo: '凭证号',
        vw: 'VW号',
        wbs: 'WBS元素',
        cartypeProjectCode: '车型项目编号',
        cartypeProType: '车型项目类型',
        carProTypeCode: '燃料类型',
        begintime: 'EOP开始时间'
      },
      appHost: process.env.VUE_APP_HOST,
      sorts: [
        'nameEn',
        'cartypeProjectCode',
        'cartypeProType',
        'carProTypeCode',
        'productionFactory',
        'begintime'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.result-item {
  padding: 10px 0px;
  max-width: 1200px;
  margin-bottom: 10px;
  .title {
    margin-bottom: 10px;
    color: $color-blue;
    font-size: 16px;
    a {
      font-size: 16px;
      text-decoration: underline;
    }
  }
  p.description {
    color: #666;
    font-size: 14px;
  }
  p.url {
    font-size: 12px;
    color: #666;
    margin-top: 10px;
  }
  .item {
    margin-right: 10px;
    &::after {
      content: ',';
    }
    &:last-child::after {
      content: '';
    }
  }
}
</style>
