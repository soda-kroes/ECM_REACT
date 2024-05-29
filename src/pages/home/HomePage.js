
import { Button, Space } from 'antd';
import { useState } from 'react';
import CarouselHome from '../../component/carousel/CarouselHome';
import HomeHotProduct from './HomeHotProduct';


const HomePage = () =>{
  const [loading,setLoading] = useState(false);
  const handleButtonClick = () =>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  } 
  return(
    <div style={{padding:0}}>
      <CarouselHome />
      <div style={{textAlign:'center', padding:10}}>
      <h3>HOW TO USE GRID IN ANT DESIGN</h3>
      </div>
      <hr></hr>
      <div style={{padding:'0px 20px'}}>
        <h1>HOT PRODUCT</h1>
        <div style={{width:100,height:10,backgroundColor:'orange'}}></div>
        <HomeHotProduct />
      </div>
     
    </div>
  )
}
export default HomePage;