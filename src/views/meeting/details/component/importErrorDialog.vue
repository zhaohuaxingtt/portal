<template>
  <iDialog
    title="导入异常"
    :visible.sync="openError"
    width="42rem"
    :close-on-click-modal="false"
    @close="handleCloseError"
    ><div class="box">
      <div class="text">请修改后重新执行导入操作！</div>
      <div class="content">
        <ul v-for="item in this.errorList" :key="item">
          <li class="li" v-html="item"></li>
        </ul>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog } from 'rise'

export default {
  components: {
    iDialog
  },
  props: {
    openError: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    errorList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.errorList = this.errorList.map((item) => {
      const num1 = item.indexOf('第')
      const num2 = item.indexOf('行')
      item =
        item.substring(0, num1 + 1) +
        '<span style="color:#E30D0D">' +
        item.substring(num1 + 1, num2 + 1) +
        '</span>' +
        item.substring(num2 + 1)
      return item
    })
  },
  methods: {
    handleCloseError() {
      this.$emit('handleCloseError', false)
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  height: 21rem;
}
.text {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 22px;
  margin-top: -1rem;
}
.content {
  border-radius: 4px;
  background: #f7f7f7;
  margin-top: 3rem;
  height: 14rem;
  overflow-y: scroll;
  .li {
    padding: 1rem 1rem 0 1rem;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
  }
}
</style>