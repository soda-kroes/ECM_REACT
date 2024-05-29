
import React from 'react'
import {Carousel} from 'antd'
import './CarouselHome.css'
import MAC1 from '../../assets/product/mac1.jpg'
import MAC2 from '../../assets/product/mac2.jpg'
import MAC3 from '../../assets/product/mac3.jpg'
function CarouselHome() {

    const dataSlide = [
        {
            Title: "Mac Book New 2024",
            SubTitle: "Make In Cambodia",
            ImgPro: MAC1,
      

        },
        {
            Title: "Mac Book New 2023",
            SubTitle: "Make In Cambodia",
            ImgPro: MAC2,
    

        },
        {
            Title: "Mac Book New 2022",
            SubTitle: "Make In Cambodia",
            ImgPro: MAC3,
   

        }
    ]


  return (
    <Carousel autoplay autoplaySpeed={1000}>
        {dataSlide.map((item,index)=>{
            return(
                <div key={index} className='itemSlide'>
                <img src={item.ImgPro} style={{width:100,height:100}} ></img>
                <h1>{item.Title}</h1>
                <h5>{item.SubTitle}</h5>
            </div>
            )
        })}
       
    </Carousel>

  )
}

export default CarouselHome