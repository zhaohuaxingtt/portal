<template>
  <iSelect
    v-bind="$attrs"
    v-model="value"
    v-el-select-loadmore="loadmore"
    @change="changeValue"
    filterable
  >
    <el-option
      v-if="showAll"
      value=""
      :disabled="loading"
      :label="$t('ALL')"
    ></el-option>
    <el-option
      v-for="item in options"
      :value="item[optionValue]"
      :key="item[optionValue]"
      :disabled="loading"
      :label="$getLabel(item[optionLabel],item[optionLabelEn])+ (optionSubLabel ? ('-'+item[optionSubLabel]) : '')"
    ></el-option>
  </iSelect>
</template>

<script>
import { chunk } from "lodash";
import { iSelect } from "rise";
export default {
  components:{
    iSelect
  },
  props:{
    data:{
      type:Array,
      default:()=>[]
    },
    optionLabel:String,
    optionValue:String,
    optionLabelEn:String,
    optionSubLabel:String,
    value:[Array,String],
    showAll:Boolean,// 是否显示"全部"项
    loading:Boolean, // 接口调用时，禁止修改下拉数据
  },
  directives: {
    'el-select-loadmore': {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          '.el-select-dropdown .el-select-dropdown__wrap'
        )
        SELECTWRAP_DOM.addEventListener('scroll', function () {
          if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
            binding.value()
          }
        })
      }
    }
  },
  watch:{
    data(val){
      this.init()
    },
    value(val){
      this.$emit('update:value',val)
    }
  },
  data() {
    return {
      initData: [], // 接口返回的原始数据
      options: [], // 下拉框展示数据
      dataAll: [], // 通过筛选条件的数据
      pageSize: "20", // 每次下拉到底后新增数据量
      page: 0, // 初始显示第一页数据
    };
  },
  created() {
    this.init();
  },
  computed: {
    // 对筛选数据进行分页
    pageData() {
      return chunk(this.dataAll, this.pageSize);
    },
  },
  methods: {
    loadmore(){
      if (this.page < this.pageData.length) {
        this.page++;
        this.$nextTick(() => {
          this.load();
        });
      }
    },
    changeValue(val){
      let item = this.options.find(item=>item[this.optionValue]==val)
      this.$emit('change',val, item)
      if(!val){
        this.filterData("")
      }
    },
    load() {
      // 如果新一页还有数据的话，拼接当前数据和新一页数据
      if (this.pageData[this.page])
        this.options = [...this.options, ...this.pageData[this.page]];
        console.log(this.options);
    },
    // 数据筛选，筛选后查询第一页的数据
    filterData(input) {
      this.dataAll = this.initData.filter(
        (item) => item[this.optionLabel]?.toLowerCase().indexOf(input.toLowerCase()) > -1
      );
      this.$nextTick(() => {
        this.options = [];
        this.page = 0;
        this.load();
      });
    },
    // 数据初始化
    init() {
      let initData = JSON.parse(JSON.stringify(this.data));
      this.initData = initData;
      this.$nextTick(() => {
        this.filterData("");
      });
    },
  },
};
</script>

<style lang="scss" scope>

</style>