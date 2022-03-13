import { useCallback, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Coupon } from "../types";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { discount, selectOrders } from "../features/cart/cartSlice";

interface CouponItemProps {
  coupon: Coupon;
}

function CouponItem({ coupon }: CouponItemProps) {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const [checked, setChecked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleChecked = () => {
    let isChecked = !checked;
    setChecked(prev => !prev);

    if (isChecked) {
      orders.forEach(order => {
        dispatch(
          discount({
            id: order.id,
            checked: true,
            coupon,
          })
        );
      });
      return;
    } else {
      orders.forEach(order => {
        const exist = order.discount.find(c => c.id === coupon.id);

        if (exist) {
          dispatch(
            discount({
              id: order.id,
              checked: false,
              coupon,
            })
          );
        }
      });
    }
  };

  return (
    <Base>
      <Checkbox>
        <input type="checkbox" checked={checked} onChange={handleChecked} />
        <Info>
          <Name>{coupon.name}</Name>
          <Rate>{coupon.discount_rate}&#37;</Rate>
        </Info>
      </Checkbox>
      <Button disabled={!checked} checked={checked} onClick={handleOpen}>
        메뉴 선택
      </Button>
      {isOpen && (
        <Modal onClose={handleOpen} coupon={coupon} setChecked={setChecked} />
      )}
    </Base>
  );
}

export default CouponItem;

const Base = styled.dd`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: 0;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;

  > input {
    margin: 0;
    margin-right: 8px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const Button = styled.button<{ checked: boolean }>`
  height: 24px;
  border-radius: 4px;
  background-color: #eee;
  font-size: 12px;
  border: none;
  outline: none;
  color: ${({ checked }) => (checked ? "#000" : "#828182")};
  ${({ checked }) =>
    checked &&
    css`
      cursor: pointer;
    `}
`;

const Rate = styled.span`
  font-size: 12px;
  color: #a199a1;
`;
