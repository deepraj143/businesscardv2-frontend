import React,{useContext,useState,useEffect} from 'react'
import {Dropdown} from 'react-bootstrap';
import {FaTimes,FaBars} from 'react-icons/fa'
import {GiCardExchange} from 'react-icons/gi'
import Button from '../../Components/Button'
import {AuthContext} from '../../Context/AuthContext'
import {Link} from 'react-router-dom'
import Avatar from '../../asset/Avtar.png'
import './Header.css'
const Header = () => {

    const [click, setclick] = useState(false);
    const [button, setButton] = useState(true);
    const [scroll, setscroll] = useState(false);

    const handleClick = () => setclick(!click);
    const closeMobileMenu = () => setclick(false);

    const showButton = () => {
        if (window.innerWidth <= 900) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton();
    }, [])

    const scrollchange = () => {
        if (window.scrollY >= 80) {
            setscroll(true)
        } else {
            setscroll(false)
        }
    }
    window.addEventListener('resize', showButton);
    window.addEventListener("scroll", scrollchange);

    const {auth}=useContext(AuthContext)
    const isLoggedin=auth;
    return (
        <>
            

<nav className={scroll ? "navbar active" : "navbar"}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <strong style={{color:"#1bb1dc"}}>Business </strong><strong style={{ marginRight:"15px"}}> Card</strong><GiCardExchange size={50} color={"#1bb1dc"}/>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                      {click ? <FaTimes/> : <FaBars/>}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/about' className="nav-links" onClick={closeMobileMenu}>
                            About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/template' className="nav-links" onClick={closeMobileMenu}>
                            Templates
                            </Link>
                        </li>
                       <li className="nav-item">
                            <Link to='/contact' className="nav-links" onClick={closeMobileMenu}>
                                Contact
                            </Link>
                        </li>
                        {!isLoggedin && (<li className="nav-item">
                            <Link to='/login' className="nav-links" onClick={closeMobileMenu}>
                                Login
                            </Link>
                        </li>)}
                        {isLoggedin && (<li className={click ?"nav-item":"ds-none"}>
                            <Link to='/setting' className="nav-links" onClick={closeMobileMenu}>
                                Settings
                            </Link>
                        </li>)}
                        {isLoggedin && (<li className={click ?"nav-item":"ds-none"}>
                            <Link to='/logout' className="nav-links" onClick={closeMobileMenu}>
                                Logout
                            </Link>
                        </li>)}
                        {isLoggedin && (<li className={click ?"ds-none": "nav-item"}>
                            <Link to='/card' className="nav-link mt-2" onClick={closeMobileMenu}>
                                <Button buttonStyle="btn--primary">MyCards </Button>
                            </Link>
                        </li>)}
                        {isLoggedin && (<li className={click ?"ds-none": "nav-item"}>
                        <Dropdown className="avtar-btn" >
                                <img src={Avatar} alt="avtar"/>
                            <Dropdown.Toggle  variant="" id="dropdown-basic">
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                               <Dropdown.Item> <Link to="/setting">Settings</Link></Dropdown.Item>
                               <Dropdown.Item> <Link to="/logout">Logout</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </li>)}
                       
                        {isLoggedin && <Link to='/card' className="nav-links-mobile " onClick={closeMobileMenu}>
                                MyCards
                        </Link>}
                        {!isLoggedin && <Link to='/signup' className="nav-links-mobile " onClick={closeMobileMenu}>
                                SignUp
                        </Link>}
                    </ul>
                    {!isLoggedin && <p style={{margin:"0"}}>{button && <Link to="/signup"><Button buttonStyle="btn--primary">SIGN UP</Button></Link>}</p>}
                </div>
            </nav>
        </>
    )
}

export default Header
