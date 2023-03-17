<template>
    <iCard class="page-preview">
        <div style="text-align:right">
            <iButton  @click="submit">下一步</iButton>
        </div>
      <iframe :src="src" title="预览" width="100%" height="100%" class="preview-iframe"/>
    </iCard>
  </template>
  
  <script>
  import { iCard ,iButton} from "rise";
  export default {
    components: {
        iButton,
      iCard
    },
  
    props: {
      src: {
        type: String,
        default: ''
      }
    },
    methods:{
        submit() {
      this.$emit('submit0')
    },
    }
  }
  </script>
  
  <style lang='scss' scoped>
  .page-preview{
    height: 1000px;
    margin-top: 20px;
  
    ::v-deep div{
      height: 100% !important;
    }
  
    .preview-iframe {
      height: 100%;
      border: 0;
    }
  }
  
  </style>