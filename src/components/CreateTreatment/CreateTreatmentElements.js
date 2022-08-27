import styled from "styled-components";




export const CTContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #010606;


    @media screen and (max-width: 700px) {
        height: 1100px;
    }

    @media screen and ( max-width: 480px ) {
        height: 1300px;
    }

`
export const InputLabel = styled.p`
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    color: #fff;
`
