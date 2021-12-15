<!--
 * @Author: HS  会议列表
 * @FilePath: \front-portal\front-portal\src\views\meeting\managementHall\meetingList\index.vue
-->
<template>
  <div>
    <!-- 查询区 -->
    <div class="SearchOptions">
      <i-search @sure="sure" @reset="reset">
        <template #button>
          <div>
            <iButton @click="sure">{{ $t('rfq.SEARCH') }}</iButton>
            <iButton @click="reset">{{ $t('rfq.RFQRESET') }}</iButton>
          </div>
        </template>
        <el-form>
            <el-row >
                <el-col :span="12">
                  <!-- 会议名称  cscCode-->
          <el-form-item :label="$t('MT_HUIYIMINGCHENG')">
            <i-input
              :placeholder="$t('LK_QINGSHURU')"
              class=""
            >
              <!-- v-model="formData.cscCode" -->
            </i-input>
          </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!-- 会议类型  cscCode-->
          <el-form-item :label="$t('MT_HUIYILEIXING')">
            <i-input
              :placeholder="$t('LK_QINGXUANZE')"
              class=""
            >
              <!-- v-model="formData.cscCode" -->
            </i-input>
          </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!-- 状态  cscCode-->
          <el-form-item :label="language('状态', '状态')">
            <i-input
              :placeholder="$t('LK_QINGXUANZE')"
              class=""
            >
              <!-- v-model="formData.cscCode" -->
            </i-input>
          </el-form-item>
                </el-col>
            </el-row>


            <el-row>
              <el-col :span="12">
                <!-- 会议日期   startDate  endDate-->
          <el-form-item
            :label="language('会议日期', '会议日期')"
            class="formwidth"
          >
              <!-- v-model="biddingStartDate" -->
            <el-date-picker
              class="date-picker-width"
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
              <el-col :span="6">
                 <!-- 周次  cscCode-->
          <el-form-item :label="language('周次', '周次')">
            <i-input
              :placeholder="$t('LK_QINGXUANZE')"
              class=""
            >
              <!-- v-model="formData.cscCode" -->
            </i-input>
          </el-form-item>
              </el-col>
            </el-row>

            

         
          
          
          
        </el-form>
      </i-search>
    </div>
    <!-- 列表 -->
    <iCard class="margin-top20">
      <div class="OrganizationTable">
        <iTableCustom
          style="width: 100%"
          :loading="loading"
          :data="tableData"
          :columns="tableColumns"
          :customClass="'custom-class'"
          @go-detail="goDetail"
          @go-quoteMethod="goquoteMethod"
          :tree-expand="tableExpanded"
          @click-menu="handleExpend"
           @go-quoteMethodDetail="goquoteMethodDetail"
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
      </div>
    </iCard>
  </div>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import iTableCustom from '@/components/iTableCustom'
import { iSearch, iInput, iSelect, iCard, iButton, iPagination } from 'rise'
export default {
  mixins: [pageMixins],
  components: {
    iSearch,
    iInput,
    iSelect,
    iCard,
    iButton,
    iPagination,
    iTableCustom,
  },

}
</script>

<style lang="scss" scoped>
::v-deep .date-picker-width {
  width: 30.5rem !important;
  // margin-bottom: 2.125rem !important;
  float: left !important;
  margin-right: 3.125rem !important;
  padding-left: 0.125rem !important;
  padding-top: 0.3125rem !important;
  padding-bottom: 0.3125rem !important;
  height: 2.1875rem !important;
}
::v-deep .formwidth {
  width: 30.6rem !important;
}
</style> 