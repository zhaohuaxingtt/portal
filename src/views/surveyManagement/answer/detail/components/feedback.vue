<template>
  <div class="card">
    <div class="card--header">
      <div class="card--header--item">
        <p class="title">
          {{ previewData.name || name }}
        </p>
      </div>
      <div
        v-if="previewData.state === 2 && previewData.closing == ''"
        class="card--header--item"
      >
        <p class="text">{{ $t('QN_GANXIENINCANYUCIQIWENJUANDIAOCHA') }}</p>
      </div>
      <div
        v-else-if="previewData.state === 2 && previewData.closing != ''"
        class="card--header--item"
      >
        <p class="text">{{ previewData.closing }}</p>
      </div>
      <div
        v-else-if="finishData.state === 5 && finishData.closing != ''"
        class="card--header--item"
      >
        <p class="text">{{ finishData.closing }}</p>
      </div>
      <div
        v-else-if="finishData.state === 5 && finishData.closing == ''"
        class="card--header--item"
      >
        <p class="text">{{ $t('QN_GANXIENINCANYUCIQIWENJUANDIAOCHA') }}</p>
      </div>
      <div v-else class="card--header--item">
        <p class="text">
          {{ $t('QN_GAIWENJUANYITINGZHISHOUJIXIEXIE') }}
        </p>
      </div>
    </div>
    <div class="card--body">
      <div class="card--body--item card--body--item__top">
        <iButton @click="handleClose" class="">{{ $t('QN_GUANBI') }}</iButton>
      </div>
    </div>
  </div>
</template>

<script>
import { iButton } from 'rise'

export default {
  components: {
    iButton
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.previewData = val
        console.log(val)
      }
    },
    ruleForm(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      start: false,
      stop: false,
      radioVal: '1',
      previewData: {},
      finishData: {}
    }
  },
  created() {
    this.finishData = this.$route.params
    console.log(this.$route.params)
  },
  methods: {
    // 关闭按钮
    handleClose() {
      //   this.$router.push({
      //     name: "surveyManagement",
      //   });
      this.$router.push({
        path: '/survey/answer'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
}
.card {
  margin-top: 20px;
  .card--header {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .card--header--item {
      margin-top: 40px;
      text-align: center;
      .title {
        font-size: 16px;
        font-weight: bold;
        color: black;
      }
      .text {
        font-size: 16px;
        // font-weight: bold;
        color: black;
      }
    }
  }
  .card--body {
    padding: 80px 220px 50px 220px;
    font-size: 14px;
    min-height: 500px;
    .card--body--item {
      margin-top: 20px;
      .textarea ::v-deep .el-textarea__inner {
        box-shadow: 0 0 0 rgb(0 38 98 / 15%);
        background-color: #ffffff;
        resize: none;
      }
    }
    .card--body--item__top {
      text-align: center;
      margin-top: 200px;
    }
  }
}
</style>
