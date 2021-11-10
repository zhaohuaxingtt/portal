export const baseRules = {
  dept: [
    { required: true, message: "必填", trigger: "blur" },
    { min: 1, max: 64, message: "最大长度 64 字符", trigger: "blur" },
  ],
  office: [
    { required: true, message: "必填", trigger: "blur" },
    { min: 1, max: 64, message: "最大长度 64 字符", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "必填", trigger: "blur" },
    {
      pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
      message: "请输入正确的电话",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "必填", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
};
