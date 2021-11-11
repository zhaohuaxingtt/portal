/*
 * 删除混入
 * @Author: qyu
 * @Date: 2021-05-12 14:28:34
 * @LastEditTime: 2021-05-12 22:10:44
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
    }
  }
}
