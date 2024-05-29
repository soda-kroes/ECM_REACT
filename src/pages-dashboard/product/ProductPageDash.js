import { useEffect, useState } from "react";
import { request } from "../../share/request";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  message,
} from "antd";
import { formatDateClient, isEmptyOrNull } from "../../share/helper";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

import MainPageDash from "../component-dash/mainpage/MainPageDash";

function ProductPageDash() {
  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [totalRecord,setTotalRecord] = useState(0)
  const [form] = Form.useForm();
  const [productIdEdit, setProductIdEdit] = useState(null);
  const [loading, setLoading] = useState(false);



  // const [txtSearch, setTxtSearch] = useState("");
  // const [categorySearch, setCategorySearch] = useState(null);
  // const [productStatus, setProductStatus] = useState(null);

  const [objFilter,setObjFilter] = useState({
    page:1,
    txtSearch : "",
    categorySearch: "",
    productStatus: ""

  })
  const {page,txtSearch,categorySearch,productStatus} = objFilter

  const onCancelModal = () => {
    setVisible(false);
    setProductIdEdit(null);
    form.resetFields();
  };

  const onFinish = (item) => {
    if (productIdEdit == null) {
      var param = {
        category_id: item.category,
        barcode: item.barcode,
        name: item.product_name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        description: item.description,
      };
      setLoading(true);
      request("product", "post", param).then((res) => {
        setLoading(false);
        if (res) {
          message.success(res.message);
          setVisible(false);
          form.resetFields();
          getList();
        }
      });
    } else {
      var param = {
        product_id: productIdEdit,
        category_id: item.category,
        barcode: item.barcode,
        name: item.product_name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        description: item.description,
      };
      request("product", "put", param).then((res) => {
        if (res) {
          message.success(res.message);
          setVisible(false);
          form.resetFields();
          getList();
        }
      });
    }
  };

  const onClickRemove = (item) => {
    //  alert(item.product_id)
    console.log("Item: " + item);
    const param = {
      product_id: item.product_id,
    };
    request("product", "delete", param).then((res) => {
      if (res) {
        console.log(res);
        message.success(res.message);
        getList();
      }
    });
  };

  const onEditClick = (item) => {
    console.log(item);
    setVisible(true);
    setProductIdEdit(item.product_id);
    form.setFieldsValue({
      barcode: item.barcode,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      category: item.category_id,
      image: item.image,
      description: item.description,
    });
  };

  //Form Load
  useEffect(() => {
    getList(objFilter);
  }, [page]);

  const clearFilter = () => {
    // setObjFilter({
    //     ...objFilter,
    //     page:1,
    //     txtSearch:"",
    //     categorySearch:null,
    //     productStatus:null
    // })
    // getlist(objFilter)

    var objClear = {
        ...objFilter,
        page:1,
        txtSearch:"",
        categorySearch:"",
        productStatus:""
    }
    setObjFilter({...objClear})
    getList(objClear)
}

  const getList = (parameter={}) => {
    setLoading(true);
    var param = "?page=" + (parameter.page || 1);
    param += "&txtSearch=" + (parameter.txtSearch || "");
    param += "&categoryId=" + (parameter.categorySearch || "");
    param += "&productStatus=" + (parameter.productStatus || "")
    
    console.log("Param: "+param)
    request("product" + param, "get", {}).then((res) => {
     
      setTimeout(() => {
        setLoading(false);
      }, 200);

      if (res) {
        setList(res.list);
        if(res.totalRecord.rowCount > 0){
          var totalData = res.totalRecord.rows[0].total
          console.log("total: "+totalData)
          setTotalRecord(totalData)   
      }
        setCategoryList(res.category_list);
      }
    });
  };


  return (
    <MainPageDash loading={loading}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <div>
          <div>
            <div style={{ marginBottom: 10 }}>Product</div>
          </div>
          <Space>
            <Input.Search
            defaultValue={""}
              value={txtSearch}
              size="small"
              style={{ width: 150 }}
              placeholder="Barcode"
              allowClear={true}
              onChange={(event)=>{
                setObjFilter({
                    ...objFilter,
                    txtSearch:event.target.value
                })
            }}
            />
            <Select
              value={categorySearch}
              defaultValue={""}
              
              size="small"
              style={{ width: 150 }}
              placeholder="Select Category"
              allowClear={true}
              onChange={(value) => {
                setObjFilter({
                  ...objFilter,
                  categorySearch: value
                })
              }}
            >
              {categoryList?.map((item, index) => {
                return (
                  <Option key={index} value={item.category_id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>

            <Select
              value={productStatus}
              size="small"
              style={{ width: 150 }}
              placeholder="Status"
              allowClear={true}
              onChange={(value) => {
                setObjFilter({
                  ...objFilter,
                  productStatus: value
                })
              }}
            >
              <Option value={"1"}>Active</Option>
              <Option value={"0"}>Disabled</Option>
            </Select>

            <Button size="small" onClick={() => getList(objFilter)} type="primary">
              Filter
            </Button>
            <Button size="small" onClick={() => clearFilter()}>
              Clear
            </Button>
          </Space>
        </div>
        <Button onClick={() => setVisible(true)} size="small" type="primary">
          New
        </Button>
      </div>
      <Table
        pagination={{
          defaultCurrent: 1,
          total: totalRecord,
          pageSize: 10,
          onChange: (page, pageSize) => {
            setObjFilter({
              ...objFilter,
              page: page
            })
          },
          // onShowSizeChange  // Called when pageSize is changed
        }}
        size="small"
        columns={[
          {
            key: "no",
            title: "No",
            render: (item, record, index) => index + 1,
          },
          {
            key: "barcode",
            title: "Barcode",
            dataIndex: "barcode",
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "quantity",
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            key: "price",
            title: "Price",
            dataIndex: "price",
          },
          {
            key: "category",
            title: "Category",
            dataIndex: "category_name",
          },
          {
            key: "image",
            title: "Image",
            dataIndex: "image",
          },
          {
            key: "description",
            title: "Description",
            dataIndex: "description",
          },
          {
            key: "is_active",
            title: "Active",
            dataIndex: "is_active",
            render: (text, record, index) => {
              return (
                <Tag color={text == 1 ? "green" : "pink"} key={"1"}>
                  {text == 1 ? "Active" : "Disabled"}
                </Tag>
              );
            },
          },
          {
            key: "create_at",
            title: "Create",
            dataIndex: "create_at",
            render: (text, record, index) => {
              return formatDateClient(text);
            },
          },
          {
            key: "action",
            title: "Action",
            render: (text, record, index) => {
              return (
                <div>
                  <Space key={index}>
                    <Button
                      onClick={() => onEditClick(record)}
                      size="small"
                      type="primary"
                    >
                      <EditFilled />
                    </Button>
                    <Button
                      onClick={() => onClickRemove(record)}
                      size="small"
                      type="primary"
                      danger
                    >
                      <DeleteFilled />
                    </Button>
                  </Space>
                </div>
              );
            },
          },
        ]}
        dataSource={list}
      />
      {/* Modal */}
      <Modal
        width={800}
        open={visible}
        title={productIdEdit == null ? "Create" : "Edit"}
        onCancel={onCancelModal}
        footer={null}
        maskClosable={false}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                label={"Barcode"}
                name={"barcode"}
                rules={[{ required: true, message: "please input barcode!" }]}
              >
                <Input placeholder="Barcode" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Product Name"}
                name={"product_name"}
                rules={[
                  { required: true, message: "please input product name!" },
                ]}
              >
                <Input placeholder="Product Name" allowClear={true} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                label={"Quantity"}
                name={"quantity"}
                rules={[{ required: true, message: "please input quantity!" }]}
              >
                <Input placeholder="Quantity" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Price"}
                name={"price"}
                rules={[{ required: true, message: "please input price!" }]}
              >
                <Input placeholder="Price" allowClear={true} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Category" name="category">
            <Select placeholder="Select category" allowClear>
              {categoryList?.map((item, index) => (
                <Select.Option key={item.category_id} value={item.category_id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label={"Image"} name={"image"}>
                <Input placeholder="Image" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Description"}
                name={"description"}
                rules={[{ required: true, message: "please input price!" }]}
              >
                <Input placeholder="Description" allowClear={true} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "right" }}>
            <Space align="end">
              <Button type="primary">Cancel</Button>
              <Button onClick={() => form.resetFields()} type="primary">
                Clear
              </Button>
              <Button htmlType="submit" type="primary">
                {productIdEdit == null ? "Save" : "Update"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      {/* End Modal */}
    </MainPageDash>
  );
}
export default ProductPageDash;
