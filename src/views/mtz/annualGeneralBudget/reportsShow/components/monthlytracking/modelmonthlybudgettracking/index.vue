<!--车型预算月度跟踪--->
<template>
  <div class="OuterFrame">
    <iSearch class="OuterIsearch" @sure="sure" @reset="reset">
      <el-form>
        <el-form-item :label="language('LK_MTZCAILIAOZU', 'MTZ材料组')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form['MtzMaterial']"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="(item, index) in MtzMaterialList"
              :key="index"
              :value="item.materialGroupCode"
              :label="item.materialGroupNameZh"
            />
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CAILIAOZHONGLEI', '材料中类')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form['MaterialMedium']"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="(item, index) in MaterialMediumList"
              :key="index"
              :value="item.materialCategoryCode"
              :label="item.materialNameZh"
            />
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_BIJIAOBANBEN', '比较版本')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form['fixedAssetsCode']"
          >
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
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            class="compareTwo"
            v-model="form['fixedAssetsCode']"
          >
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
          v-model="form['isOnly']"
            @change="showOnlyMyselfData($event)"
            active-color="#1660F1"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>

        <span class="monthlyCompare">{{
          language('LK_YUEFENBIJIAO', '月份比较')
        }}</span>
        <el-date-picker
          class="monthlyPosition"
          v-model="form['fixedAssetsCode']"
          type="monthrange"
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        >
        </el-date-picker>
      </el-form>
    </iSearch>
    <iCard>
      <div class="listDetails">
        <span>{{ language('LK_XIANGQINGLIEBIAO', '详情列表') }}</span>
        <iButton @click="exportData" class="exportPosition">{{
          $t('LK_DAOCHU')
        }}</iButton>
      </div>
      <detailsList />
    </iCard>
  </div>
</template>

<script>
import { iSearch, iSelect, iCard, iButton } from 'rise'
import detailsList from './components/detailsList'
import { form } from './components/data'
import { queryMtzMaterial, queryMaterialMedium } from '@/api/mtz/reportsShow'
export default {
  name: 'index',
  components: {
    iSearch,
    iSelect,
    iCard,
    iButton,
    detailsList
  },
  data() {
    return {
      form: form,
      MtzMaterialList: [], //MTZ材料组数据
      MaterialMediumList: [] //材料中类数据
    }
  },
  created() {
    this.MtzMaterial()
    this.MaterialMedium()
  },
  methods: {
    //MTZ材料组
    MtzMaterial() {
      queryMtzMaterial()
        .then((res) => {
          this.MtzMaterialList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //材料中类
    MaterialMedium() {
      queryMaterialMedium()
        .then((res) => {
          this.MaterialMediumList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //重置查询条件
    reset() {
      for (let i in this.form) {
        if (i !== 'isOnly') {
          this.form[i] = ''
        }
      }
    },
    //仅看自己
    showOnlyMyselfData(val) {
      console.log(val)
      this.form.isOnly = val
    },
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

.exportPosition {
  position: absolute;
  right: 40px;
  top: 250px;
}

.listDetails {
  margin-bottom: 25px;
  span {
    font-size: 20px;
  }
}
</style>