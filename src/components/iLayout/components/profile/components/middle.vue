<template>
  <div class="middle">
    <middleItem label="Department:" :value="deptName" />
    <middleItem label="Position:">
      <div class="position-panel">
        <div
          class="position-label"
          v-for="item in positionList"
          :key="item.id"
          :class="{ active: positionDtoId === item.id }"
          @click="handleSwitchPosition(item)"
        >
          <span :title="positionDtoId !== item.id ? '点击切换岗位' : ''">
            <icon
              v-if="positionDtoId === item.id"
              symbol
              name="iconshenpiliu-yishenpi"
            />
            {{ item.fullNameZh }}
          </span>
        </div>
      </div>
    </middleItem>
    <middleItem label="Employee Number:" :value="userInfo.userNum" />
  </div>
</template>

<script>
import middleItem from './middleItem'
import { Icon } from 'rise'
export default {
  name: 'profileMiddle',
  components: { middleItem, Icon },
  computed: {
    userInfo() {
      return this.$store.state.permission.userInfo || {}
    },
    positionList() {
      return this.userInfo.positionList
    },
    positionDtoId() {
      return this.userInfo?.positionDTO?.id
    },
    deptName() {
      return this.userInfo?.deptDTO?.nameZh
    }
  },
  methods: {
    handleSwitchPosition(position) {
      if (this.positionDtoId === position.id) {
        return
      }

      this.$confirm(
        `确定要切换岗位吗，切换岗位请关闭与系统相关的其他浏览器标签。`,
        '确定信息',
        {
          confirmButtonText: this.$t('确认'),
          cancelButtonText: this.$t('取消'),
          type: 'warning'
        }
      )
        .then(() => {
          console.log('切换了', position)
          this.$emit('close')
          window.sessionStorage.removeItem('userInfo')
          window.sessionStorage.removeItem('cardList')
          window.sessionStorage.removeItem('columnConfig')
          this.$store.commit('SET_USER_INFO', {})
          this.$store.commit('SET_USER_INFO', {})
          const currentPath = window.location.href.replace(
            window.location.origin,
            ''
          )

          if (currentPath === '/portal/#/index') {
            window.location.reload()
          } else {
            window.location.href = '/portal/#/index'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.middle {
  margin: 30px 0px 30px 0px;
  display: flex;
  justify-content: space-between;
}
.position-panel {
  display: flex;
  align-items: center;
}
.position-label {
  margin-right: 10px;
  cursor: pointer;

  &.active {
    color: $color-blue;
    cursor: default;
  }
  &:hover {
    color: $color-blue;
  }
}
</style>
