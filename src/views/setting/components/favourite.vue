<template>
  <div class="favourite" v-loading="loading">
    <div class="tab">
      <div
        class="tab-item"
        @click="active = 'rise'"
        :class="{ active: active === 'rise' }"
      >
        RiSE
      </div>
      <div
        class="tab-item"
        @click="active = 'other'"
        :class="{ active: active === 'other' }"
      >
        {{language('其他系统')}}
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <favouriteRise
        v-show="active === 'rise'"
        :favorites="favorites"
        @refresh-favourites="queryFavourites"
      />
    </transition>
    <transition name="el-fade-in-linear">
      <favouriteOther v-show="active === 'other'" :favorites="favorites" />
    </transition>
  </div>
</template>

<script>
import favouriteRise from './favouriteRise'
import favouriteOther from './favouriteOther'
import { queryFavorites } from '@/api/setting'
export default {
  name: 'favourite',
  components: { favouriteRise, favouriteOther },
  data() {
    return {
      active: 'rise',
      loading: false,
      favorites: []
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
.tab {
  display: flex;
  margin: 20px 0px;
  .tab-item {
    width: 120px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    &.active {
      background: #ffffff;
      box-shadow: 0px 0px 10px rgba(117, 94, 94, 0.08);
      font-weight: bold;
      color: #1660f1;
    }
  }
}
</style>
