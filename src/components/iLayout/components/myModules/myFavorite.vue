<template>
  <div class="my-favorites">
    <div class="my-favorites-name">
      <span class="name">My Favourites</span>
      <span class="icon-setting">
        <a href="/portal/#/setting?module=favourites">
          <icon name="iconSetting" symbol />
        </a>
      </span>
    </div>
    <div
      class="my-favorite-list"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
    >
      <div
        class="my-favorite-list-item"
        v-for="item in favorites"
        :key="item.name"
      >
        <div class="icon-panel">
          <span v-if="item.objType === 1" class="icon-type el-icon-link"></span>
          <icon
            v-if="item.objType === 2"
            name="iconshangchuanwenjian"
            class="icon-type-c"
            symbol
          />
        </div>
        <div class="url">
          <a :href="item.url" :title="item.objName">{{ item.objName }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
import { queryFavorites } from './../../api'
export default {
  name: 'myFavorite',
  components: { Icon },
  data() {
    return {
      favorites: [],
      loading: false
    }
  },
  created() {
    this.queryFavourites()
  },
  methods: {
    async queryFavourites() {
      const requestData = {
        userId: this.$store.state.permission.userInfo.id
      }
      this.loading = true
      const { data = [] } = await queryFavorites(requestData).finally(() => {
        this.loading = false
      })
      this.favorites = data
    }
  }
}
</script>

<style lang="scss" scoped>
.my-favorites {
  flex: 1;
  overflow: hidden;
}
.my-favorites-name {
  display: flex;
  position: relative;
  padding-left: 10px;
  border-left: solid 3px #1763f7;
  color: #001847;
  font-size: 18px;
  justify-content: space-between;
  .name {
    font-weight: bold;
  }
  .icon-setting {
    cursor: pointer;
  }
}
.my-favorite-list {
  overflow-y: auto;
  margin: 10px 0px;
  height: 150px;
  .my-favorite-list-item {
    font-size: 12px;
    line-height: 18px;
    padding: 6px 0px;
    overflow: hidden;
    display: flex;
    align-items: center;

    .icon-panel {
      width: 24px;
    }
    .icon-type {
      font-size: 18px;
      color: #1763f7;
      font-weight: bold;
    }
    .icon-type-c {
      font-size: 14px;
      transform: rotate(90deg);
    }
    .url {
      width: calc(100% - 24px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
