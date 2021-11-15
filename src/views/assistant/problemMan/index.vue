<template>
  <div>{{ text }}</div>
</template>

<script>
import store from '@/store'
export default {
	data() {
		return {
			text: '问题管理'
		}
	},
	mounted() {
		console.log(store.state, "store.state")
	},
}
</script>