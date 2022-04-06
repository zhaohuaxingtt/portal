/* eslint-disable no-unused-vars */
/**
 * @description video 菜单 panel tab 配置
 * @author tonghan
 */
 import E from "wangeditor";
 const { $,PanelMenu, Panel  } = E;
 
 /**
  * 获取随机字符
  * @param prefix 前缀
  */
 export function getRandom(prefix = '') {
     return prefix + Math.random().toString().slice(2)
 }
 
 export function UploadPanel(editor, video) {
     const config = editor.config
 
     // panel 中需要用到的id
     const upTriggerId = getRandom('up-trigger-id')
     const upFileId = getRandom('up-file-id')
     const linkUrlId = getRandom('input-link-url')
     const linkUrlAltId = getRandom('input-link-url-alt')
     const linkUrlHrefId = getRandom('input-link-url-href')
     const linkBtnId = getRandom('btn-link')
     const linkBtn = getRandom('link-btn')
     const imgViewId = getRandom('img-view-id')
     const imgId = getRandom('img-id')
 
     // tabs 配置 -----------------------------------------
     const fileMultipleAttr = 'multiple="multiple"'
     const accepts = config.uploadImgAccept.map((item) => `image/${item}`).join(',')
 
     /**
      * 插入链接
      * @param iframe html标签
      */
     function insertVideo(video) {
 
         // video添加后的回调
         editor.config.onlineVideoCallback(video)
     }
 
     /**
      * 校验网络图片链接是否合法
      * @param linkImg 网络图片链接
      */
      function checkLinkImg(src, linkUrlAltText, linkUrlHrefText) {
         //查看开发者自定义配置的返回值
         const check = config.linkImgCheck(src)
         if (check === true) {
             return true
         } else if (typeof check === 'string') {
             //用户未能通过开发者的校验，开发者希望我们提示这一字符串
             config.customAlert(check, 'error')
         }
         return false
     }
 
     /**
      * 校验在线视频链接
      * @param video 在线视频链接
      */
     function checkOnlineVideo(video) {
         // 查看开发者自定义配置的返回值
         const check = editor.config.onlineVideoCheck(video)
         if (check === true) {
             return true
         }
         if (typeof check === 'string') {
             //用户未能通过开发者的校验，开发者希望我们提示这一字符串
             editor.config.customAlert(check, 'error')
         }
         return false
     }
 
      /**
       * 往编辑区域插入图片
       * @param src 图片地址
       */
     function insertImg(src, alt, href) {
         const editor = this.editor
         const config = editor.config
 
         const i18nPrefix = 'validate.'
         const t = (text, prefix = i18nPrefix) => {
             return editor.i18next.t(prefix + text)
         }
 
         // 设置图片alt
         const altText = alt ? `alt="${alt}" ` : ''
         const hrefText = href ? `data-href="${encodeURIComponent(href)}" ` : ''
         // 先插入图片，无论是否能成功
         editor.cmd.do(
             'insertHTML',
             `<img src="${src}" ${altText}${hrefText}style="max-width:100%;" contenteditable="false"/>`
         )
         // 执行回调函数
         config.linkImgCallback(src, alt, href)
 
         // 加载图片
         let img = document.createElement('img')
         img.onload = () => {
             img = null
         }
         img.onerror = () => {
             config.customAlert(
                 t('插入图片错误'),
                 'error',
                 `wangEditor: ${t('插入图片错误')}，${t('图片链接')} "${src}"，${t('下载链接失败')}`
             )
             img = null
         }
         img.onabort = () => (img = null)
         img.src = src
     }
 
     const linkImgInputs = [
         `<input
             id="${linkUrlId}"
             type="text"
             class="block"
             placeholder="图片地址"/>`,
     ]
 
     if (config.showLinkImgAlt) {
         linkImgInputs.push(`
         <input
             id="${linkUrlAltId}"
             type="text"
             class="block"
             placeholder="图片文字说明"/>`)
     }
 
     if (config.showLinkImgHref) {
         linkImgInputs.push(`
         <input
             id="${linkUrlHrefId}"
             type="text"
             class="block"
             placeholder="跳转链接"/>`)
     }
 
     let imgList = [];
 
     let dropId;
     let placeId;
 
 
     const uploadEvents = [
         // 触发选择图片
         {
             selector: '#' + upTriggerId,
             type: 'click',
             fn: () => {
                 const uploadImgFromMedia = config.uploadImgFromMedia
                 if (uploadImgFromMedia && typeof uploadImgFromMedia === 'function') {
                     uploadImgFromMedia()
                     return true
                 }
                 const $file = $('#' + upFileId)
                 const fileElem = $file.elems[0]
                 if (fileElem) {     
                     fileElem.click()
                 } else {
                     // 返回 true 可关闭 panel
                     return true
                 }
             },
         },
         // 选择图片完毕
         {
             selector: '#' + upFileId,
             type: 'change',
             fn: () => {
                 const $file = $('#' + upFileId)
                 const fileElem = $file.elems[0]
                 if (!fileElem) {
                     // 返回 true 可关闭 panel
                     return true
                 }
                 // 获取选中的 file 对象列表
             
 
                 if (fileElem.files?.length) {
                     config.customUploadImg(fileElem.files, (urls) => {
                         urls.forEach(url => {
                             const dragId = getRandom('drag-id');
                             imgList.push(`<img src="${url}" contenteditable="false"/>`)
                             let htmlStr = `<div id="${dragId}" draggable="true" style="width: 33.3333%;display: flex;align-items: center;justify-content: center;cursor: grab;margin-top: 10px;" class="img-item"><img src="${url}" style="border-radius:3px;width:80px;height:80px" contenteditable="false"/></div>`
                             $(htmlStr).insertBefore(`#${upTriggerId}`);
                             $(`#${dragId}`).on('dragstart', (evt) => {
                                 dropId = evt.path[1].id;
                             });
                             $(`#${dragId}`).on('dragenter', (evt) => {
                                 placeId = evt.path[1].id;
                                 evt.preventDefault();
                             });
                             $(`#${dragId}`).on('drop', (evt) => {
                                 evt.preventDefault();
                             });
                             $(`#${dragId}`).on('dragend', () => {
                                 if (placeId !== dropId) {
                                     let placeIndex;
                                     let dropIndex;
                                     $('.img-item').elems.forEach((element, index) => {
                                         if (element.id == placeId) {
                                             placeIndex = index;
                                         }
                                         if (element.id == dropId) {
                                             dropIndex = index;
                                         }
                                     })
                                     let newHtml = imgList[dropIndex];
                                     let newImgList = [...imgList];
                                     newImgList.splice(dropIndex, 1);
                                     newImgList.splice(placeIndex, 0, newHtml)
                                     imgList = [...newImgList];
                                     if ($(`#${placeId}`).selector.split('-')[0] === '#drag') {
                                         if (dropIndex > placeIndex) {
                                             $(`#${dragId}`).insertBefore(`#${placeId}`)
                                         } else {
                                             $(`#${dragId}`).insertAfter(`#${placeId}`)
                                         }
                                     }
                                 }
                             });
                             $(`#${dragId}`).on('dragover', (evt) => {
                                 evt.preventDefault();
                             });
                         })
                         // 判断用于打开文件的input，有没有值，如果有就清空，以防上传同一张图片时，不会触发change事件
                         // input的功能只是单单为了打开文件而已，获取到需要的文件参数，当文件数据获取到后，可以清空。
                         if (fileElem) {
                             fileElem.value = ''
                         }
                     })
                     // uploadImg.uploadImg(fileList)
                     // imgList.push(fileList)
                 }
                 // 返回 true 可关闭 panel
                 // return true
             },
         },
         {
             selector: '#' + linkBtn,
             type: 'click',
             fn: () => {
                 imgList.forEach(e => {
                     editor.cmd.do('insertHTML', e);
                 })
                 return true
             },
             bindEnter: true,
         },
     ]
 
     // tabs配置
     // const fileMultipleAttr = config.uploadVideoMaxLength === 1 ? '' : 'multiple="multiple"'
     const tabsConf = [
         {
             // tab 的标题
             title: '上传图片',
             tpl: `<div>
                         <div style="display: flex;flex-direction: row;flex-wrap: wrap;" id="${imgViewId}">
                             <div style="position:relative;width: 33.3333%;display: flex;align-items: center;justify-content: center;margin-top: 10px;" id="${upTriggerId}">
                                 <div style="width: 80px;height: 80px;border: 1px dotted #ccc;border-radius: 3px;color: #ccc;display: flex;align-items: center;justify-content: center;font-size: 20px;">+</div>
                                 <input style="display:block;width:0px;height:0px" id="${upFileId}" type="file" ${fileMultipleAttr} accept="${accepts}"/>
                             </div>
                         </div>
                     </td>
                     <div class="w-e-button-container">
                         <button id="${linkBtn}" type="button" class="right">
                             提交
                         </button>
                     </div>
                 </div>`,
             events: uploadEvents
         },
         {
             // tab 的标题
             title: '网络图片',
             // 模板
             tpl: `<div>
                     ${linkImgInputs.join('')}
                      <div class="w-e-button-container">
                          <button type="button" id="${linkBtnId}" class="right">
                              提交
                          </button>
                      </div>
                  </div>`,
             events: [
                 {
                     selector: '#' + linkBtnId,
                     type: 'click',
                     fn: () => {
                         const $linkUrl = $('#' + linkUrlId)
                         const url = $linkUrl.val().trim()
 
                         //如果url为空则直接返回
                         if (!url) return
 
                         let linkUrlAltText
                         if (config.showLinkImgAlt) {
                             linkUrlAltText = $('#' + linkUrlAltId)
                                 .val()
                                 .trim()
                         }
                         let linkUrlHrefText
                         if (config.showLinkImgHref) {
                             linkUrlHrefText = $('#' + linkUrlHrefId)
                                 .val()
                                 .trim()
                         }
                         //如果不能通过校验也直接返回
                          if (!checkLinkImg(url, linkUrlAltText, linkUrlHrefText)) return
                         //插入图片url
                          insertImg(url, linkUrlAltText, linkUrlHrefText)
                         // 返回 true 表示函数执行结束之后关闭 panel
                         return true
                     },
                     bindEnter: true,
                 },
             ],
         }, // tab end
     ]
 
 
     const conf = {
         width: 300,
         height: 0,
 
         // panel 中可包含多个 tab
         tabs: [], // tabs end
     }
     conf.tabs.push(tabsConf[0], tabsConf[1])
 
     return conf
 }
 
 export const createUploadImage = function(editor) {    
     const Image = editor.menus.constructorList.image;
     Image.prototype.createPanel = function() {
         const conf = UploadPanel(this.editor, '');
         const panel = new Panel(this, conf);
         this.setPanel(panel)
         panel.create();
     };
 }