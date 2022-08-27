import React from 'react';
import { Button } from '../ButtonElement';
import { InfoContainer, InfoWrapper, InfoRow, Column1, Column2, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, ImgWrap, Img } from './InfoElements';
import Login from '../Login';

const SigninWrapper = ({image ,Element}) => {


    const homeObjOne = {
        id: 'signup',
        lightBg: false,
        lightText: true,
        lightTextDesc: true,
        topLine: 'Premium Bank',
        headline: 'Unlimited Transaction with zero fees',
        description: 'Get accesss to our exclusive app that allows you to send unlimited transactions without getting charged any fees.',
        buttonLabel: 'Get Started',
        img: require('../../images/svg-3.svg').default,
        alt: 'Car',
        dark: true,
        primary: true,
        darkText: false,
    }

    return (
        <>
            <InfoContainer lightBg={homeObjOne.lightBg} id={homeObjOne.id} >
                <InfoWrapper>
                    <InfoRow imgStart={image} >
                        <Column1>
                            <Element />
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={homeObjOne.img} alt={homeObjOne.alt} />
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>

            </InfoContainer>
        </>
    )
}

export default SigninWrapper;
