<template>
  <div>
    <el-tooltip  :content="searchForm.dataSourceList" placement="top" effect="light" :disabled='searchForm.dataSourceList.length < 1'>
        <el-select v-model="searchForm.dataSourceList" filterable placeholder="请选择" 
            multiple class="filterPanelSelect" @change="selectChange" :filter-method='filterMethod'>
            <div class="selectTap">
                <div @click="checkAll">
                    <el-checkbox v-model="checkAllSta"  :indeterminate='indeterminate'>
                        全选
                    </el-checkbox>
                </div>
                <div @click="clear" class="select-top-right">
                    <i class='el-icon-refresh-left' style='padding:0 3px'></i>
                    <span>重置</span>
                </div>
            </div>
            <div class="selected" v-if="searchForm.dataSourceList.length > 0">
                <el-divider ></el-divider>
                <p class="selectedTitle">已选择</p>
                <div 
                    v-for="item in searchForm.dataSourceList"
                    :key="item"
                    class="selectedItems"
                    @click="cancelSelected(item)"
                >
                    <div class="selectedItemsContent">
                        {{item}}
                    </div>
                    <div>
                        <span class="selectItems">
                            {{item.label}}
                            <span class="check-box-border">
                                <i class="check-box-self"></i>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="selectOptions">
                <el-divider></el-divider>
                <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                    <span class="selectItems">
                        {{item.label}}
                        <span class="check-box-border">
                            <i class="check-box-self"></i>
                        </span>
                    </span>
                </el-option>
            </div>
        </el-select>
    </el-tooltip>
  </div>
</template>

<script>
export default {
    name:'theFilterPanelSelect',
    props:{
        options:{
            type:Array,
            default:()=>{}
        },
        searchForm: {
            type: Object,
            default: function() {
                return {
                    dataSourceList: '',
                }
            }  
        },
    },
    // computed:{
    //     searchOptions(){
    //         if(){

    //         }
    //     }
    // },
    watch:{

    },
    data(){
        return{
            clearSelected:false,
            checkSta:false,
            checkAllSta:false,
            indeterminate:false,
            searchOptions:[],
            inputMessage:''
        }
    },
    created(){
        this.searchOptions = this.options
    },
    methods:{
        //重置
        clear(){
            this.searchForm.dataSourceList = []
            this.checkAllSta =false
            this.indeterminate = false
            this.searchOptions = this.options
        },
        //全选
        checkAll(){
            this.indeterminate = false
            console.log(this.checkAllSta,'iiii');
            if(this.checkAllSta){
                this.searchForm.dataSourceList = []
                this.searchOptions = this.options
            }else{
                    console.log('sss');
                    this.searchForm.dataSourceList = this.searchOptions.map(item =>{
                        return item.value
                    })
            }
        },
        selectChange(val){
            if(val.length == 0){
                this.indeterminate = false
            }else if(val.length == this.options.length){
                this.indeterminate = false
            }else{
                this.indeterminate = true
            }
            if(this.inputMessage){
                this.filterMethod(this.inputMessage)
            }
        },
        //取消选择
        cancelSelected(val){
            this.searchForm.dataSourceList.splice(this.searchForm.dataSourceList.indexOf(val),1)
            if(this.searchForm.dataSourceList.length == 0){
                this.indeterminate = false
            }else if(this.searchForm.dataSourceList.length == this.options.length){
                this.indeterminate = false
            }else{
                this.indeterminate = true
            }
        },
        filterMethod(val){
            this.inputMessage = val
             if (val) {
                this.searchOptions = this.options.filter((item) => {
                    if (item.label.includes(val) || item.label.toUpperCase().includes(val.toUpperCase())) {
                        return true                 
                    }
                })
             }
        }
    }

}
</script>

<style lang="scss" scoped>
.item{
    margin: 4px;
}
.selectTap,
.selectedItems,
.selectItems{
    display: flex;
    justify-content: space-between;
    padding: 2px 0px;
}
.selectTap{
    margin:2px 14px;
}
.selected{
    padding: 2px 10px;
    .selectedTitle{
        width: 80px;
        height: 24px;
        font-size: 8px;
        font-weight: 400;
        line-height: 24px;
        color: #000000;
        opacity: 1;
        font-weight: bolder;
        margin-left:12px;
    }
    ::v-deep .el-divider{
        margin: 8px 0;
    }
    .selectedItems{
        color: #888888;
        margin: 4px 10px;
        .selectedItemsContent{
            margin-top: 4px;
        }
        .check-box-border{
            height: 12px;
            margin-top: 2px;
            // border: 1px solid #67C23A;
            background-color: #E1E1E1;
            border-radius: 5px;
            padding:8px  ;
            position: relative;
            .check-box-self{
                height: 10px;
                width: 7px;
                top: 2px;
                left: 5px;
                display: inline-block;
                position: absolute;
                border: 1px solid white;
                border-width: 0px 1px 1px 0px;
                transform: rotate(45deg);
                vertical-align: baseline;
            }
        }
    }
}
.selectItems{
    .check-box-border{
        height: 12px;
        margin-top: 6px;
        border: 1px solid #E1E1E1;
        border-radius: 5px;
        padding:8px  ;
        .check-box-self{
            display: none;
        }
    }
}
.filterPanelSelect{
    width: 400px;
    height: 48px;
    ::v-deep .el-input{
        height: 48;
        overflow: hidden;
        display:inline-block;
        text-overflow: ellipsis;
        .el-input__inner{
            height: 48px;
        }
    }
    ::v-deep .el-select__tags {
            // display: inline-block;
            margin-left: 2px;
            flex-wrap: nowrap;
            width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
             white-space: nowrap;
            > span{
                max-width: 280px;
                display: inline-block;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .el-select__input{
                min-width: 100px;
            }
        }
}
.selectOptions{
    ::v-deep .selected{
         margin: 4px 10px;
    }
    ::v-deep .el-divider{
        margin: 8px 0;
    }
    .selected{
        .check-box-border{
            height: 12px;
            margin-top: 5px;
            border: 1px solid #67C23A;
            border-radius: 5px;
            padding:8px  ;
            position: relative;
            .check-box-self{
                height: 10px;
                width: 7px;
                top: 2px;
                left: 5px;
                display: inline-block;
                position: absolute;
                border: 1px solid #67C23A;
                border-width: 0px 1px 1px 0px;
                transform: rotate(45deg);
                vertical-align: baseline;
            }
        }
    }
}
.select-top-right:hover{
    cursor: pointer;
}

</style>