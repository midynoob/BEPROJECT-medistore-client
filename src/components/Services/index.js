import React from 'react';
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements';
import Icon1 from '../../images/svg-1.svg';
import Icon2 from '../../images/svg-4.svg';
import Icon3 from '../../images/svg-2.svg';


const Services = () => {
    return (
        <ServicesContainer  id="services" >
            <ServicesH1>Our Services</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1} />
                    <ServicesH2>Cloud Storage</ServicesH2>
                    <ServicesP>Store you medical records for Free</ServicesP>

                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2} />
                    <ServicesH2>Records Sharing</ServicesH2>
                    <ServicesP>Share your Medical records with doctors</ServicesP>

                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3} />
                    <ServicesH2>ECG Classification</ServicesH2>
                    <ServicesP>We provide ECG Classification for doctors</ServicesP>

                </ServicesCard>

            </ServicesWrapper>

        </ServicesContainer>
    )
}

export default Services;
