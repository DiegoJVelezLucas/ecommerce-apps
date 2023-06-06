import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductThunk,
  filterProductThunk,
  filterNameProduct
} from "../store/slices/products.slice";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const dispatch = useDispatch();
  const newList = useSelector((state) => state.product);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  useEffect(() => {
    dispatch(getProductThunk());
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.error(error));
  }, []);

  //lo que se muestra
  return (
    <div>
      <Row className="pt-5">
        <Col md={4} lg={3}>
          <ListGroup className="w-100">
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => dispatch(filterProductThunk(category.id))}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8} lg={9}>
          <h1>Productos</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Busqueda por nombre"
              aria-label="Busqueda por nombre"
              aria-describedby="basic-addon2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
             variant="outline-secondary" 
             id="button-addon2"
             onClick={() => dispatch(filterNameProduct(searchValue))} >
              Buscar
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3}>
            {newList.map((product) => (
              <Col className="mb-3" key={product.id}>
                <Card className="w-100">
                  <Card.Img
                    variant="top"
                    src={product?.images[0].url}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button
                     variant="primary"
                     as={Link}
                    to={`/product/${product.id}`}
                     >Go Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
