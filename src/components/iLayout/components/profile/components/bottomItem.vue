<template>
  <div class="bottom-item">
    <div class="label">
      {{ label }}
    </div>
    <div class="value">
      <span class="text" v-show="!editable || !isEdit">{{ text }}</span>
      <span
        v-show="editable && !isEdit"
        class="btn-edit"
        @click="handleSetEdit(true)"
      >
        {{ language('修改', '修改') }}
      </span>

      <input
        type="text"
        v-show="editable && isEdit"
        v-model="dataValue"
        class="input-value"
      />
      <span v-show="editable && isEdit" class="btn-edit" @click="handleSave">
        {{ language('保存', '保存') }}
      </span>
      <span
        v-show="editable && isEdit"
        class="btn-edit"
        @click="handleSetEdit(false)"
      >
        {{ language('取消', '取消') }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bottomItem',
  props: {
    label: { type: String },
    text: { type: String },
    textKey: { type: String },
    editable: { type: Boolean, default: false }
  },
  inject: ['updateUser'],
  data() {
    return {
      isEdit: false,
      dataValue: ''
    }
  },
  created() {
    this.dataValue = this.text
  },
  watch: {
    text(val) {
      this.dataValue = val
    }
  },
  methods: {
    handleSetEdit(val) {
      console.log(this)
      this.isEdit = val
    },
    handleSave() {
      const data = {}
      data[this.textKey] = this.dataValue
      this.updateUser(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-item {
  display: flex;
  align-items: center;
  height: 40px;
  .label {
    width: 110px;
    font-size: 14px;
    color: #888888;
    margin-right: 32px;
  }
  .value {
    display: flex;
    align-items: center;
    font-weight: 400;
    flex-grow: 1;
    .text {
      color: #000000;
      font-size: 14px;
      min-width: 130px;
      display: block;
    }
  }
}
.btn-edit {
  color: #1763f7;
  font-size: 12px;
  margin-left: 30px;
  cursor: pointer;
}
.input-value {
  background: #f8f8fa;
  width: 170px;
  height: 31px;
  border-radius: 5px;
  border: solid 1px #f8f8fa;
  outline: none;
  padding: 6px 10px;
  font-size: 14px;
}
</style>
