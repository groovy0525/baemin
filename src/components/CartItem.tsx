import styled from "@emotion/styled";
import { HiOutlineX, HiMinus, HiPlus } from "react-icons/hi";
import { useAppDispatch } from "../app/hooks";
import { decrement, increment, remove } from "../features/cart/cartSlice";
import moneyConversion from "../lib/moneyConversion";
import { Order } from "../types";

interface CartItemProps {
  product: Order;
}

function CartItem({ product }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrement(product.id));
  };

  const handleRemove = () => {
    dispatch(remove(product.id));
  };

  return (
    <Base>
      <Info>
        <Name>{product.name}</Name>
        <Price>{moneyConversion(product.price)}</Price>
      </Info>
      <ButtonBox>
        <RemoveButton onClick={handleRemove}>
          <HiOutlineX />
        </RemoveButton>
        <Quantities>
          <Button onClick={handleDecrement}>
            <HiMinus />
          </Button>
          <Count>{product.count}</Count>
          <Button onClick={handleIncrement}>
            <HiPlus />
          </Button>
        </Quantities>
      </ButtonBox>
    </Base>
  );
}

export default CartItem;

const Base = styled.li`
  display: flex;
  padding: 0 20px;
  background-color: #fff;

  & + & {
    border-top: 1px solid #edeced;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const Name = styled.h4`
  margin: 0;
  font-size: 14px;
`;

const Price = styled.span`
  margin-top: 4px;
  font-size: 12px;
  color: #a199a1;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-left: auto;
  padding: 10px 0;
`;

const Quantities = styled.div`
  display: flex;
  margin-top: 14px;

  > button:first-of-type {
    border-radius: 4px 0 0 4px;
    border-right: none;
  }

  > button:last-of-type {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }
`;

const buttonStyle = `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  padding: 2px;
  border: 1px solid #edeced;
  background-color: transparent;
  font-size: 12px;
  outline: none;
`;

const Button = styled.button`
  cursor: pointer;
  ${buttonStyle};
`;

const Count = styled.span`
  ${buttonStyle}
  box-sizing: border-box;
`;

const RemoveButton = styled.button`
  ${buttonStyle};
  justify-content: flex-end;
  border: none;
  color: #a199a1;
  cursor: pointer;
`;
