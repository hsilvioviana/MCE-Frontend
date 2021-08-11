import styled from "styled-components"
import fonts from "../../styles/fonts"
import colors from "../../styles/colors"


const { Montserrat700, Poppins400 } = fonts
const { orange, white } = colors

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

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 470px;
  width: 320px;
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
`

export const SwitchDayContainer = styled.div`

  padding: 20px 0px 20px 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  h3 {

    padding: 0px 20px;
  }
  
  img {

    width: 18px;
    height: 12px;

    &:hover {
      cursor: pointer;
    }
  }
`

export const Appointments = styled.div`

  width: 80%;
  display: block;

  div {

    color: #626679;
    padding: 10px 0px;

    section {

      display: inline-block;
      width: 35px;

      
    }
    p {

      display: inline;
    }

    h3 {

      display: inline;
      padding: 0px 10px;
    }

    h5 {

      display: inline;
      background-color: red;
      color: ${white};
    
      padding: 10px 12px;
      margin: 0px 10px;
    
      border-radius: 10px;

      &:hover {

        cursor: pointer;
        background-color: #b20000;
      }
    }
  }
`

export const User = styled.h4`

  display: inline;
  background-color: ${orange};
  color: ${white};

  padding: 10px 14px;

  border-radius: 10px;
`

export const Controls = styled.div`

  position: absolute;
  top: 0;
  right: 0;
  margin: 30px;
  ${Poppins400}

  p {

    &:hover {
      cursor: pointer;
    }
  }

  img {

    width: 50px;
    height: 50px;
    border-radius: 10px;
    position: absolute;
    right: 140px;
    top: 3px;
  }
`
