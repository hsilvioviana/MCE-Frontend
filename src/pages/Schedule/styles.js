import styled from "styled-components"
import fonts from "../../styles/fonts"


const { Montserrat700 } = fonts

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #F2F2F2;
`

export const Body = styled.div`

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 470px;
  width: 320px;
  padding: 0px 40px;
  background: white;
  border-radius: 10px;
  ${Montserrat700}

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

    margin: 30px 0px 25px 0px;
  }
`

export const Week = styled.div`

  h1 {

    padding: 10px 0px;
  }
`
