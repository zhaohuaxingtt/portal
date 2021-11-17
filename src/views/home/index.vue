<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2021-02-19 18:01:14
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \rise\src\views\home\index.vue
-->
<template>
  <iPage>
    <div class="index-wrapper">
      <el-row :gutter="20" class="index-container" id="myModules">
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="6"
          :key="card.id"
          v-for="card in cards"
        >
        <module-card :card="card" @del="handleDelete" />
        </el-col>
      </el-row>
    </div>
  </iPage>
</template>
<script>
import moduleCard from './components/moduleCard'
import { iPage } from 'rise'
import Sortable from 'sortablejs'
import { updateBatchModules } from '@/api/home'
export default {
  components: { moduleCard, iPage },
  data() {
    return {
      
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      cardList: state => state.permission.cardList
    }),
    cards() {
      let cards = this.cardList.filter(li => !li.value)
      
      // ekl-15
      cards.push({
        component: "EKLAffix",
        createBy: 1,
        createDate: "2021-09-03 10:53:02",
        id: 10,
        isDelete: false,
        moduleData: null,
        name: "EKL",
        orderNum: 9,
        permissionKey: "HOME_MODULE_EKLAffix",
        updateBy: null,
        updateDate: null,
        value: false
      })
      return cards
        // return this.cardList.filter(li => li.name ==`EKL`)
    }
  },
  mounted() {
    this.$nextTick(() => {
      new Sortable(document.getElementById('myModules'), {
        group: { name: 'myModules' }, // set both lists to same group
        ghostClass: 'my-modules-drop-ghost',
        animation: 150,
        onUpdate: event => this.handleDragUpdate(event),
        onRemove: event => this.handleDragEnd(event)
      })
    })
  },
  methods: {
    handleDragEnd(event) {
      console.log('handleDragEnd', event)
    },
    async handleDragUpdate(event) {
      const cards = _.cloneDeep(this.cards)
      const item = _.cloneDeep(cards[event.oldIndex])
      const endItem = _.cloneDeep(cards[event.newIndex])
      const cardList = _.cloneDeep(this.cardList)
      const index = cardList.findIndex(e => e.id === endItem.id)
      const newCards = cardList.filter(e => e.id !== item.id)
      newCards.splice(index, 0, item)
      const newCardList = newCards.map((e, i) => {
        e.orderNum = i
        return e
      })
      const result = await updateBatchModules(newCardList)
      if (result.result) {
        this.$store.dispatch('getModules')
      }
    },
    async handleDelete(card) {
      const cards = _.cloneDeep(this.cardList)
      const newCards = cards.map(e => {
        if (e.id === card.id) {
          e.value = true
        }
        return e
      })
      console.log(this.cardList, newCards)
      const res = await updateBatchModules(newCards)
      if (res.result) {
        this.$store.dispatch('setModules', newCards)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  // display: flex;
  // flex-wrap: wrap;
  > div {
    height: 650px;
  }
  width: 100%;
  min-height: 600px;
}
</style>
