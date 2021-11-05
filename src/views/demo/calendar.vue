<template>
  <iPage>
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="选择日期" prop="date" ref="date">
          <i-calendar
            :disabledDates="disabledDates"
            :holiday="attributes"
            @input="handleCallback"
            v-model="ruleForm.date"
          ></i-calendar>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </iPage>
</template>

<script>
// import iCalendar from '@/components/iCalendar'
import { iPage } from 'rise'
import iCalendar from 'rise/web/components/iCalendar/index.vue'
export default {
  components: {
    iPage,
    iCalendar
  },
  data() {
    return {
      ruleForm: {
        date: ''
      },
      attributes: [],
      disabledDates: [],
      masks: {},
      rules: {
        date: [{ required: true, message: '请选择日期', trigger: 'change' }]
      }
    }
  },
  watch: {
    'ruleForm.date': {
      handler(newVal, oldVal) {
        this.$refs.date.$emit('el.form.change') //非el元素需要通过ref唤起上层校验
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
