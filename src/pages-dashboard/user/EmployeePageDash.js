import { useRowStyle } from 'antd/es/grid/style'
import React, { useEffect, useState } from 'react'
import { request } from '../../share/request';
import MainPageDash from '../component-dash/mainpage/MainPageDash';
import { Button, Space, Table, message } from 'antd';
import { keys } from '@mui/system';
import { formatDateClient } from '../../share/helper';

function EmployeePageDash() {
  const [list,setList] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
      getList();
  },[])

  const getList = () =>{
    request("employee","get",{}).then((res)=>{
      setLoading(true);
      if(res){
        setLoading(false);
        setList(res.list);
      }
    })
  }

  const handleOnClickEdit = (item) =>{
    console.log(item);
    message.success("Edit Click Hz Bro....!");
  }
  const handleOnClickDelete = (item) =>{
    console.log(item)
    message.success("Delete Click Hz Bro....!");
  }
  return (
    <MainPageDash loading={loading}>
      <div>Employee [{list.length}]</div>
      <Table
       size='small'
       columns={[
        {
          key: "no",
          title: "No",
          render: (item,record,index) => index+1
        },
        {
          key: "firstname",
          title: "FIRST NAME",
          dataIndex: "firstname"
        },
        {
          key: "lastname",
          title: "LAST NAME",
          dataIndex: "lastname"
        },
        {
          key: "tel",
          title: "TELEPHONE",
          dataIndex: "tel"
        },
        {
          key: "base_salary",
          title: "SALARY",
          dataIndex: "base_salary"
        },
        {
          key: "province",
          title: "PROVINCE",
          dataIndex: "province"
        },
        {
          key: "country",
          title: "COUNTRY",
          dataIndex: "country"
        },
        {
          key: "created_at",
          title: "CREATE AT",
          render:(item,record,index) => formatDateClient(item)
        },
        {
          key: "action",
          title: "ACTION",
          render:(item,record,index) => {
            return(
             <div>
              <Space>
                <Button onClick={()=> handleOnClickEdit(item)} type='primary'>Edit</Button>
                <Button onClick={()=> handleOnClickDelete(item)} type='primary' danger>Delete</Button>
              </Space>
             </div>
            )
          }
        },
       ]}
       dataSource={list}
      >
        
      </Table>
    </MainPageDash>
  )
}

export default EmployeePageDash
