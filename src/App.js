
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import CustomerPage from "./pages/customer/CustomerPage";
import UserPage from "./pages/User/UserPage";
import ProductPage from "./pages/product/ProductPage";
import CategoryPage from "./pages/category/CategoryPage"
import LayoutDashboard from "./component/layout/LayoutDashboard";
// dashboard
import Layout from "./component/layout/Layout";
import HomePageDash from './pages-dashboard/home/HomePage';
import CustomerPageDash from "./pages-dashboard/customer/CustomerPageDash";
import OrderPageDash from "./pages-dashboard/order/OrderPageDash";
import CategoryPageDash from "./pages-dashboard/product/CategoryPageDash";
import ProductPageDash from "./pages-dashboard/product/ProductPageDash";

import EmployeePageDash from "./pages-dashboard/user/EmployeePageDash";
import UserRolePageDash from "./pages-dashboard/user/UserRolePageDash";
import RolePageDash from "./pages-dashboard/user/RolePageDash";

import OrderPaymentPageDash from "./pages-dashboard/system/OrderPaymentPageDash";
import OrderStatusPageDash from "./pages-dashboard/system/OrderStatusPageDash";
import ProvincePageDash from "./pages-dashboard/system/ProvincePageDash";

import TopSalePageDash from "./pages-dashboard/report/TopSalePageDash";
import SaleSummaryPageDash from "./pages-dashboard/report/SaleSummaryPageDash";
import SoldByCategoryPageDash from "./pages-dashboard/report/SoldByCategoryPageDash";
import SoldByProductPageDash from "./pages-dashboard/report/SoldByProductPageDash";

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutDashboardLogin from "./component/layout/LayoutDashboardLogin";
import LoginDashboard from "./component/auth/LoginDashboard";
import RegisterDashboad from "./component/auth/RegisterDashboad";


const App = ()=>{
  //@TODO
  //check path has "dashboard"
  const is_dashboard = window.location.pathname.includes("dashboard");//return true and fail
  return(
  
    <BrowserRouter>
    {/* Rount Website And Backend */}
      <Routes >
        {/* Route Website */}
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/customer" element={<CustomerPage />}/> 
          <Route path="/user" element={<UserPage />}/>
          <Route path="/product" element={<ProductPage />} />
          <Route path="/category" element={<CategoryPage />}/>
          <Route path="*" element={<h1>Page Not Found.</h1>}/>
        </Route>

        {/* Route Backend */}
        <Route path="/dashboard" element={<LayoutDashboard />}>
            <Route path="" element={<HomePageDash />} />
            <Route path="customer" element={<CustomerPageDash />}/>
            <Route path="order" element={<OrderPageDash />} />

            <Route path="product/category" element={<CategoryPageDash />} />
            <Route path="product/product_list" element={<ProductPageDash />} />

            <Route path="user/employee" element={<EmployeePageDash />} />
            <Route path="user/role" element={<RolePageDash />} />
            <Route path="user/user_role" element={<UserRolePageDash />} />

            <Route path="system/order_status" element={<OrderStatusPageDash />} />
            <Route path="system/order_payment" element={<OrderPaymentPageDash />} />
            <Route path="system/province" element={<ProvincePageDash />} />

            <Route path="report/top_sale" element={<TopSalePageDash />} />
            <Route path="report/sale_summary" element={<SaleSummaryPageDash />} />
            <Route path="report/sold_by_category" element={<SoldByCategoryPageDash />} />
            <Route path="report/sold_by_product" element={<SoldByProductPageDash />} />
        </Route>

        {/* Backend Login Register */}
        <Route path="/dashboard" element={<LayoutDashboardLogin />}>
            <Route path="login" element={<LoginDashboard />} />
            <Route path="register" element={<RegisterDashboad />} />
        </Route>
      </Routes>
     </BrowserRouter>
 
  )
}
export default App;