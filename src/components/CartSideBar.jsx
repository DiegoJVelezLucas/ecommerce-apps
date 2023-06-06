
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCartThunk } from '../store/slices/Cart.slice';
const CartSideBar = ({show, handleClose}) => {
   const dispatch = useDispatch()
   const purchase = useSelector(state => state.purchase)
    useEffect(()=>{
        dispatch(getProductCartThunk())
    },[])



    return (
        <div>
            

      <Offcanvas  placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Funcionalidad del carrito
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    );
};

export default CartSideBar;