// 返回前30年，后30年列表
export function getYearOptions() {
  const nowYear = new Date().getFullYear()
  const yearOptions = [nowYear]
  for (let i = 1; i <= 30; i++) {
    yearOptions.push(nowYear + i)
  }
  for (let i = 1; i <= 30; i++) {
    yearOptions.unshift(nowYear - i)
  }
  return yearOptions
}
