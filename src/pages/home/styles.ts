import styled from "styled-components";

export const Container = styled.div`
  width: 550px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    margin-top: 20px;
  }

  .logo {
    width: 43%;
    height: 75px;

    position: absolute;
    top: 12px;

    img {
      width: 120px;
      height: 55px;
    }

    h1 {
      font-size: 14px;
    }
  }
`
