<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2023-02-26 02:35:53
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 首页
 * @FilePath: \front-portal\src\views\home\index.vue
-->
<template>
  <iPage>
    <div class="index-wrapper">
      <el-row :gutter="20" class="index-container greet-container" id="greetModules">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" xl="24">
          <greet-card />
        </el-col>
      </el-row>
      <el-row :gutter="20" class="index-container" id="myModules">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :key="card.id" v-for="(card,index) in fixedCards">
          <module-card :card="card"/>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="blue-header-div">
          <el-card class="carousel-card">
            <div slot="header" class="card-header flex-between-center-center blue-header">
              <span class="title">
                {{ $t('iFact') }}
              </span>
            </div>
            <el-carousel trigger="click" class="carousel cus-carousel" direction="horizontal" arrow="'never'" height="100%" type="'card'">
              <el-carousel-item v-for="card in cards" :key="card.id">
                <carouselItem :card="card" @del="handleDelete" />
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </iPage>
</template>
<script>
import moduleCard from './components/moduleCard'
import greetCard from './components/greetCard'
import iAgreeCard from './components/moduleCard/iAgreeCard'
import carouselItem from './components/moduleCard/carouselItem'
import { iPage } from 'rise'
import Sortable from 'sortablejs'
import { updateBatchModules } from '@/api/home'
export default {
  components: { moduleCard, greetCard, iPage, carouselItem },
  data() {
    return {
      fixedCardsComponentNames: ['Approve', 'Task', 'Schedule']
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      cardList: (state) => state.permission.cardList
    }),
    cards() {
      let newsIndex = -1
      let cards = this.cardList.filter(
        (li) =>
          !li.value && !['Approve', 'Task', 'Schedule'].includes(li.component)
      )
      let newsCard = cards.find((item, index) => {
        if(item.component === 'News') {
          newsIndex = index
          return true
        } else {
          return false
        }
      })
      if(newsCard && newsIndex > 0) {
        let zeroIndexCard = cards[0]
        cards[0] = newsCard
        cards[newsIndex] = zeroIndexCard
      }
      return cards
    },
    fixedCards() {
      const cards = []
      this.fixedCardsComponentNames.forEach(componentName => {
        this.addFixedCards(cards, componentName)
      })
      return cards
      // return this.cardList.filter(li => li.name ==`EKL`)
    },
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
    addFixedCards(cards, componentName) {
      let card = this.cardList.find((li) =>
        componentName === li.component
      )
      if(card) {
        cards.push(card)
      }
    },
    // handleDragEnd(event) {
    //   console.log('handleDragEnd', event)
    // },
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
      const res = await updateBatchModules(newCards)
      if (res.result) {
        this.$store.dispatch('setModules', newCards)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .cus-carousel {
    ::v-deep .el-carousel__arrow.el-carousel__arrow--left, ::v-deep .el-carousel__arrow.el-carousel__arrow--right {
      display: none !important;
    }
    ::v-deep .el-carousel__indicators.el-carousel__indicators--horizontal {
      background-color: transparent;
      z-index: 30;
      bottom: 3%;
      .el-carousel__button {
        background-color: rgb(192,192,192) !important;
        border-radius: 50% !important;
        height: 8px !important;
        width: 8px !important;
      }
    }

    ::v-deep .el-carousel__indicator.el-carousel__indicator--horizontal.is-active {
      .el-carousel__button {
        background-color: rgb(21, 119, 203) !important;
      }
    }
  }
.carousel-card {
  //height: 565px;
  margin-bottom: 20px;
  border-radius: 20px;
  .title {
    font-size: 20px;
    color: #222222;
    font-weight: bold;
    cursor: pointer;
  }
  ::v-deep .el-card__body{
    //height: 550px;
    height: calc(100vh - 420px);
    overflow: auto;
    //padding-right: 0px;
    .carousel{
      height: 100%;
    }
  }
}
.index-container {
  // display: flex;
  // flex-wrap: wrap;
  > div {
    height: 550px;
  }
  width: 100%;
  //min-height: 530px;
}
.greet-container {
  > div {
    height: 250px;
  }
  min-height: 250px;

  ::v-deep .el-card {
    border-color: rgb(234, 240, 249);
  }
  ::v-deep .module-card .el-card__body {
    min-height: 230px;
    height: 230px;
    background-color: rgb(238, 244, 254);
    border-color: rgb(238, 244, 254);
    padding: 5px;
  }
}
.blue-header-div {
  //.blue-header {
  .is-always-shadow {
    ::v-deep .el-card__header {
      background-color: rgb(15, 66, 145);
      .title {
        color: rgb(255, 255, 255);
      }
    }
  }
}

</style>
