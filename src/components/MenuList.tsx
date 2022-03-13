import styled from "@emotion/styled";
import { useAppSelector } from "../app/hooks";
import { storeInfo } from "../features/menu/menuSlice";
import { Category } from "../types";
import ListItem from "./ListItem";

function MenuList() {
  const menuList = useAppSelector(storeInfo)?.items;
  const categories: Category[] = Array.from(
    new Set(
      menuList?.map(menu =>
        JSON.stringify({
          id: menu.category_id,
          name: menu.category_name,
        })
      )
    )
  ).map(menu => JSON.parse(menu));

  return (
    <Base>
      {categories.map(categori => (
        <ListItem key={categori.id} name={categori.name} type="Category">
          <Base>
            {menuList?.map(menu => {
              if (menu.category_id === categori.id) {
                return <ListItem key={menu.id} menu={menu} type="Menu" />;
              }
              return null;
            })}
          </Base>
        </ListItem>
      ))}
    </Base>
  );
}

export default MenuList;

const Base = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
