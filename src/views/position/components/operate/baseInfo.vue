<template>
  <div class="base-info margin-bottom20">
    <iCard tabCard collapse :title="language('基本信息')">
      <iFormGroup
        :row="type === 'add' ? 3 : 4"
        :model="positionObj"
        ref="baseForm1"
      >
        <iFormItem prop="code" v-if="type === 'detail' || type === 'edit'">
          <iLabel :label="language('岗位编码')" :required="true" slot="label"></iLabel>
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
            :label="language('岗位名称（中）')"
            :required="true"
            slot="label"
          ></iLabel>
          <iText v-if="type === 'detail'">{{ positionObj.fullNameZh }}</iText>
          <i-input
            v-else
            v-model="positionObj.fullNameZh"
            type="text"
            :placeholder="language('请输入岗位名称（中）')"
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
            :label="language('岗位名称（英）')"
            :required="true"
            slot="label"
          ></iLabel>
          <iText v-if="type === 'detail'">{{ positionObj.fullNameEn }}</iText>
          <i-input
            v-else
            v-model="positionObj.fullNameEn"
            type="text"
            :placeholder="language('请输入岗位名称（英）')"
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
            :label="language('是否组织领导')"
            :required="true"
            slot="label"
          ></iLabel>
          <iText v-if="type === 'detail'">{{
            positionObj.isDeptLead | leaderFilter
          }}</iText>
          <iSelect v-else :placeholder="language('请选择')" v-model="positionObj.isDeptLead">
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
          <iLabel :label="language('岗位描述')" :required="true" slot="label"></iLabel>
          <iText v-if="type === 'detail'">{{ positionObj.description }}</iText>
          <i-input
            v-else
            v-model="positionObj.description"
            type="text"
            :placeholder="language('请输入岗位描述')"
          />
        </iFormItem>
        <iFormItem prop="tagList">
          <iLabel :label="language('岗位标签')" slot="label"></iLabel>
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
          <iLabel :label="language('默认正式采购组')" slot="label"></iLabel>
          <iSelect
            v-model="positionObj.purchaseGroup"
            filterable
            :disabled="type === 'detail'"
            @change="handlePruchaseGroupChange"
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
          <iLabel :label="language('默认暂作采购组')" slot="label"></iLabel>
          <iSelect
            v-model="positionObj.tempPurchaseGroup"
            filterable
            :disabled="type === 'detail'"
          >
            <el-option
              v-for="item in tempPurchasegroupOptions"
              :key="item.id"
              :label="item.purchaseGroupCode"
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
        <iFormItem v-if="positionObj.isDeptLead">
          <iLabel :label="language('是否外方领导')" slot="label"></iLabel>
          <iSelect v-model="positionObj.property" :disabled="type === 'detail'">
            <el-option label="是" :value="2" />
            <el-option label="否" :value="1" />
          </iSelect>
        </iFormItem>
        <iFormItem>
          <iLabel :label="language('其他正式组')" slot="label"></iLabel>
          <iSelectAll
            v-model="positionObj.otherPurchaseGroup"
            :options="otherTempPurchasegroupOptions"
            valueKey="purchaseGroupCode"
            labelKey="purchaseGroupCode"
            :disabled="type === 'detail'"
          />
          <!-- <iSelect
            v-model="positionObj.otherPurchaseGroup"
            filterable
            multiple
            :disabled="type === 'detail'"
          >
            <el-option
              v-for="item in otherTempPurchasegroupOptions"
              :key="item.purchaseGroupCode"
              :label="item.purchaseGroupCode"
              :value="item.purchaseGroupCode"
            />
          </iSelect> -->
        </iFormItem>
        <iFormItem>
          <iLabel :label="language('其他暂作采购组')" slot="label"></iLabel>
          <iSelectAll
            v-model="positionObj.otherTempPurchaseGroup"
            :options="tempPurchasegroupOptions"
            valueKey="purchaseGroupCode"
            labelKey="purchaseGroupCode"
            :disabled="type === 'detail'"
          />
          <!-- <iSelect
            v-model="positionObj.otherTempPurchaseGroup"
            filterable
            :disabled="type === 'detail'"
            multiple
          >
            <el-option
              v-for="item in tempPurchasegroupOptions"
              :key="item.purchaseGroupCode"
              :label="item.purchaseGroupCode"
              :value="item.purchaseGroupCode"
            />
          </iSelect> -->
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
import iSelectAll from '@/components/iSelectAll'
export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iText,
    iInput,
    iSelect,
    dTable,
    iSelectAll
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
    },
    otherTempPurchasegroupOptions() {
      return this.purchasegroupOptions.filter(
        (e) => e.purchaseGroupCode !== this.positionObj.purchaseGroup
      )
    }
    // otherTempPurchaseGroup(){
    //   const otherTempPurchaseGroup = this.$store.state.position.pos.positionDetail.otherTempPurchaseGroup
    //   console.log(otherTempPurchaseGroup,'====');
    //   return otherTempPurchaseGroup?.split(',')
    // },
    // otherPurchaseGroup(){
    //   const otherPurchaseGroup = this.$store.state.position.pos.positionDetail.otherPurchaseGroup
    //   console.log( this.$store.state.position.pos.positionDetail.otherPurchaseGroup,'-------');
    //   return otherPurchaseGroup?.split(',')
    // }
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
    },
    handlePruchaseGroupChange(val) {
      this.positionObj.otherTempPurchaseGroup =
        this.positionObj.otherTempPurchaseGroup.filter((e) => e !== val)
    }
  }
}
</script>
