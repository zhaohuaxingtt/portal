<template>
  <div>
    <div class="info">
      <div class="left">
        <div v-for="(item, index) in list" :key="index">
          <div
            class="item-box ellipsis"
            @click="handleInfo(item, index)"
            :class="idx === index ? 'active' : ''"
            :title="item.name"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="right">
        <el-form
          ref="projectForm"
          :model="form"
          :rules="rules"
          label-width="80px"
          class="validate-required-form"
        >
          <iFormItem :label="language('项目名称')" prop="name">
            <iInput v-model="form.name" placeholder="请输入" clearable></iInput>
          </iFormItem>
          <iFormItem :label="language('项目链接')" prop="flowId">
            <iSelect placeholder="请选择" clearable v-model="form.flowId">
              <el-option
                v-for="item in processList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="isMainFlow && !item.published"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          <div class="style-info">{{ language('样式信息') }}</div>
          <iFormItem :label="language('X轴')" prop="xco">
            <iInput
              v-model="form.xco"
              v-Int
              placeholder="请输入"
              type="number"
              clearable
              @change="handleStyleChange($event, 'x')"
            ></iInput>
          </iFormItem>
          <iFormItem :label="language('Y轴')" prop="yco">
            <iInput
              v-model="form.yco"
              v-Int
              placeholder="请输入"
              type="number"
              clearable
              @change="handleStyleChange($event, 'y')"
            ></iInput>
          </iFormItem>
          <iFormItem :label="language('width')" prop="width">
            <iInput
              v-model="form.width"
              v-Int
              placeholder="请输入"
              type="number"
              clearable
              @change="handleStyleChange($event, 'width')"
            ></iInput>
          </iFormItem>
          <iFormItem :label="language('height')" prop="height">
            <iInput
              v-model="form.height"
              v-Int
              placeholder="请输入"
              type="number"
              clearable
              @change="handleStyleChange($event, 'height')"
            ></iInput>
          </iFormItem>
        </el-form>
      </div>
    </div>
    <div class="margin-top40 btn">
      <iButton @click="save">保存</iButton>
      <iButton @click="del" v-show="idx !== 0">删除</iButton>
    </div>
  </div>
</template>

<script>
import { iFormItem, iInput, iSelect, iButton } from 'rise'
export default {
  name: 'projectInfo',
  components: {
    iFormItem,
    iInput,
    iSelect,
    iButton
  },
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    processList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    list() {
      if (this.$route.query.processId) {
        return this.listData.map((e) => {
          e.flowId = e.pageId
          return e
        })
      } else {
        return this.listData
      }
    },
    isMainFlow() {
      return !this.$route.query.flowChartId
    }
  },
  data() {
    return {
      idx: 0,
      form: {
        name: '',
        flowId: '',
        xco: '',
        yco: '',
        height: '',
        width: ''
      },
      rules: {
        name: { required: true, message: '请输入项目名称', trigger: 'blur' },
        flowId: { required: true, message: '请选择项目链接', trigger: 'blur' },
        xco: { required: true, message: '请输入xoc', trigger: 'blur' },
        yco: { required: true, message: '请输入yoc', trigger: 'blur' },
        height: { required: true, message: '请输入height', trigger: 'blur' },
        width: { required: true, message: '请输入width', trigger: 'blur' }
      }
    }
  },
  methods: {
    handleInfo(row, index) {
      console.log(row, '2222')
      this.idx = index
      if (row) {
        Object.assign(this.form, this.listData[index])
      }
      if (row.name === 'add' && index === 0) {
        this.form.name = ''
        this.form.xco = ''
        this.form.yco = ''
        this.form.flowId = ''
      }
      this.$emit('getProjectIdx', index, row)
    },
    initItem(obj) {
      Object.assign(this.form, obj)
    },
    handleStyleChange(event, va) {
      this.$emit('handelStyle', event, va)
    },
    save() {
      this.$refs.projectForm.validate((v) => {
        if (v) {
          let testForm = JSON.parse(JSON.stringify(this.form))
          ;(this.form = {
            name: '',
            flowId: '',
            xco: '',
            yco: '',
            height: '',
            width: ''
          }),
            (this.idx = 0)
          this.$emit('addData', testForm)
        }
      })
    },
    del() {
      ;(this.form = {
        name: '',
        flowId: '',
        xco: '',
        yco: '',
        height: '',
        width: ''
      }),
        (this.idx = 0)
      this.$emit('delData')
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  height: 100%;
  .left {
    height: 100%;
    .item-box {
      padding: 0 10px;
      height: 60px;
      width: 80px;
      line-height: 60px;
      text-align: right;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .right {
    padding-left: 10px;
    border-left: 1px solid rgb(190, 184, 184);
    // height: 100%;
  }
}
.active {
  color: blue;
  border-right: 1px solid blue;
  font-weight: 600;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.style-info {
  margin: 10px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  text-align: center;
  width: 100%;
}
.btn {
  text-align: right;
}
</style>
