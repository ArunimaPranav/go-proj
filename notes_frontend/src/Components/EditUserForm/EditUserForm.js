import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Typography,
  Box,
  TextField,
  TextareaAutosize,
  Button,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function EditUserForm() {
  let params = useParams();
  const [first_name,setFirstname] = useState('')
  const [last_name,setLastname] = useState('')
  const BASE_URL = "http://127.0.0.1:8080/";
  let [fieldError,setFieldError] = useState()
  let navigate = useNavigate()
  
  // Submit an edited user 
  let SubmitEditeUser = (e) => {
    console.log(first_name,last_name);
    e.preventDefault()
    axios
      .put(BASE_URL + `user/${params.id}`, {
        first_name:first_name,
        last_name:last_name,
        
      })
      .then((response) => {
        if (response.status===200){
            navigate('/allusers')
        }
      })
      .catch((error) => {
        setFieldError('Something goes wrong, Please try again!')
      });
  }
  // Fetching a single user

  let GetSingleUserData = () => {
    axios.get(BASE_URL + `user/${params.id}`).then((response) => {
      setFirstname(response.data.first_name);
      setLastname(response.data.last_name);
    });
  };
  useEffect(() => {
    GetSingleUserData();
  }, []);

  return (
    <div align='center'>
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
        <EditIcon sx={{ color: "#2c387e", marginTop: "20px" }} />
        <Typography variant="h5" style={{ fontFamily: "fantasy" }}>
          Edit User
        </Typography>
        {fieldError&&<Alert onClose={()=>setFieldError(null)} severity="error">{fieldError}</Alert>}
        <form onSubmit={SubmitEditeUser}>
          <Box sx={{ marginTop: "10px" }}>
           
            <TextField
              name="First Name"
              label="First Name"
              sx={{ marginBottom: "10px" }}
              fullWidth
              value={first_name}
              onChange={(e)=>setFirstname(e.target.value)}
            ></TextField>
            <TextField
              name="Last Name"
              label="Last Name"
              value={last_name}
              sx={{ marginBottom: "10px" }}
              fullWidth
              onChange={(e)=>setLastname(e.target.value)}
            ></TextField>
            <br />
            <Button sx={{margin:'10px 0'}} type='submit'>Submit</Button>
          </Box>
        </form>
      </Card>
    </div>
  );
}

export default EditUserForm;
