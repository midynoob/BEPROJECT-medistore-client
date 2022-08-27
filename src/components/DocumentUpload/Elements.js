import styled from "styled-components";

export const SelectButton = styled.div`
    background: #ddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    height: 340px;
    width: 100%;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: all 0.2s ease-in-out;
    color: #101010;


    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;

    }

`
export const ServicesCreateIcon = styled.img`
    height: 90%;
    width: 90%;
    filter: grayscale(80%);

`