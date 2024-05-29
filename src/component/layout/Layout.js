import './Layout.css'
import LOGO from '../../assets/logo/SODA.png'

import {useNavigate} from "react-router-dom"
import { Outlet } from 'react-router-dom'
import { Col, Row, Space } from 'antd'
import { IoLogoAndroid } from "react-icons/io";
import { FaApple,FaFacebook,FaTiktok ,FaYoutube   } from "react-icons/fa";



const Layout = () =>  {

    //@TODO
    const navigate = useNavigate();

    const handleOnClickMenu = (routeName) =>{
        navigate(routeName);
    }

    // const handleOnClickGoToBackend = () =>{
    //     window.location.href='/dashboard';
    // }

    return(
       <div>
          <div className="mainHeader">
            <div className='branchContain'>
                <img  className="img_logo" src={LOGO} style={{borderRadius:10}}></img>
                <div>
                    <div className="txtBranch">KSD STORE</div>
                    <div className="txtSubBranch" style={{color:'grey'}}>Best Store In Cambodia</div>
                </div>
            </div>
           
            <div className='menuContain'>
                <ul className="menu">
                    <li onClick={()=>handleOnClickMenu("/")} className="menu_item">Home</li>
                    <li onClick={()=>handleOnClickMenu("/about")} className="menu_item">About</li>
                    <li onClick={()=>handleOnClickMenu("/product")} className="menu_item">Product</li>
                    <li onClick={()=>handleOnClickMenu("/category")} className="menu_item">Category</li>
                    <li onClick={()=>handleOnClickMenu("/login")} className="menu_item">Login</li>
                    <li onClick={()=>handleOnClickMenu("/dashboard")} className="menu_item">Dashboard</li>
                </ul>
            </div>
        </div>
        <Outlet />
        <div style={{marginTop:20, backgroundColor:'grey', padding:'50px 10%'}}>
            <Row>
                <Col span={8}>
                    <img src={LOGO} width={130} height={130} style={{borderRadius:10}} />
                    <div className='text-title'>KSD STORE</div>
                    <div>New Store Technology</div>
                    <div>Make In Cambodia</div>

                </Col>
                <Col span={8}>
                    <div className='text-title' style={{marginBottom:10}}>KSD APPLICATION</div> 
                    <a>
                        <div className='text-normal'> <FaApple /> IOS App</div>
                   </a>

                   <a>
                        <div className='text-normal'> <FaApple /> IOS App</div>
                   </a>
                   <a>
                        <div className='text-normal'> <FaApple /> IOS App</div>
                   </a>
                </Col>
                <Col span={8}>
                    <div className='text-title' style={{marginBottom:10}}>Follow Us</div>
                    <a>
                    <div className='text-normal'> <FaFacebook /> Facebook</div>
                    </a>
                   <a>
                   <div className='text-normal'> <FaTiktok  /> Tik Tok</div>
                   </a>
                  <a>
                  <div className='text-normal'> <FaYoutube /> Youtube</div>
                  </a>
                </Col>
            </Row>
        </div>
       </div>  
    )
}

export default Layout;