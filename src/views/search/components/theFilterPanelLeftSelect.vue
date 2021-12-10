<template>
  <div class="custom-select">
    <div class="input-area" :class="{ 'has-select': selectedOptions.length }">
      <div
        class="tags"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        <div class="tag-items">
          <el-button
            v-for="item in selectedOptions"
            :key="item.id"
          >
            {{ item.label }}
            <i class="el-icon-circle-close" @click="handleSelectItem(item)"></i>
          </el-button>
        </div>
      </div>
      <el-popover
        placement="bottom-start"
        trigger="focus"
        :popper-class="`${popoverClass} custom-select-popover`"
        :disabled="disabled"
        ref="selectPopover"
      >
        <div class="btns-wrapper">
          <el-button-group class="btns-group">
            <div  @click="handleSelectAll(!checkSta)" class="check-class">
              <el-checkbox v-model="checkSta" :indeterminate='indeterminate'>
                全选
              </el-checkbox>
            </div>
            <!-- <el-button @click="handleSelectAll(true)"> 全选 </el-button> -->
            <div @click="handleSelectAll(false,'reset')" class="reset-class"> <i class="el-icon-refresh-left">重置 </i> </div>
          </el-button-group>
        </div>
        <el-divider class="divider"></el-divider>
        <div class="list-container">
          <div class="selected-container" v-if="selectedOptions.length">
            
            <div class="title">已选择</div>
            <div
              v-for="item in selectedOptions"
              :key="item.id"
              @click="handleSelectItem(item)"
              class="selected"
            >
              <div>
                {{ item.label }}
              </div>
              <span class="el-icon-border"><span class="el-icon-content"></span></span>
            </div>
            <el-divider></el-divider>
          </div>
          <div class="origin-container">
            <div
              v-for="item in searchOriginData"
              :key="item.id"
              @click="handleSelectItem(item)"
              :class="{
                disabled: selectedOptions.includes(item),
                checkBtn:!selectedOptions.includes(item)
              }"
            >
            <div>
              {{ item.label }}
            </div>
            <span class="check-border"><span class="check-content"></span></span>
            </div>
          </div>
        </div>

        <el-input
          v-model="inputData"
          :placeholder="selectedOptions.length ? '' : placeholderText"
          @focus="iconSta = true"
          @blur="iconSta  = false"
          slot="reference"
        >
         <i slot="suffix" :class="{'el-icon-caret-top':!iconSta,'el-icon-caret-bottom':iconSta}" class="inputIcon"></i>
        </el-input>
      </el-popover>
    </div>

    <el-tooltip
      effect="light"
      ref="tooltipArea"
      :disabled="!tooltipContent.length"
    >
      <div slot="content" class="custom-tooltip-content">
        {{ tooltipContent }}
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Number,
      default: function () {
        return []
      },
      required: true
    },
  },
  model: {
    event: 'change'
  },
  data() {
    return {
      inputData: '',
      placeholderText: '请选择',
      loading: true,
      visible:false,
      dataSource: [],
      checkSta:false,
      iconSta:true,
      indeterminate:false
    }
  },
  computed: {
    searchOriginData() {
      if (this.inputData.trim()) {
        return this.dataSource.filter((item) =>
          item.label.toUpperCase().includes(this.inputData.toUpperCase())
        )
      }
      return this.dataSource
    },
    selectedOptions() {
      return this.dataSource.filter((item) => item.selected)
    },
    tooltipContent() {
      return this.dataSource
        .filter((item) => item.selected)
        .map((e) => e.label)
        .join(',')
    },
  },
  watch: {
    inputData(newValue,oldValue){
      if(newValue != oldValue){
        this.checkSta = false
      }
    },
    data(newValue) {
      this.dataSource = _.cloneDeep(newValue)
      this.loading = false
    },
    selectedOptions(newValue){
      // console.log(newValue,'newValuenewValue');
      this.$emit('dataSource',newValue)
    }
  },
  created() {
    this.dataSource = _.cloneDeep(this.data)
  },
  methods: {
    handleSelect(flag) {
      this.dataSource = this.dataSource.map((e) => {
        e.selected = flag
        return e
      })
    },
    handleSelectItem(item) {
      const index = this.dataSource.findIndex((e) => e.id === item.id)
      const dataItem = this.dataSource[index]
      dataItem.selected = !dataItem.selected
      this.dataSource.splice(index, 1, dataItem)
    },
    handleSelectAll(flag,type) {
      if(type == 'reset'){
        this.checkSta = false
        this.inputData = ''
        const ids = this.selectedOptions.map((e)=>e.id)
        this.dataSource = this.dataSource.map((e) => {
        if(ids.includes(e.id)) {
          return { ...e, selected: flag }
        } 
        return { ...e }
      })
        
      }else{
        const searchedIds = this.searchOriginData.map((e) => e.id)
        this.dataSource = this.dataSource.map((e) => {
        if(searchedIds.includes(e.id)) {
          return { ...e, selected: flag }
        } 
        return { ...e }
      })
      }
      
    },
    handleMouseenter($event) {
      const ele = $event.toElement
      const tooltip = this.$refs.tooltipArea
      if (tooltip) {
        tooltip.referenceElm = ele
        tooltip.show()
      }
    },
    handleMouseleave() {
      const tooltip = this.$refs.tooltipArea
      if (tooltip) {
        tooltip.hide()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.inputIcon{
  margin-top: 16px;
}
.divider{
  margin-top: 40px;
}
.custom-select-popover {
  position: absolute;
  width: 300px;
  .list-container {
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 14px;
    min-width: 300px;
    > .selected-container,
    > .origin-container {
      > .loading {
        text-align: center;
        padding: 30px 0;
        font-size: 20px;
      }
      > div {
        line-height: 30px;
        cursor: pointer;
      }
    }
    .origin-container{
      .checkBtn{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 15px;
        .check-border{
          width:16px ;
          height: 16px;
          border: 1px solid #E1E1E1;
          border-radius: 5px;
        }
      }
    }
    > .selected-container {
      > .title {
        font-weight: bold;
        font-size: 16px;
        margin: 5px 0;
      }
      > .selected {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 15px;
        .el-icon-border{
          width:16px ;
          height: 16px;
          border: 1px solid #E1E1E1;
          background: #E1E1E1;
          border-radius: 5px;
          position: relative;
          .el-icon-content{
            position: absolute;
            left: 4px;
            height: 10px;
            width: 7px;
            border: 1px solid white;
            border-width: 0px 1px 1px 0px;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
  .btns-wrapper {
    margin-top: 15px;
    .btns-group{
      display: flex;
      justify-content: space-between;
      margin-right: 15px;
      position: relative;
      .check-class{
        position: absolute;
      }
      .reset-class{
        position: absolute;
        cursor: pointer;
        right: 15px;
      }
    }
    .el-button-group {
      width: 100%;
      .el-button {
        border: none;
        width: 20%;
      }
    }
  }
  .disabled {
    color: #2963E8;
    cursor: not-allowed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 15px;
    .check-border{
      width:16px ;
      height: 16px;
      border-radius: 5px;
      border: 1px solid #1660F1;
      position: relative;
      .check-content{
        position: absolute;
        left: 4px;
        height: 10px;
        width: 7px;
        border: 1px solid #1660F1;
        border-width: 0px 1px 1px 0px;
        transform: rotate(45deg);
      }
    }
      
  }
}
.custom-select-input {
  min-width: 300px;
  width: 100%;
  > input {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.el-tag-class {
  margin-top: 8px;
  width: 200px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.input-filter-class {
  ::v-deep .el-input__inner {
    padding-left: 220px;
    overflow: hidden;
    white-space: nowrap;
  }
}
.input-area {
  position: relative;
  .tags {
    position: absolute;
    max-width: 200px;
    overflow: hidden;
    z-index: 9;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    .tag-items {
      display: flex;
      flex-wrap: nowrap;
      ::v-deep .el-button {
        cursor: auto;
        color: #1763F7;
        border-color: #b9d0fd;
        background-color: #e8effe;
        margin-right: 0px;
        display: inline-block;
        min-width: 76px;
        max-width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        >span>i{
          position: absolute;
          cursor: pointer;
          width: 6px;
          height: 6px;
          top: 12px;
          right: 14px;
        }
      }
    }
  }
  &.has-select {
    ::v-deep .el-input__inner {
      text-indent: 210px;
    }
  }
}
.custom-tooltip-content {
  max-width: 1000px;
}
</style>
