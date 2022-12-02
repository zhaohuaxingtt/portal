<template>
  <div>
    <iSearch
      @sure="sure"
      @reset="reset"
      >
      <el-form>
        <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG1')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierName"></iInput>
        </el-form-item>
        <el-form-item :label="$t('组织机构代码')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.code"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_KESHI')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.keshi">
                <el-option :value="item.name"
                            :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                            v-for="item of keshiList"
                            :key="item.name">
                </el-option>
            </iSelect>
        </el-form-item>
        <el-form-item :label="$t('添加来源')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.keshi">
                <el-option :value="item.name"
                            :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                            v-for="item of keshiList"
                            :key="item.name">
                </el-option>
            </iSelect>
        </el-form-item>
        <el-form-item :label="$t('添加时间起止')">
            <iDatePicker value-format="yyyy-MM-dd"
              type="daterange"
              v-model="form.createTime" />
        </el-form-item>
      </el-form>
    </iSearch>

    <iCard class="margin-top20" :title="$t('舆情供应商清单')">
      <template v-slot:header-control>
        <iButton @click="handleNotRated">{{ $t('MT_BIANJI') }}</iButton><!-- 编辑 -->
        <iButton @click="handleNotRated">{{ $t('LK_TIANJIA') }}</iButton><!-- 添加 -->
        <iButton @click="handleNotRated">{{ $t('LK_XZMB') }}</iButton><!-- 下载导入模板 -->
        <iButton @click="handleNotRated">{{ $t('DAORU') }}</iButton><!-- 导入 -->
        <iButton @click="handleNotRated">{{ $t('SUPPLIER_DAOCHUQUANBU') }}</iButton><!-- 到处全部 -->
        <iButton @click="handleNotRated">{{ $t('MT_SHANCHU') }}</iButton><!-- 删除 -->
      </template>
      <tableList
        :tableData="tableListData"
        :tableTitle="tableSetTitle"
        :tableLoading="tableLoading"
        border
        @handleSelectionChange="handleSelectionChange"
        :index="true">


      </tableList>
    </iCard>
  </div>
</template>

<script>
import { iSearch,iInput,iSelect,iDatePicker,iCard,iButton } from "rise"
import tableList from '@/components/commonTable/index.vue';
import { tableSetTitle } from "../data"
export default {
  components:{
      iSearch,
      iInput,
      iSelect,
      iDatePicker,
      iCard,
      iButton,
      tableList,
  },
  data(){
      return{
          tableLoading:false,
          tableSetTitle,
          tableListData:[],
          form:{
              supplierName:"",
              code:'',
              keshi:"",
              createTime:"",
          },
          keshiList:[],
          selfOnly:true,
      }
  },
  methods:{
      sure(){

      },
      reset(){

      },
      handleSelectionChange(){

      },
      handleOpenPage(){
          
      },
  }
}
</script>

<style>

</style>