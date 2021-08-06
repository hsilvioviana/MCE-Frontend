import styled from "styled-components"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"
import { shade  }from "polished"


const { orange, white } = colors
const { DMSans500 } = fonts

export const ButtonContainer = styled.button`

    background-color: ${orange};
    color: ${white};

    width: 100%;
    height: 56px;

    border: 0;
    border-radius: 10px;
    margin-top: 16px;

    transition: background-color: 0.2s;
    cursor: pointer;
    ${DMSans500};

    &:hover {
        background-color: ${shade(0.1, orange)};
    }
`
