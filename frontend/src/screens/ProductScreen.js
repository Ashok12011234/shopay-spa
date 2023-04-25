import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import axios from "axios";
import products from "../products";
import Message from "../components/Message";

const ProductScreen = ({ history, match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get("/api/getProduct", {
        params: { id: match.params.id },
      })
      .then((response) => {
        setProduct(response.data[0]);
        //console.log(response.data[0])
      });
  }, [match]);

  const [custom_attribute, setAttributeList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/getCustomAttribute", {
        params: { id: match.params.id },
      })
      .then((response) => {
        setAttributeList(response.data);
        //console.log(response.data[0])
      });
  }, []);

  const [qty, setQty] = useState(0);
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />

          <p className="my-5">Description: {product.description}</p>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.title}</h3>
            </ListGroup.Item>

            <ListGroup.Item>Varient :{product.name}</ListGroup.Item>

            <ListGroup.Item>SKU:{product.sku}</ListGroup.Item>

            <ListGroup.Item>Weight :{product.weight}g</ListGroup.Item>

            {custom_attribute.map((attribute) => (
              <ListGroup.Item key={attribute.attribute_id}>
                {attribute.name}:{attribute.value}
              </ListGroup.Item>
            ))}

            <ListGroup.Item className="my-5 bg-info variant-dark">
              <h2>Price: ${product.price}</h2>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.count > 0 ? "In Stock" : "Out Of Stock"}</Col>
                </Row>
              </ListGroup.Item>

              {product.count > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.count).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.count === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
