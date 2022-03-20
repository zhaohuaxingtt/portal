<template>
  <div>
    <iCard class="form-content-icard">
      <div class="form-comtent-top">
        <div class="form-bottom-row2">
          <!-- <h2>车之窗 | 顶住“缺芯”压力，荣威iMAX8上险量继续保持高位！</h2> -->
          <span>{{ ruleForm.title }}</span>
        </div>
        <div class="form-bottom-row2-right">
          <div
            v-for="item in ruleForm.tags"
            :key="item.id"
            class="form-bottom-row2-right-list"
          >
            <div class="form-content-row4-content">
              <div class="form-content-row4-div" :title="item.content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-content-top2">
        <div class="form-bottom-row3">
          <div>{{ ruleForm.source }}</div>
          <!-- <div class="form-content-data">2021-07-06 11:22:33</div> -->
          <div class="form-content-data">{{ ruleForm.publishDate }}</div>
        </div>
        <div class="form-content-row5-content">
          <div class="form-content-icon">
            <img
              src="@/assets/images/news/view.svg"
              alt=""
              class="form-content-icon-img"
            />
            <div class="form-content-icon-text">{{ ruleForm.pageviews }}</div>
          </div>
          <div class="form-content-icon">
            <img
              v-show="viewLinke"
              src="@/assets/images/news/likeGray.svg"
              alt=""
              class="form-content-icon-img-like"
              @click="handleLike"
            />
            <img
              v-show="!viewLinke"
              src="@/assets/images/news/likeRed.svg"
              alt=""
              class="form-content-icon-img-like"
              @click="handleLikeRed"
            />
            <div class="form-content-icon-text">{{ ruleForm.thumbsUpNum }}</div>
          </div>
          <div class="form-content-icon">
            <a
              :href="`mailto:?subject=RiSE${language(
                'NEWS_YNFXYTXW',
                '与您分享一条新闻'
              )}：${ruleForm.title}&body=${
                ruleForm.summary
              }%0A%0D${mailtoShare}`"
            >
              <img
                src="@/assets/images/news/share.svg"
                alt=""
                class="form-content-icon-img-like"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- 视频 -->
      <div class="form-content-video-div" v-if="ruleForm.type === 2">
        <video
          :src="ruleForm.videoUrl"
          controls="controls"
          class="form-content-img"
        />
      </div>

      <!-- 图片 -->
      <ul class="form-content-img-div" v-if="ruleForm.type === 1">
        <li
          v-for="item in ruleForm.newsAtlas"
          :key="item.id"
          class="form-content-img-container"
        >
          <!-- <img
            :src="item.atlasUrl"
            @click="handlePreview"
            class="form-content-img"
          /> -->
          <el-image
            class="form-content-img"
            :src="item.atlasUrl"
            :preview-src-list="newsAtlas"
            lazy
          >
          </el-image>
        </li>
        <!-- <el-empty :image="url" :image-size="200" description="暂无数据">
        </el-empty> -->
      </ul>
      <!-- 图片预览 -->
      <div v-if="openImg && ruleForm.newsAtlas.length > 0">
        <div class="picPreview" v-if="openImg">
          <div
            class="prev el-icon-arrow-left"
            @click="arrowClick('prev')"
          ></div>
          <div class="carousel">
            <div class="close el-icon-circle-close" @click="closePrev"></div>
            <el-carousel
              arrow="never"
              indicator-position="outside"
              ref="cardShow"
            >
              <el-carousel-item
                v-for="item in ruleForm.newsAtlas"
                :key="item.id"
              >
                <img :src="item.atlasUrl" alt="" class="image" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div
            class="next el-icon-arrow-right"
            @click="arrowClick('next')"
          ></div>
        </div>
        <div class="over"></div>
      </div>

      <!-- 图文内容 -->
      <div class="form-tem-contentImg" v-if="ruleForm.type === 0">
        <div>
          <!-- <div class="form-item-imgContent">
            芯片供应紧张问题正在支持发酵。业内人士预测，“缺芯”问题对二季度的影响幅度将大于一季度。二季度第一个月的数据也初步印证了这一观点：中汽协发布的报告中显示，
            4月份乘用车产销171.4万辆和170.4万辆，环比下降9.0%和9.1%
          </div> -->
          <div
            class="form-item-imgContent news-detail-content"
            v-html="ruleForm.content"
          >
            <!-- {{ruleForm.content}} -->
          </div>
          <!-- <div class="form-item-imgContent-div">
            <el-image
              :src="ruleForm.picUrl"
              alt=""
              class="form-imgContent-img"
            />
          </div> -->
        </div>
      </div>

      <!-- 附件 -->
      <div v-if="ruleForm.newsAttachments" class="form-item-file">
        <div class="form-item-title">
          {{ language('NEWS_XIANGGUANFUJIN', '相关附件') }}
        </div>
        <ul>
          <li v-for="item in ruleForm.newsAttachments" :key="item.id">
            <a
              @click="
                handleDownloadFile(item.attachmentUrl, item.attachmentName)
              "
              class="el-upload-list__item-name"
            >
              <i class="el-icon-paperclip"></i>{{ item.attachmentName }}
            </a>
          </li>
        </ul>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard } from 'rise'
import { createAnchorLink } from '@/utils/downloadUtil'

export default {
  name: 'newContent',
  components: {
    iCard
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    viewLinke: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val
        this.newsAtlas = val.newsAtlas?.map((item) => {
          return item.atlasUrl
        })
      }
    }
  },
  data() {
    return {
      ruleForm: {},
      openImg: false,
      newsAtlas: [],
      disabledClick: false,
      disabledClick2: false
    }
  },
  computed: {
    mailtoShare() {
      return window.location.href
    }
  },
  mounted() {},
  methods: {
    // 预览
    handlePreview() {
      this.openImg = true
    },
    // 关闭预览
    closePrev() {
      this.openImg = false
    },
    // 预览-轮播图移动
    arrowClick(val) {
      if (val === 'next') {
        this.$refs.cardShow.next()
      } else {
        this.$refs.cardShow.prev()
      }
    },
    handleDownloadFile(url, name) {
      createAnchorLink(
        url, // 前端跨域问题，将api地址替换为反向代理地址
        name
      )
    },
    handleLike() {
      let time = ''
      if (this.disabledClick) {
        clearTimeout(time)
        return
      }
      this.disabledClick = true
      time = setTimeout(() => {
        this.disabledClick = false
      }, 3000)
      this.$emit('handleLike')
    },
    handleLikeRed() {
      let time = ''
      if (this.disabledClick2) {
        clearTimeout(time)
        return
      }
      this.disabledClick2 = true
      time = setTimeout(() => {
        this.disabledClick2 = false
      }, 3000)
      this.$emit('handleLikeRed')
    }
  }
}
</script>
<style lang="scss" scoped>
.form-content-icard {
  margin-bottom: 3rem;
  width: 100%;
  /* min-height: 800px; */
  ::v-deep .cardBody {
    padding: 1.875rem 2.38rem;
  }
}
.el-image-viewer__btn .el-image-viewer__close {
  background-color: #fff !important;
  font-size: 2rem !important;
}
/* 附件 */
.form-item-file {
  margin-top: 15px;
  border-top: 0.08rem dashed #e0e6ed;
  .form-item-title {
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    line-height: 15px;
    color: #000000;
    padding: 20px 0;
    font-weight: bold;
  }
  li {
    padding: 5px 0;
    display: flex;
    .el-upload-list__item-name {
      font-size: 12px;
      font-family: Arial;
      font-weight: 400;
      line-height: 16px;
      color: #1660f1;
      cursor: pointer;
      .el-icon-paperclip {
        color: #1660f1;
      }
    }
  }
}
.form-comtent-top {
  display: flex;
  justify-content: space-between;
  .form-bottom-row2 {
    max-width: 70%;
    font-size: 20px;
    line-height: 30px;
    font-weight: bold;
  }
  .form-bottom-row2-right {
    min-width: 10%;
    max-width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-right: 3px;
    margin-top: 2px;
    height: 100%;
    .form-bottom-row2-right-list {
      margin-left: 20px;
      margin-bottom: 5px;
      height: 20px;
      .form-content-row4-content {
        background-color: rgba(248, 248, 250);
        border-radius: 16px;
        line-height: 20px;
        height: 20px;
        .form-content-row4-div {
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          color: #988d8d;
          padding: 0 23px;
        }
      }
    }
  }
}
.form-content-top2 {
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .form-bottom-row3 {
    display: flex;
    align-items: center;
    .form-content-data {
      margin-left: 1rem;
      color: #988d8d;
    }
  }
  .content {
    padding: 0 5px;
    cursor: pointer;
  }
  .form-content-row5-content {
    display: flex;
    margin-right: 0.22rem;
    .form-content-icon {
      /* width: 3rem;
      height: 1.5rem; */
      width: 14px;
      height: 14px;
      margin-left: 23px;
      display: flex;
      align-items: center;
      .form-content-icon-img {
        width: 100%;
        height: 100%;
        margin-right: 6px;
      }
      .form-content-icon-img-like {
        width: 100%;
        height: 100%;
        margin-right: 6px;
        cursor: pointer;
      }
      .form-content-icon-text {
        color: #988d8d;
        /* padding: 0 0.5rem; */
      }
    }
  }
}
.form-content-video-div {
  margin-top: 20px;
  min-height: 30rem;
  .form-content-img {
    width: 100%;
    height: 100%;
  }
}
.form-content-img-div {
  /* margin-top: 3px; */
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  /* margin-right: -2rem; */
  margin-right: -40px;
  .form-content-img-container {
    margin-bottom: 19px;
    flex: 0 0 25%;
    padding-right: 33px;
    width: 308px;
    height: 173px;
    opacity: 1;
    border-radius: 4px;
    .form-content-img {
      width: 100%;
      height: 100%;
      border-radius: 0.375rem;
      cursor: pointer;
    }
    &:not(:nth-child(4n)) {
      margin-bottom: 0;
    }
  }
}

.form-tem-contentImg {
  .form-item-imgContent {
    /* overflow-x: scroll; */
    /* padding: 2rem 0; */
    /* margin-top: 20px; */
    text-align: justify;
    ::v-deep p {
      /* margin-bottom: 20px; */
      /* img {
        height: 100%;
        width: 100%;
      } */
    }
  }
  .form-item-imgContent-div {
    /* height: 1320px; */
    width: 100%;
    .form-imgContent-img {
      width: 100%;
      height: 100%;
    }
  }
}

.form-bottom-cards {
  display: flex;
  justify-content: space-between;
  .form-bottom-content {
    flex: 0.32;
  }
}

/* 预览 */
.picPreview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  .prev,
  .next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
  }
  .carousel {
    position: relative;
    width: 1390px;
    // height: 280px;
    height: 100%;
    margin: 0 20px;
    // background-color: cornflowerblue;
    .el-carousel__item ::v-deep {
      display: flex;
      align-content: flex-start;
      justify-content: center;
    }
    .close {
      z-index: 9999;
      color: #fff;
      font-size: 24px;
      border-radius: 50%;
      position: absolute;
      right: 0;
      margin: 5px 5px 0 0;
      cursor: pointer;
    }
  }
}
.over {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 999;
  background: #000000;
}
::v-deep .news-detail-content {
  img {
    max-width: 100%;
    text-indent: 0em;
    display: block;
  }
  p {
    margin: 1em 0px;
    text-align: justify; /* 文本两端对齐 */
    text-justify: distribute; /* 文本两端对齐 */
    word-break: break-word; /* 只对超长的英文单词断句 */
    display: block;
  }
}
</style>
