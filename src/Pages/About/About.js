import React from 'react'
import HeroSection from '../../Components/HeroSection'
import AboutImg from "../../asset/1.svg"
const About = () => {
    return (
        <>
            <HeroSection name="Welcome to About Page" desc={"We Create So much  Businesscards for proffesional Business"} imgsrc={AboutImg} visit="/signup" btnname="Signup" o1="1" o2="2" />
        </>
    )
}

export default About