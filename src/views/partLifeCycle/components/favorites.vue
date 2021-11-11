<template>
  <div class="favorites">
    <div class="header">
      <div class="title">
        <div>
          <icon symbol class="bag_icon" name="iconshoucangjia"></icon>
          {{ language('LK_SHOUCANGJIA', '收藏夹') }}
        </div>
        <icon symbol class="bag_close" name="iconshoucangjiaguanbi" @click.native="$emit('closeFavorites')"></icon>
      </div>
      <div class="control" v-show="!isEdit">
        <div @click="addItemShow = true">
          <icon symbol class="bag_add" name="iconxinjianbiaoqian"></icon>
          {{ language('LK_XINJIANBIAOQIAN', '新建标签') }}
        </div>
        <div @click="edit">{{ language('LK_BIANJI', '编辑') }}</div>
      </div>
      <div class="control save" v-show="isEdit">
        <div></div>
        <div @click="save">{{ language('LK_BAOCUN', '保存') }}</div>
      </div>
    </div>
    <div class="content" v-loading="contentLoading">
      <ul v-for="(a, aIndex) in folderPartsList" :key="aIndex" v-show="Number(a.isDelete) === 0">
        <div class="ulTitle">
          <div>
            <icon symbol :name="aIndex === 0 ? 'iconwodeshoucangicon' : 'iconbiaoqianzuicon'"></icon>
            <span v-show="!isEdit || aIndex === 0">{{ a.folderName }}</span>
            <iInput v-show="isEdit && aIndex !== 0" v-model="a.folderName"></iInput>
          </div>
          <icon symbol name="iconbiaoqianzushouqi"
                @click.native="a.expand = !a.expand"
                v-show="!isEdit || aIndex === 0"
                :style="{transform: a.expand ? 'rotate(180deg)' : 'rotate(0)'}"
          ></icon>
          <icon @click.native="a.isDelete = 1" v-show="isEdit && aIndex !== 0" symbol name="icona-shanchulingjianbiaoqianzu"></icon>
        </div>
        <div class="liDiv" :style="{ maxHeight: a.expand ? '500px' : 0 }">
          <li v-for="(b, bIndex) in a.partsCollectVOList" :key="bIndex" v-show="Number(b.isDelete) === 0">
            <div>
              <p>{{ b.partsNum }}</p>
              <p>{{ b.partsName }}</p>
            </div>
            <icon @click.native="deleteItem(b)" v-show="!isEdit" symbol name="icona-shanchulingjianbiaoqianzu"></icon>
          </li>
        </div>
      </ul>
    </div>
    <addItem :value="addItemShow" @clearDialog="clearSaveDialog"></addItem>
  </div>
</template>

<script>
import { icon, iInput, iMessage } from 'rise'
import addItem from './addItem'
import { getFolderPartsList, save } from '@/api/partLifeCycle/partLifeCycleStar'

export default {
  name: 'favorites',
  components: {
    icon,
    iInput,
    addItem,
  },
  data() {
    return {
      folderPartsList: [],
      addItemShow: false,
      isEdit: false,
      contentLoading: false,
    }
  },
  mounted() {
    this.getFolderPartsList()
  },
  methods: {
    clearSaveDialog(isSave){
      this.addItemShow = false
      if(isSave){
        this.getFolderPartsList()
      }
    },
    deleteFile(item){
      item.isDelete = 1
    },
    edit(){
      this.isEdit = true
      this.folderPartsList.forEach(item => {
        item.expand = Number(item.isDefault) === 1 ? true : false
      })
    },
    save(){
      this.contentLoading = true
      save(this.folderPartsList).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.isEdit = false
          iMessage.success(result)
        } else {
          iMessage.error(result)
        }
        this.contentLoading = false
      }).catch(() => {
        this.contentLoading = false
      })
    },
    getFolderPartsList(){
      this.contentLoading = true
      getFolderPartsList().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.folderPartsList = res.data.map(item => {
            item.expand = Number(item.isDefault) === 1 ? true : false
            return item
          })
        } else {
          iMessage.error(result)
        }
        this.contentLoading = false
      }).catch(() => {
        this.contentLoading = false
      })
    },
    deleteItem(item){
      let _this = this
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        item.isDelete = 1
        item.isDefaultFolder = 1
        item.partsCollectId = item.collectId
        _this.$emit('deleteItem', item)
      }).catch(() => {

      });
    }
  }
}
</script>

<style scoped lang="scss">
// 滚动条样式
::-webkit-scrollbar {
  width: 3px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px transparent;
  background: #E2EAFC;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px transparent;
  border-radius: 5px;
  background: transparent;
}
.favorites {
  height: calc(100% - 60px);
  width: 350px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
  position: fixed;
  right: 0;
  top: 60px;

  .header {
    font-size: 14px;
    font-weight: bold;
    color: #97A6C4;

    .title {
      font-size: 20px;
      color: #000000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .bag_icon {
        height: 26px;
        width: 26px;
        margin-right: 10px;
      }

      .bag_close {
        height: 20px;
        width: 20px;
        cursor: pointer;
      }
    }

    .control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #DBE1EF;

      > div {
        cursor: pointer;
      }

      .bag_add {
        height: 14px;
        width: 14px;
        margin-right: 6px;
        cursor: pointer;
      }
      &.save{
        color: #1660F1
      }
    }
  }

  .content {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 68px);
    ul, li {
      padding: 0;
      margin: 0;
    }

    .icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    ul {
      border-bottom: 1px solid #DBE1EF;
      padding: 20px 0;

      .ulTitle {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > div .icon {
          margin-right: 6px;
        }
        ::v-deep .el-input{
          width: 65%;
        }
        .icon{
          transition: all 0.5s;
        }
      }

      .liDiv {
        transition: all 0.5s;
        max-height: 500px;
        overflow: hidden;

        li {
          font-size: 14px;
          font-weight: 400;
          color: #5F6F8F;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          margin-left: 40px;
        }
      }
    }
  }
}
</style>