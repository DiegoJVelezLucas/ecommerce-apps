import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { filterProductThunk } from "../store/slices/products.slice";
import { useSelector } from "react-redux";
import ListGroup from 'react-bootstrap/ListGroup';
const ProductDetails = () => {

    const{ id } = useParams()
    const [product, setProduct] = useState({})
    const [rate, setRate] = useState(1)
    const dispatch = useDispatch()
    const allproduct = useSelector(state => state.product)
    const productFiltered = allproduct.filter(product => product.id !== parseInt(id))
    useEffect(() =>{
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(resp => {
            console.log(resp.data)
            setProduct(resp.data)
             dispatch(filterProductThunk(resp.data.category.id))
        })
    }, [])

    const decrement =()=>{
        if(rate>1){
            setRate(rate-1)
        }
    }
    return (
        <div>
            
            <Row>
                <Col>
                <h1>{product.title}</h1>
              <img src={product.images?.[0].url} alt=""  className="img-fluid"/> 
              {/*aplicar carousel de boostrap */}
                <h2>$ {product.price}</h2>
            <small className="mb-3 d-block"></small>
            <button onClick={()=> decrement()}>-</button>
            <span>  {rate}  </span>
            <button onClick={()=> setRate(rate +1)}>+</button>
           
            <button className="primary ms-4">Agregar al carrito</button>
                </Col>
                <Col>
               <h1>descripcion del producto </h1>
               <p>{product.description}</p>                             
                </Col>
            </Row>
            <Row>
                <Col>
                <h3>productos similares</h3>
                
                     <ListGroup>
                        {
                            productFiltered.map(product => (
                                <ListGroup.Item key={product.id}>{product.title}</ListGroup.Item>

                            ))
                        }
                     </ListGroup>
                
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetails;