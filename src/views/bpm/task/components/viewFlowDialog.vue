<template>
  <iDialog
    :visible.sync="dialogVisible"
    width="85%"
    append-to-body
    @close="onClose"
    :title="language('审批流')"
  >
    <div class="content" v-loading="loading">
      <div v-if="panoramas.length > 1" class="multiple margin-bottom20">
        <iCard
          v-for="(item, index) in panoramas"
          :key="index"
          :title="item.processInstanceId"
          header-control
          collapse
          class="margin-bottom20"
          style="overflow: auto"
        >
          <processNodeHorizontal
            :stateCode="detail.stateCode"
            :detail="detail"
            :panorama="item.panorama"
            :isEnd="item.isEnd"
          />
        </iCard>
      </div>
      <div v-if="panoramas.length === 1">
        <processNodeHorizontal
          :stateCode="detail.stateCode"
          :detail="detail"
          :panorama="panoramas[0]"
          :isEnd="item.isEnd"
        />
      </div>
      <div class="no-data" v-if="loadText">{{ loadText }}</div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iCard } from 'rise'
import { queryPanoramaLists } from '@/api/approval/myApproval'
import processNodeHorizontal from './processNodeHorizontal.vue'
export default {
  name: 'viewFlowDialog',
  components: { iDialog, processNodeHorizontal, iCard },
  props: {
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      panoramas: [],
      loading: false,
      dialogVisible: false,
      loadText: '加载中'
    }
  },
  watch: {
    detail(val) {
      console.log('detail', val)
      this.queryPanoramas()
    },
    visible(val) {
      this.dialogVisible = val
    }
  },
  created() {
    this.dialogVisible = this.visible
    this.queryPanoramas()
  },
  methods: {
    queryPanoramas() {
      if (this.detail.businessId) {
        this.loading = true
        queryPanoramaLists({ businessId: this.detail.businessId })
          .then((res) => {
            this.panoramas = res.data || []
            if (res.data) {
              this.panoramas = res.data.map((p) => {
                return {
                  ...p,
                  panorama: p.panorama
                }
              })
              this.loadText = res.data.length ? '' : '暂无数据'
            }
            /* if (res.result) {
              this.panoramas = res.data || []
            } else {
              iMessage.error('获取审批流失败')
            } */
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    onClose() {
      this.dialogVisible = false
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  min-height: 200px;
  padding-bottom: 20px;

  width: 100%;
  padding: 10px;
}
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  min-height: 200px;
}
</style>
