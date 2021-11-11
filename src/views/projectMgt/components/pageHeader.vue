<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 21:03:05
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-13 11:11:49
 * @Description: 
 * @FilePath: \front-portal\src\views\projectMgt\components\pageHeader.vue
-->

<template>
  <div class="header">
    <pageHeader border>
      {{ language('PAICHENGZHUSHOU','排程助手') }}
      <div class="actions" slot="actions">
        <iTabBadge>
          <iTabBadgeItem
            v-for="item in tabList"
            :key="item.value"
            :badge="-1"
            :active="active === item.activePath"
            :name="item.name"
            @click="handleClick(item)"
          />
        </iTabBadge>
        <logIcon />
      </div>
    </pageHeader>
  </div>
</template>

<script>
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import logIcon from '@/components/logIcon'
// import { Icon } from 'rise'
import pageHeader from '@/components/pageHeader'
export default {
  name: 'panelHeader',
  props: {
    tabList: {type:Array, default:() => []},
    active: {
      type: String,
      default: ''
    }
  },
  components: { pageHeader, iTabBadge, iTabBadgeItem, logIcon },
  methods: {
    handleClick(item) {
      this.$router.push({path:item.url})
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 8px;
}
.actions {
  display: flex;
  align-items: center;
  .icon-lot {
    font-size: 20px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    .svg-icon {
      opacity: 0.2;
    }
    span {
      font-size: 14px;
      margin-left: 5px;
      color: #cad9f8;
    }
  }
}
</style>
