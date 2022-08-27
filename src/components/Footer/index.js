import React from 'react';
import { FooterContainer, FooterWrapper, FooterLinksContainer, FooterLinksWrapper, FooterLinkItems, FooterLinkTitle, FooterLink, SocialMedia, SocialMediaWrap, SocialLogo, SocialIconLink, SocialIcons, WebsiteRights } from './FooterElements';
import { FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrapper>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle> 
                                About us
                            </FooterLinkTitle>

                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >Sign in</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> 
                                About us
                            </FooterLinkTitle>

                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >Sign in</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>

                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle> 
                                About us
                            </FooterLinkTitle>

                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >Sign in</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> 
                                About us
                            </FooterLinkTitle>

                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >About us</FooterLink>
                                <FooterLink to="/" >Sign in</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>

                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/' >medistore</SocialLogo>
                        <WebsiteRights>medistore © 2021 All rights reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href='//www.twitter.com/xyz' traget='_blank' aria-label='Facebook'>
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href='/' traget='_blank' aria-label='Facebook'>
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href='/' traget='_blank' aria-label='Facebook'>
                                <FaFacebook />
                            </SocialIconLink>
                        </SocialIcons>
                        
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrapper>
        </FooterContainer>
    )
}

export default Footer;
