import styled from "styled-components";

// 태그에 대한 스타일 적용 (``백틱사용)
const Test = styled.div`
  background-color: black;
  color: white;
`;

const StyledMain = styled.main`
  padding-top: 56px;
  display: flex;
`;

const Home = () => {
  return (
    <StyledMain>
      <h1>Home</h1>
      <Test>Test~~~</Test>
    </StyledMain>
  );
};

export default Home;
