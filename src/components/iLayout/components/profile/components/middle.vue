<template>
  <div class="middle">
    <middleItem label="Department:" value="CSS-2" />
    <middleItem label="Position:" value="CSS-2采购员" />
    <middleItem label="Employee Number:" value="66526" />
  </div>
</template>

<script>
import middleItem from './middleItem'
export default {
  name: 'profileMiddle',
  components: { middleItem }
}
</script>

<style lang="scss" scoped>
.middle {
  margin: 30px 0px 30px 0px;
  display: flex;
  justify-content: space-between;
}
</style>
