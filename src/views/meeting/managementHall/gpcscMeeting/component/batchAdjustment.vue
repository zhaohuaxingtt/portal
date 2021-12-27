<!--
 * @Author: HS   批量调整
 * @FilePath: \front-portal\src\views\meeting\managementHall\gpcscMeeting\component\batchAdjustment.vue
-->
<template>
  <div>
      <draggable
            class="syllable_ul"
            element="ul"
            :list="syllable"
            :options="{group:'title', animation:150}"
            :no-transition-on-drag="true"
            @change="change"
            @start="start"
            @end="end"
            :move="move"
          >
            <transition-group type="transition"  :name="!drag? 'syll_li' : null" :css="true">
              <li v-for="(item , idx) in syllable" :key="idx">{{item.title}}</li>
            </transition-group>
          </draggable>
      <div>
        <iButton>保存</iButton>
        <iButton>重置</iButton>
        <iButton>退出</iButton>
      </div>
  </div>
</template>

<script>
import { iButton} from 'rise'
import draggable from "vuedraggable";
export default {
  components: {
    iButton,
    draggable
  },
  methods:{
      //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    change(evt) {
      console.log(evt , 'change...')
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start(evt) {
      this.drag = true
      console.log(evt , 'start...')
    },
    end(evt) {
      console.log(evt , 'end....')
      this.drag = true
      evt.item //可以知道拖动的本身
      evt.to    // 可以知道拖动的目标列表
      evt.from  // 可以知道之前的列表
      evt.oldIndex  // 可以知道拖动前的位置
      evt.newIndex  // 可以知道拖动后的位置
    },
    move(evt, originalEvent) {
      console.log(evt , 'move')
      console.log(originalEvent) //鼠标位置
    }
  }
 
}
</script>

<style>
</style>