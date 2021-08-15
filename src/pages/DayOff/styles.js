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
  padding: 20px 33px;
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

  h3 {

    margin: 10px 0px;
  }

  button {

    padding: 20px;
  }

  h2 {

    margin: 10px 0px;
  }
`

export const Controls = styled.div`

  position: absolute;
  top: 0;
  right: 0;
  margin: 30px;
  ${Poppins400}

  h2 {

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 176px;
    top: -9px;

    padding: 5px;
    background-color: #EF3F5F;
    color: white;
    border-radius: 100px;

    font-size: 16px;

    width: 30px;
    height: 30px;

    &:hover {

      cursor: pointer;
      background-color: #b20000;
    }
  }

  p {

    &:hover {
      cursor: pointer;
    }
  }

  img {

    width: 50px;
    height: 50px;
    border-radius: 10px 10px 10px 10px;
    position: absolute;
    right: 140px;
    top: 3px;
  }
`

export const Notifications = styled.div`

  position: absolute;
  top: 70px;
  right: 200px;
  ${Poppins400}
  padding: 5px;

  background-color: white;
  border-radius: 10px;

  div:nth-child(odd) {

    background-color: #EFF1F9;
  }

  div {

    background-color: white;
    padding: 10px;
    border-radius: 10px;

    p {

      width: 250px;
      font-size: 14px;

      &:hover {

        cursor: pointer;

      }
    }

  }
`

export const DayOffContainer = styled.div`

  background-color: ${orange};
  color: ${white};
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 250px;
  
  border-radius: 10px 10px;

  margin: 10px 0px;

  p {

    margin: 0px 10px;
  }

  h5 {

    display: inline;
    background-color: red;

    padding: 12px 3px;

    border-radius: 0px 10px 10px 0px;

    &:hover {

      cursor: pointer;
      background-color: #b20000;
    }
  }
`