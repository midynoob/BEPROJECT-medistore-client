import styled from "styled-components";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";




export const TContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #010606;


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

export const Button = styled.div`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 10px 10px;
    color: #010606;
    font-size: 25px;
    font-weight: 800;
    outline: none;
    border: none;
    cursor: pointer;
    display:flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    line-height: 16px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;

    }

`