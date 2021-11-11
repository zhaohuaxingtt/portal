export const baseRules = {
  name: [
    { required: true, message: "请输入资料类型名称！", trigger: "blur" },
    { min: 1, max: 64, message: "最大长度 64 字符", trigger: "blur" },
  ],
  meetingTypes: [
    { required: true, message: "请选择所属会议！", trigger: "blur" },
  ],
};

export const MeetingTypeRules = {
  meetingInfoDesc: [
    { min: 1, max: 64, message: "最大长度 64 字符", trigger: "blur" },
  ],
};
