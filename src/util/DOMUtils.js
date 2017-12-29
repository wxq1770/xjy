
/**
 * [toTitleCase [to Camel-Case]]
 * @return String
 */
String.prototype.toTitleCase = function String_toTitleCase() { // eslint-disable-line
  return this.replace(/\w\S*/g, function(txt) { // eslint-disable-line
    return txt.split('-').map(function(t) { // eslint-disable-line
      return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    }).join('-');
  });
};

/**
 * [ellipsis [ellipsis string by width and font-size]]
 * @param  {[type]} width    [description]
 * @param  {[type]} fontSize [description]
 * @return {[type]}          [description]
 */
String.prototype.ellipsis = function String_ellipsis(width, fontSize) {
  if (width < 5) return '...';
  if (!fontSize) fontSize = '12px';
  let text = this.toString();
  if (text.getClientRect({ fontSize }).width > width) {
    while (text.getClientRect({ fontSize }).width > width) {
      text = text.slice(0, -1);
    }
    return `${text}...`;
  }
  return text;
};

/**
 * [toClassName [transform string to legal classname]]
 * @return {[type]} [description]
 */
String.prototype.toClassName = function String_toClassName() {
  return this.toString().replace(/[^A-Za-z0-9_\u4e00-\u9fa5]/gi, '-');
}

/**
 * [ellipsis [ellipsis html content by width]]
 * @param  {[type]} width [description]
 * @return {[type]}       [description]
 */
HTMLElement.prototype.ellipsis = function HTMLElement_ellipsis(width) {
  if (width < 5) return;
  const el = this;
  let text = this.textContent;
  if (typeof el.getSubStringLength !== "undefined") {
    el.textContent = text;
    let len = text.length;
    while (el.getSubStringLength(0, len--) > width) { // eslint-disable-line
      el.textContent = `${text.slice(0, len)}-`;
    }
  } else if (typeof el.getComputedTextLength !== "undefined") {
    while (el.getComputedTextLength() > width) {
      text = text.slice(0, -1);
      el.textContent = `${text}-`;
    }
  } else {
    // the last fallback
    while (el.getBBox().width > width) {
      text = text.slice(0, -1);
      // we need to update the textContent to update the boundary width
      el.textContent = `${text}-`;
    }
  }
};

/**
 * [attr [shortcut to set element style attribute property]]
 * @param  {[type]} attr  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
HTMLElement.prototype.attr = function HTMLElement_attr(attr, value) {
  const property = this.getAttribute('style');
  const styles = property ? property.split(';') : [];
  const stylesAttrArr = styles.map(s => s.split(':')[0]);
  function replaceOrSetAttr(a, b) {
    const attrInArr = stylesAttrArr.indexOf(a);
    const style = `${a}:${b}`;
    if (attrInArr !== -1) {
      styles[attrInArr] = style;
    } else {
      styles.push(style);
    }
  }
  if (Array.isArray(attr) && Array.isArray(value)) {
    attr.map((a, i) => replaceOrSetAttr(a, value[i]));
  } else {
    replaceOrSetAttr(attr, value);
  }
  this.setAttribute('style', styles.join(';'));
  return this;
};

/**
 * [removeAttr [shortcut to remove element style attribute property]]
 * @param  {[type]} attr [description]
 * @return {[type]}      [description]
 */
HTMLElement.prototype.removeAttr = function HTMLElement_removeAttr(attr) {
  const property = this.getAttribute('style');
  const styles = property ? property.replace(/\s/g, '').split(';') : [];
  const stylesAttrArr = styles.map(s => s.split(':')[0]);
  const attrInArr = stylesAttrArr.indexOf(attr);
  if (attrInArr !== -1) {
    styles.splice(attrInArr, 1);
    this.setAttribute('style', styles.join(';'));
  }
  return this;
};

/**
 * [move [move array item]]
 * @param  {[type]} old_index [description]
 * @param  {[type]} new_index [description]
 * @return {[type]}           [description]
 */
Array.prototype.move = function Array_remove(old_index, new_index) {
  while (old_index < 0) {
    old_index += this.length;
  }
  while (new_index < 0) {
    new_index += this.length;
  }
  if (new_index >= this.length) {
    var k = new_index - this.length;
    while ((k--) + 1) {
      this.push(undefined);
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0]);
  return this; // for testing purposes
};

/**
 * [isEqual description]
 * @param  {[type]}  arr1 [description]
 * @param  {[type]}  arr2 [description]
 * @return {Boolean}      [description]
 */
Array.prototype.isEqualTo = function Array_isEqualTo(arr2) {
  if (this.length !== arr2.length) return false;

  for (let i = this.length; i--;) {
    if (this[i] !== arr2[i]) return false;
  }

  return true;
}

/**
 * [cloneByJSON [simple deepclone object/array]]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
window.cloneByJSON = function Object_cloneByJSON(obj) {
  if (!obj) return {};
  let newObj = obj;
  try {
    newObj = JSON.parse(JSON.stringify(obj));
  } catch (err) {
    console.error('Object_cloneByJSON throw', err);
  } finally {
    return newObj;
  }
};

/**
 * [isLang [check current language]]
 * @param  {[type]}  lang [description]
 * @return {Boolean}      [description]
 */
window.isLang = function isLang(lang) {
  return (localStorage.getItem('locale') || 'zh-CN') === lang;
};

/**
 * [Joyride [user-guide properties]]
 * @type {Object}
 */
window.Joyride = {
  propsToJoyride: {
    holePadding: 0,
    // autoStart: true,
    tooltipOffset: 0,
    // type: "continuous",
    showBackButton: false,
  },

  generateLocaleButton: t => ({
    back: t('operations.joyride.back'),
    close: t('operations.joyride.close'),
    last: t('operations.joyride.last'),
    next: t('operations.joyride.next'),
    skip: t('operations.joyride.skip'),
  }),

  initJoyrideStorage: function initJoyrideStorage() {
    const s = window.localStorage;
    const joyrides = [
    ];
    joyrides.map(k => {
      if (s.getItem(k) !== '1') {
        s.setItem(k, 0);
      }
    });
  },

  getCurrentSteps: function getCurrentSteps(steps) {
    const filteredSteps = [];
    let startIndex = 0;
    const s = window.localStorage;
    const names = steps.map(step => step.name);
    for (; startIndex < names.length; startIndex++) {
      if (s.getItem(names[startIndex]) === '0') {
        filteredSteps.push(steps[startIndex]);
      }
    }
    // console.log('getCurrentSteps', startIndex, names);
    return filteredSteps;
  },

  doneJoyrideStep: function doneJoyrideStep(e) {
    if (e.step) {
      // console.log(e.type, e.step.name);
      if (e.type === 'step:after' || e.type === 'overlay:click') {
        window.localStorage.setItem(e.step.name, 1);
      }
    }
  },
};

/**
 * [isMobile [check is in mobile]]
 * @return {Boolean} [description]
 */
window.isMobile = function () {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

window.isChrome = function () {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
};

/**
 * [viewport [transform px to mobile px by scale]]
 * @param  {[type]} px [description]
 * @return {[type]}    [description]
 */
window.viewport = function viewport(px) {
  return window.innerWidth * px / 690;
};

/**
 * [XHRinterceptor [set interceptor to xhr]]
 * @param {Function} callback [description]
 * https://stackoverflow.com/questions/21354910/vanilla-javascript-ajaxstop
 */
window.XHRinterceptor = function _secret_xhr_interceptor(maxLength, callback) {
  const activeXhr = [];
  const origin = XMLHttpRequest.prototype.open;
  let _i = 0;

  XMLHttpRequest.prototype.open = function xhrPrototypeOpen(method, url, async, user, pass) {
    this.addEventListener('readystatechange', function onXhrReadyStateChange() {
      switch (this.readyState) {
        case 1: // opened request
          activeXhr.push(this);
          break;

        case 4: { // request done
          const i = activeXhr.indexOf(this);

          if (i > -1) {
            _i += 1;
            activeXhr.splice(i, 1); // remove finished request
          }
          if (!activeXhr.length) { // if all requests are done
            callback(_i);
            _i = 0;
          }
          break;
        }
      }
    }, false);

    origin.call(this, method, url, async, user, pass);
  };
};

window.clearAllCurrentXHR = function _secret_xhr_abort() {
  if (window._xhr && Object.keys(window._xhr).length) {
    Object.keys(window._xhr).map(url => {
      window._xhr[url].cancel();
    });
  }
};
