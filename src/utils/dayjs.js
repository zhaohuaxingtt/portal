
import dayjs from 'dayjs';

let weekOfYear = require('dayjs/plugin/weekOfYear')
let isoWeek = require('dayjs/plugin/isoWeek')
let isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear')
let isLeapYear = require('dayjs/plugin/isLeapYear')
let dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

export default dayjs;