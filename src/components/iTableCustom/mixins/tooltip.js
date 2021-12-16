export default {
  methods: {
    /******************气泡框 Start****************** */

    customMouseenter($event) {
      const ele = $event.toElement
      const clientWidth = ele.clientWidth
      const scrollWidth = ele.scrollWidth
      if (clientWidth < scrollWidth) {
        this.tooltipContent = ele.innerText || ele.textContent
        if (this.tooltipContent) {
          this.$nextTick(() => {
            const tooltip = this.$refs.customTableTooltip
            tooltip.referenceElm = ele

            if (tooltip.referenceElm === ele) {
              tooltip.handleFocus()
            }
          })
        }
      }
    },
    customMouseleave() {
      this.hideTooltip()
    },
    hideTooltip() {
      const tooltip = this.$refs.customTableTooltip
      if (tooltip) {
        this.tooltipContent = ''
        tooltip.handleBlur()
      }
    }
    /******************气泡框 end****************** */
  }
}
