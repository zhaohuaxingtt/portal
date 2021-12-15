<!--
 * @Date: 2021-11-29 10:20:21
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-15 16:43:48
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\components\baseInfo.vue
-->
<template>
  <iCard tabCard
         collapse>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language('JICHUXINXI', '基础信息')
      }}</span>
      <div class="floatright">
        <i-button v-if="edit"
                  @click="cancel">{{ language('QUXIAO', '取消') }}
        </i-button>
        <i-button v-if="edit"
                  @click="save">{{ language('BAOCUN', '保存') }}
        </i-button>
        <i-button v-if="!edit"
                  @click="editBtn">{{ language('BIANJI', '编辑') }}
        </i-button>
      </div>
    </div>
    <iFormGroup row="3"
                :rules="baseRules"
                :model="form"
                ref="baseRules">
      <iFormItem prop="nameZh">
        <iLabel :label="language('YINGYONGMINGCHENG', '应用名称')"
                required
                slot="label"></iLabel>
        <iInput v-if="edit"
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form.nameZh"></iInput>
        <iText v-else>{{form.nameZh}}</iText>
      </iFormItem>
      <iFormItem prop="nameEn">
        <iLabel :label="language('YINGYONGYINGWENMING', '应用英文名')"
                required
                slot="label"></iLabel>
        <iInput v-if="edit"
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form.nameEn"></iInput>
        <iText v-else>{{form.nameEn}}</iText>
      </iFormItem>
      <iFormItem prop="shortName">
        <iLabel :label="language('YINGYONGJIANCHENG', '应⽤简称')"
                required
                slot="label"></iLabel>
        <iInput v-if="edit"
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form.shortName"></iInput>
        <iText v-else>{{form.shortName}}</iText>
      </iFormItem>
      <iFormItem prop="contactUserId">
        <iLabel :label="language('YINGYONGFUZEREN', '应用负责人')"
                required
                slot="label"></iLabel>
        <iSelect filterable
                 v-model="form.contactUserId"
                 v-if="edit">
          <el-option :value="item.id"
                     :label="item.contactName"
                     v-for="(item, index) in userList"
                     :key="index"></el-option>
        </iSelect>

        <iText v-else>{{form.contactUserName}}</iText>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { baseRules } from './data'

import { baseEdit, queryBase,userUpdown } from '@/api/opcs/solPermission'
import {
  iCard,
  iButton,
  iSelect,
  iFormGroup,
  iLabel,
  iFormItem,
  iInput,
  iText,
  iMessage
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
      form: {},
      baseRules: baseRules,
      userList:[]
    }
  },
  created() {
    this.getUser()
  },
  methods: {
      getUser(){
          userUpdown({opcsSupplierId: this.$route.query.opcsSupplierId}).then(res=>{
               if(res&&res.code==200){
               this.userList=res.data||[]
               this.getInfo()
              }
          })
      },
    getInfo() {
      let req = { opcsSupplierId: this.$route.query.opcsSupplierId }
      queryBase(req).then((res) => {
        if (res && res.code == 200) {
          this.form = res.data
           this.form.contactUserName=this.userList.find(v=>v.id==this.form.contactUserId).contactName
        }
      })
    },
    cancel() {
      this.form = {
          nameZh:'',
          nameEn:'',
          shortName:'',
          contactUserId:''
      }
      this.$refs.baseRules.clearValidate();
      this.getInfo()
      this.edit = false
    },
    editBtn() {
      this.edit = true
    },
    save() {
      this.$refs.baseRules.validate((valid) => {
        if (valid) {
            this.form.contactUserName=this.userList.find(v=>v.id==this.form.contactUserId).contactName
          let req = {
            opcsSupplierId: this.$route.query.opcsSupplierId,
            ...this.form
          }
          baseEdit(req).then((res) => {
            if (res && res.code == 200) {
                this.edit=false
                this.getInfo()
              iMessage.success(res.desZh)
            }else{
                iMessage.error(res.desZh)
            }
          })
        }
      })
    }
  }
}
</script>

<style></style>
