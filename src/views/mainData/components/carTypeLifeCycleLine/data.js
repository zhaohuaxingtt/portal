// pepBf: '', //PEP节点-BF TBT
// pepKf: '', //PEP节点-KF TBT
// pepLf: '', //PEP节点-LF TBT
// pepMe: '', //PEP节点-ME TBT
// pepOs: '', //pepOs
// pepPd: '', //PEP节点-PD TBT
// pepPf: '', //PEP节点-PF TBT
// pepPlf: '', //PEP节点-PLF TBT
// pepPvs: '', //PEP节点-PVS TBT
// pepSop: '', //PEP节点-SOP TBT
// pepVff: '' //PEP节点-VFF TBT


export const CarTypeLifeCycleMonths = [{
        title: "PM",
        status: false,
        leftMonth: "",
        rightMonth: "48",
        showIcon: true,
        showLeftHLine:false,
        date:"",
        formKey:"Key"
    },
    {
        title: "PP",
        status: false,
        leftMonth: "46",
        rightMonth: "45",
        showIcon: true,
        showLeftHLine:true,
        date:"2021-09-25",
        formKey:"Key"
    },
    {
        title: "PD",
        status: false,
        leftMonth: "43",
        rightMonth: "42",
        showIcon: true,
        showLeftHLine:true,
        formKey:"pepPd"
    },
    {
        title: "PF",
        status: false,
        leftMonth: "37",
        rightMonth: "36",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepPf"
    },
    {
        title: "KF",
        status: false,
        leftMonth: "33",
        rightMonth: "32",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepKf"
    },
    {
        title: "PLF",
        status: false,
        leftMonth: "27",
        rightMonth: "26",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepPlf"
    },
    {
        title: "BF",
        status: false,
        leftMonth: "20",
        rightMonth: "19",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepBf"
    },
    {
        title: "LF",
        status: false,
        leftMonth: "14",
        rightMonth: "",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepLf"
    },
    {
        title: "VFF",
        status: false,
        leftMonth: "10",
        rightMonth: "",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepVff"
    },
    {
        title: "PVS",
        status: false,
        leftMonth: "8",
        rightMonth: "",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepPvs"
    },
    {
        title: "0S",
        status: false,
        leftMonth: "3",
        rightMonth: "2",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepOs"
    },
    {
        title: "SOP",
        status: false,
        leftMonth: "0",
        rightMonth: "+1",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepSop"
    },
    {
        title: "ME",
        status: false,
        leftMonth: "+3",
        rightMonth: "",
        showIcon: true,
        showLeftHLine:true,
        date:"",
        formKey:"pepMe"
    },
]

//默认
export function CarTypeLifeCycleDefaultMonth(){
    return {
        title: "",
        status: false,
        leftMonth: "",
        rightMonth: "",
        showIcon: false,
        showLeftHLine:true,
        formKey:"Key" //后台对应Key
    }
}