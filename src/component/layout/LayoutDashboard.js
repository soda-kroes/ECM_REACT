import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo/SODA.png";
import "./LayoutDashboard.css";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { getUser } from "../../share/helper";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "/dashboard", <PieChartOutlined />),
  getItem("Customer", "/dashboard/customer", <DesktopOutlined />),
  getItem("Order", "/dashboard/order", <DesktopOutlined />),

  getItem("Product", "/dashboard/product", <UserOutlined />, [
    getItem("Category", "/dashboard/product/category"),
    getItem("Product", "/dashboard/product/product_list"),
  ]),

  
  getItem("User", "", <UserOutlined />, [
    getItem("Employee", "/dashboard/User/employee"),
    getItem("Role", "/dashboard/User/role"),
    getItem("User Role", "/dashboard/User/user_role"),
    
  ]),

  getItem("System", "/dashboard/system", <UserOutlined />, [
    getItem("Order Status", "/dashboard/system/order_status"),
    getItem("Order Payment", "/dashboard/system/order_payment"),
    getItem("Province", "/dashboard/system/province"),
  ]),




  getItem("Report", "/dashboard/report", <TeamOutlined />, [
    getItem("Top Sale", "/dashboard/report/top_sale"),
    getItem("Sale Summary", "/dashboard/report/sale_summary"),
    getItem("Sold By Category", "/dashboard/report/sold_by_category"),
    getItem("Sold By Product", "/dashboard/report/sold_by_product"),
  ]),
];
const LayoutDashboard = () => {
  const navigate = useNavigate();

  //Form Load
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin == "0") {
      //not yet login
      navigate("/dashboard/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLogin","0")
    window.location.href="/dashboard/login"
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //-------------| Handle OnChange Menu |------------
  const onChangeMenu = (item) => {
    console.log(item.key);
    navigate(item.key);
  };

  /// menu on drop down profile
  const itemsProfile = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          My Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Change Password
        </a>
      ),
    },
    {
      key: "3",
      label: <a onClick={handleLogout}>Logout</a>,
    },
  ];

  const user =  getUser();
 
  
  //console.log("user: "+JSON.parse(user))
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onSelect={onChangeMenu}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 10px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="branchContain">
            <img className="img_logo" src={LOGO} style={{borderRadius:10}}></img>
            <div className="txtBranch" style={{ color: "black" }}>
              KSD STORE DASH
            </div>
          </div>
          <div>
            <Space>
              <Input.Search style={{ marginTop: 18 }}></Input.Search>

              <Badge count={99}>
                <Avatar shape="square" size="small" />
              </Badge>
              <Badge count={10}>
                <MdOutlineNotificationAdd
                  style={{ fontSize: 25, marginLeft: 10 }}
                />
              </Badge>
              <Dropdown
                menu={{
                  items: itemsProfile,
                }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Button style={{ marginLeft: 10 }}><CiUser  style={{fontSize:18, marginRight:5}} /> {user.firstname+"-"+user.lastname}</Button>
              </Dropdown>
            </Space>
          </div>
        </Header>

        <Content
          style={{
            margin: "16px 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutDashboard;




































// import './LayoutDashboard.css'
// import LOGO from '../../assets/logo/nit.jpeg'

// import {useNavigate} from "react-router-dom"
// import { Outlet } from 'react-router-dom'

// const LayoutDashboard = () =>  {

//     //@TODO
//     const navigate = useNavigate();

//     const handleOnClickMenu = (routeName) =>{
//         navigate(routeName);
//     }

//     // const handleOnClickGoToBackend = () =>{
//     //     window.location.href='/dashboard';
//     // }

//     return(
//        <div>
//           <div className="mainHeader">
//             <div className='branchContain'>
//                 <img  className="img_logo" src={LOGO}></img>
//                 <div>
//                     <div className="txtBranch">NIT CAMBODIA DASH</div>
//                     <div className="txtSubBranch" style={{color:'gray'}}>Build Your IT Skilll</div>
//                 </div>
//             </div>

//             <div className='menuContain'>
//                 <ul className="menu">
//                     <li onClick={()=>handleOnClickMenu("/dashboard")} className="menu_item">Home</li>
//                     <li onClick={()=>handleOnClickMenu("/dashboard/category")} className="menu_item">Category</li>
//                     <li onClick={()=>handleOnClickMenu("/dashboard/product")} className="menu_item">Product</li>
//                     <li onClick={()=>handleOnClickMenu("/dashboard/login")} className="menu_item">Login</li>
//                     <li onClick={()=>handleOnClickMenu("/")} className="menu_item">To Website</li>
//                 </ul>
//             </div>
//         </div>
//         <Outlet />
//        </div>
//     )
// }

// export default LayoutDashboard;
