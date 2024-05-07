import React from 'react'
import { Flex, Rate } from 'antd';
import {} from 'react-icons'
import { FaHeart } from "react-icons/fa";
function ProductList(props) {
  return (
    <div style={{padding:20, backgroundColor:'white', margin:5,border:'2px solid black',borderRadius:30}}>
        <img src={props.imageName} width={"100%"} height={300} />
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{fontWeight:'bold', fontSize:22}}>{props.name}</div>
          <FaHeart style={{fontSize:22, color:'red'}} />
        </div>
        <div style={{fontWeight:'bold', fontSize:18}} >{props.price}</div>
        <div>{props.description}</div>
        <Rate />
    </div>
  )
}

export default ProductList




// import React from 'react'

// function ProductList() {
//   return (
//     <div style={{padding:10, backgroundColor:'gray', margin:5}}>
//         <div>Model: Asus Pc</div>
//         <div>Price: 799$</div>
//         <div>CPU  : 255,8G</div>
//     </div>
//   )
// }

// export default ProductList