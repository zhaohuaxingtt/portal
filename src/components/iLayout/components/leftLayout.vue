<!--
 * @Author: yuszhou
 * @Date: 2021-02-22 16:47:54
 * @LastEditTime: 2021-04-19 17:09:46
 * @LastEditors: Please set LastEditors
 * @Description: 界面左边的按钮切换菜单栏。
 * @FilePath: \rise\src\layout\components\leftLayout.vue
-->
<template>
  <div class="left-layout">
    <div class="leftLayout">
      <div class="content">
        <!-- <img class="logo" src="~@/assets/images/rise.png" alt="" /> -->

        <div :class="iconChangeClass" class="centerBtn">
          <!-- <span
            v-for="(item, index) in menus"
            :key="index"
            :class="{ transparent: activeIndex === index }"
            @click="toggleActive(index)"
          > -->
          <span
            v-for="item in menus"
            :key="item.id"
            :class="{
              transparent: activeIndex === item.permissionKey
            }"
            @click="toggleSubMenu(item)"
          >
            <icon
              symbol
              :name="
                activeIndex === item.permissionKey ? item.activeIcon : item.icon
              "
            />
          </span>
        </div>
        <div class="btn-button">
          <!-- <img src="~@/assets/images/leftContent.png" alt="" /> -->
        </div>
      </div>
    </div>
    <div class="leftLayout menuLayout">
      <icon
        symbol
        name="iconcaidanzhankai"
        :class="{ menu: true, hiddenMenu: menuVisible, delay: !menuVisible }"
        @click.native="menuVisible = !menuVisible"
        v-if="menus.map((item) => item.permissionKey).includes(activeIndex)"
      />
      <div
        :class="{
          meunContent: true,
          showMenuContent: menuVisible,
          delay: menuVisible
        }"
      >
        <div class="meunTopContent">
          <span>{{ menuTextMap[activeIndex] }}</span>
          <icon
            symbol
            name="iconcaidanshouqi"
            :class="{ menu: true, hiddenMenu: menuVisible }"
            @click.native="menuVisible = !menuVisible"
          />
        </div>
        <slot name="menu"></slot>
        <slot name="dashboard"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { icon } from 'rise'
export default {
  name: 'leftLayout',
  components: { icon },
  props: {
    menus: {
      type: Array,
      default: function () {
        return []
      }
    },
    activeMenu: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      iconChangeClass: '',
      menuVisible: false,
      activeIndex: '',
      menuTextMap: {
        RISE_HOME: 'Personalized Modules',
        RISE_WORKBENCH: 'Workbench',
        RISE_GP: 'General Purchase',
        RISE_COMMON_FUNCTION: 'Common Function'
      }
    }
  },
  provide() {
    return this
  },
  watch: {
    activeMenu() {
      this.setDefaultActiveIndex()
    },
    menuVisible(val) {
      console.log('menuVisible', val)
    }
  },
  mounted() {
    this.setDefaultActiveIndex()
  },
  methods: {
    setDefaultActiveIndex() {
      if (this.activeMenu && this.activeMenu.length) {
        this.activeIndex = this.activeMenu[0]
      }
    },
    getFirstMenuActive() {
      return this.$route.meta.top || 'RISE_WORKBENCH'
    },
    toggleSubMenu(item) {
      const href = window.location.href
      const origin = window.location.origin
      const path = href.replace(origin, '')
      if (
        item.permissionKey === 'RISE_HOME' &&
        path.indexOf('/portal') === 0 &&
        path.indexOf('#/index') > -1
      ) {
        this.activeIndex = 'RISE_HOME'
        this.$emit('toggle-active', 'RISE_HOME')
        this.showSideMenu()
      } else {
        const activeMenu = item
        if (this.menus.length > 0) {
          if (activeMenu.subMenus) {
            if (this.activeIndex === item.permissionKey) {
              if (this.menuVisible) {
                this.hideSideMenu()
              } else {
                this.showSideMenu()
              }
            } else {
              this.showSideMenu()
            }
          } else if (activeMenu.url) {
            if (
              activeMenu.url.indexOf('http') !== -1 ||
              activeMenu.url.indexOf('https') !== -1
            ) {
              location.href = activeMenu.url
              /* activeMenu.target
                ? window.open(activeMenu.url)
                : (location.href = activeMenu.url) */
            }
            this.hideSideMenu()
          }
          this.activeIndex = item.permissionKey
          this.$emit('toggle-active', item.permissionKey)
        }
      }
    },
    showSideMenu() {
      this.menuVisible = true
      this.$emit('set-menu-modal-visible', true)
    },
    hideSideMenu() {
      this.menuVisible = false
      this.$emit('set-menu-modal-visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.left-layout {
}
.delay {
  transition-delay: 0.4s !important;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.leftLayout {
  width: 100px;
  background-color: $color-white;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  padding-top: 11px;
  padding-bottom: 30px;

  .menu {
    position: absolute;
    top: 10px;
    font-size: 38px;
    left: 91px;
    cursor: pointer;
    transition: all 0.3s;
    opacity: 1;
    transform: translateX(0px);
    border-radius: 0px;
  }

  .hiddenMenu {
    opacity: 0;
    transform: translateX(-30px);
  }

  .type-first {
    span {
      &:nth-child(2) {
        border-top-right-radius: 15px;
      }
    }
  }

  .type-tow {
    span {
      &:nth-child(1) {
        border-bottom-right-radius: 15px;
      }

      &:nth-child(3) {
        border-top-right-radius: 15px;
      }
    }
  }

  .type-last {
    span {
      &:nth-child(2) {
        border-bottom-right-radius: 15px;
      }
    }
  }

  .centerBtn {
    background-color: #f1f5ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    span {
      height: 90px;
      width: 100%;
      display: inline-block;
      text-align: center;
      line-height: 90px;
      background-color: $color-white;
      font-size: 32px;
      cursor: pointer;
      transition: all 0.2s;
      color: #001847;
    }

    .icon {
      font-size: 32px;
    }

    .transparent {
      background-color: transparent;
      height: 90px;
      line-height: 90px;

      svg {
        color: $color-blue;
      }
    }
  }

  .logo {
    width: 63px;
    height: 32px;
    display: block;
    margin: 0 auto;
    cursor: pointer;
  }

  .btn-button {
    width: 70px;
    height: 70px;
    // background: #f1f5ff;
    margin: 0 auto;
    padding: 13px;
    // border-radius: 15px;
    // cursor: pointer;

    img {
      display: inline-block;
      height: 100%;
      width: 100%;
    }
  }
}

.menuLayout {
  z-index: 1000;

  .meunContent {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1001;
    height: 100%;
    width: 386px;
    background: #eef2fb;
    box-shadow: 0px 0px 20px rgba(95, 98, 111, 0.16);
    transform: translateX(-368px);
    transition: all 0.4s;
    opacity: 0.5;

    .meunTopContent {
      height: 60px;
      padding-left: 40px;
      line-height: 60px;
      position: relative;
      overflow: hidden;

      span {
        font-size: 24px;
        font-weight: bold;
        color: #001847;
      }

      .menu {
        position: absolute;
        top: 10px;
        right: -10px;
        left: inherit;
        font-size: 38px;
        cursor: pointer;
        transition: all 0.3s;
        transform: translateX(30px);
        opacity: 0;
      }

      .hiddenMenu {
        transform: translateX(0px);
        opacity: 1;
      }
    }
  }

  .showMenuContent {
    transform: translateX(101px);
    opacity: 1;
  }
}
</style>
