<template>
  <div class="theSearch">
    <div class="item">
      <!--      供应商名称-->
      <div class="label">{{ $t('LK_GONGYINGSHANGMINGCHENG') }}</div>
      <iInput :placeholder="$t('LK_QINGSHURU')"
              v-model="form.nameZh" class="inputStyle"></iInput>
    </div>
    <div class="item">
      <!--      统一社会信用代码-->
      <div class="label">{{ $t('UnifySocialCreditCode') }}</div>
      <iInput :placeholder="$t('LK_QINGSHURU')"
              v-model="form.socialcreditNo" class="inputStyle"></iInput>
    </div>
    <div class="item">
      <!--      SAP号-->
      <div class="label">{{ $t('SUPPLIER_SAPHAO') }}</div>
      <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.sapCode"
              class="inputStyle"></iInput>
    </div>
    <!--    相关科室-->
    <div class="item">
      <div class="label">{{ $t('SUPPLIER_CAILIAOZU_XIANGGUANKESHI') }}</div>
      <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.relevantDept">
        <!--            <el-option value="" :label="$t('all')"></el-option>-->
        <el-option
            :value="item.name"
            :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
            v-for="item of allSelectObject.RELEVANT_DEPT"
            :key="item.name"></el-option>
      </iSelect>
    </div>
    <div class="buttonBox">
      <iButton class="buttonStyle" @click="handleSearch">{{ $t('LK_QUEREN') }}</iButton>
      <iButton class="buttonStyle" @click="handleSearchReset">{{ $t('LK_ZHONGZHI') }}</iButton>
    </div>
  </div>
</template>

<script>
import {iButton, iInput, iSelect} from 'rise';
import {selectDictByKeys} from '@/api/dictionary';

export default {
  components: {
    iButton,
    iInput,
    iSelect
  },
  data() {
    return {
      form: {
        nameZh: '',
        socialcreditNo: '',
        sapCode: '',
        relevantDept: '',
      },
      allSelectObject: {},
    };
  },
  created() {
    this.getAllSelectList();
  },
  methods: {
    handleSearchReset() {
      this.form = {};
      this.handleSearch();
    },
    handleSearch() {
      this.$emit('getTableList', this.form);
    },
    async getAllSelectList() {
      const data = ['RELEVANT_DEPT'];
      let req = 'keys=';
      req = req + data.join('&keys=');
      const res = await selectDictByKeys(req);
      this.allSelectObject = res.data;
    },
  },
};
</script>

<style scoped lang="scss">
.theSearch {
  display: inline-flex;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 30px;

  .item {
    margin-right: 68px;

    .label {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: #000000;
      margin-bottom: 6px;
    }

    .inputStyle {
      width: 220px;
    }
  }

  .buttonBox {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .buttonStyle {
      margin-top: 28px;
      height: 35px;
    }
  }
}
</style>
