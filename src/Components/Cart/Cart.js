import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.item.length !== 0;

    const cartRemoveItemHandler = id => {
        cartCtx.removeItem(id);
    }
    const cartAddItemHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    }

    const cartItems = <ul className={classes['cart-items']}>
        {
            cartCtx.item.map((item) =>
                <CartItem
                    key={item.id}
                    price={item.price}
                    name={item.name}
                    amount={item.amount}
                    onAdd={cartAddItemHandler.bind(null, item)}
                    onRemove={cartRemoveItemHandler.bind(null, item.id)}
                />
            )
        }
    </ul>;

    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>;
}

export default Cart;