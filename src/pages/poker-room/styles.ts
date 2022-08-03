import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CardsWrap = styled.div`
  width: 420px;
  height: 200px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
`
type CardProps = {
  isSelected: boolean
}

export const Card = styled.button<CardProps>`
  width: 70px;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-weight: ${({ isSelected }) => isSelected ? 'bold' : 'normal'};

  background: ${({ theme, isSelected }) => isSelected ? theme.colors.primary.main : 'white'};
  color: #000;
  border: 1px solid #D8DAC9;
  border-radius: 12px;
  box-shadow: 0px 7px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in;

  outline: none;

  margin-right: 12px;

  &:active{
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`

export const VotingArea = styled.div`
  margin-top: 75px;
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

  & + & {
    margin-top: 12px;
  }

  div {
    width: 35px;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: yellowgreen;
    border-radius: 50%;
  }
`
