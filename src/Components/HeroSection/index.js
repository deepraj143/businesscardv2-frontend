import React from 'react'
import { NavLink } from 'react-router-dom'
import './HeroSection.css'
const HeroSection = ({ desc,name, imgsrc, visit, btnname, o1, o2 }) => {
    return (
        <>
            <section id="header" className="d-flex align-items-center">
                <div className="container-fluid nav_bg">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="row">
                                <div className={`col-md-6 cols-1 col-sm-8 pt-4 pt-lg-0 order-2 order-md-${o2} d-flex flex-column algin-items-center justify-content-center`}>
                                    <h1>{name} <strong className="brand-name">  Business Cards</strong></h1>
                                    <h2 className="my-3">
                                        {desc}
                                </h2>
                                    <div className="mt-3">
                                        <NavLink to={visit} className="btn-get-started">{btnname}</NavLink>
                                    </div>
                                </div>
                                <div className={`col-md-6 cols-2 order-1 order-md-${o1} header-img mb-5`}>
                                    <img src={imgsrc} className="img-fluid animated" alt="home img" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection
