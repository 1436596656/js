var t1 = new Date().getTime();
// 获取浏览器你去类型和版本 手机端直接获取手机型号
// 0728 10:06
function getBrowserInfo() {
  let agent = navigator.userAgent.toLowerCase();
  let regStr_ie = /msie[\d.]+/gi;
  let regStr_edge = /edg\/[\d.]+/gi;
  let regStr_ff = /firefox\/[\d.]+/gi;
  let regStr_chrome = /chrome\/[\d.]+/gi;
  let regStr_saf = /safari\/[\d.]+/gi;
  //IE
  if (agent.indexOf("msie") > 0) {
    return agent.match(regStr_ie);
  }
  //edge
  if (agent.indexOf("edg") > 0) {
    return agent.match(regStr_edge);
  }
  //firefox
  if (agent.indexOf("firefox") > 0) {
    return agent.match(regStr_ff);
  }
  //Chrome
  if (agent.indexOf("chrome") > 0) {
    return agent.match(regStr_chrome);
  }
  //Safari
  if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
    return agent.match(regStr_saf);
  }
}
function getChannelInfo() {
  var userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("chrome") > -1) {
    // 谷歌浏览器
    return "GOOGLE";
  } else if (userAgent.indexOf("bing") > -1) {
    // 必应浏览器
    return "BING";
  } else if (userAgent.indexOf("yahoo") > -1) {
    // 雅虎浏览器
    return "YAHOO";
  } else if (userAgent.indexOf("baidu") > -1) {
    // 百度浏览器
    return "BAIDU";
  } else if (userAgent.indexOf("yandex") > -1) {
    // 杨捷克斯浏览器
    return "YANDEX";
  } else {
    // 其他浏览器
    return "OTHER";
  }
}
function getSystem() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod")
  ) {
    return "IOS";
  } else if (userAgent.includes("android")) {
    return "Android";
  } else if (userAgent.includes("harmony")) {
    return "HarmonyOS";
  } else if (userAgent.includes("kaios")) {
    return "KaiOS";
  } else if (userAgent.includes("windows")) {
    return "windows";
  } else if (userAgent.includes("mac")) {
    return "Mac";
  } else {
    return "Other";
  }
}

class storageCache {
  _storageCache = null;

  constructor() {
    this._storageCache = sessionStorage;
  }

  getItem(key) {
    if (this._storageCache.getItem(key)) {
      return JSON.parse(this._storageCache.getItem(key));
    }
    return null;
  }

  setItem(key, value) {
    let v = JSON.stringify(value);
    this._storageCache.setItem(key, v);
  }
}

// 获取url参数
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable && pair[1] !== "undefined") {
      if (pair[1].indexOf("%") > -1) {
        pair[1] = decodeURI(pair[1]);
      }
      return pair[1];
    }
  }
  return false;
}
var abSourceURL = "";

function getSource() {
  // 获取url
  let url = window.location.href;

  let storageCacheCls = new storageCache();
  if (url.indexOf("source") >= 0) {
    abSourceURL = getQueryVariable("source");
    storageCacheCls.setItem("source", abSourceURL);
  } else {
    let sourceVal = storageCacheCls.getItem("source");
    if (sourceVal) {
      abSourceURL = sourceVal;
    } else {
      abSourceURL = "gwSEO"; // 页面内跳转
    }
  }

  // return abSourceURL/
}

getSource();

function linkDataSource(e) {
  // 区分移动端与PC端代码一 ipad属于移动端
  var equipment = null; // 终端
  var system = null; // 系统
  // var Channel = null
  var browser;
  if (
    /iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod|iPad/i.test(
      navigator.userAgent.toLowerCase()
    )
  ) {
    var device_type = navigator.userAgent;
    var md = new MobileDetect(device_type);
    var os = md.os(); // 获取系统
    var model = "";
    // ios 系统
    if (os == "iOS") {
      os = md.os() + md.version("iPhone"); // 获取系统版本
      model = md.mobile();
      equipment = "m";
      system = os.substring(0, os.indexOf("."));
      browser = WURFL.complete_device_name;
      browser = browser.replace(/\s*/g, "");

      // Android 系统
    } else if (os == "AndroidOS") {
      os = md.os() + md.version("Android"); // 获取系统版本
      equipment = "m";
      system = os;
      browser = WURFL.complete_device_name;
      if (browser.indexOf(" ") >= 0) {
        // browser = browser.replace(/ /g,'_')
        browser = browser.replace(/\s*/g, "");
      }
      if (browser.indexOf("-") >= 0) {
        browser = browser.replace(/-/g, "_");
      }
      if (browser.indexOf("+") >= 0) {
        browser = browser.replace("+", "_");
      }
    }
  } else {
    var version = navigator.userAgent;
    if (version.indexOf("Windows NT 5.0") != -1) {
      system = "windows 2000";
    } else if (version.indexOf("Windows NT 5.1") != -1) {
      system = "windows xp";
    } else if (version.indexOf("Windows NT 5.2") != -1) {
      system = "windows 2003";
    } else if (version.indexOf("Windows NT 6.0") != -1) {
      system = "windows vista";
    } else if (version.indexOf("Windows NT 6.1") != -1) {
      system = "windows 7";
    } else if (version.indexOf("Windows NT 6.2") != -1) {
      system = "windows 8";
    } else if (version.indexOf("Windows NT 10.0") != -1) {
      system = "windows 10";
    } else {
      system = "Mac";
    }
    system = system.replace(/\s*/g, "");
    equipment = "pc";

    browser = getBrowserInfo();
    browser = browser[0].substring(0, browser[0].indexOf("/") + 3);
    browser = browser.replace("/", "_");
  }

  let source =
    "?source=" + abSourceURL + "-" + equipment + "-" + system + "-" + browser;

  let href = $(e).attr("href");
  let dataSource = $(e).attr("data-source") || "";
  let urlPath = window.location.pathname;
  urlPath = urlPath.replace(/^\//, "");
  urlPath = urlPath.replaceAll("/", "_");
  if (!urlPath) {
    urlPath = "home";
  }
  // source 外部参数，window.location.pathname 当前页面 url path
  let hrefAttrString = href + source + "-" + urlPath;

  if (dataSource) {
    hrefAttrString += "-" + dataSource;
  }

  console.log(href, source);
  //如果 href 未追加 朔源参数
  if (href.indexOf(source) === -1) {
    $(e).attr("href", hrefAttrString);
  }
}
const getUniqueCode = async () => {
  // const fp = await FingerprintJS.load({screen_resolution:true});

  // const result =await fp.get();

  // const visitorId = result.visitorId;
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  console.log(result, result.visitorId, "======FingerprintJS======");
  const uuid = result.visitorId;
  console.log(uuid, "===uuid===FingerprintJS======");
  return uuid;
};
function getSearchEngineReferrer() {
  const referrer = document.referrer;
  console.log("Search Engine Referrer:", referrer);
  return referrer;
}

const behaviorUpdate = (e) => {
  // let devUrl = "https://dev-plat.cnabke.com";
  // let testUrl = "https://test-plat.cnabke.com";
  // let masterUrl = "https://plat.cnabke.com";
  // let nowUrl = "";
  // // let url = "/app-crm/data/user/gw/create";
  // let url = "/app-cms/website/inquiry/websiteBehavior/create";
  // if (window.location.hostname.indexOf("dev-") !== -1) {
  //   nowUrl = devUrl + url;
  // } else if (
  //   window.location.hostname.indexOf("test") !== -1 ||
  //   window.location.hostname.indexOf("localhost") !== -1
  // ) {
  //   nowUrl = testUrl + url;
  // } else {
  //   nowUrl = masterUrl + url;
  // }
  const nowUrl = document.getElementById("websiteBehaviorUrl").value;
  let log = sessionStorage.getItem("userBehaviorLog")
    ? JSON.parse(sessionStorage.getItem("userBehaviorLog"))
    : {};
  log.useTime = new Date().getTime() - log?.startTime;
  const newLog = {
    ...log,
    functions: [],
  };
  log = JSON.stringify(log);
  sessionStorage.setItem("userBehaviorLog", JSON.stringify(newLog));
  // sessionStorage.removeItem("userBehaviorLog");
  window.localStorage.removeItem("urlArr");
  console.log(log, "navigator.sendBeacon");
  return navigator.sendBeacon(nowUrl, log);
};

const UserActiveLog = {
  startTime: new Date().getTime(), // 进入页面时间
  visitorId: "", // 浏览器指纹
  timer: 0, // 用户离开时间计时器
  timeNum: 0, // 用户离开时间 (秒)
  constructor() {
    // console.log('========constructorconstructorconstructor==========', this.startTime);
    // window.addEventListener('beforeunload', behaviorUpdate, false);
    // this.initFingerprintJS();
    this.bindBehaviorEvent();
    this.leaveTimer();
  },

  onBehaviorUpdate(from) {
    behaviorUpdate();
  },

  setUserBehaviorLogField(fields) {
    // console.log(fields, sessionStorage.getItem('userBehaviorLog'), '--------fieldsfieldsfields------------');
    if (sessionStorage.getItem("userBehaviorLog")) {
      // 有缓存就读缓存，然后向缓存里添加新的数据
      let log = JSON.parse(sessionStorage.getItem("userBehaviorLog"));
      // for (const item of fields) {
      //   log[key] = val;
      // }

      Object.keys(fields).forEach((key) => {
        log[key] = fields[key];
        // log.sourcePageName = urlPath;
      });
      // console.log(log, '--------loglog--------');

      let userUpdateData = JSON.stringify(log);
      sessionStorage.setItem("userBehaviorLog", userUpdateData);
    }
  },

  /**
   * 计算用户离开时间
   * 超过3分钟自动上传用户记录
   * */
  leaveTimer() {
    let that = this;
    this.timer = setInterval(() => {
      that.timeNum++;
      if (that.timeNum >= 60 * 3) {
        //    用户离开3分钟
        behaviorUpdate();
        that.timeNum = 0;
        clearInterval(that.timer);
      }
    }, 1000);
  },
  /**
   * 创建默认用户轨迹缓存方法
   * */
  async initFingerprintJS() {
    // Initialize an agent at application startup.
    // const fpPromise = FingerprintJS.load()
    // Get the visitor identifier when you need it.
    // fpPromise.then(function(fp){ return fp.get()}).then( function(result) {
    const uuid = await getUniqueCode();
    const referrer = sessionStorage.getItem("referrer")
      ? sessionStorage.getItem("referrer")
      : getSearchEngineReferrer(); // 搜索引擎
    sessionStorage.setItem("referrer", referrer);

    const formParam = sessionStorage.getItem("formParam")
      ? JSON.parse(sessionStorage.getItem("formParam"))
      : {
          // isOpenTheForm: false,
          // isToInputTheForm: false,
          responseTime: new Date().getTime() - t1,
          isSuccessVisit: true,
        };
    sessionStorage.setItem("formParam", JSON.stringify(formParam));

    const urlObject = new URL(window.location.href);
    // const query = urlObject.search.slice(1);
    const query = window.location.href;
    let urlCache = sessionStorage.getItem("urlCache")
      ? JSON.parse(sessionStorage.getItem("urlCache"))
      : [];
    urlCache.push(query);
    sessionStorage.setItem("urlCache", JSON.stringify(urlCache));
    console.log("uuid", uuid);
    this.visitorId = uuid;
    //   const pageId = document.getElementById('pageId').value
    // const inquiryPackageId = document.getElementById("inquiryPackageId").value;
    const inquiryPackageId = document.getElementById("inquiryPackageId").value;
    const dataTemplateId = document.getElementById("dataTemplateId").value;
    const entityId = document.getElementById("entityId").value;
    const websiteBehaviorUrl =
      document.getElementById("websiteBehaviorUrl").value;
    var browser = getBrowserInfo();
    // var channel = getChannelInfo();
    var system = getSystem(),
      browser = browser[0].substring(0, browser[0].indexOf("/") + 3);
    browser = browser.replace("/", "_");
    console.log(this);
    let urlPath = window.location.pathname;
    urlPath = urlPath.replace(/^\//, "");
    urlPath = urlPath.replaceAll("/", "_");
    const log = {
      sourceData: {
        referrer,
        query,
      },
      isSubmitInquiry: false,
      startTime: new Date().getTime(),
      browser: browser,
      browserSize: window.innerWidth + "*" + window.innerHeight,
      browserVersion: browser,
      // channel: channel,
      core: "",
      domainName: window.location.host,
      // domainName: window.location.href.split('?')[0],
      functions: [],
      isSuccess: false,
      pageCode: urlPath,
      pageName: document.title || "未知",
      pageUrl: window.location.href,
      language: localStorage.getItem("language"),
      requester: this.visitorId,
      sourcePageCode: document.referrer,
      sourcePageName: document.referrer,
      system: system,
      useTime: 0,
      dataTemplateId: dataTemplateId,
      inquiryPackageId: inquiryPackageId,
      entityId: entityId,
      websiteBehaviorUrl: websiteBehaviorUrl,
      websiteId: "65c08cd9bd3e1053ee1b07e3",
      ...formParam,
      isStart: urlCache.length === 1 ? true : false,
      isOpenTheForm: false,
      isToInputTheForm: false,
      // pageId: pageId,
    };
    let userUpdateData = JSON.stringify(log);
    sessionStorage.setItem("userBehaviorLog", userUpdateData);
    // })
  },
  /**
   * 绑定用户行为事件（默认）
   */
  bindBehaviorEvent() {
    // document.removeEventListener('click',(event) => {}, true);
    document.addEventListener(
      "click",
      (event) => {
        event.stopImmediatePropagation();
        let that = this;
        try {
          clearInterval(this.timer);
          that.timeNum = 0;
          that.leaveTimer();
          let pathArr =
            event.path || (event.composedPath && event.composedPath());
          // console.log(pathArr, '====pathArr');
          let target;
          let isStatic = false;
          for (let i = 0; i < pathArr.length; i++) {
            isStatic = that.isUserBehavior(pathArr[i]);
            if (isStatic) {
              target = pathArr[i];
              break;
            }
          }
          let btnText = event.target.innerText
            ? event.target.innerText
            : event.target.value;
          console.log(btnText, "btnText");
          if (isStatic && btnText) {
            // 去除开头结尾换行符
            btnText = btnText.replace(/[\n\r]/g, "");
            // if (btnText && btnText.indexOf('（')) {
            //     btnText = btnText.split('（')[0];
            // }
            //使用json格式，以后方便扩展其他数据 比如加入自定义标签属性等
            that.saveLog({
              optName: btnText.trim(),
            });
          }
        } catch (e) {
          console.log(e);
        }
      },
      false
    );
  },

  /**
   * 判断是否为公用的元素 用于记录用户行为
   * @param target 点击对象
   */
  isUserBehavior(target) {
    // 冒泡到document事件容错
    if (target.nodeName !== undefined) {
      if (target.nodeName.toLowerCase() === "a") return true;
      if (
        target.nodeName.toLowerCase() === "button" ||
        target.type === "button" ||
        target.type === "submit"
      )
        return true;
      // if (target.className && (target.className.indexOf('ant-tabs-tab') > -1 || target.className.indexOf('screenItem') > -1 )) return true;
    }
  },

  /**
   * 用户行为记录保存到本地
   * @param  behaviorInfo 在点击按钮时，传入的用户点击信息
   */
  saveLog(behaviorInfo) {
    const sourcePageCode = getQueryVariable("sourcePageCode");
    const sourcePageName = getQueryVariable("sourcePageName");
    console.log(sessionStorage.getItem("userBehaviorLog"), "saveLog");
    if (sessionStorage.getItem("userBehaviorLog")) {
      // 有缓存就读缓存，然后向缓存里添加新的数据
      let log = JSON.parse(sessionStorage.getItem("userBehaviorLog"));
      log.functions.push(behaviorInfo.optName);
      console.log(log.functions, "log.functions");
      let userUpdateData = JSON.stringify(log);
      sessionStorage.setItem("userBehaviorLog", userUpdateData);
      // behaviorUpdate();
    } else {
      // 没有缓存 说明是新进入页面，创建数据，写入缓存
      this.startTime = new Date().getTime();
      this.initFingerprintJS;
    }
  },

  urlCache() {
    // 进入过那些页面存在缓存里
    let urlPath = window.location.pathname;
    urlPath = urlPath.replace(/^\//, "");
    urlPath = urlPath.replaceAll("/", "_");
    if (window.localStorage.getItem("urlArr")) {
      let urlArr = JSON.parse(window.localStorage.getItem("urlArr"));
      if (Object.prototype.toString.call(urlArr) === "[object String]") {
        urlArr = JSON.parse(urlArr);
      }
      urlArr.push({ sourcePageCode: urlPath, sourcePageName: urlPath });
      window.localStorage.setItem("urlArr", JSON.stringify(urlArr));
    } else {
      window.localStorage.setItem("urlArr", JSON.stringify("[]"));
      let urlArr = JSON.parse(window.localStorage.getItem("urlArr"));
      if (Object.prototype.toString.call(urlArr) === "[object String]") {
        urlArr = JSON.parse(urlArr);
      }
      urlArr.push({ sourcePageCode: urlPath, sourcePageName: urlPath });
      window.localStorage.setItem("urlArr", JSON.stringify(urlArr));
    }
  },
  openNewHtml(id) {
    let url = window.location.origin + "/school/content/" + id + ".html";
    window.open(url, "_self");
  },
};
// window.onload = function () {
UserActiveLog.constructor();
await UserActiveLog.initFingerprintJS();
// UserActiveLog.onBehaviorUpdate();
UserActiveLog.urlCache();
// };

window.addEventListener("error", (event) => {
  const formParam = sessionStorage.getItem("formParam")
    ? JSON.parse(sessionStorage.getItem("formParam"))
    : {
        // isOpenTheForm: false,
        // isToInputTheForm: false,
        responseTime: 0,
        isSuccessVisit: true,
      };
  formParam.isSuccessVisit = false;
  sessionStorage.setItem("formParam", JSON.stringify(formParam));
  UserActiveLog.onBehaviorUpdate();
});
window.addEventListener("load", () => {
  fetch(window.location.href)
    .then((response) => {
      if (response.status === 404) {
        const formParam = sessionStorage.getItem("formParam")
          ? JSON.parse(sessionStorage.getItem("formParam"))
          : {
              // isOpenTheForm: false,
              // isToInputTheForm: false,
              responseTime: 0,
              isSuccessVisit: true,
            };
        formParam.isSuccessVisit = false;
        sessionStorage.setItem("formParam", JSON.stringify(formParam));
        // UserActiveLog.onBehaviorUpdate();
      }
    })
    .catch((error) => {
      const formParam = sessionStorage.getItem("formParam")
        ? JSON.parse(sessionStorage.getItem("formParam"))
        : {
            // isOpenTheForm: false,
            // isToInputTheForm: false,
            responseTime: 0,
            isSuccessVisit: true,
          };
      formParam.isSuccessVisit = false;
      sessionStorage.setItem("formParam", JSON.stringify(formParam));
      // UserActiveLog.onBehaviorUpdate();
    });
});

function calculatePageLoadTime() {
  const pageLoadTime = new Date().getTime() - t1;
  const formParam = sessionStorage.getItem("formParam")
    ? JSON.parse(sessionStorage.getItem("formParam"))
    : {
        // isOpenTheForm: false,
        // isToInputTheForm: false,
        responseTime: 0,
        isSuccessVisit: true,
      };
  formParam.responseTime = pageLoadTime;
  sessionStorage.setItem("formParam", JSON.stringify(formParam));
  UserActiveLog.onBehaviorUpdate();
}

// 在页面加载完成时计算并显示页面加载时长
window.addEventListener("load", function () {
  calculatePageLoadTime();
});
window.UserActiveLog = UserActiveLog;
