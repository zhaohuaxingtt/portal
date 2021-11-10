<!--
/**
 * 自定义下拉框，支持多选，单选
 * @param   {array}        data             required:true      待操作的表头列表                           ——
 * @param   {string}       label            required:false     表头列表每一项显示的名字                   默认：name
 * @param   {string}       value            required:false     表头列表每一项唯一标识                     默认：id
 * @param   {string}       visiableKey      required:false     表头列表每一项是否显示的标识               默认：isHidden
 * @param   {boolean}      show             required:true      是否显示，类似Dialog中的show               默认：false
 * @events  callback       点击保存后的回调函数
 */
 -->
<template>
  <div>
    <el-button type="primary" @click="handleChangeHeader">修改表头</el-button>
    <iTableHeaderSorter
      :data="data"
      :show.sync="show"
      :value="'value'"
      :label="'label'"
      :visiableKey="'hidden'"
      @callback="handleSaveCallback"
    />
  </div>
</template>

<script>
import { iTableHeaderSorter } from 'rise'
export default {
  components: {
    iTableHeaderSorter
  },
  // mounted () {
  //   this.getTableHeader() //mock 获取header api
  // },
  data() {
    return {
      show: false,
      data: [
        {
          label: '车型编号',
          value: '1',
          hidden: false
        },
        {
          label: '车型名称',
          value: '2',
          hidden: false
        },
        {
          label: '所属品牌',
          value: '3',
          hidden: false
        },
        {
          label: 'PID',
          value: '4',
          hidden: false
        },
        {
          label: '平台属性',
          value: '5',
          hidden: false
        },
        {
          label: '投产工厂',
          value: '6',
          hidden: false,
          key: 5
        },
        {
          label: '是否有效',
          value: '7',
          hidden: false
        }
      ]
    }
  },
  methods: {
    // mock 获取header api
    // async getTableHeader() {
    //   const result = await getTableHeader({ id: 3 })
    //   if (result.code === '200' && result.data) {
    //     this.data = result.data
    //   }
    // },
    handleChangeHeader() {
      this.show = true
    },
    async handleSaveCallback(val) {
      // 更新表头
      // const res = await updateTableHeader(val) //mock 更新表头api
      console.log('此处做table刷新', val)
    }
  }
}
</script>
