import axios from 'axios'
import router from '../router/index'
import qs from 'qs'

// 创建axios实例
export const Axios = axios.create({
  baseURL: "/kindnessplatform/",
  timeout: 60000,
  withCredentials: true // 是否允许带cookie这些
});

// request拦截器
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {

    return Promise.reject(error);
  }
);


// response过滤器
Axios.interceptors.response.use(
  // 正确处理
  res => {
    let data = res.data;
    return data;
  },
  // 错误处理
  error => {
    let res = error.response;

    if (res) {
      switch (res.status) {
        //401 登录过期 返回登录
        case 401:
          router.push('/')

          break;
      }
    } else {

    }
    return Promise.reject(error);
  }
);

// get请求方法
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    // get请求处理
    params = params ? params : "";

    Axios.get(url, {
        params: params
      })
      .then(
        res => {
          resolve(res);
        },
        error => {
          reject(error)
        }
      )
      .catch((error) => {
        reject(error);
      })
  })
}

// post请求方法
export function fetchPost(url, params, contentType) {
  return new Promise((resolve, reject) => {
    // let _csrf = store.getters['_csrf'];
    let contentTypeUse = contentType == 'json' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8';
    let paramsUse = contentType == 'json' ? params : qs.stringify(params);

    // post请求处理
    // params = !params ? '' : qs.stringify(params);
    Axios.post(url, paramsUse, {
      headers: {
        'Content-Type': contentTypeUse
      },
    }).then(
      res => {
        resolve(res);
      },
      error => {
        reject(error)
      }
    ).catch((error) => {
      reject(error);
    })
  })
}

// put请求方法
export function fetchPut(url, params, contentType) {
  return new Promise((resolve, reject) => {

    let contentTypeUse = contentType == 'json' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8';
    let paramsUse = contentType == 'json' ? params : qs.stringify(params);

    Axios.put(url, paramsUse, {
      headers: {
        'Content-Type': contentTypeUse
      },
    }).then(
      res => {
        resolve(res);
      },

      error => {
        reject(error)
      }
    ).catch((error) => {
      reject(error);
    })
  })
}

// delete请求方法
export function fetchDelete(url, params) {
  return new Promise((resolve, reject) => {
    // get请求处理
    params = params ? params : "";
    Axios.delete(url, {
        params: params
      })
      .then(
        res => {
          resolve(res);
        },
        error => {
          reject(error)
        }
      )
      .catch((error) => {
        reject(error);
      })
  })
}

// post请求方法上传文件
export function fetchPostFile(url, params, contentType) {
  return new Promise((resolve, reject) => {
    Axios.post(url, params, {
      headers: {
        'Content-Type':'multipart/form-data'
      },
    }).then(
      res => {
        resolve(res);
      },
      error => {
        reject(error)
      }
    ).catch((error) => {
      reject(error);
    })
  })
}
