<template>
  <el-col :span="8">
    <el-tooltip
      v-if="item.description"
      effect="light"
      :content="item.description"
      placement="top"
    >
      <div class="tag" @click="tap(item)" :class="{ disabled: !item.url }">
        <div class="left-content">
          <div class="dot"></div>
          <div>
            <span>{{ item.appNameCn }}</span>
          </div>
        </div>
        <div class="icon">
          <Icon symbol name="icontiaozhuananniu" style="font-size: 10px"></Icon>
        </div>
      </div>
    </el-tooltip>
    <div v-else class="tag" @click="tap(item)" :class="{ disabled: !item.url }">
      <div class="left-content">
        <div class="dot"></div>
        <div>
          <span>{{ item.appNameCn }}</span>
        </div>
      </div>
      <div class="icon">
        <Icon symbol name="icontiaozhuananniu" style="font-size: 10px"></Icon>
      </div>
    </div>
  </el-col>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'applicationListItem',
  components: { Icon },
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    tap(val) {
      const { url } = val
      if (url) {
        window.open(url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(68, 115, 209, 0.03);
  margin-top: 10px;
  cursor: pointer;
  .left-content {
    display: flex;
    align-items: center;
    .dot {
      width: 6px;
      height: 6px;
      background: #1660f1;
      border-radius: 50%;
      margin-left: 10px;
      margin-right: 15px;
    }
  }
  .icon {
    margin-right: 5px;
    margin-top: -5px;
  }
}
.tag.disabled {
  cursor: not-allowed;
}
</style>
