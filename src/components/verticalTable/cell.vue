<script>
export default {
  name: 'verticalTableCell',
  functional: true,
  props: {
    scope: {
      type: Object,
      required: true
    },
    column: {
      type: Object
    },
    customRender: {
      type: Function
    },
    extraData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  render(h, context) {
    const { props } = context

    const { scope, customRender, column, extraData } = props

    const { prop } = column
    return (
      <div>
        {customRender
          ? customRender(h, scope, column, extraData)
          : scope.row[prop]}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.link-text,
.open-link-text {
  color: $color-blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
