import { CartDropdownComponent, CartItems, EmptyMessage } from './cart-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';
// import { CartContext } from '../../contexts/cart.context';
// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
  // const {cartItems} = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <CartDropdownComponent>
      <CartItems>
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownComponent>
  )
}

export default CartDropdown;