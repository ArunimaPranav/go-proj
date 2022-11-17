import {
  Alert,
  Button,
  Card,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUserForm() {
  const BASE_URL = "http://127.0.0.1:8080/";
 
  const [first_name,setFirstname] = useState('')
  const [last_name,setLastname] = useState('')
  const [date_of_birth,setDateofBirth] = useState('')
  const [email_id,setEmailid] = useState('')

  const [fieldError,setFieldError] = useState()
  let navigate = useNavigate()

  let SubmitNote = (e)=>{
    e.preventDefault()
  axios.post(BASE_URL + 'user',{
      first_name:first_name,
      last_name:last_name,
      date_of_birth:date_of_birth,
      email_id:email_id,
      user_type:"user"
    },
    {
        headers:{           
            'Content-Type':'application/json'
        }
      })
    .then((response)=>{
      if (response.status===200){
        navigate('/allusers')
      }
    })
  }
  return (
    <div align="center">
      <Card
        elevation={0}
        variant="outlined"
        sx={{
          marginTop: "100px",
          maxWidth: "300px",
          minWidth: "20%",
          padding: "0 20px",
        }}
        align="center"
      >
        <NoteAddIcon sx={{ color: "#b28900", marginTop: "20px" }} />
        <Typography variant="h5" style={{ fontFamily: "fantasy" }}>
          Add User
        </Typography>
        {fieldError&&<Alert severity="error" onClose={()=>setFieldError(null)}>{fieldError}</Alert>}
        <form onSubmit={SubmitNote}>
          <Box sx={{ marginTop: "10px" }}>
            <TextField
              name="First Name"
              label="First Name"
              sx={{ marginBottom: "10px" }}
              fullWidth
              onChange={(e)=>setFirstname(e.target.value)}
            ></TextField>
            <TextField
              name="Last Name"
              label="Last Name"
              sx={{ marginBottom: "10px" }}
              fullWidth
              onChange={(e)=>setLastname(e.target.value)}
            ></TextField>
            <TextField
              name="Date of Birth"
              label="Date of Birth"
              sx={{ marginBottom: "10px" }}
              fullWidth
              onChange={(e)=>setDateofBirth(e.target.value)}
            ></TextField>
            <TextField
              name="Email id"
              label="Email id"
              sx={{ marginBottom: "10px" }}
              fullWidth
              onChange={(e)=>setEmailid(e.target.value)}
            ></TextField>
            <br />
            <Button sx={{ margin: "10px 0" }} type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Card>
    </div>
  );
}

export default AddUserForm;
