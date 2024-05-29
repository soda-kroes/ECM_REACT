 
import axios from 'axios'
import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { request } from '../../share/request';
import { formatDateClient, isPermission } from '../../share/helper';
import { Space, message } from 'antd';
import MainPageDash from '../component-dash/mainpage/MainPageDash';


function CategoryPageDash(){
    const [list,setList] = useState([]);
    const [item,setItem] = useState({});
    const [show,setShow] = useState(false);
    const [showForm,setShowForm] = useState(false);

    //for insert
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [status,setStatus] = useState("");

    //form load
   useEffect(()=>{
    getList();
   },[])


    const server = "http://localhost:8081/api/"

    const getList = () => {
        request("category", "get").then(res => {
        //   console.log("response:", res.list);
        setList(res.list)
        }).catch(err => {
          console.log(err);
        });
      };

    const onDelete = () =>{
        setShow(false)
        var category_id = item.category_id
        request("category/"+category_id,"delete").then(res =>{
            var data = res.data
            var tmp_data = list.filter((item)=>item.category_id != category_id)
            setList(tmp_data)
            message.error("Category delete from system success!");
        })

        // axios({
        //     url: server+"category/"+category_id,
        //     method: "delete"
        // }).then(res=>{
        //     var data = res.data
        //     alert(data.msg)
        //     getList();
        // //    var tmp_data = list.filter((item)=>item.category_id != category_id)
        // //    setList(tmp_data);
        // }).catch(err=>{
        //     console.log(err)
        // })
    }

    const onClickBtnDelete = (param) =>{
        setItem(param)
        setShow(true)

    }

    const onHideModel = () =>{
        setShow(false)
        setItem(null)
    }

    //------------ for create category --------------
    const onHideModelForm = () =>{
        setShowForm(false)
        setItem({})
        clearForm()
    }

    const clearForm = () =>{
        setName("")
        setDescription("")
        setStatus("")
    }

    const onClickClear = () =>{
        clearForm()
    }

    const  onSave = () =>{
        onHideModelForm()
        var param = {
            "name": name,
            "description": description,
            "parent_id": null,
            "status": status
        }
        var url ="category"
        var method = "post"

        //case update
        if(item.category_id != null){
            param.category_id = item.category_id // add new key "category_id" to param
            method="put"       
        }
        request(url,method,param).then(res=>{
            if(res){
                getList()
                clearForm()
            }
        })
        
    }
    const onShowModelForm = () =>{
        setShowForm(true)
    }
    //-------------------------Edit
    const onClickEdit = (item) =>{
        setItem(item);
        setName(item.name)
        setDescription(item.description)
        setStatus(item.status)
        setShowForm(true)

    }

    return(
       <MainPageDash>
         <div style={{padding:20}}>
            <div style={{display:'flex', padding: 10, justifyContent: 'space-between'}}>
                <div>category</div>
                <div>
                    <Button onClick={onShowModelForm} variant='primary'>create</Button>
                </div>
            </div>
            <Table striped bordered hover size='sm' style={{textAlign:'center'}}>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>STATUS</th>
                        <th>CREATE</th>
                        <th>ACTION</th>
                    </tr>

                </thead>
                <tbody>
                    {list.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.status} </td>
                                <td>{formatDateClient(item.created_at)}</td>
                                <td>
                                     <Space>
                                     <Button size='sm' disabled={!isPermission("category.Update")} variant="primary" onClick={()=> onClickEdit(item)}>Edit</Button>
                                     <Button size='sm' disabled={!isPermission("category.Delete")}  onClick={()=> onClickBtnDelete(item)} variant="danger">Delete</Button> 
                                     </Space>

                                    {/* { isPermission(category.Update) && <Button variant="primary" onClick={()=> onClickEdit(item)}>Edit</Button>}
                                    { isPermission("category.Delete") && <Button onClick={()=> onClickBtnDelete(item)} variant="danger">Delete</Button> } */}
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>

            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal show={show} onHide={onHideModel}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <p>Are you sure to remove?</p>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={onHideModel}>No</Button>
                    <Button variant="primary" onClick={onDelete}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* Block form insert or update */}
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal show={showForm} onHide={onHideModelForm}>
                    <Modal.Header closeButton>
                    <Modal.Title>{item.category_id == null ? "Create" : "Update"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form>
                        {/* <label>{name},{description},{status}</label> */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            value={name}
                            type="input" 
                            placeholder="name"
                            onChange={(event)=>{
                                setName(event.target.value) //get value from user onchange => set value to name state
                            }}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                             value={description}
                             as="textarea" 
                             rows={3} 
                             onChange={(event)=>{
                                setDescription(event.target.value)
                             }}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Status</Form.Label>
                            <Form.Control 
                            value={status}
                            as="input"
                            placeholder='status'
                            onChange={(event)=>{
                                setStatus(event.target.value)
                            }}
                             />
                        </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={onHideModelForm}>Cancel</Button>
                    <Button variant='danger' onClick={onClickClear}>Clear</Button>
                    <Button variant="primary" onClick={onSave}>{item.category_id == null ? "Save" : "Update"}</Button>
                   
                    </Modal.Footer>
                </Modal>
            </div>


        </div>
       </MainPageDash>
    )
}
export default CategoryPageDash;