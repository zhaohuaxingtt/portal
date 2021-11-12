<!--
 * @Author: your name
 * @Date: 2021-08-19 10:13:40
 * @LastEditTime: 2021-08-20 10:15:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\search\components\filterPanel.vue
-->
<template>

    <div class="filter-panel" v-if='showResult'>
      <iCard >
        <div class="filter-category">
          <!-- <iSelect
            v-model="searchForm.dataSourceList"
            size="large"
            class="search-category"
          >
            <el-option value="" label="全部" />
            <el-option
              v-for="item in categoryOptions"
              :key="item.name"
              :value="item.name"
              :label="item.name"
            />
          </iSelect> -->
          <iSelectCustom
            v-model="searchForm.dataSourceList"
            multiple
            :data = 'categoryOptions'
            value='name'
            label='name'
            sortVal='name'
            :disabled="false"
            :popoverClass="'popover-class'"
            :inputClass="'input-class'"
            class="search-category"
          ></iSelectCustom>
        </div>
      </iCard>
      <iCard >
        <div class="filter-input">
          <!-- <el-autocomplete
            v-model="searchForm.words"
            size="medium"
            type="primary"
            class="search-input"
            v-on:keyup.enter.native="search"
            :fetch-suggestions="getSuggestions"
            :placeholder="$t('输入关键词以搜索')"
            @select="handleSelect"
          > -->
          <iInput
            class="search-input"
            v-model="searchForm.words"
            type="primary"
            v-on:keyup.enter.native="search"
            
            @blur="handleSelect"
            @input="getSuggestions"
          >
          <span slot="prefix" class="search-span">搜索</span>
            <el-button
              slot="suffix"
              type="primary"
              icon="el-icon-search"
              class="search-button"
              @click="search"
            >
            </el-button>
          </iInput>
          <div class="historyList">
              <ul>
                <li 
                v-for="item in suggestions"
                :key="item.id"
                class="suggestionItem"
                >
                {{item.value}}
                </li>
              </ul>
          </div>
          <!-- </el-autocomplete> -->
        </div>
      </iCard>
    </div>
    <div class="filter-panel" v-else>
        <div class="filter-category">
         <!--  <theFilterPanelSelect :options='categoryOptions' :model='searchForm'/> -->
         <theFilterPanelLeftSelect
            @dataSource="dataSource"
            :data ='categoryOptions'
            class="search-category"
          ></theFilterPanelLeftSelect>
        </div>
        <div class="filter-input">
          <iInput
            class="search-input"
            v-model="searchForm.words"
            type="primary"
            @change="showSuggestion = false"
            v-on:keyup.enter.native="search"
            @input="getSuggestions"
          >
          <span slot="prefix" class="search-span">搜索</span>
            <el-button
              slot="suffix"
              type="primary"
              icon="el-icon-search"
              class="search-button"
              @click.stop="search"
            >
            </el-button>
          </iInput>
          <div class="suaggestionContent" v-if="showSuggestion">
              <ul>
                <li 
                v-for="item in suggestions"
                :key="item"
                class="suggestionItem"
                @click="selectedSugges(item)"
                >
                {{item.value}}
                </li>
              </ul>
              <div style='height:20px'></div>
          </div>
          <!-- </el-autocomplete> -->
        </div>
        
    </div>
</template>

<script>
import { iCard,iInput } from 'rise'
import theFilterPanelLeftSelect from './theFilterPanelLeftSelect'
// import theFilterPanelSelect from './theFilterPanelSelect.vue'
export default {
  name: 'FilterPanel',
  components: { theFilterPanelLeftSelect,iCard ,iInput},
  props: {
    categoryOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    searchForm: {
      type: Object,
      default: function() {
        return {
          dataSourceList: '',
          words: ''
        }
      }
    },
    showResult:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      suggestions:[],
      showSuggestion:false
    }
  },
  methods: {
    dataSource(val){
        console.log(val,'oooooo');
        this.searchForm.dataSourceList = val
    },
    search() {
      this.showSuggestion = false
      this.$emit('search', this.searchForm)
      this.$emit('update:showResult',false)
    },
    getSuggestions() {
      this.showSuggestion = true
      let histories = []
      if (window.localStorage.getItem('search_history')) {
        histories = JSON.parse(window.localStorage.getItem('search_history'))
      }
      const results = []
      histories.forEach(e => {
        if(e){
          results.push({ value: e })
        }
      })
      this.suggestions = results.filter((item) =>{
        return item.value.indexOf(this.searchForm.words) > -1
      })
    },
    handleSelect() {
      this.search()
    },
    selectedSugges(val){
      this.searchForm.words = val.value
      this.search()
    },
    searchMethod(){}
  }
}
</script>

<style lang="scss" scoped>
$input-height: 48px;
.filter-panel {
  display: flex;
}
.filter-category {
  width: 300px;
  height: 60px;
  .search-category {
    height: $input-height;
    width: 400px;
    // width: 200px;
    background-color: #fff;
    ::v-deep .el-input__inner {
      height: $input-height;
      width: 400px;
    }
  }
}
.search-input {
  position: relative;
  width: 600px;
  height: $input-height;
  box-shadow: 0 0 2px rgb(0 38 98 / 15%);
  ::v-deep .el-input__inner {
    height: $input-height;
    background: #F8F8FA;
    padding-left: 48px;
  }

  ::v-deep .el-input__suffix {
    display: flex;
    align-items: center;
    right: 20px;
  }
  .search-button {
    // background-color: $color-blue;
    background:none;
    border: none;
    height: $input-height;
    margin-right: -26px;
    font-size: 24px;
    // padding: 0px 30px;
    ::v-deep .el-icon-search{
      color: $color-blue;
    }
  }
  .search-span{
    padding-left: 8px;
    line-height: 50px;
    margin-right: 20px;
    font-weight: bolder;
    color: #000000;
  }
}
.suaggestionContent{
  top: 160px;
  position:absolute;
  background: #fff;
  box-shadow:0 0  5px #dcdcdc;
  .suggestionItem{
  width: 600px;
  font-weight: bolder;
  padding-left: 14px;
  height: 30px;
  line-height: 30px;
  &:hover {
  background: #F8F8FA;
  color: $color-blue;
  }
}

}

.filter-input{
  margin-left: 120px;
}
</style>
