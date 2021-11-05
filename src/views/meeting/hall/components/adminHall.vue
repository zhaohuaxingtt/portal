<template>
  <div>
    <home :menuType="menuType" />
  </div>
</template>
<script>
import home from '@/views/meeting/home'
export default {
  components: {
    home
  },
  data() {
    return {
      menuType: 'cf'
    }
  }
}
</script>
