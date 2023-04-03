/*
 * @Author: YoHo
 * @Date: 2023-03-30 23:47:34
 * @LastEditors: YoHo && 917955345@qq.com
 * @FilePath: \front-portal\src\components\iLayout\components\jiraCollector\jquery.collector.js
 * @Description: In User Settings Edit
 */
// index.js
window._atl_jic_parameters = "{\"baseUrl\":\"http://jira.csvw.com\",\"collectorId\":\"6079ad15\",\"loadingText\":\"\u6B63\u5728\u4E0A\u4F20\u95EE\u9898\u6536\u96C6\u5668\"}";
; (function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'), window._atl_jic_parameters)
  } else {
    factory(jQuery, window._atl_jic_parameters)
  }
})(function (jQuery, parametersJson) {
  function parseParameters() {
    try {
      return JSON.parse(parametersJson)
    } catch (e) {
      console.error("Error parsing passed parameters JSON", parametersJson);
      return {}
    }
  }
  function toEmptyIfNull(value) {
    if (value) {
      return value
    }
    return ""
  }
  const parameters = parseParameters();
  const baseUrl = toEmptyIfNull(parameters.baseUrl);
  const collectorId = toEmptyIfNull(parameters.collectorId);
  const loadingText = toEmptyIfNull(parameters.loadingText);
  $ = jQuery.noConflict(true);
  if (typeof window.jQuery === "undefined") { window.jQuery = $ }
  if (typeof window.$ === "undefined") { window.$ = $ }
  var ATL_JQ = function () { return $.apply($, arguments) };
  var css = `.atlwdg-blanket {
      background: black;
      height: 100%;
      left: 0;
      opacity: .5;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000000;
    }
    .atlwdg-popup {
      background: white;
      border: 1px solid #ccc;
      position: fixed;top: 0;
      right: 0;bottom: 0;left: 0;
      margin: auto;z-index: 10000011;
      border-radius: 5px;
      background-clip: padding-box;
      overflow: hidden;
      width: 810px;
      height: 0;
      max-height: calc(100% - 100px);
    }
    #atlwdg-frame {
      height: 100%;width: 100%;
    }
    .atlwdg-hidden {
      visibility: hidden;
    }
    .atlwdg-trigger {
      position: fixed;
      background: #205081;
      padding: 5px;
      border: 2px solid white;
      border-top: none;
      font-weight: bold;
      color: white !important;
      display: block;
      white-space: nowrap;
      text-decoration: none !important;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12px;
      -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      border-radius: 0 0 5px 5px;
      z-index:99999;
    }
    .atlwdg-trigger.atlwdg-TOP {
      left: 45%;top: 0;
    }
    .atlwdg-trigger.atlwdg-RIGHT {
      left: 100%;
      top: 40%;
      -webkit-transform: rotate(90deg);
      -webkit-transform-origin: top left;
      -moz-transform: rotate(90deg);
      -moz-transform-origin: top left;
      -ms-transform: rotate(90deg);
      -ms-transform-origin: top left;
      transform: rotate(90deg);
      transform-origin: top left;
    }
    .atlwdg-trigger.atlwdg-SUBTLE {
      right: 0;
      bottom: 0;
      border: 1px solid #ccc;
      border-bottom: none;
      border-right: none;
      background-color: #f5f5f5;
      color: #444 !important;
      font-size: 11px;
      padding: 6px;
      -webkit-box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.5);
      box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.5);
      border-radius: 2px 0 0 0;
    }
    .atlwdg-loading {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      height: 40px;
      width: 40px;
      z-index: 1000001;
      border-radius: 5px;
      background-color: #fff;
      background-image: url('data:image/gif;base64,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');
      background-repeat: no-repeat;
      background-position: center center;
    }
    @media print {
      .atlwdg-trigger { 
        display: none;
       }
    }`;
  var cssIE = ".atlwdg-trigger {position: absolute;}.atlwdg-blanket {position: absolute;filter: alpha(opacity=50);width: 110%;}.atlwdg-popup {position: absolute;}.atlwdg-trigger.atlwdg-RIGHT {left: auto;right: 0;filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);}";
  ATL_JQ.isQuirksMode = function () { return document.compatMode != "CSS1Compat" };
  ATL_JQ.IssueDialog = function (options) {
    var $body = $("body"), that = this, showDialog = function () { that.show(); return false };
    if (!options.baseUrl) { options.baseUrl = baseUrl }
    this.options = options;
    this.frameUrl = options.baseUrl + "/rest/collectors/1.0/template/form/" + this.options.collectorId + "?os_authType=none";
    $("head").append("<style type='text/css'>" + css + "</style>");
    if (this.options.triggerPosition === "CUSTOM") {
      var oldTriggerFunction;
      if (this.options.triggerFunction) {
        try { oldTriggerFunction = eval("(" + this.options.triggerFunction + ")") } catch (ex) { }
      }
      $(function () {
        try {
          var newTriggerFunction;
          if (
            window.ATL_JQ_PAGE_PROPS && (
              (window.ATL_JQ_PAGE_PROPS.triggerFunction) || (window.ATL_JQ_PAGE_PROPS[collectorId] && window.ATL_JQ_PAGE_PROPS[collectorId].triggerFunction)
            )
          ) {
            newTriggerFunction = window.ATL_JQ_PAGE_PROPS.triggerFunction || window.ATL_JQ_PAGE_PROPS[collectorId].triggerFunction
          } else {
            newTriggerFunction = oldTriggerFunction
          }
          if (typeof newTriggerFunction === 'function') { newTriggerFunction(showDialog) }
        } catch (ex) { }
      })
    } else {
      if (typeof this.options.triggerPosition === 'function') {
        try { this.options.triggerPosition(showDialog) } catch (ex) { }
      } else {
        if (this.options.triggerPosition && this.options.triggerText) {
          var triggerClass = "atlwdg-trigger atlwdg-" + this.options.triggerPosition; var $trigger = $("<a href='#' id='atlwdg-trigger'/>").addClass(triggerClass).text(this.options.triggerText); $body.append($trigger); $trigger.click(showDialog)
        }
      }
    }
    var $iframeContainer = $("<div id='atlwdg-container'/>").addClass("atlwdg-popup atlwdg-hidden");
    var $blanket = $("<div id='atlwdg-blanket' class='atlwdg-blanket'/>").hide();
    $body.append($blanket).append($iframeContainer);
    var browser = (function (userAgent) {
      userAgent = userAgent.toLowerCase();
      var match = /(msie) ([\w.]+)/.exec(userAgent) || [];
      return { isIE: (match[1]) ? true : false, version: match[2] || "0" }
    }
    )(navigator.userAgent);
    if (browser.isIE && (ATL_JQ.isQuirksMode() || browser.version < 9)) {
      $("head").append("<style type='text/css'>" + cssIE + "</style>");
      var triggerAdjuster = function (e) { };
      if (this.options.triggerPosition === "TOP") {
        triggerAdjuster = function (e) {
          $("#atlwdg-trigger").css("top", $(window).scrollTop() + "px")
        }
      } else {
        if (this.options.triggerPosition === "RIGHT") {
          triggerAdjuster = function (e) {
            var $trigger = $("#atlwdg-trigger");
            $trigger.css("top", ($(window).height() / 2 - $trigger.outerWidth() / 2 + $(window).scrollTop()) + "px");
            if (!ATL_JQ.isQuirksMode() && browser.version === "8.0") {
              $trigger.css("right", -($trigger.outerHeight() - $trigger.outerWidth()) + "px")
            }
          }
        } else {
          if (this.options.triggerPosition === "SUBTLE") {
            var outerHeight = $trigger.outerHeight(); triggerAdjuster = function (e) {
              var $window = $(window); $trigger.css("top", ($window.scrollTop() + $window.height() - outerHeight) + "px")
            }
          }
        }
      } $(window).bind("scroll resize", triggerAdjuster); triggerAdjuster()
    }
  };
  ATL_JQ.IssueDialog.prototype = {
    hideDialog: undefined, show: function () {
      var that = this,
        $iframeContainerElem = $("#atlwdg-container"),
        $body = $("body"),
        $iframeElem = $('<iframe id="atlwdg-frame" scrolling="no" frameborder="0" src="' + this.frameUrl + '"></iframe>'),
        $loadingImage = $('<div id="atlwdg-loading" class="atlwdg-loading" title="' + loadingText + '" tabindex="0"></div>');
      $iframeContainerElem.css("height", "600px"); hideDialog = function (e) {
        if (e.keyCode === 27) { that.hide() }
      };
      $loadingImage.appendTo("body");
      $loadingImage.show(); $loadingImage.focus();
      $body.css("overflow", "hidden").keydown(hideDialog);
      window.scroll(0, 0);
      console.log('window.frames=>',window.frames);
      window.frames.Cookies.set('atlassian.xsrf.token','TEST')
      var feedbackString = "";
      if (this.options.collectFeedback) {
        var feedbackObject = this.options.collectFeedback();
        feedbackString = [];
        for (var prop in feedbackObject) {
          if (feedbackObject.hasOwnProperty(prop) && feedbackObject[prop] && typeof feedbackObject[prop] === "string") {
            feedbackString.push("*" + prop + "*: " + feedbackObject[prop])
          }
        }
        feedbackString = feedbackString.join("\n")
      }
      var fieldValues = {};
      if (this.options.fieldValues && !$.isEmptyObject(this.options.fieldValues)) {
        $.extend(fieldValues, this.options.fieldValues)
      }
      $iframeElem.on("load", function () {
        var message = {
          messageType: "collector.iframe.loaded",
          feedbackString: feedbackString,
          fieldValues: fieldValues
        };
        $iframeElem[0].contentWindow.postMessage(JSON.stringify(message), that.options.baseUrl)
      });
      $iframeContainerElem.show();
      if (this.options.customHeight) {
        setDialogHeight(this.options.customHeight)
      }
      $(window).bind("message", function (e) {
        if (e.originalEvent.source === $iframeElem[0].contentWindow && e.originalEvent.data) {
          if (e.originalEvent.data === "cancelFeedbackDialog") {
            that.hide()
          } else {
            if (e.originalEvent.data === "collectorLoaded") {
              $loadingImage.remove();
              $iframeContainerElem.removeClass("atlwdg-hidden")
            } else {
              if (!that.options.customHeight) {
                try {
                  var data = JSON.parse(e.originalEvent.data);
                  setDialogHeight(data.frameHeight)
                } catch (e) { }
              }
            }
          }
        }
      });
      var dummyElement = document.createElement("a");
      dummyElement.href = baseUrl;
      $iframeContainerElem.append($iframeElem);
      $("#atlwdg-blanket").show()
    },
    hide: function () {
      $("body").css("overflow", "auto").off("keydown", hideDialog);
      $("#atlwdg-container").addClass("atlwdg-hidden").hide().empty();
      $("#atlwdg-blanket").hide()
    }
  };
  var filterStrings = function (obj, recursingIn) {
    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) { continue }
      var value = obj[key];
      if (recursingIn === undefined && Array.isArray(value)) {
        filterStrings(value, key); continue
      }
      if (typeof value !== "string") {
        var paramName = recursingIn === undefined ? key : recursingIn + ":" + key;
        console.log("bootstrap.js:filterStrings ignoring key for value '" + paramName + "'; typeof must be string");
        delete obj[key]
      }
    } return obj
  };
  function setDialogHeight(height) {
    $("#atlwdg-container").css("height", height)
  }
  ATL_JQ(function () {
    console.log('collectorId=>', collectorId);
    if (collectorId === "" && typeof ATL_JQ_CONFIGS == "undefined") { return }
    var showTrigger = function (triggerConfig, collectorId) {
      if (!triggerConfig.enabled) { return }
      var collectFeedback = false;
      var defaultFieldValues = {};
      var customHeight;
      if (window.ATL_JQ_PAGE_PROPS) {
        defaultFieldValues = window.ATL_JQ_PAGE_PROPS.fieldValues;
        if (window.ATL_JQ_PAGE_PROPS.hasOwnProperty(collectorId)) {
          defaultFieldValues = window.ATL_JQ_PAGE_PROPS[collectorId].fieldValues
        }
        if (typeof defaultFieldValues === 'function') {
          $.extend(defaultFieldValues, filterStrings(defaultFieldValues()))
        } else {
          if ($.isPlainObject(defaultFieldValues)) {
            $.extend(defaultFieldValues, filterStrings(defaultFieldValues))
          }
        }
      }
      if (triggerConfig.recordWebInfo) {
        var environmentProps = {
          Location: window.location.href,
          Referrer: document.referrer,
          "User-Agent": navigator.userAgent,
          "Screen Resolution": screen.width + " x " + screen.height
        };
        if (window.ATL_JQ_PAGE_PROPS) {
          var feedbackProps = window.ATL_JQ_PAGE_PROPS.environment;
          if (window.ATL_JQ_PAGE_PROPS.hasOwnProperty(collectorId)) {
            feedbackProps = window.ATL_JQ_PAGE_PROPS[collectorId].environment
          }
          if (typeof feedbackProps === 'function') {
            $.extend(environmentProps, feedbackProps())
          } else {
            $.extend(environmentProps, feedbackProps)
          }
        }
        collectFeedback = function () {
          return environmentProps
        }
      }
      if (window.ATL_JQ_PAGE_PROPS && window.ATL_JQ_PAGE_PROPS.height) {
        customHeight = window.ATL_JQ_PAGE_PROPS.height
      }
      new ATL_JQ.IssueDialog({
        collectorId: collectorId,
        fieldValues: defaultFieldValues,
        collectFeedback: collectFeedback,
        triggerText: triggerConfig.triggerText,
        triggerPosition: triggerConfig.triggerPosition,
        triggerFunction: triggerConfig.triggerFunction,
        baseUrl: triggerConfig.baseUrl,
        customHeight: customHeight
      })
    };
    if (typeof ATL_JQ_CONFIGS != "undefined") {
      for (var id in ATL_JQ_CONFIGS) {
        var config = ATL_JQ_CONFIGS[id];
        delete ATL_JQ_CONFIGS[id];
        showTrigger(config, id)
      }
    } else {
      $.ajax({
        url: baseUrl + "/rest/collectors/1.0/configuration/trigger/" + collectorId + "?preview=true&locale=zh_CN",
        dataType: "jsonp",
        crossDomain: true,
        jsonpCallback: "trigger_" + collectorId,
        cache: true,
        success: function (result) {
          console.log(result);
          showTrigger(result, collectorId)
        }
      })
    }
  });
  if (collectorId === "") { window.ATL_JQ = ATL_JQ }
})