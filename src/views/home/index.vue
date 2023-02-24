<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2023-02-02 00:13:19
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 首页
 * @FilePath: \front-portal\src\views\home\index.vue
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
          v-for="card in flexCards"
        >
        
        <iAgreeCard v-if="card.component == 'Approve'" key="iAgree" :card="card"/>
          <!-- <module-card
            v-if="card.component == 'Approve'"
            key="iAgree"
            :card="card"
            @del="handleDelete"
          /> -->
          <module-card
            v-if="card.component == 'Task'"
            key="iTask"
            :card="card"
            @del="handleDelete"
          />
          <module-card
            v-if="card.component == 'Schedule'"
            key="iMeeting"
            :card="card"
            @del="handleDelete"
          />
        </el-col>
        <el-col span="6">
          <el-card class="carousel-card">
            <div slot="header" class="card-header flex-between-center-center">
              <span class="title">
                {{ 'iFact' }}
              </span>
            </div>
            <el-carousel trigger="click" class="carousel" height="100%">
              <el-carousel-item v-for="card in cards" :key="card.id">
                <carouselItem :card="card" @del="handleDelete" />
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </el-col>
        <!-- <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="6"
          :key="card.id"
          v-for="card in cards"
        >
          <module-card :card="card" @del="handleDelete" />
        </el-col> -->
      </el-row>
    </div>
  </iPage>
</template>
<script>
import moduleCard from './components/moduleCard'

import iAgreeCard from './components/moduleCard/iAgreeCard'
import carouselItem from './components/moduleCard/carouselItem'
import { iPage } from 'rise'
import Sortable from 'sortablejs'
import { updateBatchModules } from '@/api/home'
export default {
  components: { iAgreeCard,moduleCard, iPage, carouselItem },
  data() {
    return {}
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      cardList: (state) => state.permission.cardList
    }),
    cards() {
      let cards = this.cardList.filter(
        (li) =>
          !li.value && !['Approve', 'Task', 'Schedule'].includes(li.component)
      )
      return cards
      // return this.cardList.filter(li => li.name ==`EKL`)
    },
    flexCards() {
      let cards = this.cardList.filter((li) =>
        ['Approve', 'Task', 'Schedule'].includes(li.component)
      )
      return cards
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   new Sortable(document.getElementById('myModules'), {
    //     group: { name: 'myModules' }, // set both lists to same group
    //     ghostClass: 'my-modules-drop-ghost',
    //     animation: 150,
    //     onUpdate: (event) => this.handleDragUpdate(event),
    //     onRemove: (event) => this.handleDragEnd(event)
    //   })
    // })
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
      const index = cardList.findIndex((e) => e.id === endItem.id)
      const newCards = cardList.filter((e) => e.id !== item.id)
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
      const newCards = cards.map((e) => {
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
.carousel-card {
  height: 620px;
  margin-bottom: 20px;
  border-radius: 20px;
  .title {
    font-size: 20px;
    color: #222222;
    font-weight: bold;
    cursor: pointer;
  }
  ::v-deep .el-card__body{
    height: 570px;
    overflow: auto;
    padding-right: 0px;
    .carousel{
      height: 100%;
    }
  }
}
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
