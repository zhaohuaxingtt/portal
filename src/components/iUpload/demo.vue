<template>
  <iPage>
    <iFormGroup :model="demoForm" ref="demoForm">
      <iFormItem>
        <iLabel :label="'文件上传'" slot="label"></iLabel>
        <iUpload :fileIds="fileIds" :fileTypes="acceptTypes" :extraData="extraData" @callback="handelCallback" />
      </iFormItem>
      <iFormItem>
        <iLabel :label="'文件下载'" slot="label"></iLabel>
        <iDownload :fileIds="fileIds" />
      </iFormItem>
    </iFormGroup>
  </iPage>
</template>

<script>
import { iFormGroup, iFormItem, iLabel, iPage, iUpload, iDownload } from 'rise'
export default {
  components: { iPage, iFormGroup, iFormItem, iLabel, iUpload, iDownload },
  data() {
    return {
      acceptTypes: ['jpg', 'jpeg', 'gif', 'png', 'bmp'],
      extraData: { applicationName: 'rise-dev', type: '1', businessId: '01', isTemp: 0 },
      fileIds: ['1406890012558303234', '1406890292712644609']
    }
  },
  methods: {
    handelCallback(fileList) {
      console.log('callback', fileList)
    }
  }
}
</script>
