<!--
 * @Date: 2021-11-29 10:20:21
 * @LastEditors: caopeng
 * @LastEditTime: 2021-11-29 15:05:11
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\components\baseInfo.vue
-->
<template>
  <iCard tabCard collapse>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language('JICHUXINXI', '基础信息')
      }}</span>
      <div class="floatright">
        <i-button v-if="edit" @click="cancel"
          >{{ language('QUXIAO', '取消') }}
        </i-button>
        <i-button v-if="edit" @click="save"
          >{{ language('BAOCUN', '保存') }}
        </i-button>
        <i-button v-if="!edit" @click="editBtn"
          >{{ language('BIANJI', '编辑') }}
        </i-button>
      </div>
    </div>
    <iFormGroup row="3" :rules="baseRules" :model="form" ref="baseRules">
      <iFormItem prop="supplierNameCn">
        <iLabel
          :label="language('YINGYONGMINGCHENG', '应用名称')"
          required
          slot="label"
        ></iLabel>
        <iInput
          v-if="edit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="form.supplierNameCn"
        ></iInput>
        <iText v-else></iText>
      </iFormItem>
      <iFormItem prop="supplierNameCn">
        <iLabel
          :label="language('YINGYONGYINGWENMING', '应用英文名')"
          required
          slot="label"
        ></iLabel>
        <iInput
          v-if="edit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="form.supplierNameCn"
        ></iInput>
        <iText v-else></iText>
      </iFormItem>
      <iFormItem prop="supplierNameCn">
        <iLabel
          :label="language('YINGYONGJIANCHENG', '应⽤简称')"
          required
          slot="label"
        ></iLabel>
        <iInput
          v-if="edit"
          :placeholder="$t('LK_QINGSHURU')"
          v-model="form.supplierNameCn"
        ></iInput>
        <iText v-else></iText>
      </iFormItem>
      <iFormItem prop="supplierNameCn">
        <iLabel
          :label="language('YINGYONGFUZEREN', '应用负责人')"
          required
          slot="label"
        ></iLabel>
        <iSelect filterable v-model="form.address" v-if="edit">
          <el-option
            :value="item.sapLocationCode"
            :label="item.cityNameCn"
            v-for="(item, index) in country"
            :key="index"
          ></el-option>
        </iSelect>

        <iText v-else></iText>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iSelect,
  iFormGroup,
  iLabel,
  iFormItem,
  iInput,
  iText
} from 'rise'
export default {
  components: {
    iCard,
    iButton,
    iSelect,
    iFormGroup,
    iLabel,
    iFormItem,
    iInput,
    iText
  },
  data() {
    return {
      edit: false,
      form: {}
    }
  },
  methods: {
    cancel() {
      this.edit = false
    },
    editBtn() {
      this.edit = true
    }
  }
}
</script>

<style></style>
