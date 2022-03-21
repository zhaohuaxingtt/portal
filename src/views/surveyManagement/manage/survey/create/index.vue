<template>
  <iPage id="routerPage">
    <div>
      <div v-if="this.editorId == undefined" class="header">
        {{ language('新建问卷') }}
      </div>
      <div v-else class="header">{{ language('编辑问卷') }}</div>
    </div>
    <div class="margin-bottom20 clearFloat">
      <iCard style="margin-bottom: 1.875rem">
        <!-- 步骤条 -->
        <el-steps :active="active" align-center>
          <el-step
            :title="language('基本设置')"
            icon="el-icon-success"
            class="from-step"
          ></el-step>
          <el-step
            :title="language('题目设置')"
            icon="el-icon-success"
          ></el-step>
        </el-steps>
      </iCard>

      <iCard>
        <!-- 文字+按钮 -->
        <div class="form-top">
          <div>
            <h2 v-if="active == 1">{{ language('基本设置') }}</h2>
            <h2 v-if="active !== 1">{{ language('题目设置') }}</h2>
          </div>
          <div>
            <iButton @click="handlePreview()">{{ language('预览') }}</iButton>
            <iButton :disabled="checkName == false" @click="complete">{{
              language('完成编辑')
            }}</iButton>
            <iButton @click="last" v-if="active !== 1">{{
              $t('QN_SHANGYIBU')
            }}</iButton>
            <iButton
              @click="next"
              v-if="active !== 2"
              :disabled="
                checkModule == false ||
                checkType == false ||
                checkEndTime == false ||
                checkName == false ||
                checkPic == false ||
                checkPutoutRange == false
              "
              >{{ $t('QN_XIAYIBU') }}</iButton
            >
          </div>
        </div>

        <!-- 步骤条一内容 -->
        <Basic
          ref="basicContent"
          :basicRuleForm="basicRuleForm"
          v-if="active == 1"
        ></Basic>
        <!-- 步骤二内容 -->
        <Topic
          v-if="active == 2"
          @handleSaveData="handleSaveData"
          @handleDeleteData="handleDeleteData"
          @handleSortTop="handleSortTop"
          @handleSortBottom="handleSortBottom"
          @handleSortDrag="handleSortDrag"
          @handleCopy="handleCopy"
          :questions="basicRuleForm.questions"
        ></Topic>
      </iCard>
      <preSurvey
        :preData="basicRuleForm"
        :preOpen="preOpen"
        @closePreDialog="closePreDialog"
        v-if="preOpen"
        :createPre="createPre"
        :basicRuleForm="basicRuleForm"
      />
    </div>
  </iPage>
</template>
<script>
import { iPage, iCard, iButton } from 'rise'
import { saveSurvey, updateSurvey } from '@/api/survey/survey'
import Basic from './components/basic.vue'
import Topic from './components/topic.vue'
import { findById } from '@/api/survey/survey.js'
import preSurvey from '../preview/index.vue'

export default {
  components: {
    Basic,
    Topic,
    iPage,
    iCard,
    iButton,
    preSurvey
  },
  data() {
    return {
      putoutRangeCopy: '',
      active: 1,
      interval: '',
      basicRuleForm: {
        id: '',
        surveyModel: '', // 问卷模块
        type: '', // 问卷类型
        endTime: '', // 截止时间
        name: '', // 问卷名称
        surveyDescription: '', // 问卷说明
        closing: '', // 结束语
        // putoutUsers: [], // 投放范围
        surveyCover: '', // 封面
        coverName: '',
        questions: [], // 问题列表
        putoutRange: '01',
        groupIds: '',
        groupNames: ''
      },
      checkModule: false,
      checkType: false,
      checkEndTime: false,
      checkName: false,
      checkPic: false,
      checkPutoutRange: false,
      editorId: '',
      // numberTotal: [],
      // 预览弹窗
      preOpen: false,
      createPre: true
    }
  },
  watch: {
    // basicRuleForm:{
    //   handler(val) {
    //   }
    // },
    'basicRuleForm.surveyModel': function (val) {
      if (val !== '' && val !== null) this.checkModule = true
    },
    'basicRuleForm.type': function (val) {
      if (val !== '' && val !== null) this.checkType = true
    },
    'basicRuleForm.endTime': function (val) {
      if (val !== '' && val !== null) this.checkEndTime = true
    },
    'basicRuleForm.putoutRange': {
      immediate: true,
      deep: true,
      handler: function (val) {
        if (val !== '' && val !== null) {
          this.checkPutoutRange = true
        } else {
          this.checkPutoutRange = false
        }
      }
    },
    'basicRuleForm.name': function (val) {
      if (val !== '' && val !== null) {
        this.checkName = true
      } else {
        this.checkName = false
      }
    },
    'basicRuleForm.surveyCover': function (val) {
      if (val !== '' && val !== null) {
        this.checkPic = true
      } else {
        this.checkPic = false
      }
    }
  },
  mounted() {
    const id = this.$route.query.id
    this.editorId = id
    if (id) {
      this.query({ id: this.$route.query.id })
    }
    this.interval = setInterval(() => {
      this.completeS()
    }, 60 * 1000)
  },
  methods: {
    //清除不必要的options
    handleDeleteOptions(arr) {
      return arr.map((item) => {
        if (
          Number(item.type) === 7 ||
          Number(item.type) === 8 ||
          Number(item.type) === 3 ||
          Number(item.type) === 5
        ) {
          Reflect.deleteProperty(item, 'options')
          return item
        }
        if (Number(item.type) === 2) {
          Reflect.deleteProperty(item, 'actionItem')
          return item
        }
        if (Number(item.type) === 9) {
          Reflect.deleteProperty(item, 'options')
          item.sonQuestions = item.sonQuestions.map((it) => {
            if (
              Number(it.type) === 7 ||
              Number(it.type) === 8 ||
              Number(it.type) === 3 ||
              Number(it.type) === 5
            ) {
              Reflect.deleteProperty(it, 'options')
              return it
            }
            if (Number(it.type) === 2) {
              Reflect.deleteProperty(item, 'actionItem')
              return it
            }
            return {
              ...it,
              options: it.options ? it.options : []
            }
          })
          return item
        }
        return item
      })
    },
    //设置code的函数
    handleCheckCode(arr) {
      let curCode = 0
      arr = arr.map((item) => {
        if (
          Number(item.type) !== 7 &&
          Number(item.type) !== 8 &&
          Number(item.type) !== 9
        ) {
          curCode++
          return {
            ...item,
            code: curCode
          }
          // item.code = curCode;
        }
        if (Number(item.type) === 9) {
          curCode++
          let innerCurCode = 0
          item.sonQuestions = item.sonQuestions.map((it) => {
            if (Number(it.type) !== 7 && Number(it.type) !== 8) {
              innerCurCode++
              return {
                ...it,
                code: curCode + '.' + innerCurCode
              }
            }
            Reflect.deleteProperty(it, 'code')
            return it
          })
          return {
            ...item,
            code: curCode
          }
        }
        Reflect.deleteProperty(item, 'code')
        return item
      })
      return arr
    },
    handlePreview() {
      this.preOpen = true
    },
    closePreDialog() {
      this.preOpen = false
    },
    query(e) {
      findById(e).then((res) => {
        this.basicRuleForm = res
        this.basicRuleForm.questions = this.translateQuestion(
          this.basicRuleForm.questions,
          'get'
        )
      })
    },
    next() {
      this.$refs.basicContent.$refs.basicRuleForm.validate((valid) => {
        if (valid) {
          if (this.active++ > 2) this.active = 1
        }
      })
      // if (this.active++ > 2) this.active = 1;
    },
    last() {
      const decument = this.active--
      if (decument == 0) this.active = 1
    },
    //arr 按照number去重
    deleMuptil(arr) {
      let obj = {}
      arr = arr.reduce((cur, next) => {
        if (!obj[next.number]) {
          obj[next.number] = true
          cur.push(next)
        }
        return cur
      }, [])
      return arr
    },
    translateQuestion(arr, model) {
      if (model === 'save') {
        arr = this.deleMuptil(arr)
        return arr.map((item) => {
          if (Number(item.type) !== 9) {
            if (item.multipleRule) {
              return {
                ...item,
                multipleRule:
                  typeof item.multipleRule === 'object'
                    ? JSON.stringify(item.multipleRule)
                    : item.multipleRule,
                // code: item.number,
                options: item.options
                  ? item.options.map((t) => {
                      return {
                        ...t,
                        action:
                          typeof t.action === 'object'
                            ? t.action
                              ? t.action.value
                              : ''
                            : t.action
                      }
                    })
                  : ''
              }
            }
            return {
              ...item,
              options: item.options
                ? item.options.map((s) => {
                    return {
                      ...s,
                      action:
                        typeof s.action === 'object'
                          ? s.action
                            ? s.action.value
                            : ''
                          : s.action
                    }
                  })
                : ''
              // code: item.number,
            }
          } else {
            let arr = item.sonQuestions.filter((item) => {
              return item
            })
            arr = this.deleMuptil(arr)
            return {
              ...item,
              // code: item.number,
              sonQuestions: arr.map((it) => {
                if (it.multipleRule) {
                  return {
                    ...it,
                    multipleRule:
                      typeof it.multipleRule === 'object'
                        ? JSON.stringify(it.multipleRule)
                        : it.multipleRule,
                    options: it.options
                      ? it.options.map((i) => {
                          return {
                            ...i,
                            action:
                              typeof i.action === 'object'
                                ? i.action
                                  ? i.action.value
                                  : ''
                                : i.action
                          }
                        })
                      : ''
                    // code: item.number + "." + it.number,
                  }
                }
                return {
                  ...it,
                  options: it.options
                    ? it.options.map((e) => {
                        return {
                          ...e,
                          action:
                            typeof e.action === 'object'
                              ? e.action
                                ? e.action.value
                                : ''
                              : e.action
                        }
                      })
                    : ''
                  // code: item.number + "." + it.number,
                }
              })
            }
          }
        })
      }
      if (model === 'get') {
        return arr.map((item) => {
          if (Number(item.type) !== 9) {
            if (item.multipleRule) {
              return {
                ...item,
                multipleRule: JSON.parse(item.multipleRule),
                editor: false
              }
            }
            return {
              ...item,
              editor: false
            }
          } else {
            return {
              ...item,
              editor: false,
              sonQuestions: item.sonQuestions.map((it) => {
                if (it.multipleRule) {
                  return {
                    ...it,
                    multipleRule: JSON.parse(it.multipleRule),
                    editor: false
                    // code: it.code.toString().split(".")[1],
                  }
                }
                return {
                  ...it
                  // code: it.code.toString().split(".")[1],
                }
              })
            }
          }
        })
      }
    },
    completeS() {
      this.basicRuleForm.putoutRange = this.basicRuleForm.putoutRange
        ? typeof this.basicRuleForm.putoutRange === 'object'
          ? this.basicRuleForm.putoutRange.join(',')
          : this.basicRuleForm.putoutRange
        : ''
      this.basicRuleForm.questions = this.translateQuestion(
        this.basicRuleForm.questions,
        'save'
      )
      this.basicRuleForm.questions = this.handleCheckCode(
        this.basicRuleForm.questions
      )
      this.basicRuleForm.questions = this.handleDeleteOptions(
        this.basicRuleForm.questions
      )
      if (this.active == 1) {
        this.$refs.basicContent.$refs.basicRuleForm.validate((valid) => {
          if (valid) {
            if (this.basicRuleForm.id) {
              updateSurvey({ ...this.basicRuleForm }).then(() => {})
            } else {
              saveSurvey(this.basicRuleForm).then((data) => {
                this.basicRuleForm.id = data.id
              })
            }
          }
        })
      } else {
        if (this.basicRuleForm.id) {
          updateSurvey({ ...this.basicRuleForm }).then(() => {})
        } else {
          saveSurvey(this.basicRuleForm).then((data) => {
            this.basicRuleForm.id = data.id
          })
        }
      }
    },
    complete() {
      this.basicRuleForm.putoutRange = this.basicRuleForm.putoutRange
        ? typeof this.basicRuleForm.putoutRange === 'object'
          ? this.basicRuleForm.putoutRange.join(',')
          : this.basicRuleForm.putoutRange
        : ''
      this.basicRuleForm.questions = this.translateQuestion(
        this.basicRuleForm.questions,
        'save'
      )
      this.basicRuleForm.questions = this.handleCheckCode(
        this.basicRuleForm.questions
      )
      this.basicRuleForm.questions = this.handleDeleteOptions(
        this.basicRuleForm.questions
      )

      if (this.active == 1) {
        this.$refs.basicContent.$refs.basicRuleForm.validate((valid) => {
          if (valid) {
            if (this.basicRuleForm.id || this.editorId) {
              updateSurvey({
                ...this.basicRuleForm,
                id: this.editorId || this.basicRuleForm.id
              }).then(() => {
                this.$router.push({
                  path: '/survey/management'
                })
              })
            } else {
              saveSurvey(this.basicRuleForm).then(() => {
                this.$router.push({
                  path: '/survey/management'
                })
              })
            }
          }
        })
      } else {
        if (this.basicRuleForm.id || this.editorId) {
          updateSurvey({
            ...this.basicRuleForm,
            id: this.editorId || this.basicRuleForm.id
          }).then(() => {
            this.$router.push({
              path: '/survey/management'
            })
          })
        } else {
          saveSurvey(this.basicRuleForm).then(() => {
            this.$router.push({
              path: '/survey/management'
            })
          })
        }
      }

      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
    },
    // 保存
    handleSaveData(data) {
      // if (this.basicRuleForm.questions.length == 0) {
      //   this.basicRuleForm.questions.push(data);
      // } else {
      //   if (type === "copy") {
      //     const index = this.basicRuleForm.questions.findIndex((item) => {
      //       return item.id === data.id;
      //     });
      //     this.basicRuleForm.questions.splice(index, 0, data);
      //   } else {
      //     if (data.id) {
      //       const index = this.basicRuleForm.questions.findIndex((item) => {
      //         return item.id === data.id;
      //       });
      //       this.basicRuleForm.questions.splice(index, 1, data);
      //     } else {
      //       this.basicRuleForm.questions.push(data);
      //     }
      //   }
      // }
      this.basicRuleForm.questions = [...data]
    },
    // 删除
    handleDeleteData(data, arr) {
      // console.log("arr", arr);
      // this.basicRuleForm.questions = this.basicRuleForm.questions.filter(
      //   (item) => {
      //     return item.number !== data.number;
      //   }
      // );
      // this.basicRuleForm.questions.map((item, index) => {
      //   item.number = index + 1;
      // });
      this.basicRuleForm.questions = [...arr]
    },
    //复制
    handleCopy(arr) {
      this.basicRuleForm.questions = [...arr]
    },
    // 换位置
    handleSortTop(data, arr) {
      // let index = data.number - 1;
      // this.swapArray(this.basicRuleForm.questions, index - 1, index);
      this.basicRuleForm.questions = [...arr]
    },
    handleSortBottom(data, arr) {
      // let index = data.number - 1;
      // this.swapArray(this.basicRuleForm.questions, index, index + 1);
      this.basicRuleForm.questions = [...arr]
    },
    handleSortDrag(arr) {
      this.basicRuleForm.questions = [...arr]
    },
    swapArray(arr, index1, index2) {
      // arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      // arr.map((item, index) => {
      //   item.number = index + 1;
      // });
      // return arr;
      let item1 = { ...arr[index1] }
      let item2 = { ...arr[index2] }
      arr = arr.map((item, index) => {
        if (index === index1) {
          item = item2
        }
        if (index === index2) {
          item = item1
        }
        return item
      })
      this.basicRuleForm.questions = arr
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
}
.form-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
/* 设置步骤条文字颜色 */
::v-deep .el-step__title {
  color: #424242;
}
::v-deep .el-step__title.is-process {
  color: #b6c0d2;
}
::v-deep .el-step__head.is-process > .el-step__icon {
  color: #b6c0d2;
}
/* 设置步骤条线条 */
::v-deep .el-step.is-horizontal .el-step__line {
  border-top: 2px dashed #ccd1de;
  background-color: transparent;
}
::v-deep .el-step__line-inner {
  border: 2px dashed #6898f5;
  margin-top: -0.125rem;
}
</style>
