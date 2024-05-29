import { useEffect, useState } from "react";
import { request } from "../../share/request";
import MainPageDash from "../component-dash/mainpage/MainPageDash";
import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Table,
    message,
  } from "antd";
import { formatDateClient } from "../../share/helper";
import { Option } from "antd/es/mentions";

function CustomerPageDash() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [objTotal, setObjTotal] = useState(null);
  const [objFilter, setObjFilter] = useState({});
  const [visible, setVisible] = useState(false);
  const [listProvince,setListProvince] = useState([]);
  const [form] = Form.useForm();
  const [visibleModalConfirmation,setVisibelModalConfirmnation] = useState(false);
  const [customerId,setCustomerId] = useState();

  //Form Load
  useEffect(() => {
    getList();
  }, []);


  const getList = () => {
    setLoading(true);
    request("customer", "get",).then((res) => {
      setLoading(false);
      if (res) {
        console.log(res)
        setList(res.listCustomer);
        setListProvince(res.listProvince)
      }
    }).catch(err => {
      console.log("Err: "+err);
    });
  };

  const handleOnClickEdit = (item) => {
    console.log(item);
  };

  const handleOnClickDelete = (item) => {
    //console.log(item);
    setCustomerId(item.customer_id);
    setVisibelModalConfirmnation(true);

    
  };

  const RemoveCustomer = () =>{
    setLoading(true);
    setVisibelModalConfirmnation(false);
    request("customer/"+customerId,"delete",{}).then((res)=>{
      setLoading(false);
      if(res){
        message.success("Customer delete from system success...!");
        getList();
      }else{
        message.error("somthing went wrong...!");
      }
    })
  }

  const handleOk = () =>{
    RemoveCustomer();
  }

  const handleCancel = () =>{
      setVisibelModalConfirmnation(false);
  }

  const handleOnClickNew = () => {
    setVisible(true);
  };

  const onCloseModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (item) => {
    console.log("ITEM: "+item)
    setLoading(true);
    request("customer","post",item).then((res)=>{
        setLoading(false);
        if(!res.error){
            message.success("customer created...!");
            onCloseModal();
            getList();
           
        }else{
            message.error("Account Aready Exists...!")
        }
    })
  };

  return (
    <MainPageDash loading={loading}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Customer [{list?.length}]</div>
        <Button onClick={handleOnClickNew} type="primary">
          New
        </Button>
      </div>
      <Table
        width="500px"
        size="small"
        columns={[
          {
            key: "no",
            title: "No",
            render: (data, row, index) => index + 1,
          },
          {
            key: "firstname",
            title: "FirstName",
            dataIndex: "firstname",
          },
          {
            key: "lastname",
            title: "LastName",
            dataIndex: "lastname",
          },
          {
            key: "gender",
            title: "Gender",
            render: (data, row, index) => (data == 1 ? "Male" : "Femal"),
          },
          {
            key: "create_at",
            title: "Create At",
            render: (item, row, index) => formatDateClient(item),
          },
          {
            key: "action",
            title: "Action",
            render: (item, row, index) => {
              return (
                <div style={{ float: "left" }}>
                  <Space>
                    <Button
                      onClick={() => handleOnClickEdit(row)}
                      type="primary"
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleOnClickDelete(row)} danger>
                      Delete
                    </Button>
                  </Space>
                </div>
              );
            },
          },
        ]}
        dataSource={list}
      />

      {/* Start Modal */}
      <Modal
        title={"New Customer"}
        open={visible}
        onCancel={onCloseModal}
        footer={null}
        width={800}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                label={"First Name"}
                name={"firstname"}
                rules={[{ required: true, message: "please input firstname!" }]}
              >
                <Input placeholder="firstname" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Last Name"}
                name={"lastname"}
                rules={[
                  { required: true, message: "please input lastname!" },
                ]}
              >
                <Input placeholder="lastname" allowClear={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                label={"Tel"}
                name={"username"}
                rules={[{ required: true, message: "please input telephone!" }]}
              >
                <Input placeholder="tel" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Password"}
                name={"password"}
                rules={[
                  { required: true, message: "please input password!" },
                ]}
              >
                <Input.Password placeholder="password" allowClear={true} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={15}>
             <Col span={12}>
                <Form.Item label={"Gender"} name={"gender"}>
                    <Select defaultValue={"1"} placeholder={"Select Gender"} allowClear={true}>
                        <Option value={"1"} >Male</Option>
                        <Option value={"0"} >Female</Option>
                    </Select>
                </Form.Item>
             </Col>

             {/* <Col span={12}>
                <Form.Item label={"Province"} name={"province"}>
                    <Select defaultValue={"1"} allowClear={true} placeholder={"Select Province"} >
                        {
                            listProvince.map((item,index)=>{
                                return(
                                    <Option key={index} value={item.province_id}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
             </Col> */}

            <Col span={12}>
                <Form.Item label={"Province"} name={"province_id"}>
                    <Select
                        defaultValue={"1"}
                        allowClear={true}
                        placeholder={"Select Province"}
                        showSearch  // Enable search functionality
                        optionFilterProp="children"  // Specify the property to use for filtering options
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }  // Customize the filter logic
                    >
                        {listProvince?.map((item, index) => (
                            <Option key={index} value={item.province_id}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
                <Form.Item label="Address Description" name={"address_des"}>
                    <Input.TextArea  allowClear={true} />
                </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "right" }}>
            <Space align="end">
              <Button onClick={onCloseModal} type="primary">
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Space>
          </Form.Item>

        </Form>
      </Modal>
      {/* End Modal */}

      {/* Comfirm Modal On Delete */}
       <Modal title={"Confirmation"} open={visibleModalConfirmation} onOk={handleOk} onCancel={handleCancel}>
         Are you sure to delete this customer?
       </Modal>
      {/* Comfirm Modal On Delete */}
    </MainPageDash>
  );
}
export default CustomerPageDash;
