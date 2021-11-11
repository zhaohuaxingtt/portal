<template>
  <div>
    <el-autocomplete 
      v-model="row.describe" 
      :fetch-suggestions="querySearch" 
      :trigger-on-focus="false" 
      @select="handleSelect"
      placeholder="请输入内容"
    ></el-autocomplete>
  </div>  
</template>
<script>
import {iInput,} from 'rise'
export default {
  name:'describeInput',
  components: {iInput},
  props: {
    row: {
      type: Object,
      default: function() {
        return {}
      }
    },
    restaurants: {
      type:Array,
      default:function(){
        return []
      }
    }
  },
  data(){
    return{
    }
  },
  methods:{
     querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        // console.log(this.restaurant,'restaurant.value');
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        // console.log(queryString,'queryString');
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
        };
      },
  }
}
</script>
<style lang="scss" scoped>

</style>