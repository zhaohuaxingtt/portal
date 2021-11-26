<template>
  <div class="user-select">
    <span class="user-select-icon" v-if="iconVisible">
      <icon symbol name="iconshaixuankuangsousuo" class="i-icon" />
    </span>
    <iSelect
      v-model="userId"
      filterable
      remote
      reserve-keyword
      :placeholder="placeholder"
      :remote-method="queryAgentUser"
      :loading="loading"
      :disabled="disabled"
      clearable
      @change="handleChange"
    >
      <el-option
        v-for="item in userOptions"
        :key="item.id"
        :label="item.nameZh"
        :value="item.id"
      >
      </el-option>
    </iSelect>
  </div>
</template>

<script>
import { iSelect, Icon } from 'rise'
import { fetchUser } from '@/api/approval/agent'
export default {
  name: 'userSearch',
  components: { iSelect, Icon },
  props: {
    value: {
      type: String,
      default: ''
    },
    defaultOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterUserId: {
      type: Number
    },
    iconVisible: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '输入姓名搜索'
    }
  },
  data() {
    return {
      userId: '',
      userOptions: [],
      loading: false
    }
  },
  watch: {
    value(val) {
      this.userId = val
    },
    defaultOptions() {
      if (this.defaultOptions && this.defaultOptions.length > 0) {
        this.userOptions = this.defaultOptions
      }
    }
  },
  created() {
    this.userId = this.value
    if (this.defaultOptions && this.defaultOptions.length > 0) {
      this.userOptions = this.defaultOptions
    }
  },
  methods: {
    async queryAgentUser(queryString) {
      if (queryString) {
        this.loading = true
        const queryData = {
          current: 0,
          userInfo: queryString,
          // userNum: queryString,
          size: 100
        }
        const { data } = await fetchUser(queryData).finally(
          () => (this.loading = false)
        )
        if (this.filterUserId) {
          this.userOptions = data.filter((e) => e.id !== this.filterUserId)
        } else {
          this.userOptions = data
        }
      } else {
        this.userOptions = []
      }
    },
    handleChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-select {
  position: relative;
  display: inline;
  .user-select-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 1;
    font-size: 18px;
    .icon {
      font-size: 16px;
    }
    user-select: none;
  }
  ::v-deep .el-input__suffix {
    z-index: 2;
    right: 25px;
  }
}
</style>
