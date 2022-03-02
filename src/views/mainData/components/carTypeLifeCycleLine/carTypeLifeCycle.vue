<template>
  <div>
    <div class="car-type-lifecycle">
      <div class="content">
        <div class="prefix">
          <div class="car-icon">
            <img src="~@/assets/images/caricon.png" />
          </div>
          <div class="label">
            <div>{{language(pepData.cartypeProjectZh)}}</div>
            <div>{{language(pepData.factoryNameStr)}}</div>
            <div>SOP：{{language(sopDateStr)}}</div>
          </div>
        </div>
        <carTypeLifeCycleItem
          v-for="(item,index) in items"
          :key="index"
          :itemProp="item"
          :highlightItems="highlightItems"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import func from 'vue-editor-bridge'
import carTypeLifeCycleItem from './carTypeLifeCycleItem.vue'
import { CarTypeLifeCycleMonths, CarTypeLifeCycleDefaultMonth } from './data'
export default {
  props: {
    highlightItems: {
      type: Object,
      default: function() {
        return {}
      }
    },
    pepData:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  components: {
    carTypeLifeCycleItem
  },
  methods: {
    itemObject(index) {
      let num = this.startIndex - index
      let objects = CarTypeLifeCycleMonths.filter(obj => {
        return (
          (obj.rightMonth === '' + num && obj.leftMonth.length == 0) ||
          obj.leftMonth === '' + num
        )
      })
      let item = objects.length > 0 ? objects[0] : null
      if (!item) {
        let defaultMonth = CarTypeLifeCycleDefaultMonth()
        if (num < 0) {
          num = num * -1
          num = '+' + num
          let defaultObjects = CarTypeLifeCycleMonths.filter(obj => {
            return (
              obj.leftMonth === num ||
              (obj.leftMonth.length == 0 && obj.rightMonth === num)
            )
          })
          if (defaultObjects.length != 0) {
            defaultMonth = defaultObjects[0]
          } else {
            defaultMonth.rightMonth = num //空月份设置月份
          }
        } else {
          defaultMonth.rightMonth = num + ''
        }
        item = defaultMonth
      }
      return item
    }
  },
  computed: {
    items() {
      let timeItems = []
      for (var i = 0; i < this.itemNum; i++) {
        let item = this.itemObject(i)
        if (item.leftMonth.length > 0 && item.rightMonth.length > 0) {
          i+=1
        }
        timeItems.push(item)
      }
      return timeItems
    },
    sopDateStr(){
      let date = this.pepData.sopDate ?  this.pepData.sopDate.substring(0,10) : '     '
      return date
    }
  },
  data() {
    return {
      itemNum: 52,
      startIndex: 48,
      CarTypeLifeCycleMonths
    }
  }
}
</script>

<style lang="scss" scoped>
.car-type-lifecycle {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 20px;
  .content {
    display: flex;
  }
}

.prefix {
  //   display: inline-block;
  margin-top: 30px;
  .car-icon {
    // background-color: red;
    width: 188px;
    img {
      width: 145px;
      height: 51px;
    }
  }

  .label {
    margin-top: 0px;
    text-align: center;
    color: #41434a;
  }
}
</style>
