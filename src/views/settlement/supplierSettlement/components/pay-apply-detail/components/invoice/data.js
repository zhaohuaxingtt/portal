export const searchForm = {};

export const tableTitle = [
  { props: 'invoiceType', name: '发票类型', key: '发票类型' },
  { props: 'invoiceCode', name: '发票代码', key: '发票代码' },
  { props: 'invoiceNum', name: '发票号码', key: '发票号码' },
  { props: 'invoiceDate', name: '开票日期', key: '开票日期' },
  { props: 'untaxedAmount', name: '未税金额', key: '未税金额' },
  { props: 'itemTaxAmount', name: '税额', key: '税额' },
  { props: 'priceTaxTotalFigure', name: '价税合计', key: '价税合计' },
  { props: 'annex', name: '附件', key: '附件' },
  { props: 'invoiceResults', name: '发票校验结果', key: '发票校验结果' }
];

export const options = [
  { value: 'vat_special_invoice', label: '増值税专用发票' },
  { value: 'vat_common_invoice', label: '増值税普通发票' },
  { value: 'vat_electronic_invoice', label: '增值税电子发票' },
  { value: 'vat_electronic_special_invoice', label: '增值税电子专用发票' },
  { value: 'vat_electronic_general_invoice', label: '通用电子发票' },
  { value: 'vat_electronic_toll_common_invoice', label: '增值税电子普通发票（通行费）' },
  { value: 'vat_electronic_common_invoice', label: '增值税电子普通发票' },
  { value: 'vat_electronic_full_digital_invoice', label: '全电发票（增值税专用发票）' }
];
