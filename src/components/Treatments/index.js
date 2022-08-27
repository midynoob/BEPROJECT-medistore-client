import React, { useEffect, useState } from "react";
import {
  ServicesContainer,
  ServicesCreateIcon,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";
import Icon1 from "../../images/add-button.svg";
import Icon2 from "../../images/svg-4.svg";
import Icon3 from "../../images/svg-2.svg";
import { Link } from "react-router-dom";
import axios from "../../axios";

import { useStateValue } from "../../StateProvider";

const Treatments = () => {
  const [state, dispatch] = useStateValue();
  //const [treatments, setTreatments] = useState([]);
  useEffect(() => {
    if (state?.treatments?.length === 0) {
      axios({
        url: "/treatments",
        method: "post",
        data: {
          uid: state.userInfo.userId,
          startAt: new Date().toISOString(),
        },
      })
        .then((res) => {
          console.log("checking tretment id", res.data);
          //setTreatments(res.data)
          dispatch({
            type: "ADD_TREATMENTS",
            treatments: res.data,
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [state?.userInfo]);

  const TreatmentCards = () => {
    if (state?.treatments) {
      if (state.treatments[0]) {
        return (
          <>
            {state.treatments?.map((item) => (
              <Link
                key={item.treatmentId}
                to={`/treatments/${item.treatmentId}`}
              >
                <ServicesCard>
                  <ServicesIcon src={Icon3} />
                  <ServicesH2>{item.name}</ServicesH2>
                  <ServicesP>{item.description}</ServicesP>
                </ServicesCard>
              </Link>
            ))}
          </>
        );
      } else return <div></div>;
    } else {
      return <div></div>;
    }
  };

  return (
    <ServicesContainer id="services">
      <ServicesWrapper>
        <Link to="/treatments/create">
          <ServicesCard>
            <ServicesCreateIcon src={Icon1} />
          </ServicesCard>
        </Link>
        {/* {
                    state.treatments?.map(item => (
                        <ServicesCard>
                            <ServicesIcon src={Icon3} />
                            <ServicesH2>{item.name}</ServicesH2>
                            <ServicesP>{item.description}</ServicesP>
                        </ServicesCard>
                    ))
                } */}
        <TreatmentCards />
        {/* <ServicesCard>
                    <ServicesIcon src={Icon3} />
                    <ServicesH2>Premium Benefits</ServicesH2>
                    <ServicesP>We help reduce your fess and increase your overall revenue</ServicesP>
                </ServicesCard>

                <ServicesCard>
                    <ServicesIcon src={Icon3} />
                    <ServicesH2>Premium Benefits</ServicesH2>
                    <ServicesP>We help reduce your fess and increase your overall revenue</ServicesP>

                </ServicesCard> */}
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Treatments;
