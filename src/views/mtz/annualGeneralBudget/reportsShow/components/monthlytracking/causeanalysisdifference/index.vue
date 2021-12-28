<!--差异原因分析--->
<template>
  <div class="OuterFrame">
    <iSearch class="OuterIsearch" @sure="sure" @reset="reset">
      <el-form>
        <el-form-item label="MTZ材料组">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form['fixedAssetsCode']">
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="(item, index) in getAssetStatusList"
              :key="index"
              :value="item.code"
              :label="item.name"
            />
          </iSelect>
        </el-form-item>
        <el-form-item label="材料中类" >
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form['fixedAssetsCode']">
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="(item, index) in getAssetStatusList"
              :key="index"
              :value="item.code"
              :label="item.name"
            />
          </iSelect>
        </el-form-item>
        <el-form-item label="比较版本">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form['fixedAssetsCode']">
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="(item, index) in getAssetStatusList"
              :key="index"
              :value="item.code"
              :label="item.name"
            />
          </iSelect>
        </el-form-item>
        <div class="backgroundBox"></div>
        <el-form-item label="  ">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" class="compareTwo" v-model="form['fixedAssetsCode']">
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="(item, index) in getAssetStatusList"
              :key="index"
              :value="item.code"
              :label="item.name"
            />
          </iSelect>
        </el-form-item>
        <div
          class="showMe"
          v-permission="BUYER_FIXEDASSETS_ASSETSLIST_BTN_JUST_LOOK_YOURSELF"
        >
          <span>{{ $t('LK_JINKANZIJI') }}</span>
          <el-switch
            @change="showOnlyMyselfData($event)"
            active-color="#1660F1"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>

        <span class="monthlyCompare">{{ $t('月份比较') }}</span>
        <el-date-picker
          class="monthlyPosition"
          v-model="form['fixedAssetsCode']"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        >
        </el-date-picker>
      </el-form>
    </iSearch>
    <iCard>
      <div class="listDetails">
        <span>详情列表</span>
        <iButton @click="exportData" class="exportPosition">{{ $t('导出') }}</iButton>
      </div>
      <detailsList/>
    </iCard>
  </div>
</template>

<script>
import { iSearch, iSelect, iCard,iButton } from 'rise'
import detailsList from './components/detailsList'
import { form } from './components/data'
export default {
  name: 'index',
  components: {
    iSearch,
    iSelect,
    iCard,
    iButton,
    detailsList,
  },
  data(){
    return{
      form: form,
    }
  }
}
</script>

<style lang="scss" scoped>
.OuterFrame {
  position: relative;
}
.showMe {
  position: absolute;
  right: 270px;
  top: 60px;
  display: flex;
  align-items: center;
  height: 30px;
  span {
    font-size: 20px;
    color: #000000;
    align-content: center;
  }
  .el-switch {
    margin-left: 10px;
  }
}

.monthlyCompare {
  position: absolute;
  left: 40px;
  top: 115px;
}

.monthlyPosition {
  width: 220px;
  position: absolute;
  left: 40px;
  top: 138px;
}
.OuterIsearch {
  min-height: 200px;
  margin-bottom: 20px;
}

.compareTwo {
  position: absolute;
  left: 0px;
  top: 21px;
}

.backgroundBox {
  width: 50px;
  height: 37px;
  background-color: #f5f5f5;
  position: absolute;
  top: 56px;
  left: 800px;
}

.exportPosition{
  position: absolute;
  right: 40px;
  top: 250px;
}

.listDetails{
  margin-bottom: 25px;
  span{
    font-size: 20px;
  }
}
</style>