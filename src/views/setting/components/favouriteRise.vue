<template>
  <iCard>
    <div v-loading="loading">
      <favouriteRiseSearch @search="search" />
      <h4 class="t">菜单列表</h4>

      <div class="content">
        <div class="content-panel menu">
          <favouriteRiseMenu
            :favourites="riseFavourites"
            :filter-str="filterStr"
            @save="handleSave"
          />
        </div>
        <div class="content-panel has-menu">
          <favouriteRiseMenuHas
            :favourites="riseFavourites"
            :filter-str="filterStr"
            @save="handleSave"
          />
        </div>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, iMessage } from 'rise'
import favouriteRiseSearch from './favouriteRiseSearch'
import favouriteRiseMenu from './favouriteRiseMenu'
import favouriteRiseMenuHas from './favouriteRiseMenuHas'
import { saveFavoriteMenu } from '@/api/setting'
export default {
  name: 'favouriteRise',
  components: {
    iCard,
    favouriteRiseSearch,
    favouriteRiseMenu,
    favouriteRiseMenuHas
  },
  props: {
    favorites: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    favorites() {
      this.getFavorites()
    }
  },
  provide() {
    return {
      queryFavouritedLoading: this.queryFavouritedLoading
    }
  },
  data() {
    return {
      riseFavourites: [],
      filterStr: '',
      queryFavouritedLoading: false,
      loading: false
    }
  },
  created() {
    this.getFavorites()
  },
  methods: {
    search(val) {
      this.filterStr = val
    },
    getFavorites() {
      this.riseFavourites = this.favorites.filter((e) => e.objType === 1)
    },
    handleSave(item) {
      const isFavorited = this.riseFavourites.some((e) => e.objId === item.id)
      const data = isFavorited
        ? this.riseFavourites.filter((e) => e.objId !== item.id)
        : [...this.riseFavourites, item]
      this.loading = true
      saveFavoriteMenu(data)
        .then((res) => {
          if (res && res.result) {
            this.riseFavourites = data
            this.$emit('refresh-favourites')
            iMessage.success(
              res.desZh || (isFavorited ? '已取消收藏' : '收藏成功')
            )
          } else {
            iMessage.success(
              res.desZh || (isFavorited ? '取消收藏失败' : '收藏失败')
            )
          }
        })
        .catch((err) => {
          iMessage.success(
            err.desZh || (isFavorited ? '取消收藏失败' : '收藏失败')
          )
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style lang="scss" scoped>
.t {
  font-size: 16px;
  margin: 30px 0px;
}
.content {
  display: flex;
  justify-content: space-between;
  .content-panel {
    border: 1px solid #eaeaea;
    padding: 20px;
    box-sizing: border-box;
    &.menu {
      width: calc(100% - 520px);
    }
    &.has-menu {
      width: 500px;
    }
  }
}
</style>
