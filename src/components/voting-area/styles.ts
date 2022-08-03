import styled from "styled-components"

export const Container = styled.div`
  margin-top: 12px;

  display: flex;
  /* justify-content: space-evenly; */
`

export const VotingCardWrap = styled.div`
  margin-top: 12px;
  width: 750px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`

export const VotingCard = styled.div`
  width: 220px;
  height: 45px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: yellow;
  border-radius: 12px;
  padding: 0px 12px;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.07);

  margin-bottom: 7px;

  div {
    width: 35px;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: yellowgreen;
    border-radius: 50%;
  }

  .no-vote {
    background: red;
  }
  .with-vote {
    background: yellowgreen;
  }
`
