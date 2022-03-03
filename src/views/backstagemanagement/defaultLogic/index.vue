<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 18:06:45
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-30 15:22:53
 * @Description: 定点申请预设逻辑界面
 * @FilePath: \front-sourcing\src\views\designate\defaultLogic\index.vue
-->

<template>
  <iPage class="defaultLogic" v-permission.auto="DESIGNATEDEFAULTLOGIC_PAGE|定点申请预设逻辑-页面">
    <!------------------------------------------------------------------------>
    <!--                     界面标题模块                                   --->
    <!------------------------------------------------------------------------>
    <!-- <detailTop right lev='2' :pageMenu='detailPage' :query='$route.query'>
      <span slot="left" class="floatleft font20 font-weight">
        {{language('LK_DINGDIANSHENQINGYUSHELUOJI','定点申请预设逻辑')}}
      </span>
    </detailTop> -->
    <div class="header clearFloat">
      <iNavMvp :list="list" :lang="true" :lev="1" routerPage></iNavMvp>
    </div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
          <div class="floatright">
            <!--------------------添加按钮----------------------------------->
            <iButton @click="handleAdd" v-permission.auto="DESIGNATEDEFAULTLOGIC_ADDBTN|定点申请预设逻辑-添加按钮">{{language('LK_TIANJIA','添加')}}</iButton>
            <!--------------------删除按钮----------------------------------->
            <iButton @click="handleDelete" v-permission.auto="DESIGNATEDEFAULTLOGIC_DELETEBTN|定点申请预设逻辑-删除按钮">{{language('LK_SHANCHU','删除')}}</iButton>
            <!--------------------恢复按钮----------------------------------->
            <!-- <iButton @click="handleRecover">恢复</iButton> -->
            <!--------------------保存按钮----------------------------------->
            <!-- <iButton @click="handleSave">保存</iButton> -->
          </div>
      </div>
        <!------------------------------------------------------------------------>
        <!--                  表格模块                                          --->
        <!------------------------------------------------------------------------>
        <tableList v-permission.auto="DESIGNATEDEFAULTLOGIC_TABLE|定点申请预设逻辑-表格" selection indexKey :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" ></tableList>
        <!------------------------------------------------------------------------>
        <!--                  表格分页                                          --->
        <!------------------------------------------------------------------------>
        <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        />
    </iCard>
    <addRule ref="addRuleRef" :dialogVisible="dialogVisible" @changeVisible="changeVisible" @handleSave="handleSaveLogic" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iMessage, iNavMvp, icon } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from './components/tableList'
import { defaultLogicTableTitle, defaultLogicMockData } from './data'
import addRule from './addRule'
import { getNominateRulesList, deleteNominateRules, addNominateRules } from '@/api/defaultLogic'
import { TAB } from '../data'
export default {
  mixins: [pageMixins],
  components: { iPage, iCard, iPagination, iButton, tableList, addRule, iNavMvp, icon },
  data() {
    return {
      list: TAB,
      tableListData: defaultLogicMockData,
      tableTitle: defaultLogicTableTitle,
      tableLoading: false,
      form: {},
      dialogVisible: false,
      selectedItems: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    /**
     * @Description: 恢复按钮，恢复到上一次保存的数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleRecover() {
      this.getTableList()
    },
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      this.tableLoading = true
      const params = {
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getNominateRulesList(params).then(res => {
        if (res?.result) {
          this.tableListData = res.data
          this.page.currPage = Number(res.pageNum)
          this.page.pageSize = Number(res.pageSize)
          this.page.totalCount = Number(res.total)
        } else {
          this.tableListData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 保存添加的逻辑
     * @Author: Luoshuang
     * @param {*} logic
     * @return {*}
     */    
    handleSaveLogic(logic) {
      this.$refs.addRuleRef.changeSaveLoading(true)
      addNominateRules(logic).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.changeVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.addRuleRef.changeSaveLoading(false)
      })
    },
    /**
     * @Description: 表格选中切换事件
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    /**
     * @Description: 删除选中的rule
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleDelete() {
      if (this.selectedItems.length < 1) {
        iMessage.warn(this.language('LK_QINGXUANZEXUYAOSHANCHUDEGUIZE','请选择需要删除的规则'))
      }
      this.tableLoading = true
      const params = {
        rulesId: this.selectedItems.map(item => item.rulesId)
      }
      deleteNominateRules(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 点击添加按钮
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleAdd() {
      this.changeVisible(true)
    },
    /**
     * @Description: 切换设置规则弹窗显示
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeVisible(visible) {
      this.dialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>
.defaultLogic {
  height: calc(100vh - 60px);
  
  .header {
    position: relative;
    margin-bottom: 40px;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      // 影响到了日志弹窗，暂时注释掉，后面用其他属性代替
      // transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }
}
</style>