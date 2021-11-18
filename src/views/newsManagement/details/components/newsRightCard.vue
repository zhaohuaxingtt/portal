<template>
  <iCard class="form-right-icard margin-bottom20">
    <div class="from-right-top">
      <div class="form-right-round"></div>
      <div class="form-right-title">{{ title }}</div>
    </div>
    <!-- 横线 -->
    <div class="link-gray"></div>
    <ul>
      <div v-if="ruleForm.length > 0" class="form-right">
        <li
          class="form-right-li"
          v-for="item in ruleForm"
          :key="item.id"
          @click="handleOpenNewsDetail(item)"
        >
          <newsList :title="item.title" :url="item.picUrl">
            <span><slot :item="item" /></span>
          </newsList>
        </li>
      </div>
      <li v-else class="form-right-li-none">
        <div class="form-right-contnone">{{language('NEWS_ZANWUSHUJU','暂无数据')}}</div>
      </li>
    </ul>
  </iCard>
</template>

<script>
import { iCard } from "rise";
import newsList from "./newsList.vue";
export default {
  name: "rightHottest",
  components: {
    iCard,
    newsList,
  },
  props: {
    value: {
      type: Object,
      default: () => ([]),
    },
    title: String,
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
      },
    },
  },
  data() {
    return {
      ruleForm: [],
    };
  },
  methods: {
    handleOpenNewsDetail(val) {
      this.$emit("goDetail", val);
      console.log(val)
    },
  },
};
</script>
<style lang="scss" scoped>
.form-right-icard ::v-deep {
  margin-left: 19px;
  width: 320px;

  .cardBody {
    /* max-width: 440px; */
    padding: 0px;
    .from-right-top {
      display: flex;
      align-items: center;
      padding: 20px 20px 0px 20px;
      .form-right-round {
        width: 10px;
        height: 10px;
        background: #1660f1;
        border-radius: 50%;
        opacity: 1;
      }
      .form-right-title {
        margin-left: 23px;
        height: 28px;
        font-size: 20px;
        line-height: 28px;
        color: #333333;
        font-weight: bold;
      }
    }
  }
  .form-right {
    .form-right-li {
      cursor: pointer;
      padding: 10px 20px 10px 20px;
      border-radius: 5px;
    }
  }
  .form-right-li-none {
      padding: 10px 20px 10px 20px;
      border-radius: 5px;
      .form-right-contnone {
        height: 60px;
        text-align: center;
        line-height: 60px;
        color: #ccc;
      }
    }
}
.form-right-li:hover {
  background-color: rgba(22, 96, 241, 0.1);
}
/* 横线 */
.link-gray {
  width: 88%;
  height: 1px;
  margin-left: 20px;
  margin-top: 3px;
  background: #e1e4ed;
}
</style>
