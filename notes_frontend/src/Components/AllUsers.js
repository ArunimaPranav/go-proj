import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [users,setUsers]=useState()
  let navigate = useNavigate();
  useEffect(()=>{
    getallUsers()
  },[])

  const getallUsers=async()=>{
      try {
        const {data}=await axios.get('http://127.0.0.1:8080/users/')
        setUsers(data)
      } catch (error) {
        console.log(error);
      }
  }
  console.log(users);
  return (
    <>
    <div className='container' style={{marginTop:'100px'}}>
       <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Date Of Birth</th>
          <th>Edit</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((item,index)=>(
          <tr key={index}>
          <td>{index+1}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email_id}</td>
          <td>{item.date_of_birth}</td>
          <td>
          <Button onClick={()=>navigate(`/edit-user/${item.User_id}`)} variant="info">Edit</Button>
          </td>
          <td>
          <Button onClick={()=>navigate(`/view-user/${item.User_id}`)} variant="info">View</Button>
          </td>
        </tr>
        ))}
        
        
      </tbody>
    </Table>
    </div>
    </>

  )
}

export default AllUsers
