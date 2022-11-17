
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import axios from "axios";

function SingleUserView() {
  let params = useParams();
  const [singleNoteData, setSingelNoteData] = useState();
  const BASE_URL = "http://127.0.0.1:8080/";
  
  // Single user view

  let SingleUser = () => {
    axios.get(BASE_URL + `user/${params.id}`).then((response) => {
      setSingelNoteData(response.data);
    });
  };
  useEffect(() => {
    SingleUser();
  }, []);
  return (
       <>
      <div style={{display:'flex' ,
    justifyContent:"center",
    alignItems: "center" ,minHeight:'100vh'}}>
        <div className="d-flex justify-content-around">
          <Container>
            <Card  style={{ width: "100%", backgroundColor: "#f7f7f7" }}>
              <Card.Body className="d-flex justify-content-around">
           

                <dl class="row">
                  <dt class="col-sm-3">First Name</dt>
                  <dd class="col-sm-9">: {singleNoteData?.first_name}</dd>
                  <dt class="col-sm-3">Last Name</dt>
                  <dd class="col-sm-9">: {singleNoteData?.last_name}</dd>
                  <dt class="col-sm-3">Email</dt>
                  <dd class="col-sm-9">: {singleNoteData?.email_id}</dd>
                  <dt class="col-sm-3">Date of birth</dt>
                  <dd class="col-sm-9">: {singleNoteData?.date_of_birth}</dd>
                  
                </dl>

                <br></br>
              </Card.Body>
            </Card>
            <br></br>
         
          </Container>
        </div>
      </div>
    </>
  );
}

export default SingleUserView;
