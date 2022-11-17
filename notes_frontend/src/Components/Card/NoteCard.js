import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/material";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import './noteCard.css'
function NoteCard(props) {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [successRes, setSuccessRes] = useState();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [id, setId] = useState();
  const BASE_URL = "http://127.0.0.1:8000/";
  // Delete a note

  let DeleteNote = (id) => {
    axios
      .delete(BASE_URL + `api/v1/notes/${id}/`)
      .then((response) => {
        if (response.status === 204) {
          setSuccessRes("Note deleted successfully..");
        }
      })
      .catch((error) => {
      });
  };
  let Del = (id) => {
    handleOpen();
    setId(id);
  };
  // After delete a modal, close modal and reload the home page

  let AfterDel = () => {
    handleClose();
    window.location.reload();
  };
  return (
    <div style={{display:'flex',justifyContent:'center',margin:'auto'}}>
    <div className="card"  >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {!successRes ? (
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Are You Sure?
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Do you want to delete this user
              </Typography>
              <br />
              <Button color="error" onClick={() => DeleteNote(id)}>
                Yes
              </Button>
              <Button onClick={handleClose}>No</Button>
            </Box>
          </Fade>
        ) : (
          <Fade in={open}>
            <Box sx={style}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#00e676",
                }}
              >
                <CheckCircleIcon
                  size="large"
                  align="center"
                  sx={{ width: "70px", height: "70px" }}
                />
              </Box>
              <Typography
                align="center"
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Success!
              </Typography>
              <Typography
                align="center"
                id="transition-modal-description"
                sx={{ mt: 2 }}
              >
                {successRes}
              </Typography>
              <br />
              <Box align="end">
                <Button onClick={AfterDel}>Ok</Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Modal>

      <Card  sx={{ width: 345,height:200, margin: "10px" }} >
        <CardContent>
        <Box align='end' mt={-1}>
        <Typography variant="caption" sx={{marginLeft:'auto'}}>{props.data.created_at} ago</Typography>
        </Box>
          <Typography className="title" gutterBottom variant="h5" component="div">
            {props.data.title}
          </Typography>
          <Typography className="body" variant="body2" color="text.secondary">
            {props.data.body}
          </Typography>
          
        </CardContent>
        <div style={{display:'flex'}}>
        <CardActions sx={{display:'flex'}}>
          <Button
            size="small"
            onClick={() => navigate(`edit-note/${props.data.id}/`)}
          >
            Edit
          </Button>
          <Button
            size="small"
            onClick={() => navigate(`/view-note/${props.data.id}/`)}
            color="success"
          >
            view
          </Button>
          <Button size="small" color="error" onClick={() => Del(props.data.id)}>
            delete
          </Button>
        </CardActions>
        </div>
      </Card>
    </div>
    </div>
  );
}

export default NoteCard;
