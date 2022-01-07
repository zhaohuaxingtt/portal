export default [
  {
    path: "/electronicSignature",
    name: "electronicSignature",
    meta: {
      title: "电子签章",
      activeMenu: ['RISE_WORKBENCH', '/electronicSignature']
    },
    component: () => import("@/views/electronicsignature"),
    redirect: "/electronicSignature/productionpurchase/0",
    children:[
      {
        path: "productionpurchase/:type",
        name: "productionpurchase",
        meta: {
          title: "电子签章",
          activeMenu: ['RISE_WORKBENCH', '/electronicSignature']
        },
        props: true,
        component: () => import("@/views/electronicsignature/components/SignatureHome"),
      }
    ]
  },
]