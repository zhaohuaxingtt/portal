<template>
  <div class="news-card">
    <div class="bottom-card">
      <div
        class="form-bottom-icard"
        v-for="item in hotRuleForm"
        :key="item.id"
        @click="handleBottom(item)"
      >
        <iCard>
          <div class="form-bottom-row1">
            <el-image :src="item.picUrl" lazy class="form-bottom-icard-img" />
          </div>
          <div class="form-bottom-item form-bottom-row2">
            <span>{{
              item.title
                ? item.title.length > 20
                  ? item.title.substring(0, 20) + "..."
                  : item.title
                : ""
            }}</span>
          </div>
          <div class="form-bottom-item form-bottom-row3">
            <span>{{
              item.summary
                ? item.summary.length > 22
                  ? item.summary.substring(0, 22) + "..."
                  : item.summary
                : ""
            }}</span>
          </div>
          <div class="form-bottom-item form-bottom-row4">
            <div
              class="form-bottom-row4-content"
              v-for="(it, index) in item.tags"
              :key="it.id"
            >
              <div
                v-if="index < 4"
                class="form-bottom-row4-div"
                :title="it.content"
              >
                {{ it.content }}
              </div>
            </div>
            <div v-if="disableTags">...</div>
          </div>
          <div class="form-bottom-item form-bottom-row5">
            <div class="content">
              {{
                item.source
                  ? item.source.length > 11
                    ? item.source.substring(0, 11) + "..."
                    : item.source
                  : ""
              }}
            </div>
            <div class="content">{{ item.publishDate }}</div>
            <div class="content form-content-icon">
              <img
                src="@/assets/images/news/view.svg"
                alt=""
                class="form-content-icon-img"
              />
              <div class="form-content-icon-text">{{ item.pageviews }}</div>
            </div>
          </div>
        </iCard>
      </div>
    </div>
  </div>
</template>

<script>
import { iCard } from "rise";

export default {
  name: "newBottom",
  components: {
    iCard,
  },
  props: {
    value: {
      type: Object,
      default: () => [],
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.hotRuleForm = val;
      },
    },
  },
  data() {
    return {
      hotRuleForm: [],
    };
  },
  computed: {
    disableTags(){
      const {tags} = this.hotRuleForm
      return tags?.length > 4 
    }
  },
  methods: {
    handleBottom(val) {
      this.$emit('handleBottom',val)
    },
  },
};
</script>
<style lang="scss" scoped>
.news-card {
  min-height: 500px;
  .top-tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: -20px;
    .top-tags-item {
      cursor: pointer;
      min-width: 63px;
      height: 20px;
      line-height: 20px;
      background: #ffffff;
      border: 1px solid #d9dee5;
      border-radius: 16px;
      text-align: center;
      font-size: 12px;
      color: #5f6f8f;
      margin-right: 20px;
      margin-bottom: 10px;
      .top-tags-item-div {
        padding: 0 10px;
      }
    }
    .top-tags-item:hover {
      background: rgb(241, 238, 238);
    }
    .active {
      background: rgba(22, 96, 241, 0.1);
      color: #1660f1;
    }
  }
  .bottom-card {
    display: flex;
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
    // .form-bottom-icard:hover {
    //   background-color: rgba(22, 96, 241, 0.1);
    // }
    .form-bottom-icard ::v-deep {
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
      .cardBody:hover {
        background-color: rgba(22, 96, 241, 0.1);
      }
      .cardBody {
        width: 450px;
        height: 450px;
        padding: 0 !important;
        border-radius: 0.375rem;
        .form-bottom-row1 {
          position: relative;
          .form-bottom-icard-img {
            height: 253px;
            width: 100%;
            border-radius: 0.375rem;
            margin-bottom: 10px;
          }
          .form-bottom-row1-topic {
            min-width: 60px;
            height: 20px;
            line-height: 20px;
            background: #1660f1;
            border-radius: 10px;
            text-align: center;
            color: #ffffff;
            font-size: 14px;
            position: absolute;
            top: 20px;
            right: 20px;
          }
          .form-bottom-row1-new {
            left: 20px;
            right: auto;
            color: red;
            background: #f8f9fa;
            font-weight: bold;
          }
        }

        .form-bottom-item {
          margin: 20px;
        }
        .form-bottom-row2 {
          height: 25px;
          font-size: 18px;
          line-height: 30px;
          font-weight: bold;
        }
        .form-bottom-row3 {
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          color: #000000;
        }
        .form-bottom-row4 {
          margin: 0 15px;
          height: 20px;
          width: 100%;
          font-size: 12px;
          display: flex;
          // overflow: hidden;
          // text-overflow: ellipsis;
          .form-bottom-row4-content {
            max-width: 22%;
            background: #f8f8fa;
            margin: 0 5px;
            border-radius: 10px;
            .form-bottom-row4-div {
              padding: 0 20px;
              /* text-align: center; */
              color: #988d8d;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 110%;
            }
          }
        }
        .form-bottom-row5 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #988d8d;
          height: 17px;
          font-size: 12px;
          .form-content-icon {
            height: 100%;
            display: flex;
            align-items: center;
            .form-content-icon-img {
              width: 16px;
              height: 16px;
            }
            .form-content-icon-text {
              // color: #988d8d;
              padding: 0 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
