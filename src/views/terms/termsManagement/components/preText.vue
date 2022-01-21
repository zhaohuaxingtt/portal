<template>
  <iPage>
    <div class="vHtml" v-html="this.$route.query.termsText"></div>
  </iPage>
</template>

<script>
import { iPage } from 'rise'

export default {
  components: {
    iPage
  },
  data() {
    return {}
  },
  mounted() {
    console.log('this.$route.query.termsText', this.$route.query.termsText)
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
// ::v-deep .table {
//   table {
//     border-top: 1px solid #ccc;
//     border-left: 1px solid #ccc;
//   }
//   table td,
//   table th {
//     border-bottom: 1px solid #ccc;
//     border-right: 1px solid #ccc;
//     padding: 3px 5px;
//   }
//   table th {
//     border-bottom: 2px solid #ccc;
//     text-align: center;
//   }
// }
.vHtml {
  ::v-deep table {
    border: 1px solid #ccc;
  }
  ::v-deep table td {
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    height: 2rem;
  }
  ::v-deep table th {
    border: 1px solid #ccc;
    background-color: rgb(241, 241, 241);
    height: 2rem;
  }
  ::v-deep ul li {
    list-style: disc;
    line-height: 1.8;
    margin: 10px 0 10px 20px;
  }
  ::v-deep ol li {
    list-style: decimal;
    line-height: 1.8;
    margin: 10px 0 10px 20px;
  }
  ::v-deep .w-e-todo li {
    list-style: none !important;
    line-height: 1.8;
    margin: 10px 0;
  }
  ::v-deep blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 2;
    font-size: 100%;
    background-color: #f1f1f1;
  }
}
// ::v-deep .w-e-todo ul li {
//   list-style: none !important;
//   // font-size: 0 !important;
// }
</style>