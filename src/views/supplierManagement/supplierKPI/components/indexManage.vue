<template>
  <div class="box">
    <iCard :title="$t('指标库')">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="手工指标" name="1"> </el-collapse-item>
        <el-collapse-item title="系统指标" name="2"> </el-collapse-item>
      </el-collapse>
    </iCard>
  </div>
</template>

<script>
import { iButton, iPage, iCard, iInput, iSelect } from 'rise'

export default {
  components: {
    iButton,
    iPage,
    iCard,
    iInput,
    iSelect
  },
  props: {
    name: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      activeName: '1'
    }
  },
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  top: 40%;

  z-index: 1000;
  width: 400px;
}
</style>
