<template>
  <div class="form-right-cont">
    <div class="from-right-content-img">
      <el-image :src="url" class="form-right-img" lazy />
    </div>
    <div class="from-right-li-content">
      <div class="from-right-li-content-lable" :title="title">
        {{
           title.length > 18
              ? title.substring(0, 18) + "..."
              : title
        }}
      </div>
      <div class="from-right-li-content-bottom">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import { iCard } from "rise";
export default {
  name: "rightHottest",
  components: {
    // iCard,
  },
  props: {
    url: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.form-right-cont {
  display: flex;
  cursor: pointer;
  ::v-deep .from-right-content-img {
    .form-right-img {
      width: 107px;
      background: #d8d8d8;
      opacity: 1;
      border-radius: 4px;
    }
  }
  .from-right-li-content {
    flex: 1;
    margin-left: 10px;
    word-break: break-all;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 0;
    .from-right-li-content-lable {
      height: 47px;
      font-size: 14px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .from-right-li-content-bottom {
      height: 20px;
      line-height: 20px;
      color: #988d8d;
      font-size: 12px;
      color: #999999;
      width: 100%;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
/* 横线 */
.link-gray {
  width: 100%;
  height: 1px;
  background: #e1e4ed;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
