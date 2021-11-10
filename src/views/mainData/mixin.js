/*
 * 混入
 * @Author: qyu
 * @Date: 2021-05-12 14:28:34
 * @LastEditTime: 2021-08-12 12:52:24
 * @LastEditors: Please set LastEditors
 * @Description: 针对所有的分页插件，实行方法混入。
 */

export default {
  methods: {
    onDelete() {
      return this.$confirm(
        this.$t('APPROVAL.DELETE_TIPS_CONTENT'),
        this.$t('APPROVAL.DELETE_TIPS_TITLE'),
        {
          confirmButtonText: this.$t('APPROVAL.OK'),
          cancelButtonText: this.$t('APPROVAL.CANCEL'),
          type: 'warning'
        }
      )
    },
    editPlanDetailAlert() {
      this.generateAlert(
        '产量计划版本和计划详情不能同时编辑，请先保存产量计划版本！',
        '注意'
      )
    },
    editPlanVersionAlert() {
      this.generateAlert(
        '产量计划版本和计划详情不能同时编辑，请先保存计划详情！',
        '注意'
      )
    },
    editConfigDetailAlert() {
      this.generateAlert(
        '配置版本和配置详情不能同时编辑，请先保存配置版本！',
        '注意'
      )
    },
    editConfigVersionAlert() {
      this.generateAlert(
        '配置版本和配置详情不能同时编辑，请先保存配置详情！',
        '注意'
      )
    },
    generateAlert(message, title) {
      this.$alert(message, title, {
        confirmButtonText: this.$t('APPROVAL.OK'),
        type: 'warning',
        callback: () => {}
      })
    },
    cancelAlert() {
      return this.$confirm('页面内容有更新,是否保存?', '提示', {
        confirmButtonText: '保存',
        cancelButtonText: '不保存',
        type: 'warning'
      })
    }
  }
}
