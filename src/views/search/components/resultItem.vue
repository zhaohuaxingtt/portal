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
        nameZh: '中文名称',
        nameDe: '德文名称',
        fsnrGsnrNum: '零件采购项目号',
        buyerName: '询价采购员名称',
        linieName: 'LINE',
        partStatusNamne: '零件状态',
        cartypeCategory: '车型大类',
        cartypeProjectZh: '车型项目',
        partProjectTypeName: '零件项目类型',
        procureFactoryName: '采购工厂',
        supplierType: '供应商类型',
        nameEn: '英文名称',
        supplierNameZhShort: '供应商中文简称',
        supplierNameEnShort: '供应商英文简称',
        corp: '集团',
        socialCreditCode: '统一社会信用代码',
        duns: 'DUNS号',
        svw: 'SVW号',
        vw: 'VW号',
        sap: 'SAP号',
        temporary: '临时号',
        address: '地址',
        purchaseAgent: '	采购员',
        depart: '科室',
        partBookType: '台账类型',
        partsNo: '零件号',
        materials: '材料组',
        aekoNo: 'Aeko号',
        partName: '零件名称',
        rfqNo: 'RFQ编号',
        carType: '车型',
        rfqName: 'RFQ名称',
        quotationState: '报价状态'
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
