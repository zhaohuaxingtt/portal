/*
 * @Author: qyu
 * @Date: 2021-08-12 16:08:46
 * @LastEditTime: 2021-08-13 09:39:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\i18n\index.js
 */

import zh from './zh'
import en from './en'
import getSingleMessages from './single'
const singleMessages = getSingleMessages()
//
// eslint-disable-next-line no-undef
i18n.mergeLocaleMessage('zh', { ...zh, ...singleMessages.zh })
// eslint-disable-next-line no-undef
i18n.mergeLocaleMessage('en', { ...en, ...singleMessages.en })
