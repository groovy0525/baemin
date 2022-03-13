import styled from "@emotion/styled";
import { useAppSelector } from "../app/hooks";
import { discounts } from "../features/menu/menuSlice";
import CouponItem from "./CouponItem";

function CouponList() {
  const coupons = useAppSelector(discounts);

  return (
    <Base>
      <Term>할인</Term>
      {coupons?.map(coupon => (
        <CouponItem key={coupon.id} coupon={coupon} />
      ))}
    </Base>
  );
}

export default CouponList;

const Base = styled.dl`
  padding: 0 20px;
  margin: 0;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: #fff;
`;

const Term = styled.dt`
  margin: 0;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  font-weight: 700;
`;
