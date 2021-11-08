<script>
import { Step } from 'element-ui'
/**
 * @example ./README.me
 */
export default {
  name: 'iStep',
  extends: Step,
}
</script>
<style lang="scss" scoped>
::v-deep .el-step__icon.is-text {
  border: solid 5px #fff;
  font-size: 30px;
  width: 40px;
  height: 40px;
}
::v-deep .el-step__line,
.el-step.is-center .el-step__line,
.el-step.is-horizontal .el-step__line {
  top: 50%;
  height: 0px;
  background: none;
  border-bottom: dashed 1px #ced4e1;
}
::v-deep .el-step__title.is-finish {
  color: #41434a;
}
</style>
