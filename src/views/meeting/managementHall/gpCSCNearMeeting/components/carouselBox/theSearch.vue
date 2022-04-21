<template>
  <div class="near-search-box">
    <iSearch
      @reset="handleSearchReset"
      @sure="searchTableList"
      :icon="false"
      style="margin-bottom: 40px"
    >
      <el-form>
        <!--第一行-->
        <el-row>
          <!--会议名称-->
          <el-form-item :label="$t('MT_HUIYIMINGCHENG')" style="width: 538px">
            <iInput
              :placeholder="$t('LK_QINGSHURU')"
              v-model="form.name"
            ></iInput>
          </el-form-item>
          <!--会议类型-->
          <!-- <el-form-item :label="'会议类型'">
            <iSelect
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="form.meetingTypeId"
            >
              <el-option value="" :label="$t('all')"></el-option>
              <el-option
                :value="item.id"
                :label="item.name"
                v-for="item of meetingTypeList"
                :key="item.id"
              ></el-option>
            </iSelect>
          </el-form-item> -->
          <!--状态-->
          <el-form-item :label="$t('状态')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.states">
              <el-option value="" :label="$t('all')"></el-option>
              <el-option
                :value="item.value"
                :label="$t(item.label)"
                v-for="item of statusList"
                :key="item.value"
              ></el-option>
            </iSelect>
          </el-form-item>
          <iDateRangePicker
            :startDateProps="form.startDateBegin"
            :endDateProps="form.startDateEnd"
            @change-start="changeStart"
            @change-end="changeEnd"
            :pickerOptionsStartProps="datePickerOptionsStart"
            :pickerOptionsEndProps="datePickerOptionsEnd"
            :pickerOptionsEndFun="pickerOptionsEndFun"
            ref="iDateRangePicker"
            :label="$t('MT_HUIYIRIQI')"
          />
          <!-- 周次 -->
          <el-form-item :label="$t('MT_SHOUJIANREN')">
            <el-autocomplete
              v-model="form.receiver"
              :fetch-suggestions="querySearchAsync"
              :placeholder="$t('MT_QINGSHURU')"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-row>
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import { iInput, iSelect } from 'rise'
import { getMettingType } from '@/api/meeting/type'
// import { getUsers } from "@/api/meeting/type";
import { getPageListByParam } from '@/api/usercenter/receiver.js'
import iDateRangePicker from '@/components/iDateRangePicker/index.vue'
import iSearch from '@/components/iSearch/index.vue'

export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iDateRangePicker
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      meetingTypeId: '',
      restaurants: [],
      timeout: null,
      meetingTypeList: [],
      statusList: [
        // {
        //   label: "草稿",
        //   value: "01",
        // },
        {
          label: 'MT_KAIFANG',
          value: '02'
        },
        {
          label: 'MT_SUODING',
          value: '03'
        },
        {
          label: 'MT_KAISHI',
          value: '04'
        },
        {
          label: 'MT_JIESHU',
          value: '05'
        },
        {
          label: 'MT_GUANBI',
          value: '06'
        }
      ],
      datePickerOptionsStart: {
        // 日期选择
        disabledDate: (date) => {
          let newDate = new Date().valueOf()
          return (
            date.valueOf() < newDate - 24 * 60 * 60 * 1000 * 14 ||
            date.valueOf() > newDate + 24 * 60 * 60 * 1000 * 6
          )
        }
      },
      datePickerOptionsEnd: {
        // 日期选择
        disabledDate: (date) => {
          let newDate = new Date().valueOf()
          return (
            date.valueOf() < newDate - 24 * 60 * 60 * 1000 * 14 ||
            date > newDate + 24 * 60 * 60 * 1000 * 6
          )
        }
      },
      pickerOptionsEndFun: new Date().valueOf() + 24 * 60 * 60 * 1000 * 6
    }
  },
  mounted() {
    this.meetingTypeId = this.$route.query.id
    this.getAllSelectList()
    this.getUsersAll()
  },
  methods: {
    // querySearchAsync(queryString, cb) {
    //   // console.log("queryString", queryString);
    //   let restaurants = this.restaurants.map((item) => {
    //     return {
    //       value: item.name,
    //       id: item.id
    //     }
    //   })
    //   let results = queryString
    //     ? restaurants.filter(this.createStateFilter(queryString))
    //     : restaurants

    //   clearTimeout(this.timeout)
    //   this.timeout = setTimeout(() => {
    //     cb(results)
    //   }, 500 * Math.random())
    // },
    async querySearchAsync(queryString, cb) {
      let res = await this.getUsersAll(queryString)
      res = res || { data: [] }
      let userArr = res.data || []
      userArr = userArr.map((item) => {
        return {
          value: item.nameZh,
          ...item
        }
      })
      cb(userArr)
    },
    createStateFilter(queryString) {
      return (state) => {
        return state.value.toLowerCase().match(queryString.toLowerCase())
      }
    },
    handleSelect(item) {
      this.form.receiverId = item.id
      // console.log("this.form.receiver.id", this.form.receiverId);
    },
    async getUsersAll(str) {
      const data = {
        nameZh: str
      }
      let res = await getPageListByParam(data)
      return res
    },
    // getUsersAll() {
    //   const data = {
    //     pageNum: 1,
    //     pageSize: 1000,
    //   };
    //   getUsers(data).then((res) => {
    //     // console.log("res", res);
    //     this.restaurants = res.data;
    //   });
    // },
    handleSearchReset() {
      this.form = {}
      setTimeout(() => {
        this.$refs.iDateRangePicker.initDate()
      }, 4)
      this.$emit('handleSearchReset')
    },
    searchTableList() {
      this.$emit('searchTableList')
    },
    getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1
      }
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data
        this.$emit('setTypeObj', res.data)
      })
    },
    changeStart(e) {
      this.form.startDateBegin = e
    },
    changeEnd(e) {
      this.form.startDateEnd = e
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .near-search-box .cardBody {
  padding: 0 0 30px !important;
}
::v-deep .el-autocomplete {
  width: 220px !important;
}
</style>
