import styled from "styled-components"
import colors from "../../styles/colors"


const { gray, inputColor, blue, lightGray } = colors

export const InputContainer = styled.div`

    background-color: ${gray};
    color: ${inputColor};

    width: 100%;
    height: 45px;

    padding: 8px 10px;
    border-radius: 10px;
    margin-top: 16px;

    transition: all 0.3s;
    display: flex;
    align-items: center;

    & + div {
        
        margin-top: 20px;
    }

    input {
        
        color: ${blue};

        height: 45px;
        border: 0px;

        background: transparent;
        flex: 1;
        outline: none;

        &:: placeholder {

            color: ${lightGray}
        }
    }
`
