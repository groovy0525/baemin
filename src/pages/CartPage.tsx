import styled from "@emotion/styled";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CartList from "../components/CartList";
import CouponList from "../components/CouponList";
import { useAppSelector } from "../app/hooks";
import { selectOrders, selectPrice } from "../features/cart/cartSlice";
import moneyConversion from "../lib/moneyConversion";
import { minimuPrice } from "../features/menu/menuSlice";
import { css } from "@emotion/react";

function CartPage() {
  const navigate = useNavigate();
  const totalPay = useAppSelector(selectPrice);
  const minimumPrice = useAppSelector(minimuPrice) || 0;
  const totalAmount = useAppSelector(selectOrders).reduce(
    (acc, crr) => acc + crr.count * crr.price,
    0
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Base>
        <Header>
          <Button onClick={handleBack}>
            <IoIosArrowBack />
          </Button>
        </Header>
        <CartList />
        <CouponList />
        <Price>
          <p>
            총 결제금액{" "}
            <span>
              {totalPay > 0 ? moneyConversion(totalPay) : moneyConversion(0)}
            </span>
          </p>
          <PaymentButton isPossible={minimumPrice <= totalAmount}>
            {minimumPrice <= totalAmount
              ? "주문하기"
              : `최소 주문 금액은 ${minimumPrice}원 입니다`}
          </PaymentButton>
        </Price>
      </Base>
    </Layout>
  );
}

export default CartPage;

const Base = styled.div`
  max-height: calc(100% - 76px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  height: 76px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;

  > p {
    display: flex;
    align-items: center;
    height: 50%;
    padding: 0 20px;
    margin: 0;
    background-color: #fff;

    > span {
      margin-left: auto;
    }
  }
`;

const PaymentButton = styled.button<{ isPossible: boolean }>`
  width: 100%;
  height: 50%;
  border: none;
  outline: none;
  font-size: 12px;

  ${({ isPossible }) =>
    isPossible &&
    css`
      background-color: #1890ff;
      color: #fff;
    `}
`;
