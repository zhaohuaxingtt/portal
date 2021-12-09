<template>
  <div class="font18 font-weight">
    {{ form.itemName }}
    <span class="business-id">{{ form.businessId }}-</span>
    <span class="item-event">{{ form.itemEvent }}</span>
    ({{ form.stateMsg }})
  </div>
</template>

<script>
export default {
  name: 'detailTitle',
  props: {
    form: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-event {
  margin-right: 20px;
}
.business-id {
  margin-left: 20px;
}
</style>
