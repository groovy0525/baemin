import styled from "@emotion/styled";
import { useAppDispatch } from "../app/hooks";
import { add } from "../features/cart/cartSlice";
import moneyConversion from "../lib/moneyConversion";
import { Menu } from "../types";

interface ListItemProps {
  name?: string;
  menu?: Menu;
  type: keyof typeof ListType;
  children?: React.ReactNode;
}

enum ListType {
  Category = "category",
  Menu = "menu",
}

function ListItem({ name, menu, type, children }: ListItemProps) {
  const dispatch = useAppDispatch();

  const price = menu?.price;

  const handleAddCart = () => {
    if (menu) {
      dispatch(add(menu));
    }
  };

  return (
    <Base>
      {type === "Category" ? (
        <Category>{name}</Category>
      ) : (
        <Detail onClick={handleAddCart}>
          <Name>{menu?.name}</Name>
          {price && <Price>{moneyConversion(price)}</Price>}
        </Detail>
      )}
      {children}
    </Base>
  );
}

export default ListItem;

const Base = styled.li`
  padding: 0 20px;
  background-color: #fff;

  & + & {
    margin-top: 16px;
  }

  &:last-of-type {
    padding-bottom: 10px;
  }

  li {
    padding: 0;
  }
`;

const Category = styled.h3`
  margin: 0;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  cursor: pointer;
`;

const Name = styled.h4`
  margin: 0;
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 12px;
  color: #a199a1;
`;
