
import React from 'react'
import {Row,Col} from 'antd'
import mac1 from '../../assets/product/mac1.jpg'
import mac2 from '../../assets/product/mac2.jpg'
import mac3 from '../../assets/product/mac3.jpg'
import ProductList from '../../component/list/ProductList'
function HomeHotProduct() {
    //define array 
    const data = [
        {
            Name: "Mac Book 2024",
            Img: mac1,
            Price: "2000$",
            BgColor: "red"
        },
        {
            Name: "Mac Book 2023",
            Img: mac2,
            Price: "1700$",
            BgColor: "blue"
        },
        {
            Name: "Mac Book 2022",
            Img: mac3,
            Price: "1000$",
            BgColor: "pink"
        },
        {
            Name: "Mac Book 2021",
            Img: mac3,
            Price: "900$",
            BgColor: "orange"
        },
        {
            Name: "Mac Book 2024",
            Img: mac1,
            Price: "2000$",
            BgColor: "red"
        },
        {
            Name: "Mac Book 2023",
            Img: mac2,
            Price: "1700$",
            BgColor: "blue"
        },
        {
            Name: "Mac Book 2022",
            Img: mac3,
            Price: "1000$",
            BgColor: "pink"
        },
        {
            Name: "Mac Book 2021",
            Img: mac3,
            Price: "900$",
            BgColor: "orange"
        },
        {
            Name: "Mac Book 2024",
            Img: mac1,
            Price: "2000$",
            BgColor: "red"
        },
        {
            Name: "Mac Book 2023",
            Img: mac2,
            Price: "1700$",
            BgColor: "blue"
        },
        {
            Name: "Mac Book 2022",
            Img: mac3,
            Price: "1000$",
            BgColor: "pink"
        },
        {
            Name: "Mac Book 2021",
            Img: mac3,
            Price: "900$",
            BgColor: "orange"
        }
        
    ]
  return (
    <div>
       <Row gutter={6}>
       {data.map((item,index)=>{
           return(
            <Col key={index} sm={{span:24}} md={8} lg={6}>
                <img src='' ></img>
                <ProductList name={item.Name} price={item.Price}  description="Description" imageName={item.Img} />

            </Col>
           ) 
        })}
       </Row>
    </div>
  )
}

export default HomeHotProduct