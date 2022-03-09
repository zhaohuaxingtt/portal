/*
 * @Author: YoHo
 * @Date: 2021-12-24 15:14:50
 * @LastEditTime: 2022-03-03 17:49:14
 * @LastEditors: YoHo
 * @Description: 
 */
export const tableTitle = [
  {
    props: 'cusomerName', name: '客户名称', key: 'KEHUMINGCHEN', maxlength: 200, width: 200,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }],
  },
  {
    props: 'mainProducts', name: '主供产品', key: 'ZHUGONGCHANPIN', maxlength: 200,
    required: true,
    rule: [{ required: true, message: '请输入', trigger: 'blur' }],
  },
  { props: 'cooperativeDate', name: '合作年限', key: 'HEZUONIANXIAN', maxlength: 40 },
  { props: 'deliveryDate', name: '供货年限', key: 'GONGHUONIANXIAN', maxlength: 40 },
  { props: 'deliquty', name: '供货量', key: 'GONGHUOLIANG', maxlength: 20 },
  {
    props: 'amountOfSupply', name: '供货金额(元)', key: 'GONGHUOJINEYUAN', maxlength: 20,
    required: true,
    rule: [
      { required: true, message: '请输入', trigger: 'blur' },
      {
        pattern: /^[0-9]\d*\.\d{2}$/,
        message: '请输入1-100的整数',
        trigger: 'blur',
      }],
  },
  {
    props: 'totalSalesPro',
    name: '占总销售额比例（%）',
    width: 150,
    key: 'ZHANZONGXIAOSHOUBILI',
    required: true,
    rule: [
      { required: true, message: '请输入', trigger: 'blur' },
      {
        pattern: /^([1-9][0-9]{0,1}|100)$/,
        message: '请输入1-100的整数',
        trigger: 'blur',
      }],
    maxlength: 3,
  },
  {
    props: 'paymentDays', name: '账期（天）',
    width: 180,
    key: 'LK_ZHANGQITIAN',
    maxlength: 200,
    rule: [
      {
        pattern: /^[1-9]\d*$/,
        message: '请输入正整数',
        trigger: 'blur',
      }],
  },
  {
    props: 'cashNotesPro',
    name: '现金票据比例',
    key: 'XIANJINGPIAOJUJINGLI',
    maxlength: 20,
    rule: [
      {
        pattern: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
        message: '请输入正确的格式',
        trigger: 'blur',
      }],
  },
];
