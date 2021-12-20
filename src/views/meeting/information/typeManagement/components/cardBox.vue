<template>
  <div class="card-content">
    <iCard class="card-border" height="37.5rem">
      <div class="name">{{ item.name }}</div>
      <div type="textarea" class="content">
        {{ item.meetingInfoDesc }}
      </div>
      <div class="image">
        <img
          :src="item.coverImage"
          ref="img"
          class="avatar"
          alt=""
          @error="handleError"
          @load="handleLoad"
        />
      </div>
      <div class="table">
        <div v-if="item.word == null || item.word == 0" class="table noData">
          {{ $t('MT_ZANWUSHUJU') }}
        </div>
        <div
          v-else
          :class="{ column: index % 2 == 0, off: index % 2 != 0 }"
          v-for="(i, index) in item.word"
          :key="index"
          @click="downLoadFileInfo(i)"
        >
          {{ i.name }}
        </div>
      </div>
      <iButton class="button" @click="$emit('editMeetingType', item)"
        >{{$t('MT_XIUGAIHUIYILEIXINGXINXI')}}</iButton
      >
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import { download } from '@/utils/downloadUtil'
import { getFileByIds } from '@/api/file/filedownload'
export default {
  components: { iCard, iButton },
  computed: {},
  props: {
    item: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    // 附件下载
    downLoadFileInfo(i) {
      getFileByIds([i.id]).then((data) => {
        const { name } = data.data[0]
        download({
          // url: MOCK_FILE_URL + i.id,
          // filename: name,
          fileIds: i.id,
          filename: name,
          callback: (e) => {
            if (!e) {
              iMessage.error('下载失败')
            }
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.card-content {
  margin-left: 80px;
  display: flex;
  flex-wrap: nowrap;
  // overflow-x: auto;
  // width: 93.75rem;
  // background-color: gold;
  /*  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between; */
}
.content {
  height: 4rem;
}
.card-border {
  border: 1px solid #1660f1;
  border-radius: 10px;
  width: 28.75rem;
  margin-right: 44px;
}
.table {
  height: 9.375rem;
  overflow: auto;
  .column {
    cursor: pointer;
    font-size: 14px;
    padding: 15px 0;
    width: 100%;
    height: 3.125rem;
    padding-left: 15px;
  }
  .off {
    cursor: pointer;
    /* background-color: #f3f7ff; */
    font-size: 14px;
    padding: 15px 0;
    width: 100%;
    height: 3.125rem;
    padding-left: 15px;
  }
}
.noData {
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.name {
  width: 22.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  font-size: 36px;
  line-height: 50px;
  color: #1660f1;
}
.image {
  width: 100%;
  background-image: url('../../../../../assets/images/imgBg.svg');
  background-repeat: no-repeat;
  background-color: #eee;
  background-position: center;
  margin: 10px 0;
  .avatar {
    width: 100%;
    height: 14rem;
    display: block;
    object-fit: scale-down;
  }
}
.button {
  margin: 0 auto;
  margin-top: 10px;
  display: block;
}
</style>
