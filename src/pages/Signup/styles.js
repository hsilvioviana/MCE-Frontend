import styled from "styled-components"
import Background from "../../assets/images/background.png"
import fonts from "../../styles/fonts"

const { DMSans700 } = fonts

export const Container = styled.div`

  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
`

export const Body = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 470px;
  width: 320px;
  padding: 0px 37px;
  background: white;
  border-radius: 10px;
  ${DMSans700}

  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 30px !important;
    margin-right: 70px !important;
  }
  ::-webkit-scrollbar {
    width: 8px;
    background: transparent;
    border-radius: 30px !important;
    margin-right: 30px;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 30px !important;
    margin-right: 30px !important;
  }

  button {

    padding: 20px 0px;

    margin: 28px 0px 25px 0px;
  }

  strong {

    padding: 10px 0px 20px 0px;
  }
`

export const Coordinator = styled.a`

  font-weight: 500;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
`
