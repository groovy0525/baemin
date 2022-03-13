import styled from "@emotion/styled";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { discount } from "../features/cart/cartSlice";
import moneyConversion from "../lib/moneyConversion";
import { Coupon, Order } from "../types";

interface DiscountItemProps {
  item: Order;
  coupon: Coupon;
}

function DiscountItem({ item, coupon }: DiscountItemProps) {
  const dispatch = useAppDispatch();
  const isDiscount = item.discount.find(el => el.id === coupon.id);
  const [isChecked, setIsChecked] = useState<boolean>(
    isDiscount ? true : false
  );

  const handleChecked = () => {
    let checked = !isChecked;
    setIsChecked(prev => !prev);

    dispatch(
      discount({
        id: item.id,
        checked,
        coupon,
      })
    );
  };

  return (
    <Base>
      <input type="checkbox" checked={isChecked} onChange={handleChecked} />
      <Info>
        <ProductName>
          {item.name} x {item.count}
        </ProductName>
        <DiscountCost>
          - {moneyConversion(item.price * item.count)}
        </DiscountCost>
      </Info>
    </Base>
  );
}

export default DiscountItem;

const Base = styled.li`
  display: flex;
  align-items: center;
  height: 60px;

  > input {
    margin: 0;
    margin-right: 8px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const DiscountCost = styled.span`
  font-size: 12px;
  color: #f00;
`;
