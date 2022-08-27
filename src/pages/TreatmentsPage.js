import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Treatments from '../components/Treatments';
import { Route } from 'react-router-dom';
import CreateTreatment from '../components/CreateTreatment';

const TreatmentsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
      setIsOpen(!isOpen);
  }

  return (

    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
       <Treatments />
      <Footer />
    </>
  )
}

export default TreatmentsPage;