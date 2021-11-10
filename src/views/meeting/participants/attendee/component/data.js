// import { ElButton } from 'element-ui'
/* export const tableColumns = [
  {
    prop: "id",
    label: "序号",
    i18n: "序号",
    width: 68,
    tooltip: false,
  },
  {
    prop: "groupName",
    label: "组名",
    i18n: "组名",
    align: "left",
    width: 240,
    tooltip: false,
  },
  {
    prop: "attendeeName",
    label: "与会人",
    i18n: "与会人",
    align: "left",
    tooltip: false,
  },
  {
    label: "操作",
    emit: 'editAttendee',
    customRender: (h, scope) => {
      return (
        <span>
            <el-button icon="el-icon-edit-outline" type="text">
              修改&nbsp;
            </el-button>
          ｜
          <el-button icon="el-icon-delete" type="text">
            删除
          </el-button>
        </span>
      );
    },
  },
]; */

/* export const receiverTableColumns = [
  {
    prop: "id",
    label: "序号",
    i18n: "序号",
    width: 68,
    tooltip: false,
  },
  {
    prop: "groupName",
    label: "组名",
    i18n: "组名",
    align: "left",
    tooltip: false,
  },
  {
    label: "操作",
    width: 280,
    customRender: (h, scope) => {
      return (
        <span>
          <el-button icon="el-icon-edit-outline" type="text">
            修改
          </el-button>
          ｜
          <el-button icon="el-icon-delete" type="text">
            删除
          </el-button>
        </span>
      );
    },
  },
]; */

export const baseRules = {
  groupName: [
    { required: true, message: "必填", trigger: "blur" },
    { min: 1, max: 64, message: "最大长度 64 字符", trigger: "blur" },
  ],
  attendeeName: [
    { required: true, message: "必填", trigger: "blur" },
    { min: 1, max: 1024, message: "最大长度 1024 字符", trigger: "blur" },
  ],
  meetingType: [{ required: true, message: "必选", trigger: "blur" }],
};
