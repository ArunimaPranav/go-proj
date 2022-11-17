import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import NotesIcon from "@mui/icons-material/Notes";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  let navigate = useNavigate();
  return (
    <div>
      <AppBar sx={{ backgroundColor: "#b26a00" }}>
        <Toolbar>
        <div
            onClick={() => navigate("/")}
            style={{ display: "flex", cursor: "pointer" }}
          >
            <NotesIcon />
            <Typography>Home</Typography>
          </div>
          <div
            onClick={() => navigate("/allusers")}
            style={{ display: "flex", cursor: "pointer" ,marginLeft:'20px' }}
          >
            
            <Typography>All Users</Typography>
          </div>
          <Box align="end" sx={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/add-user")}
              color="primary"
            >
              Add user
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
