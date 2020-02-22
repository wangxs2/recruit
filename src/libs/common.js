import * as http from './http'
function isSystem() {
  var system = {
    win: false,
    mac: false,
    xll: false,
    ipad: false
  }
  //检测平台
  var p = navigator.platform
  system.win = p.indexOf('Win') == 0
  system.mac = p.indexOf('Mac') == 0
  system.x11 = p == 'X11' || p.indexOf('Linux') == 0
  system.ipad = navigator.userAgent.match(/iPad/i) != null ? true : false
  return system.win || system.mac || system.xll || system.ipad
}
export default {
  install(Vue, options) {
    /**
     *@method 引入axios
     */
    // Vue.prototype.$axios = Axios;
    Vue.prototype.$fetchGet = http.fetchGet
    Vue.prototype.$fetchPost = http.fetchPost
    Vue.prototype.$fetchPut = http.fetchPut
    Vue.prototype.$fetchDelete = http.fetchDelete
    Vue.prototype.$fetchPostFile = http.fetchPostFile

    /**
     *@method 判断子串
     *@param {String} 需要判断的子串
     *@return {Boolean}
     */
    Vue.prototype.isContains = function(substr) {
      var str = localStorage.getItem('auth')
      return new RegExp(substr, 'g').test(str)
    }

    /* 
         *@method 删除文件的时间戳
         *@param {Str} 文件名
         *@return {Str} 删除时间戳后的文件名
         * */
    Vue.prototype.deletetimestamp = function(name) {
      let str = ''
      let oldname = name.lastIndexOf('.')
      let fileName = name.substring(0, oldname)
      let fileType = name.substring(oldname, oldname.length)
      fileName = fileName.substring(0, fileName.length - 13)
      str = fileName + fileType
      return str
    }

    /**
     *@method 获取cookie
     *@param {String} 获取coolie的key
     *@return {String} 获取coolie的value
     */
    Vue.prototype.getCookie = function(name) {
      var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2])
      } else {
        return null
      }
    }

    /**
     *@method 深拷贝
     *@param {Obj} 需要拷贝的 对象 数组
     *@return {Obj}
     */
    Vue.prototype.cloneObj = function(obj) {
      let _this = this
      let str,
        newobj = obj.constructor === Array ? [] : {}
      if (typeof obj !== 'object') {
        return
      } else if (window.JSON) {
        str = JSON.stringify(obj)
        newobj = JSON.parse(str)
      } else {
        for (var i in obj) {
          newobj[i] =
            typeof obj[i] === 'object' ? _this.cloneObj(obj[i]) : obj[i]
        }
      }
      return newobj
    }
    Vue.prototype.downPictur = function(val) {
      if (isSystem()) {
        return true
      } else {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          window.webkit.messageHandlers.photo.postMessage({ body: val })
        } else if (/(Android)/i.test(navigator.userAgent)) {
          Android.requestPicture(val)
        }
      }
    }
    Vue.prototype.downAddress = function() {
      if (isSystem()) {
        return true
      } else {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          window.webkit.messageHandlers.isLocation.postMessage({
            body: 'Location'
          })
        } else if (/(Android)/i.test(navigator.userAgent)) {
          return Android.onPositioning()
        }
      }
    }
    Vue.prototype.downApp = function() {
      if (isSystem()) {
        return true
      } else {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          window.webkit.messageHandlers.login.postMessage({ body: 'nowlogin' })
        } else if (/(Android)/i.test(navigator.userAgent)) {
          Android.requestTerminal()
        }
      }
    }
    /**
     *全局过滤 时间
     */
    Vue.prototype.FormatDate = function(date) {
      let nstr = new Date(date) //当天时间
      let now_year = nstr.getFullYear() //年份
      let now_month =
        nstr.getMonth() + 1 < 10
          ? '0' + (nstr.getMonth() + 1)
          : nstr.getMonth() + 1 //月份
      let now_day = nstr.getDate() < 10 ? '0' + nstr.getDate() : nstr.getDate() //日期
      let now_hours =
        nstr.getHours() < 10 ? '0' + nstr.getHours() : nstr.getHours() //时
      let now_minut =
        nstr.getMinutes() < 10 ? '0' + nstr.getMinutes() : nstr.getMinutes() //分
      // let now_second=nstr.getSeconds()<10?'0'+nstr.getSeconds():nstr.getSeconds() //秒
      return (
        now_year +
        '-' +
        now_month +
        '-' +
        now_day +
        ' ' +
        now_hours +
        ':' +
        now_minut
      )
    }
    Vue.prototype.FormatDate1 = function(date) {
      let nstr = new Date(date) //当天时间
      let now_year = nstr.getFullYear() //年份
      let now_month =
        nstr.getMonth() + 1 < 10
          ? '0' + (nstr.getMonth() + 1)
          : nstr.getMonth() + 1 //月份
      let now_day = nstr.getDate() < 10 ? '0' + nstr.getDate() : nstr.getDate() //日期
      let now_hours =
        nstr.getHours() < 10 ? '0' + nstr.getHours() : nstr.getHours() //时
      let now_minut =
        nstr.getMinutes() < 10 ? '0' + nstr.getMinutes() : nstr.getMinutes() //分
      let now_second =
        nstr.getSeconds() < 10 ? '0' + nstr.getSeconds() : nstr.getSeconds() //秒
      return (
        now_year +
        '-' +
        now_month +
        '-' +
        now_day +
        ' ' +
        now_hours +
        ':' +
        now_minut +
        ':' +
        now_second
      )
    }
    Vue.prototype.FormatDate5 = function(date) {
      let nstr = new Date(date) //当天时间
      let now_year = nstr.getFullYear() //年份
      let now_month =
        nstr.getMonth() + 1 < 10
          ? '0' + (nstr.getMonth() + 1)
          : nstr.getMonth() + 1 //月份
      let now_day = nstr.getDate() < 10 ? '0' + nstr.getDate() : nstr.getDate() //日期

      return now_year + '-' + now_month + '-' + now_day
    }
    Vue.filter('FormatTime', (value, arg) => {
      if (value) {
        return new Date(value).Format(arg)
      }
    })

    /**
     *全局过滤 性别
     */
    Vue.filter('FormatSex', value => {
      if (value == 0) {
        return '男'
      } else if (value == 1) {
        return '女'
      }
    })
  }
}
