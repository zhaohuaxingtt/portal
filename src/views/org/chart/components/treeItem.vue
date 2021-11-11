<template>
  <div
    class="org-node"
    :id="'org-node--' + nodeData.id"
    @click="handleClickNode"
  >
    <div class="org-node-name">
      {{ nodeData.fullCode || '' }}
    </div>
    <div class="org-node-content">
      <div class="org-node-description">
        <div>{{ nodeData.nameZh || '' }}</div>
        <div>{{ nodeData.nameEn || '' }}</div>
      </div>
      <div class="org-node-users">
        <div v-for="(item, index) of leaders" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="mask">
      <div v-if="sideIconVisible" class="left icon" @click="handleExpandSide">
        <span
          :class="{
            'el-icon-arrow-left': nodeData.isSideCollapce,
            'el-icon-arrow-right': !nodeData.isSideCollapce
          }"
        ></span>
      </div>
      <div v-if="topIconVisible" class="top icon" @click="handleExpandTop">
        <span
          :class="{
            'el-icon-arrow-down': isTopCollapce,
            'el-icon-arrow-up': !isTopCollapce
          }"
        ></span>
      </div>
      <div v-if="sideIconVisible" class="right icon" @click="handleExpandSide">
        <span
          :class="{
            'el-icon-arrow-right': nodeData.isSideCollapce,
            'el-icon-arrow-left': !nodeData.isSideCollapce
          }"
        ></span>
      </div>
      <div
        class="bottom icon"
        v-if="bottomIconVisible"
        @click="handleToggleExpandChild"
      >
        <span
          :class="{
            'el-icon-arrow-up': nodeData.expanded,
            'el-icon-arrow-down': !nodeData.expanded
          }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'treeItem',
  props: {
    nodeData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    searchItem: {
      type: Object
    },
    flattenData: {
      typw: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    isSearchIng() {
      return this.searchItem && Object.keys(this.searchItem).length > 0
    },
    leaders() {
      const orgLeaders = []
      if (this.nodeData.positionList) {
        for (let i = 0; i < this.nodeData.positionList.length; i++) {
          const position = this.nodeData.positionList[i]
          if (position.isDeptLead && position.userDTOList) {
            position.userDTOList.forEach(user => {
              const name = (user.nameZh || '') + (user.nameEn || '')
              orgLeaders.push(name)
            })
          } else if (position.isDeptLead && position.child) {
            const name =
              (position.child.nameZh || '') + (position.child.nameEn || '')
            orgLeaders.push(name)
          }
        }
      }
      return orgLeaders
    },
    topIconVisible() {
      if (this.nodeData.uniqueId) {
        return this.nodeData.uniqueId.indexOf('@@') > -1
      }
      return false
    },
    bottomIconVisible() {
      if (this.nodeData.childNum === 0) {
        return false
      }
      return true
    },
    sideIconVisible() {
      return (
        this.flattenData.filter(e => e.parentId === this.nodeData.parentId)
          .length > 1
      )
    },
    isTopCollapce() {
      if (this.nodeData.isTopCollapce) {
        return true
      }
      return false
    }
  },
  methods: {
    handleClickNode() {
      const id = this.nodeData.id
      document.querySelectorAll('.org-node').forEach(element => {
        element.classList.remove('active')
      })
      document.querySelector('#org-node--' + id).classList.add('active')
      this.$emit('get-user', id)
    },
    handleToggleExpandChild() {
      this.$emit('toggle-expand-node', this.nodeData)
    },
    handleExpandSide() {
      // this.isSideCollapce = !this.isSideCollapce
      this.$emit(
        'toggle-expand-side',
        this.nodeData,
        !this.nodeData.isSideCollapce
      )
    },
    handleExpandTop() {
      // this.isTopCollapce = !this.isTopCollapce
      this.$emit('toggle-expand-top', this.nodeData, !this.isTopCollapce)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-node {
  position: relative;
  width: 172px;
  min-height: 146px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: solid 1px $color-blue;
  background: #fff;
  border-radius: 10px;
  &.active {
    border: solid 2px $color-blue;
    border-radius: 10px;
    &::before {
      position: absolute;
      width: 30px;
      height: 30px;
      display: block;
      content: '';
      right: 0;
      top: 0;
      background: url(~@/assets/images/selected.png) right top no-repeat;
      background-size: contain;
    }
  }
  .org-node-name {
    font-size: 18px;
    color: $color-blue;
    font-weight: bold;
    text-align: center;
    padding: 5px 0px;
    margin: 0 5px;
    border-bottom: solid 1px #dee3ed;
    text-transform: uppercase;
    word-break: break-all;
  }
  .org-node-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: calc(100% - 38px);
    margin-bottom: 15px;
    padding: 0px 10px;
    word-break: break-all;
  }
  .org-node-description {
    color: rgba(0, 0, 0, 1);
    font-size: 14px;
    font-weight: bold;
  }
  .org-node-users {
    color: #000;
    font-size: 14px;
  }
  &:hover {
    .mask {
      display: block;
    }
  }
  .expand-icon {
    padding: 5px;
    position: absolute;
    bottom: -45px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .mask {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    .icon {
      color: $color-blue;
      font-weight: 700;
      line-height: 1em;
    }
    .left {
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
    }
    .right {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translateY(-50%);
    }
    .top {
      position: absolute;
      left: 50%;
      top: -20px;
      transform: translateX(-50%);
    }
    .bottom {
      position: absolute;
      left: 50%;
      bottom: -5px;
      transform: translateX(-50%);
    }
  }
}
</style>
