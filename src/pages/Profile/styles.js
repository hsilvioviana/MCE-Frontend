import styled from "styled-components"
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
  background-color: #F2F2F2;
`

export const Body = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 470px;
  width: 320px;
  padding: 0px 40px;
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

    margin: 40px 0px 45px 0px;
    padding: 20px;
  }

`

export const UserPhoto = styled.img`

  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin: 40px 0px 0px 0px;
`

export const EditPhoto = styled.img`

    backgroundColor: #ccc;

    &:hover {
        
        cursor: pointer;
    }
`
