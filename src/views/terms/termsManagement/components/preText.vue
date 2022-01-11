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
    // console.log('this.$route.query.termsText', this.$route.query.termsText)
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
    height: 2rem
  }
  ::v-deep table th {
    border: 1px solid #ccc;
    background-color: rgb(241, 241, 241);
    height: 2rem
  }
}
</style>