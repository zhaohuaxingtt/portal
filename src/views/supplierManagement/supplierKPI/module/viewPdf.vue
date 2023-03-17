<template>
    <iCard class="page-preview">
      <iframe :src="src" title="预览" width="100%" height="100%" class="preview-iframe"/>
    </iCard>
  </template>
  
  <script>
  import { iCard } from "rise";
  export default {
    components: {
      iCard
    },
  
    props: {
      src: {
        type: String,
        default: ''
      }
    },
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