<template>
  <ul class="attachs">
    <li v-for="(item, index) in attachData" :key="index">
      <span v-if="icon" class="icon">
        <icon symbol class="icon" name="iconshenpi-fujian" />
      </span>
      <a :href="item.path" class="open-link-text" target="_blank">
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'Attachment',
  components: { Icon },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    icon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    attachData() {
      return this.data || []
    }
  },
  methods: {
    openLink(item) {
      window.open(item.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.open-link-text {
  color: $color-blue;
  text-decoration: underline;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
}
.icon {
  font-size: 16px;
  margin-right: 5px;
}
.attachs {
  width: calc(100% - 50px);
  li {
    width: 100%;
    display: flex;
    align-items: center;

    a {
      font-size: 1rem;
    }
  }
}
</style>
