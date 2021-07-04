import React from 'react'
import HomeImg from "../../asset/homeimg.png"
import HeroSection from '../../Components/HeroSection'
const Home = () => {

    return (
        <>
            <HeroSection name="Grow your Business "  desc={"We Give you Business card for your proffesional Business"} 
        imgsrc={HomeImg}
            visit="/signup" btnname="Get Started" o1="2" o2="1" />
        </>
    )
}

export default Home
    