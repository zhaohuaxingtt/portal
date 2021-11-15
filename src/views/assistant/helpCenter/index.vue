<template>
  <div>{{ text }}</div>
</template>

<script>
import store from '@/store'
export default {
	data() {
		return {
			text: '用户帮助中心'
		}
	},
	mounted() {
		console.log(store.state, "store.state")
	},
}
</script>