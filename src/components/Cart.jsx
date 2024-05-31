import { useContext } from "react";

import Modal from "./UI/modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart(){
    const cartCtx = useContext(CartContext);
    const UserProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);
    return(
        <Modal className="cart" open={UserProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.quantity}
                    </li>))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly>Close</Button>
                <Button>Go To Checkout</Button>
            </p>
        </Modal>
    );
}