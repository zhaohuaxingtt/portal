<template>
  <div class="material-dialog">
    <iDialog :title="'未分配完材料组'" :visible.sync="isShow" width="70%">
      <el-table :data="materialUndistributed" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="车型/品牌">
                <span
                  :class="
                    index === props.row.carType.length - 1
                      ? ''
                      : 'margin-right15'
                  "
                  v-for="(item, index) in props.row.carType"
                  :key="index"
                >
                  {{ item.type }} / {{ item.brand }}
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="材料组名称" prop="value"></el-table-column>
      </el-table>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="isShow = false">确定</el-button>
      </span> -->
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iFormGroup, iFormItem, iLabel, iText } from 'rise'
export default {
  components: { iDialog, iFormGroup, iFormItem, iLabel, iText },
  props: {
    show: [Boolean]
  },
  computed: {
    materialUndistributed() {
      return this.$store.state.subPosition.materialUndistributed
    },
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  }
}
</script>
