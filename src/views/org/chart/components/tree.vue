<template>
  <iCard>
    <div class="org-tree">
      <div id="chart-container"></div>
    </div>
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import './jquery.orgchart.js'
import $ from 'jquery'
import './org.scss'

export default {
  name: 'Tree',
  components: { iCard },
  props: {
    orgData: {
      type: Object,
      require: true
    },
    searchItem: {
      type: Object
    }
  },
  watch: {
    orgData() {
      this.generateChart()
    }
  },
  data() {
    return {}
  },
  created() {
    this.$nextTick(() => {
      this.generateChart()
    })
  },
  methods: {
    generateChart() {
      $('#chart-container').empty()
      $('#chart-container').orgchart({
        data: this.orgData,
        nodeContent: 'title',
        pan: true,
        zoom: false,
        draggable: true,
        nodeElement: 'nodeElement',
        handleNodeClick: this.handleNodeClick
      })
    },
    handleNodeClick(nodeData) {
      const id = nodeData.id
      document.querySelectorAll('.org-node-item').forEach(element => {
        element.classList.remove('active')
      })
      document.querySelector('#org-node-item--' + id).classList.add('active')
      this.$emit('get-user', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-tree {
  width: 100%;
  height: 600px;
  overflow: auto;
}
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
