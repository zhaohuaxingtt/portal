export function datePickOptions({ time, when, params }) {
  if (when === 'start') {
    return time.getTime() > new Date(params).getTime() - 24 * 60 * 60 * 1000
  } else if (when === 'end') {
    return time.getTime() < new Date(params).getTime()
  }
}
