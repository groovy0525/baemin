import styled from "@emotion/styled";
import { useAppSelector } from "../app/hooks";
import { selectOrders } from "../features/cart/cartSlice";
import CartItem from "./CartItem";

function CartList() {
  const cartList = useAppSelector(selectOrders);

  return (
    <Base>
      {cartList.map(cart => (
        <CartItem key={cart.id} product={cart} />
      ))}
    </Base>
  );
}

export default CartList;

const Base = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
