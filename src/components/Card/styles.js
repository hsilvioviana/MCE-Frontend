import styled from "styled-components"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"


const { white, blue, lightGray } = colors
const { DMSans400, DMSans700 } = fonts

export const CardContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 450px;
    background: ${white};
    border-radius: 10px;
    padding: 40px 0px;

    > div {

        display: flex;
        color: ${blue};
        ${DMSans400};

        margin: 20px 65px;

        > a {

            ${DMSans700};
            text-decoration: none;
            color: ${lightGray};
        }
    }
`
