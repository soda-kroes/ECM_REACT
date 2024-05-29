import { message } from 'antd';
import moment from 'moment'
export const isEmptyOrNull = (value) =>{
    return (value == "" || value == null || value==undefined) ? true : false;
    // if(value == "" || value == null || value==undefined){
    //     return true;
    // }
    // return false;
} 

export const getUser = () => {
  var user = localStorage.getItem("user");
  console.log("HELLO: "+user)
  if (!isEmptyOrNull(user)) {
    user = JSON.parse(user)
    return user;
  } else {
    logout()
    return {};
  }
};


export const getPermission = () => {
    var permission = localStorage.getItem("permission");
    if (!isEmptyOrNull(permission)) {
      permission = JSON.parse(permission);
      // Convert permission to string before trimming
      permission = String(permission).trim();
      return permission;
    } else {
      return null;
    }
  };

export const getAccessToken = () =>{
    var access_token = localStorage.getItem("access_token");
    if(!isEmptyOrNull(access_token)){
       return access_token;
       
    }else{
        return null;
    }
    
}

export const getRefreshToken = () =>{
    var refresh_token = localStorage.getItem("refresh_token");
    if(!isEmptyOrNull(refresh_token)){
        refresh_token = (refresh_token)
       //console.log("user: "+user)
       return refresh_token;
       
    }else{
        return null;
    }
    
}



export const isPermission = (code_permission) => {
    const arrPermission = getPermission();
    console.log("arrPermission: " + arrPermission);
    if (arrPermission) {
      if (arrPermission.includes(code_permission)) {
        return true; // has permission
      } else {
        return false; // no permission
      }
    } else {
      return false; // no permission
    }
  };


  export const formatDateClient = (date) =>{
    if(!isEmptyOrNull(date)){
        return moment(date).format("DD/MM/YYYY")
    }else{
        return null;
    }
  }
    export const formatDateServer = (date) =>{
        if(!isEmptyOrNull(date)){
            return moment(date).format("YYYY-MM-DD")
        }else{
            return null;
        }

  }

  export const logout = () =>{
    localStorage.setItem("isLogin","0");
    window.location.href="/dashboard/login"
  }

  export const storeUserData = (param) =>{
    //storeUserData
    localStorage.setItem("isLogin","1");
    localStorage.setItem("access_token",param.access_token);
    localStorage.setItem("refresh_token",param.refresh_token);
    localStorage.setItem("permission",JSON.stringify(param.permission));
    localStorage.setItem("user",JSON.stringify(param.user));
  }