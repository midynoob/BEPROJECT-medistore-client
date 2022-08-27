import styled from "styled-components";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";




export const TContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    max-width: 600px  ;

    @media screen and (max-width: 700px) {
        height: 1100px;
    }

    @media screen and ( max-width: 480px ) {
        height: 1300px;
    }
`
export const TContainer2 = styled(Container)`
  margin-top: 80px;
  padding-top: 80px;
`

export const NButton = styled.div`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 12px 44px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    display:flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;

    }

`