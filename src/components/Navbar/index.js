import React, { useEffect, useState } from 'react';
import { Nav,NavLinkr, NavbarContainer, NavLogo, MobileIcon, NavMenu , NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements';
import {FaBars } from 'react-icons/fa';
import {animateScroll as scroll } from 'react-scroll';
import {useStateValue} from '../../StateProvider';
import {fAuth} from '../../firebase';
import { useNavigate,useLocation } from 'react-router-dom';

const Navbar = ({toggle}) => {


    const [state, dispatch] = useStateValue();
    const [scrollNav, setScrollNav] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const [isTreatmentsActive,setIsTreatmentsActive] = useState(false);
    const [isDocumentsActive,setIsDocumentsActive] = useState(false);

    const [isPatientsTreatmentsActive,setIsTPatientsreatmentsActive] = useState(false);
    const [isPatientsActive,setIsPatientsActive] = useState(false);

    const [isUserInfoActive, setIsUserInfoActive] = useState(false);
    const [isPredictActive, setIsPredictActive] = useState(false)
    
    const changeNav = () => {
        if(window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false) 
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
        
    }, []);
    useEffect(() => {
        if(location.pathname.substring(1,5) === 'trea'){
            setIsTreatmentsActive(true)
        }else {
            setIsTreatmentsActive(false)
        }

        if(location.pathname.substring(1,5) === 'docu'){
            setIsDocumentsActive(true)
        }else {
            setIsDocumentsActive(false)
        }
        if(location.pathname.substring(1,5) === 'pred'){
            setIsPredictActive(true)
        }else {
            setIsPredictActive(false)
        }

        if(location.pathname.substring(1,6) === 'userI'){
            setIsUserInfoActive(true)
        }else {
            setIsUserInfoActive(false)
        }

        if(location.pathname.substring(1,5) === 'pati'){
            if(location.pathname.length === 20){
                setIsTPatientsreatmentsActive(true)
                setIsPatientsActive(false)
            }else {
                setIsPatientsActive(true)
                setIsTPatientsreatmentsActive(false)
            }
        }

    }, [location.pathname]);

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    const handleAuthentication = () => {
        const auth = fAuth.getAuth();
        if(state.user) {
            fAuth.signOut(auth)
                .then(() => {
                    alert("signed out sucessfully")
                    navigate('/');
                })
                .catch((error)=> {
                    alert(error.code);
                })
        }
    }

    return (
        <>
            <Nav scrollNav={scrollNav} >
                <NavbarContainer>
                    <NavLogo to="/" onClick={toggleHome} >
                        medistore
                    </NavLogo>
                    <MobileIcon onClick={toggle} >
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        
                        
                        {!state?.user && (
                            <>
                                <NavItem>
                                    <NavLinks to='discover' smooth={true} duration={500} spy={true} exact='true' offset={-80}  >
                                        Discover
                                    </NavLinks>
                                </NavItem>
                                <NavItem>
                                    <NavLinks to='services' smooth={true} duration={500} spy={true} exact='true' offset={-80}  >
                                        Services
                                    </NavLinks>
                                </NavItem>
                                <NavItem >
                                    <NavLinkr to='/signup' >
                                        Sign Up
                                    </NavLinkr>
                                </NavItem>
                                <NavBtn  >
                                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                                </NavBtn>
                            </>
                                
                            )
                        }
                        {state?.user && state?.userInfo?.type === 'patient' && (
                                <>
                                    <NavItem linkActive={isTreatmentsActive}>
                                        <NavLinkr to='/treatments'  >
                                            Treatements
                                        </NavLinkr>
                                    </NavItem>
                                    <NavItem linkActive={isDocumentsActive}>
                                        <NavLinkr to='/documents'  >
                                            Documents
                                        </NavLinkr>
                                    </NavItem>
                                    <NavItem linkActive={isUserInfoActive}>
                                        <NavLinkr to='/userInfo'  >
                                            UserInfo
                                        </NavLinkr>
                                    </NavItem>
                                    <NavBtn onClick={handleAuthentication} >
                                        <NavBtnLink to='/'>PA Sign out</NavBtnLink>
                                    </NavBtn>
                            
                                </>
                        )}
                        {state?.user && state?.userInfo?.type === 'doctor' && (
                                <>
                                    <NavItem linkActive={isPatientsActive}>
                                        <NavLinkr to='/patients'  >
                                            Patients
                                        </NavLinkr>
                                    </NavItem>
                                    <NavItem linkActive={isPatientsTreatmentsActive}>
                                        <NavLinkr to='/patients/treatments'  >
                                            Treatments
                                        </NavLinkr>
                                    </NavItem>
                                    <NavItem linkActive={isUserInfoActive}>
                                        <NavLinkr to='/userInfo'  >
                                            UserInfo
                                        </NavLinkr>
                                    </NavItem>
                                    <NavItem linkActive={isPredictActive}>
                                        <NavLinkr to='/predict'  >
                                            Predict
                                        </NavLinkr>
                                    </NavItem>
                                    <NavBtn onClick={handleAuthentication} >
                                        <NavBtnLink to='/'>DOC Sign out</NavBtnLink>
                                    </NavBtn>
                            
                                </>
                        )}
                        
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar;
