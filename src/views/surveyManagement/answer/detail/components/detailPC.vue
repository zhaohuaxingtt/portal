<template>
  <iPage id="routerPage">
    <!-- <div class="header--img">
      <div class="header--img--box">
        <div class="qrcode" ref="qrCodeUrl"></div>
        <div>扫描二维码</div>
        <div>手机填写问卷</div>
      </div>
    </div> -->
    <div class="header--item">
      <p class="name">{{ previewData.name }}</p>
      <p class="surveyDescription">{{ previewData.surveyDescription }}</p>
    </div>
    <div class="topic--body" v-for="(item, index) in questions" :key="index">
      <!-- 1-单选题 -->
      <div v-if="item.type == 1" class="radio__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name }}
          {{ item.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
        </div>
        <el-radio-group
          class="option"
          v-model="item.answer"
          v-for="(i, index) in item.options"
          :key="index"
          @change="hanldeRadioChange(item)"
        >
          <el-radio :label="i.id + '-' + i.name" class="radioItem">{{
            String.fromCharCode('A'.charCodeAt(0) + index) + '. ' + i.name
          }}</el-radio>
        </el-radio-group>
      </div>
      <!-- 2-多选题 -->
      <div v-if="item.type == 2" class="radio__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">*</span>
          {{ item.code }}. {{ item.name }}
          {{ item.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
          <span
            v-if="item.multipleRule"
            style="margin-left: 10px; color: #999999"
          >
            <span v-if="JSON.parse(item.multipleRule).least"
              >{{ $t('QN_ZUISHAOXUANZE')
              }}{{ JSON.parse(item.multipleRule).least
              }}{{ $t('QN_XIANG') }}</span
            ><span v-if="JSON.parse(item.multipleRule).most"
              >{{ $t('QN_ZUIDUOXUANZE') }}{{ JSON.parse(item.multipleRule).most
              }}{{ $t('QN_XIANG') }}</span
            >
          </span>
        </div>
        <el-checkbox-group
          class="option"
          v-model="item.answer"
          v-for="(i, checkIndex) in item.options"
          :key="checkIndex"
          @change="handleChange"
        >
          <el-checkbox :label="i.id + '-' + i.name" class="radioItem">{{
            String.fromCharCode('A'.charCodeAt(0) + checkIndex) + '. ' + i.name
          }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 3-问答题 -->
      <div v-if="item.type == 3" class="blank__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name }}
          {{ item.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
        </div>
        <iInput
          type="textarea"
          v-model="item.answer"
          resize="none"
          :autosize="{ minRows: 6, maxRows: 8 }"
          show-word-limit
          :placeholder="$t('QN_QINGSHURUNINDEHUIDA')"
          maxlength="100"
        ></iInput>
      </div>
      <!-- 4-图片选择题 -->
      <div v-if="item.type == 4" class="pic__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name }}
          {{ item.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
        </div>
        <!-- 垂直排布 -->
        <div v-if="item.pictureRule == 1" class="onepic">
          <el-radio-group
            class="option"
            v-model="item.answer"
            v-for="(i, index) in item.options"
            :key="index"
            @change="handleImgChange(item)"
          >
            <el-radio :label="i.id + '-' + i.name"> </el-radio>
            <div class="image-box">
              <img :src="i.imageUrl" class="avatar" />
            </div>
          </el-radio-group>
        </div>
        <!-- 四宫格排布 -->
        <div v-if="item.pictureRule == 2" class="twoPic">
          <el-radio-group
            class="option"
            v-model="item.answer"
            v-for="(i, index) in item.options"
            :key="index"
            @change="handleImgChange(item)"
          >
            <el-radio :label="i.id + '-' + i.name"> </el-radio>
            <div class="image-box">
              <img :src="i.imageUrl" class="avatar" />
            </div>
          </el-radio-group>
        </div>
        <!-- 水平排布 -->
        <div v-if="item.pictureRule == 4" class="fourPic">
          <el-radio-group
            class="option"
            v-model="item.answer"
            v-for="(i, index) in item.options"
            :key="index"
            @change="handleImgChange(item)"
          >
            <el-radio :label="i.id + '-' + i.name"> </el-radio>
            <div class="image-box">
              <img :src="i.imageUrl" class="avatar" />
            </div>
          </el-radio-group>
        </div>
      </div>
      <!-- 5-文件上传题 -->
      <div v-if="item.type == 5" class="file__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name }}
          {{ item.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
        </div>
        <div>
          <el-upload
            class="upload-demo"
            :before-upload="(file) => beforeAvatarUpload(file, item.uploadRule)"
            :show-file-list="false"
            :multiple="false"
            :accept="`${item.uploadRule}`"
            :http-request="(content) => httpUpload(content, item)"
            :disabled="disabledAll || item.uploadLoading"
          >
            <iButton
              @click="handleClick(index)"
              type="button"
              class="upload-button"
              :loading="item.uploadLoading"
            >
              {{ $t('QN_SHANGCHUANFUJIAN')
              }}<span class="upload-text"><img :src="uploadIcon" /></span>
            </iButton>
            <p class="upload-limit">
              {{ $t('QN_WENJIANDAXIAOWUXIANZHIZUIDUOSHANGCHUANYIGEWENJIAN') }}
            </p>
          </el-upload>
          <ul
            v-for="item in item.answer"
            :key="item.attachmentId"
            class="el-upload-list el-upload-list--text"
          >
            <li
              tabindex="0"
              class="el-upload-list__item is-success"
              style="background: #f7f7f7; border-radius: 10px"
            >
              <a
                class="el-upload-list__item-name"
                @click="
                  handleDownloadFile(item.attachmentUrl, item.attachmentName)
                "
              >
                <i class="el-icon-paperclip">
                  {{ item.attachmentName }}
                </i>
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-circle-check"></i>
              </label>
              <i
                @click="handleDeleteAccessory(item.attachmentId, index)"
                class="el-icon-close"
              ></i>
              <i class="el-icon-close-tip"></i>
            </li>
          </ul>
        </div>
      </div>
      <!-- 6-下拉题 -->
      <div v-if="item.type == 6" class="pull__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span>
          {{ item.code }}.{{ item.name }}
          {{ item.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
        </div>
        <iSelect
          v-model="item.answer"
          :placeholder="$t('QN_QINGXUANZE')"
          @change="handleSelectChange(item)"
          class="i-select"
        >
          <el-option
            v-for="item in item.options"
            :key="item.number"
            :label="item.name"
            :value="item.id + '-' + item.name"
          >
          </el-option>
        </iSelect>
      </div>
      <!-- 7-备注 -->
      <div v-if="item.type == 7" class="remark__content">
        <div class="title">{{ item.name }}</div>
      </div>
      <!-- 8-下划线 -->
      <div v-if="item.type == 8" class="divider__content">
        <div class="form-line"></div>
      </div>
      <!-- 9-段落 -->
      <div v-if="item.type == 9" class="para__content">
        <div class="title">{{ item.code }}. {{ item.name }}</div>
        <div
          v-for="(sonItem, sonIndex) in sonQuestions[index].sonQuestions"
          :key="sonIndex"
        >
          <!-- 1-单选题 -->
          <div
            v-if="sonItem.type == 1"
            class="radio__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="sonItem.requiredQuestion" style="color: red">* </span
              >{{ sonItem.code }} {{ sonItem.name }}
              {{ sonItem.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
            </div>
            <el-radio-group
              class="option"
              v-model="sonItem.answer"
              v-for="(i, radioIndex) in sonItem.options"
              :key="radioIndex"
              @change="hanldeRadioChange(sonItem)"
            >
              <el-radio :label="i.id + '-' + i.name" class="radioItem">{{
                String.fromCharCode('A'.charCodeAt(0) + radioIndex) +
                '. ' +
                i.name
              }}</el-radio>
            </el-radio-group>
          </div>
          <!-- 2-多选题 -->
          <div
            v-if="sonItem.type == 2"
            class="radio__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="sonItem.requiredQuestion" style="color: red">* </span>
              {{ sonItem.code }} {{ sonItem.name }}
              {{ sonItem.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
              <span
                v-if="sonItem.multipleRule"
                style="margin-left: 10px; color: #999999"
              >
                <span v-if="JSON.parse(sonItem.multipleRule).least"
                  >{{ $t('QN_ZUISHAOXUANZE')
                  }}{{ JSON.parse(sonItem.multipleRule).least
                  }}{{ $t('QN_XIANG') }}</span
                ><span v-if="JSON.parse(sonItem.multipleRule).most"
                  >{{ $t('QN_ZUIDUOXUANZE')
                  }}{{ JSON.parse(sonItem.multipleRule).most
                  }}{{ $t('QN_XIANG') }}</span
                >
              </span>
            </div>
            <el-checkbox-group
              class="option"
              v-model="sonItem.answer"
              v-for="(i, checkIndex) in sonItem.options"
              :key="checkIndex"
              @change="handleChange"
            >
              <el-checkbox :label="i.id + '-' + i.name" class="radioItem">{{
                String.fromCharCode('A'.charCodeAt(0) + checkIndex) +
                '. ' +
                i.name
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 3-问答题 -->
          <div
            v-if="sonItem.type == 3"
            class="blank__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="sonItem.requiredQuestion" style="color: red">* </span
              >{{ sonItem.code }} {{ sonItem.name }}
              {{ sonItem.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
            </div>
            <iInput
              v-model="sonItem.answer"
              type="textarea"
              resize="none"
              :autosize="{ minRows: 6, maxRows: 8 }"
              :placeholder="$t('QN_QINGSHURUNINDEHUIDA')"
              show-word-limit
              maxlength="100"
            ></iInput>
          </div>
          <!-- 4-图片选择题 -->
          <div
            v-if="sonItem.type == 4"
            class="pic__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="sonItem.requiredQuestion" style="color: red">* </span
              >{{ sonItem.code }} {{ sonItem.name }}
              {{ sonItem.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
            </div>
            <div v-if="sonItem.pictureRule == 1" class="onepic">
              <el-radio-group
                class="option"
                v-model="sonItem.answer"
                v-for="(i, imgIndex) in sonItem.options"
                :key="imgIndex"
                @change="handleImgChange(sonItem)"
              >
                <el-radio :label="i.id + '-' + i.name"> </el-radio>
                <div class="image-box">
                  <img :src="i.imageUrl" class="avatar" />
                </div>
              </el-radio-group>
            </div>
            <div v-if="sonItem.pictureRule == 2" class="twoPic">
              <el-radio-group
                class="option"
                v-model="sonItem.answer"
                v-for="(i, imgIndex) in sonItem.options"
                :key="imgIndex"
                @change="handleImgChange(sonItem)"
              >
                <el-radio :label="i.id + '-' + i.name"> </el-radio>
                <div class="image-box">
                  <img :src="i.imageUrl" class="avatar" />
                </div>
              </el-radio-group>
            </div>
            <div v-if="sonItem.pictureRule == 4" class="fourPic">
              <el-radio-group
                class="option"
                v-model="sonItem.answer"
                v-for="(i, imgIndex) in sonItem.options"
                :key="imgIndex"
                @change="handleImgChange(sonItem)"
              >
                <el-radio :label="i.id + '-' + i.name"> </el-radio>
                <div class="image-box">
                  <img :src="i.imageUrl" class="avatar" />
                </div>
              </el-radio-group>
            </div>
          </div>
          <!-- 5-文件上传题 -->
          <div
            v-if="sonItem.type == 5"
            class="file__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="sonItem.requiredQuestion" style="color: red">* </span
              >{{ sonItem.code }} {{ sonItem.name }}
              {{ sonItem.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
            </div>
            <div>
              <el-upload
                class="upload-demo"
                :before-upload="
                  (file) => beforeAvatarUpload(file, sonItem.uploadRule)
                "
                :show-file-list="false"
                :multiple="false"
                :accept="`${sonItem.uploadRule}`"
                :http-request="(content) => httpUpload(content, sonItem)"
                :disabled="disabledAll || sonItem.uploadLoading"
              >
                <iButton
                  type="button"
                  class="upload-button"
                  :loading="sonItem.uploadLoading"
                  @click="handleSonClick(index, sonIndex)"
                >
                  {{ $t('QN_SHANGCHUANFUJIAN')
                  }}<span class="upload-text"><img :src="uploadIcon" /></span>
                </iButton>
                <p class="upload-limit">
                  {{
                    $t('QN_WENJIANDAXIAOWUXIANZHIZUIDUOSHANGCHUANYIGEWENJIAN')
                  }}
                </p>
              </el-upload>
              <ul
                v-for="item in sonItem.answer"
                :key="item.attachmentId"
                class="el-upload-list el-upload-list--text"
              >
                <li
                  tabindex="0"
                  class="el-upload-list__item is-success"
                  style="background: #f7f7f7; border-radius: 10px"
                >
                  <a
                    class="el-upload-list__item-name"
                    @click="
                      handleDownloadFile(
                        item.attachmentUrl,
                        item.attachmentName
                      )
                    "
                  >
                    <i class="el-icon-paperclip">
                      {{ item.attachmentName }}
                    </i>
                  </a>
                  <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                  </label>
                  <i
                    @click="
                      handleDeleteAccessory(item.attachmentId, index, sonIndex)
                    "
                    class="el-icon-close"
                  ></i>
                  <i class="el-icon-close-tip"></i>
                </li>
              </ul>
            </div>
          </div>
          <!-- 6-下拉题 -->
          <div
            v-if="sonItem.type == 6"
            class="pull__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="sonItem.requiredQuestion" style="color: red">* </span
              >{{ sonItem.code }} {{ sonItem.name }}
              {{ sonItem.requiredQuestion ? '' : $t('QN_KEXUANTIAN') }}
            </div>
            <iSelect
              v-model="sonItem.answer"
              :placeholder="$t('QN_QINGXUANZE')"
              @change="handleSelectChange(sonItem)"
              class="i-select"
            >
              <el-option
                v-for="item in sonItem.options"
                :key="item.number"
                :label="item.name"
                :value="item.id + '-' + item.name"
              >
              </el-option>
            </iSelect>
          </div>
          <!-- 7-备注 -->
          <div
            v-if="sonItem.type == 7"
            class="remark__content"
            style="margin-left: 10px"
          >
            <div class="title">{{ sonItem.name }}</div>
          </div>
          <!-- 8-下划线 -->
          <div
            v-if="sonItem.type == 8"
            class="divider__content"
            style="margin-left: 10px"
          >
            <div class="form-line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <iButton class="" @click="$emit('subClick', questions, sonQuestions)">{{
        $t('QN_TIJIAO')
      }}</iButton>
    </div>
  </iPage>
</template>
<script>
import { iButton, iInput, iSelect } from 'rise'
import uploadIcon from '@/assets/images/upload-icon.svg'
import { uploadFile } from '@/api/survey/uploadFile.js'
import QRCode from 'qrcodejs2'
import store from '@/store'

export default {
  components: { iInput, iSelect, iButton },
  data() {
    return {
      uploadIcon,
      checkList: [],
      checkListObj: {},
      sonCheckList: [],
      radio: '',
      previewData: {},
      fileList: [],
      listIndex: null,
      sonListIndex: null,
      uploadLoading: false,
      userId: '',
      upLoadFileName: '',
      checkList1: [],
      checkList2: []
    }
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        console.log(val)
        this.previewData = val
        // console.log(this.previewData);
        // if (this.previewData.questions) {
        //   this.checkList1 = this.previewData.questions.filter((item) => {
        //     return item.type === 2;
        //   });
        //   this.checkList = this.checkList1.map((item) => {
        //     return { ...item, answer: [] };
        //   });
        // this.checkList = this.previewData.questions.map((item) => {
        //   return { ...item, answer: [] };
        // });
        // console.log(this.checkList);

        // this.previewData.questions.forEach(item =>{
        //   if(item.sonQuestions){
        //     this.sonCheckList = item.sonQuestions.map(item =>{
        //       return { ...item, answer: [] };
        //     })
        //   }
        // })
        // }
      }
    },
    ruleForm(val) {
      this.$emit('input', val)
    }
  },
  created() {
    document.title = this.$t('QN_WENJUANDIAOCHA')
  },
  mounted() {
    this.userId = store.state.permission.userInfo.id
    let id = this.$route.params.id
    this.createQrCode(`survey/mobile/${id}?userId=${this.userId}`)
  },
  computed: {
    questions() {
      let actionCode = 0
      return this.previewData?.questions?.filter((item) => {
        item._ = item.sonQuestions?.map((it) => it.answer) // 维持sonQuestions的深度引用。
        if (actionCode == -1 || item.code < actionCode) return false
        if (item.type != 9) {
          if (!item.answer || item.answer == '') return true
        }
        if (item.type === 5) return true

        if (
          item.answer &&
          (item.type === 6 ||
            item.type === 2 ||
            item.type === 1 ||
            item.type === 4)
        ) {
          const ids = []
            .concat(item.answer)
            .map((answer) => answer?.split('-')?.[0])
          const answerItems = item.options?.filter((item) =>
            ids.includes(item.id)
          )
          actionCode = item.code
          answerItems.forEach((answer) => {
            console.log('answer.action', answer.action)
            if (-1 == answer.action) actionCode = -1
            else if (actionCode != -1) {
              actionCode = Math.max(actionCode, answer.action || 0)
            }
          })
        }

        // item.sonQuestions = item.sonQuestions?.filter((it) => {
        //   if (sonActionCode == -1 || it.code < sonActionCode) return false;
        //   if (!it.answer) return true;
        //   if (it.type === 5) return true;

        //   if (it.answer) {
        //     const ids = []
        //       .concat(it.answer)
        //       .map((answer) => answer?.split("-")?.[0]);
        //     const answerItems = it.options?.filter((it) => ids.includes(it.id));
        //     sonActionCode = it.code;
        //     answerItems.forEach((answer) => {
        //       if (-1 == answer.action) sonActionCode = -1;
        //       else if (sonActionCode != -1)
        //         sonActionCode = Math.max(sonActionCode, answer.action || 0);
        //     });
        //   }

        //   return true;
        // });
        return true
      })
    },
    sonQuestions() {
      let sonActionCode = 0
      return this.questions?.map((item) => {
        return {
          ...item,
          sonQuestions: item.sonQuestions?.filter((it) => {
            if (sonActionCode == -1 || it.code < sonActionCode) return false
            if (!it.answer || it.answer == '') return true
            if (it.type === 5) return true

            if (
              it.answer &&
              (item.type === 6 || item.type === 2 || item.type === 1)
            ) {
              const ids = []
                .concat(it.answer)
                .map((answer) => answer?.split('-')?.[0])
              const answerItems = it.options?.filter((it) =>
                ids.includes(it.id)
              )
              sonActionCode = it.code
              answerItems.forEach((answer) => {
                if (-1 == answer.action) sonActionCode = -1
                else if (sonActionCode != -1)
                  sonActionCode = Math.max(sonActionCode, answer.action || 0)
              })
            }
            return true
          })
        }
      })
    }
  },
  methods: {
    createQrCode(url) {
      var qrCode = new QRCode(this.$refs.qrCodeUrl, {
        text: `${window.location.origin + window.location.pathname}#/${url}`,
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    // 上传附件
    async httpUpload(content, item) {
      // this.uploadLoading = true;
      item.uploadLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      await uploadFile(formData)
        .then((res) => {
          let list = []
          let previewList = this.questions
          console.log('res', res)
          if (res.id) {
            this.$message.success(this.$t('QN_SHANGCHUANCHENGGONG'))
          }
          list.push({
            attachmentId: res.id,
            attachmentName: res.name,
            attachmentUrl: res.path,
            upLoadFileName: res.name
          })
          if (previewList[this.listIndex].type == 9) {
            previewList[this.listIndex].sonQuestions[this.sonListIndex].answer =
              list
            // if(previewList[this.listIndex].sonQuestions[this.sonListIndex].answer == null) {
            //   previewList[this.listIndex].sonQuestions[this.sonListIndex].answer = list;
            // }else {
            //   previewList[this.listIndex].sonQuestions[this.sonListIndex].answer = [...previewList[this.listIndex].sonQuestions[this.sonListIndex].answer, ...list]
            // }
          } else {
            previewList[this.listIndex].answer = list
            // if(previewList[this.listIndex].answer == null) {
            //   previewList[this.listIndex].answer = list;
            // }else {
            //   previewList[this.listIndex].answer = [...previewList[this.listIndex].answer, ...list]
            // }
          }
          // this.uploadLoading = false;
          item.uploadLoading = false
        })
        .catch(() => {})
    },
    handleDeleteAccessory(val, index, sonIndex) {
      console.log(val, index, sonIndex, this.questions)
      let list = this.questions
      if (list[index].type == 9) {
        // list[index].sonQuestions[sonIndex].answer = list[index].sonQuestions[
        //   sonIndex
        // ].answer.filter((item) => {
        //   return !item.attachmentId.includes(val);
        // });
        list[index].sonQuestions[sonIndex].answer = null
      } else {
        // list[index].answer = list[index].answer.filter((item) => {
        //   return !item.attachmentId.includes(val);
        // });
        list[index].answer = null
      }
    },
    handleClick(index) {
      console.log('上传附件', index)
      this.listIndex = index
    },
    handleSonClick(index, sonIndex) {
      console.log('上传附件2', index, sonIndex)
      this.listIndex = index
      this.sonListIndex = sonIndex
    },
    beforeAvatarUpload(file, uploadRule) {
      // const fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);
      // let list = this.questions;
      // let isFile = null;
      // let dataFile = null;
      // let uploadRule = null;
      // if(list[this.listIndex].type == 5) {
      //   uploadRule = list[this.listIndex].uploadRule;
      //   dataFile = list[this.listIndex].uploadRule;
      // } else {
      //   uploadRule = list[this.listIndex].sonQuestions[this.sonListIndex].uploadRule
      //   dataFile = list[this.listIndex].sonQuestions[this.sonListIndex].uploadRule;
      // }
      // isFile = fileExtension.includes(uploadRule);
      // if(uploadRule) {
      //   if(!isFile) {
      //     this.$message.error(`上传的文件类型为${fileExtension}`);
      //   }
      // } else {
      //   isFile = true;
      // }
      const fileExtension = file.name.substring(file.name.lastIndexOf('.'))
      let isRule = uploadRule?.split(',')
      let isFileType
      if (uploadRule) {
        isFileType = !isRule.includes(fileExtension)
        if (isFileType) {
          this.$message.error(`${this.$t('QN_SHANGCHUANWENJIANLEIXINGWEI')} ${uploadRule}`)
        }
      }
      // const isLt15M = file.size / 1024 / 1024 < 15;

      // if(!isLt15M) {
      //     this.$message.error(`上传文件大小不能超过${15}MB!`);
      // }
      // return !isFileType && isLt15M;
      return !isFileType
    },
    // 单选题
    hanldeRadioChange() {},
    // 多选题
    handleChange(value) {
      console.log(value)
      // console.log("checkbox", index, item, sonIndex);
      // console.log("checkList", this.checkList);
      // console.log("checkList", this.sonCheckList);
      // if (item.type == 9) {
      //   // this.questions[index].sonQuestions[sonIndex].answer =
      //   //   this.sonCheckList[index].answer;
      //   this.questions[index].sonQuestions[sonIndex].answer = this.sonCheckList;
      // } else {
      //   this.questions[index].answer = this.checkList[index].answer;
      // }
    },
    // 图片选择
    handleImgChange() {},
    // 下拉选择
    handleSelectChange() {}
  }
}
</script>

<style lang="scss" scoped>
.header--img {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  .header--img--box {
    text-align: center;
    font-weight: bold;
    img {
      width: 120px;
      height: 120px;
    }
  }
}
.is-checked ::v-deep {
  .el-radio__label {
    color: #4d4f5c;
  }
  .el-checkbox__label {
    color: #4d4f5c;
  }
}
.header--item {
  text-align: center;
  padding: 0 8.3125rem;
  .name {
    margin-top: 0.75rem;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 28px;
  }
  .surveyDescription {
    margin-top: 2rem;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #424242;
    line-height: 25px;
  }
}
.bottom {
  text-align: center;
  margin: 20px;
}
.topic--body {
  padding: 0 8.3125rem;
}

.radio__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .option {
    margin-top: 20px;
    .radioItem {
      margin: 20px 0px 20px 10px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
    }
  }
  .option:hover {
    background: rgb(249, 251, 255);
    border-radius: 5px;
  }
}

.pic__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .onepic {
    margin-left: -10px;
    margin-top: 10px;
    .option {
      padding-top: 10px;
      padding-left: 10px;
      padding-bottom: 10px;
      width: 100%;
      border-radius: 5px;
      .image-box {
        margin: 10px 0;
        width: 20%;
        height: auto;
        .avatar {
          margin: 10px 0 10px 25px;
          width: 100%;
          // height: 100%;
          display: block;
        }
      }
    }
    .option:hover {
      background: rgb(249, 251, 255);
      border-radius: 5px;
    }
  }
  .twoPic {
    margin-left: -10px;
    margin-top: 10px;
    .option {
      padding-top: 10px;
      padding-left: 10px;
      padding-bottom: 10px;
      width: 50%;
      border-radius: 5px;
      .image-box {
        margin: 10px 0;
        width: 50%;
        height: auto;
        .avatar {
          margin: 10px 0 10px 25px;
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .option:hover {
      background: rgb(249, 251, 255);
      border-radius: 5px;
    }
  }
  .fourPic {
    margin: 10px -10px 10px -10px;
    .option {
      padding: 10px 55px 10px 10px;
      width: 25%;
      border-radius: 5px;
      .image-box {
        margin: 10px 0;
        width: 100%;
        height: auto;
        .avatar {
          margin: 10px 0 10px 25px;
          width: 100%;
          // height: 100%;
          // display: block;
        }
      }
    }
    .option:hover {
      background: rgb(249, 251, 255);
      border-radius: 5px;
    }
  }
}

.file__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .option {
    margin-top: 20px;
    .radioItem {
      margin: 20px 0px 20px 10px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
    }
  }
  .option:hover {
    background: rgb(249, 251, 255);
    border-radius: 5px;
  }
}

.upload-demo {
  .upload-button {
    position: relative;
    width: 18.75rem;
    height: 35px;
    padding: 0;
    color: #fff;
    background-color: #67C23A;
    margin: 30px 0 20px 0;
    .upload-text {
      position: absolute;
      right: 20px;
      img {
        width: 24px;
        height: 18px;
      }
    }
  }
  .upload-limit {
    display: inline;
    margin-left: 20px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 17px;
  }
}

.divider__content {
  margin-top: 3.75rem;
  .form-line {
    background-color: #d8d8d8;
    height: 2px;
    width: 100%;
    margin-bottom: 20px;
  }
}

.blank__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 33px;
  }
}

.pull__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .i-select {
    margin: 40px 0 20px 20px;
    width: 350px;
  }
}

.remark__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
  }
}

.para__content {
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
::v-deep .el-checkbox__input .el-checkbox__inner {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1.25rem;
  border-radius: 5px;
}
::v-deep .el-checkbox__input .el-checkbox__inner::after {
  position: absolute;
  margin: 0.125rem !important;
  border: 0.125rem solid #fff;
  box-sizing: content-box;
  content: '';
  border-left: 0;
  border-top: 0;
}
::v-deep .el-radio__input .el-radio__inner {
  width: 1.25rem;
  height: 1.25rem;
}
::v-deep .el-checkbox__label {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 22px;
}
::v-deep .el-checkbox__input .el-checkbox__inner::after {
  // 对号
  position: absolute;
  margin: 1px;
  border: 2px solid #fff;
  // 不覆盖下面的 会 导致对号变形
  box-sizing: content-box;
  content: '';
  border-left: 0;
  border-top: 0;
}

::v-deep .pic__content .el-radio__label {
  display: none;
}
::v-deep .el-radio-group {
  .image-box {
    transform: translate(20px, -30px);
  }
}
</style>
