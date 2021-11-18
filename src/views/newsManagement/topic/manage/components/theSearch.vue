<template>
  <iSearch :icon="true">
    <el-form>
      <!--第一行-->
      <el-row>
        <el-form-item :label="language('NEWS_ZHUANTIMINGCHENG', '专题名称')">
          <iInput
              :placeholder="language('LK_QINGSHURU', '请输入')"
              v-model="form.name"
          ></iInput>
        </el-form-item>
        <el-form-item :label="language('NEWS_ZHUANTIFENLEI', '专题分类')">
          <iSelect
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.category"
              clearable
          >
            <el-option
                v-for="item of userNewsClassify"
                :key="item.code"
                :value="item.code"
                :label="item.name"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('NEWS_ZHUANGTAI', '状态')">
          <iSelect
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.status"
              clearable
          >
            <el-option
                v-for="item of newsStatus"
                :key="item.value"
                :value="item.value"
                :label="item.label"
            ></el-option>
          </iSelect>
        </el-form-item>
        <iDateRangePicker
            class="LastSearchOption"
            :startDateProps="form.startPublishDate"
            :endDateProps="form.endPublishDate"
            @change-start="changeStart"
            @change-end="changeEnd"
            ref="iDateRangePicker"
            :label="language('NEWS_FABUQIZHIRIQI', '发布起止日期')"
        />
      </el-row>
    </el-form>
    <template v-slot:button>
      <iButton @click="$emit('searchTableList')">{{ language('LK_INQUIRE', '查询') }}</iButton>
      <iButton @click="handleSearchReset">{{
        language('LK_ZHONGZHI', '重置')
        }}
      </iButton>
    </template>
  </iSearch>
</template>

<script>
import {iButton, iInput, iSelect} from "rise";
import {newsClassify, newsStatus, newsTypes} from "./data";
import iDateRangePicker from "@/components/iDateRangePicker/index.vue";
import iSearch from "@/components/iSearch/index.vue";
import dayjs from "@/utils/dayjs.js";

export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iButton,
    iDateRangePicker,
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
    userNewsClassify: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      newsClassify,
      newsTypes,
      newsStatus,
      isApprovalOption: [
        {
          label: this.language('TERMS_SHI', '是'),
          value: 1,
        },
        {
          label: this.language('TERMS_FOU', '否'),
          value: 0,
        },
      ],
    };
  },
  mounted() {
    // 绑定enter事件
    this.enterKeyup();
  },
  destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed();
  },
  methods: {
    handleSearchReset() {
      this.form = {};
      setTimeout(() => {
        this.$refs.iDateRangePicker.initDate();
      }, 4);
      this.$emit("handleSearchReset");
    },
    changeStart(e) {
      this.form.startPublishDate = e;
    },
    changeEnd(e) {
      this.form.endPublishDate = e;
      if (e) {
        this.endWeek = dayjs(e).week();
      } else {
        this.endWeek = dayjs(dayjs().year()).isoWeeksInYear();
      }
    },
    enterKey(event) {
      const code = event.keyCode
          ? event.keyCode
          : event.which
              ? event.which
              : event.charCode;
      if (code == 13) {
        this.$emit('searchTableList');
      }
    },
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .iSearch-content {
  justify-content: space-between;

  .operation {
    align-self: auto;
  }
}
</style>
