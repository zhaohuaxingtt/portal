<template>
  <div class="box">
    <div
      @click="isShow = !isShow"
      :class="isShow ? 'keyright key' : 'keyleft key'"
    >
      <i :class="isShow ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
    </div>
    <el-collapse-transition>
      <iCard v-if="isShow" :title="$t('指标库')">
        <el-collapse v-model="activeName">
          <el-collapse-item title="手工指标" name="1">
            <template slot="title">
              {{ '手工指标'
              }}<i @click="addDialog = true" class="el-icon-plus addicon"></i>
            </template>
            <div class="infolist">
              <div><span>指标名称</span></div>
              <div>
                <i class="el-icon-delete icon red"></i
                ><i class="el-icon-edit-outline icon blue"></i>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="系统指标" name="2">
            <div class="infolist">
              <div><span>指标名称</span></div>
              <div>
                <i class="el-icon-delete icon red"></i
                ><i class="el-icon-edit-outline icon blue"></i>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </iCard>
    </el-collapse-transition>
    <iDialog
      append-to-body
      :title="$t('新增手工指标')"
      :visible.sync="addDialog"
      width="40%"
      @close="clearDiolog"
    >
      <el-form
        :label-position="'left'"
        label-width="160px"
        :model="form"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item :label="$t('指标名称（CN)')" prop="supplierSapCode">
          <i-input
            style="width: 200px"
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form.supplierSapCode"
          >
          </i-input>
        </el-form-item>
        <el-form-item :label="$t('指标名称（EN)')" prop="supplierSapCode">
          <i-input
            style="width: 200px"
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form.supplierSapCode"
          >
          </i-input>
        </el-form-item>
        <el-form-item :label="$t('负责科室')" prop="supplierSapCode">
          <iSelect
            filterable
            clearable
            multiple
            style="width: 200px"
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form.supplierSapCode"
          >
            <el-option
              v-for="(item, index) in deptList"
              :key="index"
              :value="item.name"
              :label="item.name"
            >
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <iButton @click="submit">{{ $t('LK_QUEREN') }}</iButton>
        <iButton @click="canel">{{ $t('LK_QUXIAO') }}</iButton>
      </span>
    </iDialog>
  </div>
</template>

<script>
import { iButton, iPage, iCard, iInput, iSelect, iDialog } from 'rise'
import { dictByCode } from './data'

export default {
  components: {
    iButton,
    iPage,
    iCard,
    iInput,
    iSelect,
    iDialog
  },
  props: {
    name: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      isShow: false,
      addDialog: false,
      form: {},
      deptList: [],
      activeName: '1',
      rules: {
        supplierSapCode: [
          { required: true, message: '请输入指标名称(EN)', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  watch: {},
  methods: {
    async init() {
      const res = await dictByCode('RELEVANT_DEPT')
      this.deptList = res
    },
    submit() {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    },
    canel() {
      this.addDialog = false
      this.form = {}
    },
    clearDiolog() {
      this.canel()
    }
  }
}
</script>

<style lang="scss" scoped>
.key {
  width: 10px;
  height: 100px;
  background: #1763f7;
  border-radius: 30px;
  cursor: pointer;
  i {
    color: white;
    font-weight: 600;
    line-height: 100px;
  }
  position: absolute;
}
.keyleft {
  top: 50%;
  left: -20px;
}
.keyright {
  top: 50%;
  right: -10px;
}
.box {
  position: relative;
  .addicon {
    font-weight: 600;
    margin-left: 20px;
    color: #1763f7;
    display: inline-block;
  }
  position: fixed;
  top: 280px;

  z-index: 1000;
  width: 400px;
  ::v-deep .el-collapse-item__header {
    font-size: 16px;
    font-weight: 600;
  }
  .infolist {
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      font-size: 16px;
      align-items: center;

      .icon {
        margin: 0 4px;
        cursor: pointer;
        // display: inline-block;
      }
      .red {
        color: #e30d0d;
      }
      .blue {
        color: #1763f7;
      }
    }
  }
}
</style>
