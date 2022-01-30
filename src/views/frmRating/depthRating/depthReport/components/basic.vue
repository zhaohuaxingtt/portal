<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:SFRM综合评价
 -->
<template>
  <div>
    <!-- SFRM综合评价 -->
    <iCard title="SFRM综合评价"
           collapse
           class="margin-top20"
           isRequired>
      <iInput :disabled="isDisabled||disabled"
              type='textarea'
              :autosize='rowRange'
              maxlength="120"
              show-word-limit
              v-model="info.sfrmOverallMerit"></iInput>
    </iCard>
    <!-- 深入评级结果 -->
    <iCard title="深入评级结果"
           collapse
           class="margin-top20"
           isRequired>
      <tableList class="tableStyle"
                 :tableData="tableListData"
                 :tableTitle="tableTitle"
                 :selection="false"
                 :index="true"
                 :tableLoading="tableLoading">
        <template #deepCommentRatingDate>
          <iDatePicker disabled
                       style="width:220px !important"
                       v-model="info.deepCommentRatingDate"
                       value-format="yyyy-MM-dd"></iDatePicker>
        </template>
        <template #deepCommentRatingResults>
          <el-dropdown :split-button="true"
                       @command="changeGrade">
            <icon symbol
                  style="fontSize:12px"
                  :name="trans(info.deepCommentRatingResults)"></icon>
            <el-dropdown-menu  slot="dropdown"
                              v-if="!isDisabled">
              <el-dropdown-item     v-for="item in grade"
                                :key="item.id"
                              :disabled="disabled"

                                :value="item.name"
                                :label="item.name"
                                :command="item.name">
                <icon symbol
                      :name="trans(item.name)"></icon>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </tableList>
    </iCard>
    <!-- 后续跟踪建议 -->
    <iCard title="后续跟踪建议"
           collapse
           class="margin-top20"
           isRequired>
      <div class="margin-bottom20">
        <div class="flex-align-center">
          <span class="nowIndustry">后续跟踪频率</span>
          <iSelect   @change="changePv" :disabled="isDisabled||disabled"
                   v-model="info.trackFrequencyAgain">
            <el-option value="0"
                       key="0"
                       label="无需后续跟踪"></el-option>
            <el-option v-for="num in range(1,36)"
                       :key="num"
                       :value="num"
                       :label="num + '月'"></el-option>
          </iSelect>
          <span class="margin-left70">1-36个月/无需后续跟踪</span>
        </div>
      </div>
      <div class="title">补充建议</div>
      <iInput :disabled="isDisabled||disabled"
              type='textarea'
              :autosize='rowRange'
              maxlength="120"
              show-word-limit
              placeholder="请输入"
              v-model="info.addAdvice"></iInput>
    </iCard>
    <!-- 背景 -->
    <iCard title="背景"
           collapse
           class="margin-top20">
      <iInput :disabled="isDisabled||disabled"
              type='textarea'
              :autosize='rowRange'
              placeholder="请输入"
              maxlength="120"
              show-word-limit
              v-model="info.supplementarySuggestions"></iInput>
    </iCard>
    <div class="remark">本报告仅供上汽大众内部商务决策参考之用。请对所述供应商所有信息严格保密，不得向任何其他第三方透露本报告的任何内容，请在公司内部谨慎合理使用所述信息。本报告不得作为法律诉讼的依据，上汽大众不承担任何责任。</div>
  </div>
</template>

<script>
import { iCard, iInput, iDatePicker, iSelect, icon ,iMessage} from 'rise';
import tableList from '@/components/commonTable';
import { depthResult } from '../data';
import { getSummarize, postSummarize } from '@/api/frmRating/depthRating/depthReport.js'
import { getDictByCode } from '@/api/dictionary'
// import {setWaterMark,removeWatermark} from 'rise/utils/watermark'
export default {
  components: { iCard, iInput, tableList, iDatePicker, iSelect, icon },
  data () {
    return {
      rowRange: { minRows: 3, maxRows: 6 },
      tableTitle: depthResult,
      tableLoading: false,
      id: 0,
      info: {
        sfrmOverallMerit: '',
        deepCommentRatingDate: '',
        deepCommentRatingResults: '',
        supplementarySuggestions: '',
        trackFrequencyAgain: '',
        addAdvice: ''
      },
      range: window._.range,
      grade: [],
      supplierId: 0
    }
  },
  props: {
    isDisabled: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false }
  },
  mounted () {

    // console.log(this.userInfo)
    // setWaterMark(this.userInfo.nameZh+this.userInfo.id+this.userInfo.deptDTO.deptNum+'仅供CS内部使用',1000,700)
    this.id = this.$route.query.id;
    this.getGrade()
    this.getOverView()
  },
  destroyed () {
    // removeWatermark()
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
    trans () {
      return (color) => {
        if (color === '绿'||color === 'GREEN') {
          return 'iconlvdeng'
        } else if (color === '黄'||color === 'YELLOW') {
          return 'iconhuangdeng'
        } else if (color === '红'||color === 'RED') {
          return 'iconhongdeng'
        } else {
          return ""
        }
      }
    },
    tableListData () {
      return [this.info]
    }
  },
  methods: {
      changePv(v){
   this.$store.commit('SET_trackFrequencyAgain',v)
},
    getOverView () {
      getSummarize(this.id, 'zh').then((result) => {
        if (result.data) {
          this.info = result.data
          //this.info.deepCommentRatingResults=this.$store.state.frmRating.deepCommentRatingResults
          //this.info.trackFrequencyAgain= this.$store.state.frmRating.trackFrequencyAgain
        console.log(this.info)
        }
      }).catch(() => {

      });
    },
    postOverView () {
      // postSummarize({...this.info,deepCommentSupplierId:100})
      // let flag = false
      // window._.forEach(this.info,(v,k)=>{
      // 	console.log(k,v)

      // 	if(k!=='id'&&k!=='supplementarySuggestions'){
      // 		if(v===''||v===null){

      // 			flag =true
      // 		}
      // 	}
      // })
      // if(flag){
      // 	this.$message.error(this.$t('SPR_FRM_DEP_CHECK'))
      // 	return
      // }
      let params = _.cloneDeep(this.info)
        if((this.info.deepCommentRatingResults==""||this.info.deepCommentRatingResults==null)&&(this.info.trackFrequencyAgain==""||this.info.trackFrequencyAgain==null)){
          iMessage.warn('请填写状态与后续跟踪频率')
               return false
      } 

    //   switch (params.deepCommentRatingResults) {
    //     case '红':
    //       params.deepCommentRatingResults = 'RED'
    //       break;
    //     case '黄':
    //       params.deepCommentRatingResults = 'YELOW'
    //       break;
    //     case '绿':
    //       params.deepCommentRatingResults = 'GREEN'
    //       break;
    //   }
      postSummarize(params)
        .then((result) => {
          if (result.code == 200) {
            this.$message.success(result.desZh)
            this.getOverView()
          } else {
            this.$message.error(result.desZh)
          }
        }).catch((err) => {

        });
    },
    getGrade () {
      getDictByCode('GRADE_RESULT').then((result) => {
        if (result && result.data !== null && result.data.length > 0) {
          this.grade = result.data[0].subDictResultVo
        }
      }).catch((err) => {

      });
    },
    changeGrade (value) {
           this.$store.commit('SET_deepCommentRatingResults',value)
      this.info = {
        ...this.info,
        deepCommentRatingResults: value
      }
    }
  },
}
</script>

<style lang="scss" scoped="scoped">
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.title {
  font-weight: bold;
  font-size: 16px;
  color: $color-black;
  margin: 20px 0;
}
.nowIndustry {
  margin-right: 110px;
}
.el-select {
  width: auto;
}
.el-input {
  width: auto;
}
.remark {
  margin-top: 15px;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  line-height: 18px;
  color: #9b9b9b;
}
.red {
  color: #e30b0d;
  font-size: 18px;
}
</style>
