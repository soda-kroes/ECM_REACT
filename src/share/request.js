
import axios from 'axios'
import { getAccessToken, getRefreshToken, logout, storeUserData } from './helper'
import { message } from 'antd';

export const config = {
    base_server : "http://localhost:8081/api/",
    image_path: "...",
    version: 1
}

export const request = (url, method, param, new_token = null) => {
    let access_token = getAccessToken();
    if (new_token != null) {
      access_token = new_token;
    }
    // console.log(access_token)
    return axios({
      url: config.base_server + url,
      method: method,
      data: param,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        var status = err.response?.status;
        if (status == 404) {
          message.error("Route Not Found!");
        } else if (status == 401) {
          // message.error("You don't have permission to access this method!")
          // try connecting with a new token if it expired
          return refreshToken(url, method, param);
        } else if (status == 500) {
          message.error("Internal Server Error!");
          console.log("E: "+err)
        } else {
          message.error(err.message);
        }
        // console.log("error: "+err)
        // message.error(err.message)
        return false;
      })
      .finally((final) => {
        console.log("final: " + final);
      });
  };


  
  export const refreshToken = (url, method, param) => {
    const refresh_key = getRefreshToken();
    return axios({
      url: config.base_server + "employee_refresh_token",
      method: "post",
      data: {
        refresh_key: refresh_key,
      },
    })
      .then((res) => {
        storeUserData(res.data);
        var new_token = res.data.access_token;
        message.success("resfress success");
        return request(url, method, param, new_token);
      })
      .catch((error) => {
        // តលែងបាន ចង់មិនចង់ ត្រូវ Logout
        message.error("refresh fail");
        console.log("ERROR: " + error);
        logout()
        return false;
      });
  };