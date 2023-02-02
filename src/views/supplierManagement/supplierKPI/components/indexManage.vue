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
              {{ '手工指标' }}<i @click="add" class="el-icon-plus addicon"></i>
            </template>
            <div
              class="infolist"
              v-for="(item, index) in infoList.filter(
                (val) => val.indicatorType == 'MANUAL'
              )"
            >
              <div>
                <span>{{ item.nameZh }}</span>
              </div>
              <div>
                <i class="el-icon-delete icon red" @click="del(item)"></i
                ><i
                  class="el-icon-edit-outline icon blue"
                  @click="edit(item)"
                ></i>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="系统指标" name="2">
            <div
              class="infolist"
              v-for="(item, index) in infoList.filter(
                (val) => val.indicatorType != 'MANUAL'
              )"
            >
              <div>
                <span>{{ item.nameZh }}</span>
              </div>
              <div>
                <i class="el-icon-delete icon red" @click="del(item)"></i
                ><i
                  class="el-icon-edit-outline icon blue"
                  @click="edit(item)"
                ></i>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </iCard>
    </el-collapse-transition>
    <iDialog
      append-to-body
      :title="typeDialog == '2' ? $t('编辑手工指标') : $t('新增手工指标')"
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
        <el-form-item :label="$t('指标名称（CN)')" prop="nameEn">
          <i-input
            style="width: 200px"
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form.nameEn"
          >
          </i-input>
        </el-form-item>
        <el-form-item :label="$t('指标名称（EN)')" prop="nameZh">
          <i-input
            style="width: 200px"
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form.nameZh"
          >
          </i-input>
        </el-form-item>
        <el-form-item :label="$t('负责科室')" prop="deptCode">
          <iSelect
            filterable
            clearable
            multiple
            style="width: 200px"
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form.deptCode"
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
import { iButton, iPage, iCard, iInput, iSelect, iDialog,iMessage } from 'rise'
import { dictByCode } from './data'
import {
  addIndicator,
  delIndicator,
  updateIndicator,
  getIndicator,
  getIndicatorList
} from '@/api/supplierManagement/supplierIndexManage/index'

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
      infoList: [],
      isShow: false,
      addDialog: false,
      form: {
        deptCode: [],
        deptId: [],
        nameEn: '',
        nameZh: '',
        indicatorType:'MANUAL'
      },
      deptList: [],
      activeName: '1',
      rules: {
        nameEn: [
          { required: true, message: '请输入指标名称(CN)', trigger: 'blur' }
        ],
        nameZh: [
          { required: true, message: '请输入指标名称(EN)', trigger: 'blur' }
        ],
        deptCode: [{ required: true, message: '选择科室', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.init()
    this.getInfo()
  },
  watch: {},
  methods: {
    async getInfo() {
      getIndicatorList().then((res) => {
        this.infoList = res.data
      })
    },
    async init() {
      const res = await dictByCode('RELEVANT_DEPT')
      this.deptList = res
    },
    del(item) {
      delIndicator({ ids: [item.id] }).then((res) => {
        if (res.code == '200') {
          this.getInfo()
          iMessage.success(res.desZh || '删除成功')
        } else iMessage.error(res.desZh)
      })
    },
    edit(item) {
      this.typeDialog = '2'
      this.addDialog = true
      getIndicator(item.id).then((res) => {
        if (res.code == '200') {
          this.form = res.data

          this.form.deptCode=this.form.deptCode.split(',')
          this.form.deptId=this.form.deptId.split(',')
        } else iMessage.error(res.desZh)
      })
    },
    add() {
      this.typeDialog = '1'
      this.addDialog = true
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.form.deptCode.forEach((j) => {
            this.deptList.forEach((g) => {
              if (j == g.name) {
                this.form.deptId.push(g.id)
              }
            })
          })
          this.form.deptId = this.form.deptId.join(',')
          this.form.deptCode = this.form.deptCode.join(',')
          if (this.typeDialog == '2') {
            updateIndicator(this.form).then((res) => {
              if (res.code == '200') {
                this.getInfo()
                this.canel()
                iMessage.success(res.desZh || '更新成功')
              } else iMessage.error(res.desZh)
            })
          } else {
            addIndicator(this.form).then((res) => {
              if (res.code == '200') {
                this.getInfo()
                this.canel()
                iMessage.success(res.desZh || '新增成功')
              } else iMessage.error(res.desZh)
            })
          }
        } else {
          return false
        }
      })
    },
    canel() {
      this.addDialog = false
      this.form = {
        deptCode: [],
        deptId: [],
        nameEn: '',
        nameZh: '',
        indicatorType:'MANUAL'

      }
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
