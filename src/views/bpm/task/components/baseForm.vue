<template>
  <div>
    <el-row v-if="divideToTow" :gutter="20" class="margin-bottom20 divide-to-two">
      <el-col id="APPROVAL_INSTRUCTIONS" :span="18">
        <iCard>
          <div class="base-form">
            <div class="name">
              {{ language('审批说明') }}
            </div>
            <div class="content">
              <div class="remark">
                <div class="multi-ellipsis">
                  {{ form.remark || '无审批备注' }}
                </div>
              </div>
            </div>
          </div>
        </iCard>
      </el-col>
      <el-col id="APPROVAL_ATTACHMENTS" :span="6">
        <iCard>
          <div class="base-form">
          <div class="name">
            {{ language('审批附件') }}
          </div>
          <div class="content">
            <div class="attachments">
              <div
                v-if="!form.procAttachments || form.procAttachments.length === 0"
              >
                无审批附件
              </div>
              <div v-else class="attach-area">
                <attachmentList :data="attaches" icon />
                <div
                  v-show="
                  attaches.length !== allAttachs.length && allAttachs.length > 2
                "
                  class="more-attach"
                  @click="handleExpandAttachments"
                >
                  更多
                </div>
              </div>
            </div>
          </div>
        </div>
        </iCard>
      </el-col>
    </el-row>
    <iCard v-else class="margin-bottom20">
      <div class="base-form">
        <div class="name">
          {{ language('审批备注与附件') }}
        </div>
        <div class="content">
          <div class="remark">
            <div class="multi-ellipsis">
              {{ form.remark || '无审批备注' }}
            </div>
          </div>
          <div class="attachments">
            <div
              v-if="!form.procAttachments || form.procAttachments.length === 0"
            >
              无审批附件
            </div>
            <div v-else class="attach-area">
              <attachmentList :data="attaches" icon />
              <div
                v-show="
                  attaches.length !== allAttachs.length && allAttachs.length > 2
                "
                class="more-attach"
                @click="handleExpandAttachments"
              >
                更多
              </div>
            </div>
          </div>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import attachmentList from './attachmentList'
import { iCard } from 'rise'
export default {
  name: 'baseFrom',
  components: { iCard, attachmentList },
  props: {
    form: {
      type: Object,
      default: function () {
        return {}
      }
    },
    divideToTow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    allAttachs() {
      return this.form.procAttachments || []
      /* return [
        { name: 'xxx', url: 'abc' },
        { name: 'xxx', url: 'abc' },
        { name: 'xxx', url: 'abc' }
      ] */
    },
    attaches() {
      if (!this.allAttachs || this.allAttachs.length === 0) {
        return []
      }
      return this.allAttachs.slice(0, this.attachRows)
    }
  },
  data() {
    return {
      attachRows: 2
    }
  },
  methods: {
    handleExpandAttachments() {
      this.attachRows = this.allAttachs.length
    }
  }
}
</script>

<style lang="scss" scoped>
/* .attach-area {
  position: relative;
  background-color: #f5f7fa;
  border: solid 1px #e4e7ed;
  min-height: 126px;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-radius: 5px;
} */
.no-attach {
  padding: 5px 12px;
}
.base-form {
  display: flex;
  .name {
    width: 150px;
    font-weight: bold;
    font-size: 16px;
  }
  .content {
    font-size: 14px;
    width: calc(100% - 150px);
    display: flex;
    justify-content: space-between;
    .remark {
      width: 45%;
      .multi-ellipsis:hover {
        -webkit-line-clamp: unset;
      }
    }
    .attachments {
      width: 100%;
      font-weight: inherit;
    }
  }
  &.divide-to-two {

  }
}
.multi-ellipsis {
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
.attach-area {
  display: flex;
  align-items: flex-end;
}
.more-attach {
  color: $color-blue;
  font-size: 12px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
