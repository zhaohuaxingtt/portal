<template>
  <div class="username">
    <div class="title">Profile</div>
    <div class="text">
      <div class="zh">{{ nameZh }}</div>
      <div class="en">{{ nameEn }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profileHeaderName',
  props: {
    nameZh: { type: String },
    nameEn: { type: String }
  }
}
</script>

<style lang="scss" scoped>
.username {
  font-weight: bold;
  .title {
    font-size: 28px;
    line-height: 37px;
    margin-bottom: 10px;
  }
  .text {
    font-size: 20px;
    line-height: 26px;
    display: flex;
    align-items: center;
    .zh {
      margin-right: 5px;
    }
  }
}
</style>
