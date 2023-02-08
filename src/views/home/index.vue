<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2022-02-18 14:35:31
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \rise\src\views\home\index.vue
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
<!--        <el-col-->
<!--          :xs="24"-->
<!--          :sm="12"-->
<!--          :md="8"-->
<!--          :lg="6"-->
<!--          :xl="6"-->
<!--          :key="card.id"-->
<!--          v-for="(card,index) in cards"-->
<!--        >-->
<!--          <module-card :card="cards" @del="handleDelete" />-->
<!--        </el-col>-->
      </el-row>
    </div>
  </iPage>
</template>
<script>
import moduleCard from './components/moduleCard'
import greetCard from './components/greetCard'
import carouselItem from './components/moduleCard/carouselItem'
import { iPage } from 'rise'
import Sortable from 'sortablejs'
import { updateBatchModules } from '@/api/home'
export default {
  components: { moduleCard, greetCard, iPage, carouselItem },
  data() {
    return {}
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      cardList: (state) => state.permission.cardList
    }),
    cards() {
      // console.log("cardList", this.cardList[1])
      let cards = this.cardList.filter(
        (li) =>
          !li.value && !['Approve', 'Task', 'Schedule'].includes(li.component)
      )
      return cards
    },
    fixedCards() {
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
  .cus-carousel {
    ::v-deep .el-carousel__arrow.el-carousel__arrow--left, ::v-deep .el-carousel__arrow.el-carousel__arrow--right {
      display: none !important;
    }
    ::v-deep .el-carousel__indicators.el-carousel__indicators--horizontal {
      background-color: transparent;
      z-index: 30;
      bottom: 60px;
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
  height: 565px;
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
    height: 570px;
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
    height: 230px;
    background-color: rgb(234, 240, 249);
    border-color: rgb(234, 240, 249);
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
