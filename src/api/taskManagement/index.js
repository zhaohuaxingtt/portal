import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER)

// 供应商任务状态下拉
export function listTaskStatus(data) {
    return requst({
        url: `/web/register/task/listTaskStatus`,
        method: "POST",
        data,
    });
}

// 供应商任务类型下拉
export function listTaskType(data) {
    return requst({
        url: `/web/register/task/listTaskType`,
        method: "POST",
        data,
    });
}

// 供应商任务列表
export function taskPage(data) {
    return requst({
        url: `/web/register/task/taskPage`,
        method: "POST",
        data,
    });
}

// 供应商任务转派
export function taskTransfer(data) {
    return requst({
        url: `/web/register/task/taskTransfer`,
        method: "POST",
        data,
    });
}
