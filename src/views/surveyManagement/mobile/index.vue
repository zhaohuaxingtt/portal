<template>
  <iPage>
    <div class="continer">
      <div class="mobile" v-loading.fullscreen="loading">
        <div class="header">
          {{ ruleForm.name }}
        </div>
        <main class="body" v-if="disabled">
          <header class="title">
            {{ ruleForm.surveyDescription }}
          </header>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            :rules="rules"
            :hideRequiredAsterisk="true"
            :data-value="questions"
          >
            <ul class="content">
              <div v-for="(item, index) of questions" :key="index">
                <!-- 上传图片-->
                <li class="item item1" v-if="item.type === 5">
                  <!-- <iFormItem prop="name" v-if="item.first">
                    <iLabel
                      :label="item.codeP + '.' + item.nameP"
                      :required="item.requireP"
                      class="from-item-text-label"
                      slot="label"
                    ></iLabel>
                  </iFormItem> -->
                  <iFormItem prop="answer" class="form-item-content">
                    <iLabel
                      :label="
                        item.code +
                        '. ' +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion"
                      :class="{ 'is-required': item.requiredQuestion }"
                      slot="label"
                    ></iLabel>
                    <el-upload
                      class="upload-demo"
                      :before-upload="
                        (file) => beforeAvatarUpload(file, item.uploadRule)
                      "
                      :show-file-list="false"
                      :accept="FileType"
                      :multiple="false"
                      :http-request="(content) => httpUpload(content, item)"
                      :disabled="disabledAll || item.uploadLoading"
                    >
                    <!-- :accept="`${item.uploadRule}`" -->
                      <iButton
                        @click="handleClick(index)"
                        type="button"
                        class="upload-button"
                        :loading="item.uploadLoading"
                      >
                        上传附件<span class="upload-text"
                          ><img :src="uploadIcon"
                        /></span>
                      </iButton>
                      <div class="upload-limit">
                        文件大小无限制，最多上传1个文件
                      </div>
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
                          <i
                            class="el-icon-upload-success el-icon-circle-check"
                          ></i>
                        </label>
                        <i
                          @click="
                            handleDeleteAccessory(item.attachmentId, index)
                          "
                          class="el-icon-close"
                        ></i>
                        <i class="el-icon-close-tip"></i>
                      </li>
                    </ul>
                  </iFormItem>
                </li>
                <!-- 2 多选-->
                <li class="item" v-if="item.type === 2">
                  <!-- <iFormItem prop="name" v-if="item.first">
                    <iLabel
                      :label="item.codeP + '.' + item.nameP"
                      :required="item.requireP"
                      slot="label"
                    ></iLabel>
                  </iFormItem> -->
                  <iFormItem prop="checkList">
                    <iLabel
                      :label="
                        item.code +
                        '. ' +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion"
                      :class="{ 'is-required': item.requiredQuestion }"
                      class="form-item-content"
                      slot="label"
                    ></iLabel>
                    <div v-if="item.multipleRule">
                      <span class="form-item-multipleRule">
                        <span v-if="min(item)">
                          最少选择{{ min(item) }}项；
                        </span>
                        <span v-if="max(item)">
                          最多选择{{ max(item) }}项；
                        </span>
                      </span>
                    </div>
                    <el-checkbox-group
                      v-model="item.answer"
                      v-for="(ite, checkIndex) in item.options"
                      :key="checkIndex"
                      class="from-item-group"
                      @change="handleChange(index, ite.action, item.type)"
                    >
                      <el-checkbox
                        :label="ite.id + '-' + ite.name"
                        class="radioItem optionItemScrow"
                      >
                        {{
                          String.fromCharCode("A".charCodeAt(0) + checkIndex) +
                          ". " +
                          ite.name
                        }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </iFormItem>
                </li>
                <!-- 横线 -->
                <li class="item">
                  <div class="form-item-line" v-if="item.type === 8"></div>
                  <div class="form-item-text" v-if="item.type === 7">
                    {{ item.name }}
                  </div>
                </li>
                <!-- 下拉-->
                <li class="item" v-if="item.type === 6">
                  <!-- <iFormItem prop="answer" v-if="item.first">
                    <iLabel
                      :label="item.codeP + '.' + item.nameP + (item.requiredQuestion ? '' : '   (可选填)')"
                      :required="item.requireP"
                      slot="label"
                    ></iLabel>
                  </iFormItem> -->
                  <iFormItem prop="answer">
                    <iLabel
                      :label="
                        item.code +
                        '. ' +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion"
                      :class="{ 'is-required': item.requiredQuestion }"
                      slot="label"
                      class="pull-question-label"
                    ></iLabel>
                    <!-- <div class="pull-question">宽敞的后排座舱</div> -->
                    <iSelect v-model="item.answer" class="i-select">
                      <el-option
                        v-for="it in item.options"
                        :key="it.number"
                        :label="it.name"
                        :value="it.id + '-' + it.name"
                        class="selectOption"
                      >
                      </el-option>
                    </iSelect>
                  </iFormItem>
                </li>
                <!-- 4 图片单选-->
                <li class="item" v-if="item.type === 4">
                  <!-- <iFormItem prop="name" v-if="item.first">
                    <iLabel
                      :label="item.codeP + '.' + item.nameP"
                      :required="item.requireP"
                      slot="label"
                    ></iLabel>
                  </iFormItem> -->
                  <iFormItem prop="img" v-if="item.pictureRule == 1">
                    <iLabel
                      :label="
                        item.code +
                        '. ' +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion"
                      :class="{ 'is-required': item.requiredQuestion }"
                      class="from-item-img-label"
                      slot="label"
                    ></iLabel>
                    <el-radio-group
                      v-for="(it, index) in item.options"
                      :key="index"
                      v-model="item.answer"
                      class="from-item-img"
                    >
                      <el-radio
                        :label="it.id + '-' + it.name"
                        class="radioItem"
                      >
                        <img
                          class="from-item-img-size"
                          :src="it.imageUrl"
                          alt=""
                        />
                      </el-radio>
                      <!-- <el-radio label="b" name="type" class="radioItem">
                        <img
                          class="from-item-img-size"
                          src="@/assets/images/leftContent.png"
                          alt=""
                        />
                      </el-radio> -->
                    </el-radio-group>
                  </iFormItem>
                  <iFormItem prop="img" v-else>
                    <iLabel
                      :label="
                        item.code +
                        '. ' +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion"
                      :class="{ 'is-required': item.requiredQuestion }"
                      class="from-item-img-label"
                      slot="label"
                    ></iLabel>
                    <el-radio-group
                      v-for="(it, index) in item.options"
                      :key="index"
                      v-model="item.answer"
                      class="from-item-tow"
                    >
                      <el-radio
                        :label="it.id + '-' + it.name"
                        class="radioItem"
                      >
                        <img
                          class="from-item-img-size"
                          :src="it.imageUrl"
                          alt=""
                        />
                      </el-radio>
                      <!-- <el-radio label="b" name="type" class="radioItem">
                        <img
                          class="from-item-img-size"
                          src="@/assets/images/leftContent.png"
                          alt=""
                        />
                      </el-radio> -->
                    </el-radio-group>
                  </iFormItem>
                </li>
                <!-- 4 单选题-->
                <li class="item" v-if="item.type === 1">
                  <!-- <iFormItem prop="name" v-if="item.first">
                    <iLabel
                      :label="item.codeP + '.' + item.nameP"
                      :required="item.requireP"
                      slot="label"
                    ></iLabel>
                  </iFormItem> -->
                  <iFormItem prop="answer">
                    <iLabel
                      :label="
                        item.code +
                        '. ' +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion"
                      :class="{ 'is-required': item.requiredQuestion }"
                      class="from-item-img-label"
                      slot="label"
                    ></iLabel>
                    <el-radio-group
                      v-model="item.answer"
                      v-for="(i, index) in item.options"
                      :key="index"
                      class="from-item-group"
                      @change="handleRadio(i.action, item.type)"
                    >
                      <el-radio :label="i.id + '-' + i.name" class="radioItem optionItemScrow">
                        {{
                          String.fromCharCode("A".charCodeAt(0) + index) +
                          ". " +
                          i.name
                        }}
                      </el-radio>
                    </el-radio-group>
                  </iFormItem>
                </li>
                <!-- 多行文本输入 -->
                <li class="item" v-if="item.type === 3">
                  <!-- <iFormItem prop="name" v-if="item.first" class="p-title">
                    <iLabel
                      :label="item.codeP + '.' + item.nameP"
                      :required="item.requireP"
                      slot="label"
                    ></iLabel>
                  </iFormItem> -->
                  <iFormItem prop="answer">
                    <iLabel
                      :label="
                        item.code +
                        '. ' +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion"
                      :class="{ 'is-required': item.requiredQuestion }"
                      slot="label"
                      class="pull-question-label"
                    ></iLabel>
                    <iInput
                      class="textarea"
                      type="textarea"
                      resize="none"
                      :autosize="{ minRows: 6, maxRows: 8 }"
                      show-word-limit
                      placeholder="请输入您的回答。"
                      v-model="item.answer"
                      maxlength="100"
                    ></iInput>
                  </iFormItem>
                </li>
                <!-- 9-段落 -->
                <div v-if="item.type === 9">
                  <li class="item">
                    <iFormItem>
                      <iLabel
                        :label="item.code + '. ' + item.name"
                        :required="item.requiredQuestion"
                        :class="{ 'is-required': item.requiredQuestion }"
                        class="from-item-text-label"
                        slot="label"
                      ></iLabel>
                    </iFormItem>
                  </li>
                  <div
                    v-for="(sonItem, sonIndex) in sonQuestions[index]
                      .sonQuestions"
                    :key="sonIndex"
                  >
                    <!-- 上传图片-->
                    <li class="item item1" v-if="sonItem.type === 5">
                      <!-- <iFormItem prop="name" v-if="sonItem.first">
                        <iLabel
                          :label="sonItem.codeP + '.' + sonItem.nameP"
                          :required="sonItem.requireP"
                          class="from-item-text-label"
                          slot="label"
                        ></iLabel>
                      </iFormItem> -->
                      <iFormItem prop="attachments" class="form-item-content">
                        <iLabel
                          :label="
                            sonItem.code +
                            ' ' +
                            sonItem.name +
                            (sonItem.requiredQuestion ? '' : '   (可选填)')
                          "
                          :required="sonItem.requiredQuestion"
                          :class="{ 'is-required': sonItem.requiredQuestion }"
                          slot="label"
                        ></iLabel>
                        <el-upload
                          class="upload-demo"
                          :before-upload="
                            (file) =>
                              beforeAvatarUpload(file, sonItem.uploadRule)
                          "
                          :show-file-list="false"
                          :multiple="false"
                          :accept="FileType"
                          :http-request="
                            (content) => httpUpload(content, sonItem)
                          "
                          :disabled="disabledAll || sonItem.uploadLoading"
                        >
                        <!-- :accept="`${sonItem.uploadRule}`" -->
                          <iButton
                            @click="handleSonClick(index, sonIndex)"
                            type="button"
                            class="upload-button"
                            :loading="sonItem.uploadLoading"
                          >
                            上传附件<span class="upload-text"
                              ><img :src="uploadIcon"
                            /></span>
                          </iButton>
                          <div class="upload-limit">
                            文件大小无限制，最多上传1个文件
                          </div>
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
                              <i
                                class="
                                  el-icon-upload-success el-icon-circle-check
                                "
                              ></i>
                            </label>
                            <i
                              @click="
                                handleDeleteAccessory(
                                  item.attachmentId,
                                  index,
                                  sonIndex
                                )
                              "
                              class="el-icon-close"
                            ></i>
                            <i class="el-icon-close-tip"></i>
                          </li>
                        </ul>
                      </iFormItem>
                    </li>
                    <!-- 2 多选-->
                    <li class="item" v-if="sonItem.type === 2">
                      <!-- <iFormItem prop="name" v-if="item.first">
                        <iLabel
                          :label="item.codeP + '.' + item.nameP"
                          :required="item.requireP"
                          slot="label"
                        ></iLabel>
                      </iFormItem> -->
                      <iFormItem prop="checkList">
                        <iLabel
                          :label="
                            sonItem.code +
                            ' ' +
                            sonItem.name +
                            (sonItem.requiredQuestion ? '' : '   (可选填)')
                          "
                          :required="sonItem.requiredQuestion"
                          :class="{ 'is-required': sonItem.requiredQuestion }"
                          class="form-item-content"
                          slot="label"
                        ></iLabel>
                        <div v-if="sonItem.multipleRule">
                          <span class="form-item-multipleRule">
                            <span v-if="min(sonItem)">
                              最少选择{{ min(sonItem) }}项；
                            </span>
                            <span v-if="max(sonItem)">
                              最多选择{{ max(sonItem) }}项；
                            </span>
                          </span>
                        </div>
                        <el-checkbox-group
                          v-model="sonItem.answer"
                          v-for="(it, inde) in sonItem.options"
                          :key="inde"
                          class="from-item-group"
                          @change="
                            handleChange(index, it.action, item.type, sonIndex)
                          "
                        >
                          <el-checkbox
                            :label="it.id + '-' + it.name"
                            name="type"
                            class="radioItem optionItemScrow"
                          >
                            {{
                              String.fromCharCode("A".charCodeAt(0) + inde) +
                              ". " +
                              it.name
                            }}
                          </el-checkbox>
                        </el-checkbox-group>
                      </iFormItem>
                    </li>
                    <!-- 横线 -->
                    <li class="item">
                      <div
                        class="form-item-line"
                        v-if="sonItem.type === 8"
                      ></div>
                      <div class="form-item-text" v-if="sonItem.type === 7">
                        {{ sonItem.name }}
                      </div>
                    </li>
                    <!-- 下拉-->
                    <li class="item" v-if="sonItem.type === 6">
                      <!-- <iFormItem prop="name" v-if="sonItem.first">
                        <iLabel
                          :label="item.codeP + '.' + sonItem.nameP"
                          :required="item.requireP"
                          slot="label"
                        ></iLabel>
                      </iFormItem> -->
                      <iFormItem prop="options">
                        <iLabel
                          :label="
                            sonItem.code +
                            ' ' +
                            sonItem.name +
                            (sonItem.requiredQuestion ? '' : '   (可选填)')
                          "
                          :required="sonItem.requiredQuestion"
                          :class="{ 'is-required': sonItem.requiredQuestion }"
                          slot="label"
                          class="pull-question-label"
                        ></iLabel>
                        <!-- <div class="pull-question">宽敞的后排座舱</div> -->
                        <iSelect v-model="sonItem.answer" class="i-select">
                          <el-option
                            v-for="it in sonItem.options"
                            :key="it.number"
                            :label="it.name"
                            :value="it.id + '-' + it.name"
                            class="selectOption"
                          >
                          </el-option>
                        </iSelect>
                      </iFormItem>
                    </li>
                    <!-- 4 图片单选-->
                    <li class="item" v-if="sonItem.type === 4">
                      <!-- <iFormItem prop="name" v-if="sonItem.first">
                        <iLabel
                          :label="item.codeP + '.' + item.nameP"
                          :required="item.requireP"
                          slot="label"
                        ></iLabel>
                      </iFormItem> -->
                      <iFormItem prop="img">
                        <iLabel
                          :label="
                            sonItem.code +
                            ' ' +
                            sonItem.name +
                            (sonItem.requiredQuestion ? '' : '   (可选填)')
                          "
                          :required="sonItem.requiredQuestion"
                          :class="{ 'is-required': sonItem.requiredQuestion }"
                          class="from-item-img-label"
                          slot="label"
                        ></iLabel>
                        <el-radio-group
                          v-for="(it, index) in sonItem.options"
                          :key="index"
                          v-model="sonItem.answer"
                          class="from-item-img"
                        >
                          <el-radio
                            :label="it.id + '-' + it.name"
                            class="radioItem"
                          >
                            <img
                              class="from-item-img-size"
                              :src="it.imageUrl"
                              alt=""
                            />
                          </el-radio>
                          <!-- <el-radio label="b" name="type" class="radioItem">
                        <img
                          class="from-item-img-size"
                          src="@/assets/images/leftContent.png"
                          alt=""
                        />
                      </el-radio> -->
                        </el-radio-group>
                      </iFormItem>
                    </li>
                    <!-- 4 单选题-->
                    <li class="item" v-if="sonItem.type === 1">
                      <!-- <iFormItem prop="name" v-if="item.first">
                        <iLabel
                          :label="item.codeP + '.' + item.nameP"
                          :required="item.requireP"
                          slot="label"
                        ></iLabel>
                      </iFormItem> -->
                      <iFormItem prop="img">
                        <iLabel
                          :label="
                            sonItem.code +
                            ' ' +
                            sonItem.name +
                            (sonItem.requiredQuestion ? '' : '   (可选填)')
                          "
                          :required="sonItem.requiredQuestion"
                          :class="{ 'is-required': sonItem.requiredQuestion }"
                          class="from-item-img-label"
                          slot="label"
                        ></iLabel>
                        <el-radio-group
                          v-model="sonItem.answer"
                          v-for="(it, index) in sonItem.options"
                          :key="index"
                          class="from-item-group"
                        >
                          <el-radio
                            :label="it.id + '-' + it.name"
                            class="radioItem optionItemScrow"
                          >
                            {{
                              String.fromCharCode("A".charCodeAt(0) + index) +
                              ". " +
                              it.name
                            }}
                          </el-radio>
                        </el-radio-group>
                      </iFormItem>
                    </li>
                    <!-- 多行文本输入 -->
                    <li class="item" v-if="sonItem.type === 3">
                      <!-- <iFormItem prop="name" v-if="item.first" class="p-title">
                        <iLabel
                          :label="item.codeP + '.' + item.nameP"
                          :required="item.requireP"
                          slot="label"
                        ></iLabel>
                      </iFormItem> -->
                      <iFormItem prop="answer">
                        <iLabel
                          :label="
                            sonItem.code +
                            ' ' +
                            sonItem.name +
                            (sonItem.requiredQuestion ? '' : '   (可选填)')
                          "
                          :required="sonItem.requiredQuestion"
                          :class="{ 'is-required': sonItem.requiredQuestion }"
                          slot="label"
                          class="pull-question-label"
                        ></iLabel>
                        <iInput
                          class="textarea"
                          type="textarea"
                          resize="none"
                          :autosize="{ minRows: 6, maxRows: 8 }"
                          show-word-limit
                          placeholder="请输入您的回答。"
                          v-model="sonItem.answer"
                          maxlength="100"
                        ></iInput>
                      </iFormItem>
                    </li>
                  </div>
                </div>
              </div>
            </ul>
          </el-form>
          <footer class="submit-footer">
            <iButton class="submit" @click="handleSubmit">提交</iButton>
            <!-- <iButton class="submit" @click="handle">message提交</iButton> -->
          </footer>
        </main>
      </div>
    </div>
  </iPage>
</template>
<script>
import {
  iButton,
  iMessage,
  iFormItem,
  iLabel,
  iInput,
  iSelect,
  iPage,
} from "rise";
import { uploadFile } from "@/api/survey/uploadFile.js";
import uploadIcon from "@/assets/images/upload-icon.svg";
import { rulesInfo } from "./data";
import { queryForAnswer, findById, saveAnswer } from "@/api/survey/survey";
export default {
  components: {
    iButton,
    iFormItem,
    iLabel,
    iInput,
    iSelect,
    iPage,
  },
  data() {
    return {
      checkList: [],
      sonCheckList: [],
      uploadLoading: false,
      uploadIcon,
      ruleForm: {},
      id: "",
      listIndex: null,
      sonListIndex: null,
      maxSize: 15,
      formData: {},
      istipleRule: false,
      checkMax: null,
      checkMin: null,
      loading: false,
      disabled: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    document.title = "问卷调查";
  },
  mounted() {
    this.query();
    document.querySelectorAll(".flex-align-center").forEach((item) => {
      let dom = item.querySelector("span").cloneNode(true);
      item.querySelector("span").remove();
      item.appendChild(dom);
    });
  },
  computed: {
    FileType(){
      return 'image/gif,image/png, image/jpeg,image/bmp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,application/x-rar-compressed,application/zip,video/mpeg,audio/mpeg'
    },
    questions() {
      console.log("-=-=-=-=");
      let actionCode = 0;
      let sonActionCode = 0;
      return this.ruleForm?.questions?.filter((item, index) => {
        item._ = item.sonQuestions?.map((it) => it.answer); // 维持sonQuestions的深度引用。
        if (actionCode == -1 || item.code < actionCode) return false
        if (item.type != 9) {
          if (!item.answer || item.answer == "") return true;
        }
        if (item.type === 5) return true;

        if (item.answer && (item.type === 6 || item.type === 2 || item.type === 1)) {
          const ids = []
            .concat(item.answer)
            .map((answer) => answer?.split("-")?.[0]);
          const answerItems = item.options?.filter((item) =>
            ids.includes(item.id)
          );
          actionCode = item.code;
          answerItems.forEach((answer) => {
            if (-1 == answer.action) actionCode = -1;
            else if (actionCode != -1)
              actionCode = Math.max(actionCode, answer.action || 0);
          });
        }

        //  item.sonQuestions = item.sonQuestions?.filter((it,index) => {
        //   if (sonActionCode == -1 ||  it.code  < sonActionCode) return false
        //   if (!it.answer) return true;
        //   if (it.type === 5) return true;

        //   if(it.answer){
        //     const ids = [].concat(it.answer).map((answer) => answer?.split("-")?.[0]);
        //     const answerItems = it.options?.filter((it) => ids.includes(it.id));
        //     sonActionCode = it.code;
        //     answerItems.forEach((answer) => {
        //       if (-1 == answer.action) sonActionCode = -1;
        //       else if (sonActionCode != -1)
        //         sonActionCode = Math.max(sonActionCode, answer.action || 0);
        //         console.log('sonActionCode',sonActionCode)
        //       });
        //   }
        //   return true
        // });
        return true;
      });
    },
    sonQuestions() {
      console.log("-=-=-=-=");
      let actionCode = 0;
      let sonActionCode = 0;
      return this.questions?.map((item, index) => {
        return {
          ...item,
          sonQuestions: item.sonQuestions?.filter((it, index) => {
            if (sonActionCode == -1 || it.code < sonActionCode) return false;
            if (!it.answer || it.answer == "") return true;
            if (it.type === 5) return true;

            if (it.answer && (item.type === 6 || item.type === 2 || item.type === 1)) {
              const ids = []
                .concat(it.answer)
                .map((answer) => answer?.split("-")?.[0]);
              const answerItems = it.options?.filter((it) =>
                ids.includes(it.id)
              );
              sonActionCode = it.code;
              answerItems.forEach((answer) => {
                if (-1 == answer.action) sonActionCode = -1;
                else if (sonActionCode != -1)
                  sonActionCode = Math.max(sonActionCode, answer.action || 0);
              });
            }
            return true;
          }),
        };
      });
    },
    max() {
      return function (da) {
        const multipleRule = da?.multipleRule
          ? JSON.parse(da?.multipleRule)
          : {};
        return multipleRule?.most || "";
      };
    },
    min() {
      return function (da) {
        const multipleRule = da?.multipleRule
          ? JSON.parse(da?.multipleRule)
          : {};
        return multipleRule?.least || "";
      };
    },
  },
  methods: {
    // 伪代码  调整弹框样式
    // handle(){
    //   this.$message.error({
    //     message:'fhewjfhuweihfweiuhfuiwehfuicbnhsdjklnvfglkwejhnfgilwjhediofcjoewhjfiowehfnrtioewhndfvchnweiohgnvfioweh',
    //     customClass:'uploadCss',
    //     duration:0
    //   })
    // },
    handleRadio(action, type) {
      console.log("单选", action, type);
    },
    async httpUpload(content, item) {
      console.log(754, content, item);
      item.uploadLoading = true;
      // console.log(756,uploadLoading)
      let formData = new FormData();
      formData.append("file", content.file);
      const res = await uploadFile(formData).catch((err) => {
        iMessage.error(this.$t("上传成功"));
      });
      iMessage.success(this.$t("上传失败"));
      let list = [];
      let previewList = this.questions;
      list.push({
        attachmentId: res.id,
        attachmentName: res.name,
        attachmentUrl: res.path,
        upLoadFileName: res.name,
      });
      if (previewList[this.listIndex].type == 9) {
        previewList[this.listIndex].sonQuestions[this.sonListIndex].answer =
          list;
        // if(previewList[this.listIndex].sonQuestions[this.sonListIndex].answer == null) {
        //   previewList[this.listIndex].sonQuestions[this.sonListIndex].answer = list;
        // }else {
        //   previewList[this.listIndex].sonQuestions[this.sonListIndex].answer = [...previewList[this.listIndex].sonQuestions[this.sonListIndex].answer, ...list]
        // }
      } else {
        previewList[this.listIndex].answer = list;
        // if(previewList[this.listIndex].answer == null) {
        //   previewList[this.listIndex].answer = list;
        // }else {
        //   previewList[this.listIndex].answer = [...previewList[this.listIndex].answer, ...list]
        // }
      }

      this.$refs["ruleForm"].clearValidate("attachments");

      item.uploadLoading = false;
    },
    beforeAvatarUpload(file, uploadRule) {
      console.log(653, file, uploadRule);
      const fileExtension = file.name.substring(file.name.lastIndexOf("."));
      console.log(768, uploadRule.indexOf(fileExtension));
      console.log(769, uploadRule, fileExtension);
      let isRule = uploadRule?.split(",");
      let isFileType;
      if (uploadRule) {
        isFileType = !isRule.includes(fileExtension);
        if (isFileType) {
          this.$message.error({
            message: "上传的文件类型为" + uploadRule,
            customClass: "uploadCss",
          });
        }
      }
      // const isLt15M = file.size / 1024 / 1024 < this.maxSize;

      // if (!isLt15M) {
      //   this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`);
      // }
      // return !isFileType && isLt15M;
      return !isFileType;
    },
    handleDeleteAccessory(val, index, sonIndex) {
      let list = this.questions;
      if (list[index].type == 9) {
        // list[index].sonQuestions[sonIndex].answer = list[index].sonQuestions[
        //   sonIndex
        // ].answer.filter((item) => {
        //   return !item.attachmentId.includes(val);
        // });
        list[index].sonQuestions[sonIndex].answer = null;
      } else {
        // list[index].answer = list[index].answer.filter((item) => {
        //   return !item.attachmentId.includes(val);
        // });
        list[index].answer = null;
      }
    },
    handleSubmit() {
      let flag = false;
      let sonFlag = false;
      let sonFlagArr = []
      let questionList = [];
      this.sonQuestions.map((it) => {
        if (it.type == 9) {
          sonFlagArr.push(this.doNotMake(it.sonQuestions))
          console.log(sonFlagArr)
          sonFlag = sonFlagArr.includes(true);
          console.log(82,sonFlag)
          return questionList.push(this.formateData(it));
        }
      });
      this.questions.map((e, index) => {
        if (
          e.type != 9 &&
          (!e.answer || e.answer.length == 0) &&
          e.requiredQuestion
        ) {
          flag = true;
        }
        if (e.type == 3 && e?.answer?.trim() == "" && e.requiredQuestion) {
          flag = true;
        }
        if (e.type == 7 || e.type == 8) {
          return;
        } else if (e.type != 9) {
          return questionList.push(this.formateData(e));
        }
      });

      if (flag || sonFlag) {
        if (document.getElementsByClassName("el-message").length === 0) {
          this.$message.error("请回答必答问题");
        }
        return;
      }

      questionList = questionList.filter((item) => item);
      if (document.getElementsByClassName("el-message").length === 0) {
        // isFlag = false
      } else {
        console.log(
          "错误信息进来了",
          document.getElementsByClassName("el-message")
        );
        return;
      }
      const formDate = {
        questions: questionList,
        surveyId: Number(this.ruleForm.id),
      };
      console.log(838, formDate);
      this.loading = true;
      saveAnswer(formDate)
        .then((res) => {
          this.loading = false;
          this.$message.success(`提交成功`);
          console.log("保存答案", res);
          let data = {
            name: this.ruleForm.name,
            closing: this.ruleForm.closing,
          };
          this.$router.push({
            name: "mobileFinish",
            params: data,
          });
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    doNotMake(questions) {
      let flag = false;
      console.log(81, questions);
      questions.map((e) => {
        if ((!e.answer || e.answer.length == 0) && e.requiredQuestion == true) {
          if (e.type == 3 && e?.answer?.trim() == "") flag = true;
          flag = true;
        }
      });
      return flag;
    },
    formateData(data, sondata) {
      let obj = {};
      if (data.type == 1) {
        if (!data.answer) return;
        obj = {
          questionId: data.id,
          questionType: data.type,
          options: data?.answer
            ? [
                {
                  id: data.answer.split("-")[0],
                  name: data.answer.split("-")[1],
                },
              ]
            : "",
        };
      } else if (data.type == 2) {
        console.log("gefasfwfwfa", data);
        if (!data.answer) return;
        obj = {
          questionId: data.id,
          questionType: data.type,
          options: this.formateList(data?.answer),
        };
        if (obj.options.length == 0) return;
        console.log(858, obj.options.length);
        this.checkMax = this.max(data);
        this.checkMin = this.min(data);
        const checkMax = this.max(data);
        const checkMin = this.min(data);
        console.log(
          859,
          this.min(data) > obj.options.length ||
            obj.options.length > this.max(data)
        );
        console.log(885, this.min(data), obj.options.length, this.max(data));
        if (checkMin && checkMax) {
          if (checkMin > obj.options.length || obj.options.length > checkMax) {
            if (document.getElementsByClassName("el-message").length === 0) {
              this.$message.error(
                `题目${data.code}，多选题最多选择${this.checkMax}，最少选择${this.checkMin}`
              );
              return;
            }
          }
        } else if (checkMin) {
          if (checkMin > obj.options.length) {
            if (document.getElementsByClassName("el-message").length === 0) {
              this.$message.error(
                `题目${data.code}，多选题最多选择${this.checkMax}，最少选择${this.checkMin}`
              );
              return;
            }
          }
        } else if (checkMax) {
          if (obj.options.length > checkMax) {
            if (document.getElementsByClassName("el-message").length === 0) {
              this.$message.error(
                `题目${data.code}，多选题最多选择${this.checkMax}，最少选择${this.checkMin}`
              );
              return;
            }
          }
        }
      } else if (data.type == 6) {
        if (!data.answer) return;
        obj = {
          questionId: data.id,
          questionType: data.type,
          options: data?.answer
            ? [
                {
                  id: data.answer.split("-")[0],
                  name: data.answer.split("-")[1],
                },
              ]
            : "",
        };
      } else if (data.type == 4) {
        if (!data.answer) return;
        obj = {
          questionId: data.id,
          questionType: data.type,
          answer: data.answer.split("-")[1],
          options: data?.answer
            ? [
                {
                  id: data.answer.split("-")[0],
                  name: data.answer.split("-")[1],
                },
              ]
            : "",
        };
      } else if (data.type == 3) {
        if (!data.answer) return;
        obj = {
          questionId: data.id,
          questionType: data.type,
          answer: data?.answer.trim(),
        };
      } else if (data.type == 5) {
        if (!data.answer || data.length) return;
        obj = {
          questionId: data.id,
          questionType: data.type,
          answer: data.answer
            ? data.answer[0].attachmentId +
              "." +
              (data.answer[0].upLoadFileName.length > 55
                ? data.answer[0].upLoadFileName.slice(-50)
                : data.answer[0].upLoadFileName)
            : null,
        };
      } else if (data.type == 9) {
        console.log(752, data);
        obj = {
          questionId: data.id,
          questionType: data.type,
          sonQuestions: data.sonQuestions.map((e) => {
            return this.formateData(e);
          }),
        };
        let sonQuestions = obj.sonQuestions.filter((item) => item);
        obj = { ...obj, sonQuestions };
        if (obj.sonQuestions.length == 0) return;
      }
      return obj;
    },

    formateList(data) {
      let list = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          list.push({
            id: data[i].split("-")[0],
            name: data[i].split("-")[1],
          });
        }
      }
      return list;
    },
    handleClick(index) {
      console.log("上传附件", index);
      this.listIndex = index;
    },
    handleSonClick(index, sonIndex) {
      console.log("上传附件2", index, sonIndex);
      this.listIndex = index;
      this.sonListIndex = sonIndex;
    },
    handleChange(index, action, type, sonIndex) {
      // console.log("多选", index, action, type, sonIndex);
      // if(type == 9){
      //   this.questions[index].sonQuestions[sonIndex].answer = this.sonCheckList;
      // }else {
      //   this.questions[index].answer = this.checkList;
      // }
      // console.log(this.questions);
    },
    query() {
      queryForAnswer({ id: this.id }).then((res) => {
        if (res.id == null) {
          let data = {
            name: res.name,
            closing: res.closing,
          };
          this.$router.push({ name: "mobileFinish", params: data });
          this.$message.error("重复答题");
          this.disabled = false;
        }
        console.log(res);
        this.ruleForm = res;
        this.formData = res;
        this.ruleForm.questions = this.ruleForm.questions.map((item) => {
          if (item.type == 2) item.answer = [];
          return {
            ...item,
            uploadLoading: false,
            sonQuestions: item?.sonQuestions?.map((it) => {
              if (it.type == 2) it.answer = [];
              return {
                ...it,
                uploadLoading: false,
              };
            }),
          };
        });
        this.disabled = true;
        console.log(1022, this.ruleForm);
      });
    },
  },
};
</script>
<style scoped lang="scss">
.optionItemScrow span:nth-child(2){
    white-space: normal !important;
    display: inline-table !important;
    line-height: initial !important;
}
.content .app-content ::v-deep {
  overflow: auto;
}
.pull-question-label {
  margin-bottom: 2rem;
}
.form-item-name {
  /* font-size: 1rem; */
  text-align: justify;
  font-weight: bold;
  color: #4d4f5c;
  .el-form-item ::v-deep {
    .el-form-item__label {
      /* font-size: 1rem; */
      text-align: justify;
      line-height: inherit;
      font-weight: bold;
      width: 100%;
      .flex-align-center {
        display: block;
      }
      .flex-align-center span:last-child {
        text-align: justify;
        font-weight: bold;
        font-size: 1rem;
      }
    }
  }
}
.pull-question {
  /* margin-top: 20px; */
  /* font-size: 5rem; */
  font-weight: 400;
  color: #424242;
  margin-bottom: 4rem;
  line-height: 1.2;
  .i-select {
    width: 100%;
  }
}
.onepic {
  .option {
    margin-top: 20px;
    .image-box {
      margin: 10px 0;
      width: 25%;
      height: auto;
      .avatar {
        margin: 10px 0;
        width: 100%;
        height: 100%;
        display: block;
        margin-left: 55px;
      }
    }
  }
}
.textarea {
  /* margin-bottom: 3rem; */
  /* margin-top: 39px; */
  ::v-deep .el-textarea__inner {
    /* box-shadow: 0 0 1rem rgb(0 38 98 / 15%); */
  }
}

.form-item-content {
  /* margin-top: 4rem; */
  margin-bottom: 1rem;
}
.is-checked ::v-deep {
  .el-radio__label {
    color: #4d4f5c;
  }
  .el-checkbox__label {
    color: #4d4f5c;
  }
}
.from-item-group ::v-deep {
  margin-left: 0.5rem;
  width: 100%;
  /* .is-checked {
    .el-radio__label {
      color: #4d4f5c;
    }
    .el-checkbox__label {
      color: #4d4f5c;
    }
  } */
  .el-checkbox {
    width: 100%;
    margin-bottom: 0.5rem;
    .el-checkbox__inner {
      width: 1rem;
      height: 1rem;
    }
    .el-checkbox__input .el-checkbox__inner::after {
      /* width: 2rem;
      margin-left: 0.5rem;
      padding-bottom:1rem;
      height: 5rem;
      background-color: #d10000; */
    }
  }
  .el-checkbox__label {
    /* padding-top: 2rem; */
    /* font-size: 1rem; */
    margin-left: 0.5rem;
  }
  .el-radio {
    width: 100%;
    margin-bottom: 0.5rem;
    .el-radio__inner {
      width: 1rem;
      height: 1rem;
    }
    .el-radio__input .el-radio__inner::after {
      /* width: 2rem;
      margin-left: 2rem;
      height: 5rem; */
    }
  }
  .el-radio__label {
    padding-top: 1rem;
    /* font-size: 1rem; */
    // margin-left: 1rem;
  }
}
.from-item-img-label {
  margin-bottom: 0.5rem;

  &.is-required {
    position: relative;
    padding-left: 10px;
    &::v-deep .start {
      position: absolute;
      left: 0;
      top: 0;
      margin-left: 0;
    }
  }
}
.from-item-img {
  margin-left: 0.5rem;
  margin-top: 1rem;
  width: 100%;
  .el-radio ::v-deep {
    width: 100%;
    .el-radio__input {
      vertical-align: top;
      /* margin-top: 1rem; */
    }
    .el-radio__inner {
      /* width: 1rem;
      height: 1rem; */
    }
    .el-radio__label {
      padding-top: 0.5rem;
      /* font-size: 5rem; */
      /* margin-left: 7rem; */
    }
  }
  .from-item-img-size {
    /* width: auto; */
    width: 10rem;
    max-width: 14rem;
    height: 5rem;
    height: 5rem;
    object-fit: contain;
    margin-top: 1rem;
  }
}
.from-item-tow {
  margin-left: 0.5rem;
  margin-top: 1rem;
  /* width: 100%; */
  .el-radio ::v-deep {
    width: 100%;
    .el-radio__input {
      vertical-align: top;
      /* margin-top: 1rem; */
    }
    .el-radio__inner {
      /* width: 1rem;
      height: 1rem; */
    }
    .el-radio__label {
      padding-top: 0.5rem;
      /* font-size: 5rem; */
      /* margin-left: 7rem; */
    }
  }
  .from-item-img-size {
    width: 5.8rem;
    height: 5rem;
    margin-top: 1rem;
  }
}
.el-form-item__label {
  width: 100%;
  ::v-deep .flex-align-center {
    display: block;
  }
  ::v-deep .flex-align-center span:last-child {
    text-align: justify;
    display: block;
  }
}

.form-item-content-checkbox {
  /* margin-top: 3rem;
  margin-bottom: 4rem; */
  .el-checkbox {
    width: 100%;
    /* margin-bottom: 3rem; */
  }
}
/* 横线 */
.form-item-line {
  width: auto;
  height: 0.2rem;
  background-color: #ccc;
  margin-bottom: 2rem;
}
.form-item-text {
  padding-top: 1.5rem;
  color: #ccc;
  text-align: justify;
  /* font-size: 1rem; */
  margin-bottom: 2rem;
}
::v-deep .el-checkbox__label {
  margin-left: 0.5rem;
}
::v-deep .upload-demo {
  /* margin-bottom: 2rem; */
  display: flex;
  flex-direction: column;
  .upload-limit {
    width: 100%;
    font-size: 0.5rem;
    font-weight: 400;
    color: #000000;
    margin-top: -0.8rem;
    font-weight: bold;
  }
  .upload-button {
    width: 100%;
    position: relative;
    height: 1.5rem;
    padding: 0;
    color: #fff;
    background-color: #1660f1;
    margin: 1rem 0;
    span {
      /* font-size: 1.2rem; */
    }
    .upload-text {
      position: absolute;
      right: 20px;
      img {
        width: 80%;
        height: 80%;
      }
    }
  }
}
.el-upload-list {
  margin-bottom: 2rem;
}
.el-upload-list__item {
  font-size: 0.7rem;
}

::v-deep .flex-align-center {
  align-items: initial;
  span:last-child {
    text-align: left;
    font-weight: 500;
    color: #000;
    /* font-size: 16px; */
    line-height: 1.3;
  }
  .start {
    line-height: 1.4;
  }
}
.routerpage {
  padding: 0;
}

.continer {
  /* padding: 60px 0; */
  /* width: 1440px; */
  /* margin: 0 auto; */
  /* background-color: #fff; */
  /* display: flex;
  justify-content: center; */
  .mobile {
    /* width: 375px; */
    .header {
      /* margin: 0 auto 19px; */
      /* width: 104%; */
      /* height: 56px; */
      font-size: 1rem;
      font-weight: 600;
      color: #000000;
      /* line-height: 28px; */
      background-color: #fff;
      text-align: center;
      padding: 1rem 1.8rem;
    }
    .body {
      /* width: 375px; */
      /* height: 3741px; */
      background: #f8f9fa;
      padding: 0.5rem 0.8rem;
      /* padding-top: 18px; */
      .title {
        /* width: 315px; */
        /* height: 75px; */
        word-break: break-all;
        font-size: 1rem;
        font-weight: 400;
        color: #424242;
        text-align: justify;
        padding: 1rem 1rem 1.5rem 1.2rem;
      }
      .content {
        /* width: 355px; */
        /* 临时设置高度 */
        /* height: 40rem;
        overflow: auto; */
        background: #ffffff;
        box-shadow: 0px 0px 0.1875rem 0px rgba(0, 0, 0, 0.1);
        border-color: transparent;
        border-radius: 8px;
        margin: 0 auto;
        padding: 0.5rem 1.5rem 1rem;
        .item {
          width: 100%;
          .upload-demo {
            width: 100%;
          }
          .question {
            /* font-size: 16px; */
            font-weight: 500;
            color: #d10000;
            line-height: 22px;
          }
          .el-form-item ::v-deep {
            .el-form-item__label {
              /* font-size: 1rem; */
              text-align: justify;
              line-height: inherit;
              font-weight: bold;
              width: 100%;
              .flex-align-center {
                display: block;
              }
              .flex-align-center span:last-child {
                text-align: justify;
                font-weight: bold;
                font-size: 1rem;
              }
              .is-required {
                position: relative;
                padding-left: 10px;
                .start {
                  position: absolute;
                  left: 0;
                  top: 0;
                  margin-left: 0;
                }
              }
            }

            .el-form-item__content {
              margin-bottom: 1rem;
              .form-item-multipleRule {
                margin-left: 0.5rem;
                color: #999999;
              }
              .el-select {
                /* height: 2rem; */
                /* box-shadow: 0 0 1rem rgb(0 38 98 / 15%); */
                margin-bottom: 1rem;
                .el-input__inner {
                  /* height: 2rem; */
                }
              }
              .is-focus {
                .el-input__suffix {
                  /* right: 4rem;
                  top: 3rem; */
                }
              }
              .el-input__suffix {
                /* height: 60%;
                right: 2rem; */
              }
              /* .el-input--suffix .is-focus{

              } */
            }
          }
        }
        .item1 {
          margin-bottom: 1rem;
        }

        .item + .item {
          margin-top: 1rem;
        }
      }
    }
    .submit-footer {
      /* width: 301px; */
      margin: 40px auto 0.5rem;
      margin-bottom: 1rem;
      /* padding-bottom: 1.5rem; */
      .submit {
        width: 90%;
        /* font-size: 1rem; */
        margin: 0 auto;
        display: block;
        padding: 0.5rem 0;

        /* margin-top: 0rem; */
      }
    }
  }
}
</style>


<style lang="scss">
html {
  font-size: 18px !important;
}
.el-select-dropdown__list {
  width: 300px;
  overflow: auto;
  /* height: 20rem; */
}
.selectOption {
  overflow: visible !important;
  text-overflow: clip !important;
  padding: 0 0.8rem;
  span{
    display: inline-block;
    padding-right: 15px;
  }
  /* height: 1rem;
  font-size: 0.5rem;
  margin: 1rem 0; */
}
</style>