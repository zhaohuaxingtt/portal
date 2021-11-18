<template>
  <div class="base-info margin-bottom20">
    <iCard tabCard collapse title="基本信息">
      <iFormGroup
        :row="type === 'add' ? 3 : 4"
        :model="positionObj"
        ref="baseForm1"
      >
        <iFormItem prop="code" v-if="type === 'detail' || type === 'edit'">
          <iLabel :label="'岗位编码'" :required="true" slot="label"></iLabel>
          <iText>{{ positionObj.code }}</iText>
        </iFormItem>
        <iFormItem
          prop="fullNameZh"
          :rules="[
            {
              required: true,
              message: '请输入岗位名称（中）',
              trigger: 'blur'
            }
          ]"
        >
          <iLabel
            :label="'岗位名称（中）'"
            :required="true"
            slot="label"
          ></iLabel>
          <iText v-if="type === 'detail'">{{ positionObj.fullNameZh }}</iText>
          <i-input
            v-else
            v-model="positionObj.fullNameZh"
            type="text"
            placeholder="请输入岗位名称（中）"
          />
        </iFormItem>
        <iFormItem
          prop="fullNameEn"
          :rules="[
            {
              required: true,
              message: '请输入岗位名称（英）',
              trigger: 'blur'
            }
          ]"
        >
          <iLabel
            :label="'岗位名称（英）'"
            :required="true"
            slot="label"
          ></iLabel>
          <iText v-if="type === 'detail'">{{ positionObj.fullNameEn }}</iText>
          <i-input
            v-else
            v-model="positionObj.fullNameEn"
            type="text"
            placeholder="请输入岗位名称（英）"
          />
        </iFormItem>
        <iFormItem
          prop="isDeptLead"
          :rules="[
            {
              required: true,
              message: '请选择是否组织领导',
              trigger: 'change'
            }
          ]"
        >
          <iLabel
            :label="'是否组织领导'"
            :required="true"
            slot="label"
          ></iLabel>
          <iText v-if="type === 'detail'">{{
            positionObj.isDeptLead | leaderFilter
          }}</iText>
          <iSelect v-else placeholder="请选择" v-model="positionObj.isDeptLead">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item of isLeaderOptions"
              :key="item.value"
            >
            </el-option>
          </iSelect>
        </iFormItem>
      </iFormGroup>

      <iFormGroup row="2" :model="positionObj" ref="baseForm2">
        <iFormItem
          prop="description"
          :rules="[
            {
              required: true,
              message: '请输入岗位描述',
              trigger: 'blur'
            }
          ]"
        >
          <iLabel :label="'岗位描述'" :required="true" slot="label"></iLabel>
          <iText v-if="type === 'detail'">{{ positionObj.description }}</iText>
          <i-input
            v-else
            v-model="positionObj.description"
            type="text"
            placeholder="请输入岗位描述"
          />
        </iFormItem>
        <iFormItem prop="tagList">
          <iLabel :label="'岗位标签'" slot="label"></iLabel>
          <div>
            <!-- <div style="position:relative"> -->
            <!-- <iInput type="text" v-model="positionObj.tagList.length" style="opacity:0;z-index:1; width:80%"></iInput> -->
            <!-- <iText style="position:absolute;top: 0;left:0;"> -->
            <iText>
              <div class="flex-between-center-center">
                <div class="tag-wrapper">
                  <el-tag
                    type="info"
                    class="tags"
                    v-for="(item, index) in positionObj.tagList"
                    :key="index"
                    >{{ item.name }}</el-tag
                  >
                </div>
                <i
                  class="el-icon-circle-plus-outline"
                  @click="handleDirect"
                  v-if="type !== 'detail'"
                ></i>
              </div>
            </iText>
          </div>
        </iFormItem>
      </iFormGroup>

      <iFormGroup row="3" :model="positionObj" ref="baseForm3">
        <iFormItem>
          <iLabel :label="language('正式价采购组')" slot="label"></iLabel>
          <iSelect
            v-model="positionObj.purchaseGroup"
            filterable
            :disabled="type === 'detail'"
          >
            <el-option
              v-for="item in purchasegroupOptions"
              :key="item.id"
              :label="item.purchaseGroupCode"
              :value="item.purchaseGroupCode"
            />
          </iSelect>
        </iFormItem>
        <iFormItem>
          <iLabel :label="language('暂作价采购组')" slot="label"></iLabel>
          <iSelect
            v-model="positionObj.tempPurchaseGroup"
            filterable
            :disabled="type === 'detail'"
          >
            <el-option
              v-for="item in tempPurchasegroupOptions"
              :key="item.id"
              :label="item.purchaseGroupName"
              :value="item.purchaseGroupCode"
            />
          </iSelect>
        </iFormItem>
        <iFormItem prop="set">
          <iLabel :label="language('专业组')" slot="label"></iLabel>
          <iSelect
            v-model="positionObj.setCode"
            multiple
            filterable
            collapse-tags
            :disabled="type === 'detail'"
          >
            <el-option
              v-for="item in setCodeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.code"
            />
          </iSelect>
        </iFormItem>
      </iFormGroup>

      <dTable :type="type" />
    </iCard>
  </div>
</template>

<script>
import {
  iCard,
  iFormGroup,
  iFormItem,
  iLabel,
  iText,
  iInput,
  iSelect
} from 'rise'
import dTable from './dTable.vue'
import { queryPurchasegroup } from '@/api/position'
import { getProGroupOptions } from '@/api/materiel/materielMainData'
export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
    iInput,
    iSelect,
    dTable
  },
  props: {
    type: {
      type: String
    }
  },
  filters: {
    leaderFilter: function (value) {
      return value ? '是' : '否'
    }
  },
  updated() {},
  data() {
    const validateTags = (rule, value, callback) => {
      console.log(rule, value, callback)
    }
    return {
      isLeaderOptions: [
        { label: '是', value: true },
        { label: '否', value: false }
      ],
      tagRules: [
        {
          validator: validateTags,
          trigger: 'blur'
        }
      ],
      purchasegroupOptions: [],
      tempPurchasegroupOptions: [],
      setCodeOptions: []
    }
  },
  created() {
    this.queryPurchasegroupOptions()
    this.queryTempPurchasegroupOptions()
    this.queryProGroupOptions()
  },
  computed: {
    positionObj() {
      return this.$store.state.position.pos.positionDetail
    }
  },
  methods: {
    handleDirect() {
      this.$store.commit('GET_TAGS')
      this.$store.commit('GET_TAGS_SELECTED')
      this.$router.push({
        path: '/position/tag'
      })
    },
    async queryPurchasegroupOptions() {
      const res = await queryPurchasegroup()
      this.purchasegroupOptions = res.data
    },
    async queryTempPurchasegroupOptions() {
      const res = await queryPurchasegroup({ isProvisionalPrice: true })
      this.tempPurchasegroupOptions = res.data
    },
    async queryProGroupOptions() {
      const res = await getProGroupOptions()
      this.setCodeOptions = res.data
    }
  }
}
</script>
