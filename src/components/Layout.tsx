import styled from "@emotion/styled";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <Base>{children}</Base>;
}

export default Layout;

const Base = styled.div`
  overflow-y: auto;
  position: relative;
  width: 270px;
  height: 640px;
  margin: 100px auto;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.3);
  background-color: #edeced;

  ::-webkit-scrollbar {
    display: none;
  }
`;
