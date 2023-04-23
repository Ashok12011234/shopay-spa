import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table, Modal, Alert } from "react-bootstrap";
import Axios from 'axios'

const Orders = () => {
  const [orders, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/orders").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>order id</th>
            <th>State</th>
            <th>Ordered Date</th>
          </tr>
        </thead>

        {orders.map((order, index) => (
          <tbody>
          <tr>
            <td>{order.order_id}</td>
            {/* <td>{order.product_id.map(product => product + "\n")}<br></br></td> */}
            <td>
              {" "}
              <Button className="btn-sm" onClick={() => {}}>
                {order.status}
              </Button>
            </td>
            <td>{order.order_date}</td>
          </tr>
        </tbody>
        ))}

        
      </Table>
      <></>
    </>
  );
};

export default Orders;
