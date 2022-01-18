<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:SFRM综合评价
 -->
<template>
  <div>
    <!-- SFRM综合评价 -->
    <iCard title="SFRM Overall evaluation"
           collapse
           class="margin-top20"
           isRequired>
      <iInput :disabled="isDisabled"
              type='textarea'
              :autosize='rowRange'
              placeholder="Please enter."
              v-model="info.sfrmOverallMerit"
              maxlength="120"
              show-word-limit></iInput>
    </iCard>
    <!-- 深入评级结果 -->
    <iCard title="In-depth analysis result"
           collapse
           class="margin-top20"
           isRequired>
      <tableList :tableData="tableListData"
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
            <el-dropdown-menu slot="dropdown"
                              v-if="!isDisabled">
              <el-dropdown-item v-for="item in grade"
                                :key="item.id"
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
    <iCard title="Follow-up Suggestions"
           collapse
           class="margin-top20"
           isRequired>
      <div class="margin-bottom20">
        <div class="flex-align-center">
          <span class="nowIndustry">Frequency of Follow-up</span>
          <iSelect :disabled="isDisabled"
                   v-model="info.trackFrequencyAgain"
                   placeholder="Please select">
            <el-option value="0"
                       key="0"
                       :label="$t('SPR_FRM_DEP_NOFOLLOW')"></el-option>
            <el-option v-for="num in range(1,36)"
                       :key="num"
                       :value="num"
                       :label="num + 'months'"></el-option>
          </iSelect>
          <span class="margin-left70">1-36 months/No follow-up</span>
        </div>
      </div>
      <div class="title">Supplementary Suggestions</div>
      <iInput :disabled="isDisabled"
              type='textarea'
              :autosize='rowRange'
              placeholder="Please enter."
              v-model="info.addAdvice"
              maxlength="120"
              show-word-limit></iInput>
    </iCard>
    <!-- 背景 -->
    <iCard title="Background"
           collapse
           class="margin-top20">
      <iInput :disabled="isDisabled"
              type='textarea'
              :autosize='rowRange'
              placeholder="Please enter."
              v-model="info.supplementarySuggestions"
              maxlength="120"
              show-word-limit></iInput>
    </iCard>
    <div class="remark">The report is only used for SAIC VOLKSWAGEN internal business decision reference. Any information relating to the report shall not.</div>
  </div>
</template>

<script>
import { iCard, iInput, iDatePicker, iSelect, icon } from 'rise';
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
      supplierId: ""
    }
  },
  props: {
    isDisabled: { type: Boolean, default: false }
  },
  mounted () {
    // console.log(this.userInfo)
    // setWaterMark(this.userInfo.nameZh+this.userInfo.id+this.userInfo.deptDTO.deptNum+'仅供CS内部使用',1000,700)
    this.id = this.$route.query.id;
    this.supplierId = this.$route.query.supplierId;
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
        if (color === '绿') {
          return 'iconlvdeng'
        } else if (color === '黄') {
          return 'iconhuangdeng'
        } else if (color === '红') {
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

    getOverView () {
      getSummarize(this.supplierId, this.id, this.id, 'en').then((result) => {
        if (result.data) {
          this.info = result.data
          this.info.deepCommentSupplierId = this.id
          this.info.deepCommentId = this.id
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
      this.info.lang = 'en'
      postSummarize(this.info)
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
  color: #e30b0d;
}
.red {
  color: #e30b0d;
  font-size: 18px;
}
</style>
