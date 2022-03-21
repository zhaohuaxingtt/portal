<template>
  <iPage v-loading="loading">
    <div class="header">{{ $t('QN_WENJUANDIAOCHA') }}</div>
    <iCard>
      <component
        v-if="component"
        :is="component"
        :name="name"
        v-model="previewData"
        @subClick="handlerSubClick"
      ></component>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard } from 'rise'
// import { queryForAnswer } from "@/api/survey/answer.js";
import { saveAnswer, queryForAnswer } from '@/api/survey/survey.js'
import detailPC from './components/detailPC.vue'
import feedback from './components/feedback.vue'
export default {
  components: {
    iPage,
    iCard,
    detailPC,
    feedback
  },
  data() {
    return {
      id: '',
      previewData: {},
      surveyFlag: true,
      checkMax: '',
      checkMin: '',
      istipleRule: false,
      loading: false,
      state: '',
      name: '',
      upLoadFileName: ''
    }
  },
  computed: {
    component() {
      if (!this.surveyFlag || this.state == 3) {
        return 'feedback'
      }
      return 'detailPC'
    },
    max() {
      return function (da) {
        console.log(671, da)
        const multipleRule = da?.multipleRule
          ? JSON.parse(da?.multipleRule)
          : {}
        return multipleRule?.most || ''
      }
    },
    min() {
      return function (da) {
        const multipleRule = da?.multipleRule
          ? JSON.parse(da?.multipleRule)
          : {}
        return multipleRule?.least || ''
      }
    }
  },
  mounted() {
    this.query({ id: this.id })
  },
  created() {
    document.title = this.$t('QN_WENJUANDATING')
    this.id = this.$route.params.id
    console.log('this.questionnaireId:' + this.id)
    this.state = this.$route.params.state
    console.log('fsafsafsaf', this.$route)
    this.name = this.$route.params.name
  },
  methods: {
    handlerSubClick(previewData, sonQuestions) {
      // this.upLoadFileName = previewData[length-1]
      console.log(47, previewData)
      let flag = false
      let sonFlag = false
      let sonFlagArr = []
      let questionList = []
      sonQuestions.map((it) => {
        if (it.type == 9) {
          sonFlagArr.push(this.doNotMake(it.sonQuestions))
          console.log(sonFlagArr)
          sonFlag = sonFlagArr.includes(true)
          console.log(82, sonFlag)
          return questionList.push(this.formateData(it))
        }
      })
      previewData.map((e) => {
        console.log(e)
        //   console.log(56,e.answer)
        //   console.log(56,e)

        //     if(e.type !=9 && (!e.answer || e.answer.length == 0)  && e.requiredQuestion == true) {
        //       if(e.type == 3 && e?.answer?.trim() =="") flag = true;
        //       flag = true;
        //     }
        //     // else if (e.type == 9) {
        //     //   sonFlag = this.doNotMake(it.sonQuestions);
        //     //   console.log(82,sonFlag)
        //     // }

        //     if(e.type == 7 || e.type ==8) {
        //       return;
        //     } else if(e.type != 9){
        //         return questionList.push(this.formateData(e));
        //       }
        // })
        if (
          e.type != 9 &&
          (!e.answer || e.answer.length == 0) &&
          e.requiredQuestion
        ) {
          flag = true
        }
        if (e.type == 3 && e?.answer?.trim() == '' && e.requiredQuestion) {
          flag = true
        }

        if (e.type == 7 || e.type == 8) {
          return
        } else if (e.type != 9) {
          return questionList.push(this.formateData(e))
        }
      })
      console.log(88, flag)
      if (flag || sonFlag) {
        if (document.getElementsByClassName('el-message').length === 0) {
          this.$message.error(this.$t('QN_QINGHUIDABIDAWENTI'))
        }
        return
      }
      // if (this.istipleRule) {
      //   this.$message.error(
      //     `多选题最多选择${this.checkMax},最少选择${this.checkMin}`
      //   );
      //   return;
      // }
      console.log('object', questionList)
      questionList = questionList.filter((item) => item)
      if (document.getElementsByClassName('el-message').length === 0) {
        // isFlag = false
      } else {
        console.log(
          '错误信息进来了',
          document.getElementsByClassName('el-message')
        )
        return
      }
      console.log(95, questionList)
      this.loading = true
      saveAnswer({
        questions: questionList,
        surveyId: Number(this.id)
      })
        .then(() => {
          this.$message.success(this.$t('QN_TIJIAOCHENGGONG'))
          this.loading = false
          this.surveyFlag = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    doNotMake(questions) {
      let flag = false
      console.log(81, questions)
      questions.map((e) => {
        if (
          (!e.answer || e.answer.length == 0 || e.answer == null) &&
          e.requiredQuestion == true
        ) {
          // if(e.type == 3 && e.answer.trim() =="") flag = true;
          flag = true
        }
      })
      return flag
    },
    formateData(data) {
      let obj = {}
      if (data.type == 1) {
        if (!data.answer) return
        obj = {
          questionId: data.id,
          questionType: data.type,
          options: data.answer
            ? [
                {
                  id: data.answer.split('-')[0],
                  name: data.answer.split('-')[1]
                }
              ]
            : ''
        }
      } else if (data.type == 2) {
        if (!data.answer) return
        obj = {
          questionId: data.id,
          questionType: data.type,
          options: this.formateList(data.answer)
        }
        if (obj.options.length == 0) return
        this.checkMax = this.max(data)
        this.checkMin = this.min(data)
        const checkMax = this.max(data)
        const checkMin = this.min(data)
        if (checkMin && checkMax) {
          if (checkMin > obj.options.length || obj.options.length > checkMax) {
            if (document.getElementsByClassName('el-message').length === 0) {
              this.$message.error(
                `${this.$t('QN_TIMU')}${data.code},${this.$t('QN_DUOXUANTIZUIDUOXUANZE')}${
                  this.checkMax
                },${this.$t('QN_ZUISHAOXUANZE')}${this.checkMin}`
              )
              return
            }
          }
        } else if (checkMin) {
          if (checkMin > obj.options.length) {
            if (document.getElementsByClassName('el-message').length === 0) {
              this.$message.error(
                `${this.$t('QN_TIMU')}${data.code},${this.$t('QN_DUOXUANTIZUIDUOXUANZE')}${
                  this.checkMax
                },${this.$t('QN_ZUISHAOXUANZE')}${this.checkMin}`
              )
              return
            }
          }
        } else if (checkMax) {
          if (obj.options.length > checkMax) {
            if (document.getElementsByClassName('el-message').length === 0) {
              this.$message.error(
                `${this.$t('QN_TIMU')}${data.code},${this.$t('QN_DUOXUANTIZUIDUOXUANZE')}${
                  this.checkMax
                },${this.$t('QN_ZUISHAOXUANZE')}${this.checkMin}`
              )
              return
            }
          }
        }
      } else if (data.type == 6) {
        if (!data.answer) return
        obj = {
          questionId: data.id,
          questionType: data.type,
          options: data.answer
            ? [
                {
                  id: data.answer.split('-')[0],
                  name: data.answer.split('-')[1]
                }
              ]
            : ''
        }
      } else if (data.type == 4) {
        if (!data.answer) return
        obj = {
          questionId: data.id,
          questionType: data.type,
          answer: data.answer.split('-')[1],
          options: data.answer
            ? [
                {
                  id: data.answer.split('-')[0],
                  name: data.answer.split('-')[1]
                }
              ]
            : ''
        }
      } else if (data.type == 3) {
        if (!data.answer) return
        obj = {
          questionId: data.id,
          questionType: data.type,
          answer: data.answer.trim()
        }
      } else if (data.type == 5) {
        if (!data.answer || data.length) return
        obj = {
          questionId: data.id,
          questionType: data.type,
          // answer: data.answer ? data.answer[0].attachmentId + '.' + data.answer[0].upLoadFileName : null
          answer: data.answer
            ? data.answer[0].attachmentId +
              '.' +
              (data.answer[0].upLoadFileName.length > 55
                ? data.answer[0].upLoadFileName.slice(-50)
                : data.answer[0].upLoadFileName)
            : null
        }
      } else if (data.type == 9) {
        obj = {
          questionId: data.id,
          questionType: data.type,
          sonQuestions: data.sonQuestions.map((e) => {
            return this.formateData(e)
          })
        }
        let sonQuestions = obj.sonQuestions.filter((item) => item)
        obj = { ...obj, sonQuestions }
        if (obj.sonQuestions.length == 0) return
      }
      return obj
    },
    formateList(data) {
      let list = []
      if (data) {
        for (let i = 0; i < data.length; i++) {
          list.push({
            id: data[i].split('-')[0],
            name: data[i].split('-')[1]
          })
        }
      }
      return list
    },
    query(e) {
      if (this.state == 5) {
        this.surveyFlag = false
      } else {
        queryForAnswer(e).then((res) => {
          if (res.id == null) {
            this.previewData.state = 2
            this.surveyFlag = false
          }
          this.previewData = res
          this.previewData.questions = this.previewData.questions.map(
            (item) => {
              if (item.type == 2) item.answer = []
              return {
                ...item,
                uploadLoading: false,
                sonQuestions: item?.sonQuestions?.map((it) => {
                  if (it.type == 2) it.answer = []
                  return {
                    ...it,
                    uploadLoading: false
                  }
                })
              }
            }
          )
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;
}
</style>
