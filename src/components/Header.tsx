import styled from "@emotion/styled";

const Header: React.FC = ({ children }) => {
  return <Base>{children}</Base>;
};

export default Header;

const Base = styled.header`
  display: flex;
  align-items: center;
  height: 42px;
  margin-bottom: 16px;
  padding: 0 20px;
  background-color: #fff;
`;
