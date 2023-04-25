import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from "react";
import Axios from 'axios'

const Offer = () => {

  const [offer, setOffer] = useState([]);

  useEffect(() => {
    Axios.get("/api/offers").then((response) => {
      setOffer(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    
      <Container>
        <Row>
          <Col className='text-center py-3'>{offer} % Discount</Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>This percentage is fetched from sending a request to secured api from another api</Col>
        </Row>
      </Container>
    
  )
}

export default Offer
