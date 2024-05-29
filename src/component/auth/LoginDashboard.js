import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import './LoginDashboard.css'
import { request } from '../../share/request';
import { storeUserData } from '../../share/helper';
import { FaArrowRight } from "react-icons/fa";
import LOGO from '../../assets/logo/SODA.png'


const LoginDashboard = () => {
    const [loading,setLoading] = useState(false);

    const onFinish = (values) => {
       setLoading(true)
        var param = {
            "username": values.username,
            "password": values.password
        }
        request("employee_login","post",param).then(res => {
            setLoading(false)
            console.log(res)
            if(!res.error){
                 storeUserData(res);
                // localStorage.setItem("isLogin","1");
                // localStorage.setItem("access_token",res.access_token);
                // localStorage.setItem("refresh_token",res.refresh_token);
                // localStorage.setItem("permission",JSON.stringify(res.permission));
                // localStorage.setItem("user",JSON.stringify(res.user));
                window.location.href="/dashboard"
            }else{
                //alert(res.message)
                message.error(res.message)
                //message.error(res.message)
            }
        })
      console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {

      console.log('Failed:', errorInfo);
    };

     return (
        <div className='LoginContain'>
           <div style={{display:'flex',marginBottom:50}}>
            <img src={LOGO} style={{width:50,height:50,borderRadius:10}} />
             <div style={{marginLeft:5,fontSize:13,marginTop:5}}>
             <div style={{color:'gray'}}>KSD STORE</div>
             <div style={{fontWeight:'bold'}}>KH.PLC</div>
             </div>
           </div>

           <div style={{marginBottom:30}}>
             <div style={{color:'gray'}}>Wellcome back,</div>
             <div style={{fontSize:12, fontWeight:'bold'}}>LOGIN</div>
           </div>
           
            <Form
            layout='vertical'
           name="basic"
           style={{
             maxWidth: 600,
           }}
           initialValues={{
             remember: true,
           }}
           onFinish={onFinish}
           onFinishFailed={onFinishFailed}
           autoComplete="off"
         >
           <Form.Item
             label="Username"
             name="username"
             rules={[
               {
                 required: true,
                 message: 'username is required!',
               },
             ]}
           >
             <Input />
           </Form.Item>
       
           <Form.Item
             label="Password"
             name="password"
             rules={[
               {
                 required: true,
                 message: 'password is required!',
               },
             ]}
           >
             <Input.Password />
           </Form.Item>
       
       
           <Form.Item
           // style={{textAlign:'right'}}
             wrapperCol={{
               offset: 8,
               span: 16,
             }}
           >
             <Button loading={loading} type="primary" htmlType="submit" style={{width:50,height:50,borderRadius:'100%', float:'right'}}>
              <FaArrowRight />
             </Button>
           </Form.Item>
         </Form>
        </div>
       );
}

export default LoginDashboard;



























// import { Button } from "antd";

// import './LoginDashboard.css'
// function LoginDashboard(){
//     const onLogin = () =>{
//         localStorage.setItem("isLogin","1");
//         window.location.href="/dashboard"
//     }
//     return(
//         <div>
//            <div className="LoginContain">
//               <h3>Login</h3>
//               <input placeholder="Username" style={{marginBottom:10}} />
//               <br />
//               <input placeholder="Password" style={{marginBottom:10}}/>
//               <br />
//               <Button onClick={onLogin}>Login</Button>
//            </div>
            
//         </div>
//     )
// }
// export default LoginDashboard;