<!--
 * @Author: HS  发送大会议程
 * @FilePath: \front-portal\src\views\meeting\managementHall\gpcscMeeting\component\sendAgenda.vue
-->
<template>
  <div>
    <iSearch class="margin-top25" icon>
      <template #button>
        <div>
          <iButton @click="search">{{ $t('查询') }}</iButton>
          <iButton @click="reset">{{ $t('rfq.RFQRESET') }}</iButton>
        </div>
      </template>
      <el-form>
        <el-row>
            <el-col :span="12">
               <!-- 会议名称-->
              <el-form-item :label="$t('会议名称')" prop="prCode">
                <i-input class="ccc"
                  :placeholder="language('请输入')"
                ></i-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- 会议类型-->
          <el-form-item :label="$t('会议类型')" prop="prName">
            <i-input
              :placeholder="language('请输入')"
            ></i-input>
          </el-form-item>

            </el-col>
            <el-col :span="6">
            <!-- 状态 -->
            <el-form-item :label="$t('状态')" prop="isPrePr">
              <iSelect
                collapse-tags
                multiple
                :placeholder="language('请选择')"
              >
                <el-option
              :value="item.value"
              :label="item.label"
              v-for="item of statusList"
              :key="item.value"
            ></el-option>
              </iSelect>
            </el-form-item>

            </el-col>
           
        </el-row>
          
        <el-row>
          <el-col :span="12">
            <!-- csc创建日期   startDate  endDate-->
            <el-form-item
              :label="language('CSCCHUANGJIANRIQI', 'CSC创建日期')"
              class="bb"
            >
              <el-date-picker
                class="aaa"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="changebiddingDate"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 周次-->
            <el-form-item :label="$t('MT_ZHOUCI')" class="LastSearchOption">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            :multiple="true"
            :collapse-tags="true"
            :reserve-keyword="true"
            :filterable="true"
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item of weekList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </iSearch>
    <iCard class="margin-top25">
      <div class="flex-end-center margin-bottom25">
        <iButton>{{ $t('提交') }}</iButton>
      </div>
      <iTableCustom
        @handle-selection-change="handleSelectionChange"
        style="width: 100%"
        :loading="loading"
        :data="tableData"
        :columns="tableColumns"
        :customClass="'custom-class'"
        @go-detail="goMBDLdetail"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </iCard>
  </div>
</template>

<script>
import {
  iCard,
  iSearch,
  iPagination,
  iInput,
  iSelect,
  iButton,
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import iTableCustom from '@/components/iTableCustom'
import { TABLE_COLUMNS_DEFAULTALl , statusList , weekListInit} from './data'
export default {
  components: {
    iCard,
    iSearch,
    iPagination,
    iInput,
    iSelect,
    iButton,
    iTableCustom
  },
  data() {
    return {
      loading: false,
      tableColumns: [...TABLE_COLUMNS_DEFAULTALl],
      tableData: [],
      visibleCustom: false,
      selectRows: [],
      statusList,
      weekListInit,
      weekList: weekListInit,
    }
  },
  mixins: [pageMixins],
  created() {
  },
  methods: {
    search(){
      his.weekList = weekListInit
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__suffix {
  display: flex;
  align-items: center;
}
::v-deep .aaa {
  width: 30.5rem !important;
  // margin-bottom: 2.125rem !important;
  float: left !important;
  margin-right: 3.125rem !important;
  padding-left: 0.125rem !important;
  padding-top: 0.3125rem !important;
  padding-bottom: 0.3125rem !important;
  height: 2.1875rem !important;
}
::v-deep .bb {
  width: 30.6rem !important;
}
::v-deep .ccc{
  width: 30.5rem;
}
</style>