import { useEffect } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import Layout from "../components/Layout";
import MenuList from "../components/MenuList";
import { selectCount } from "../features/cart/cartSlice";
import { getMenu, loading, storeInfo } from "../features/menu/menuSlice";

function ListPage() {
  const dispatch = useAppDispatch();
  const store = useAppSelector(storeInfo);
  const totalCount = useAppSelector(selectCount);
  const isLoading = useAppSelector(loading);

  useEffect(() => {
    if (!store) {
      dispatch(getMenu());
    }
  }, [dispatch, store]);

  return (
    <Layout>
      {isLoading && (
        <Loading>
          <Loading>
            <span></span>
            <p>Loading...</p>
          </Loading>
        </Loading>
      )}
      <Base>
        <Header>
          <ShopTitle>{store?.merchant_name}</ShopTitle>
        </Header>
        <MenuList />
        <StyledLink to="cart">
          <BsCart4 />
          {totalCount !== 0 && <span>{totalCount}</span>}
        </StyledLink>
      </Base>
    </Layout>
  );
}

export default ListPage;

const Base = styled.div`
  height: calc(100%);
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const loadingSpinner = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;

  > span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 4px solid #eee;
    border-top-color: #1890ff;
    animation: 1s ${loadingSpinner} linear infinite;
  }

  > p {
    margin-top: 20px;
    font-size: 12px;
  }
`;

const ShopTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2ac1bc;
  color: inherit;
  text-align: center;

  > svg {
    font-size: 20px;
    color: #fff;
  }

  > span {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    font-size: 12px;
    color: #2ac1bc;
    font-weight: 700;
  }
`;
