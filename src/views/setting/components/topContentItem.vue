<template>
  <div class="top-content-item">
    <div class="title">{{ title }}</div>
    <div class="content">
      <el-row>
        <el-col :span="6" v-for="item in data" :key="item.uniqueId">
          <div class="content-item">
            <el-checkbox
              v-model="item.checked"
              :disabled="
                checkedIds.length >= 5 && !checkedIds.includes(item.uniqueId)
              "
            >
              {{ item.label }}
            </el-checkbox>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topContentItem',
  props: {
    title: {
      type: String
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    fullData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    checkedIds() {
      const checkedIds = []
      this.fullData.forEach((e) => {
        e.data.forEach((item) => {
          if (item.checked) {
            checkedIds.push(item.uniqueId)
          }
        })
      })
      return checkedIds
    }
  }
}
</script>

<style lang="scss" scoped>
.top-content-item {
  margin-bottom: 30px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  padding: 30px 0px 20px 0px;
  border-top: solid 1px rgba(112, 112, 112, 0.15);
}
.content {
  .content-item {
    margin-bottom: 10px;

    width: 90%;
    .checkbox {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      ::v-deep .el-checkbox__label {
        display: inline;
      }
    }
  }
}
</style>
