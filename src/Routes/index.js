import React,{useContext} from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import Home from '../Pages/Home/Home'
import About from '../Pages/About/About'
import Signup from '../Pages/Signup/Signup'
import Login from '../Pages/Login/Login'
import {AuthContext} from '../Context/AuthContext'
import Loading from '../Components/Loading'
import Logout from '../Pages/Logout'
import ProtectedLayout from '../Layout/ProtectedLayout'
import Contact from '../Pages/Contact'
import Template from '../Pages/FilterItems/index'
import MyCards from '../Pages/MyCards'
import T8 from '../Pages/Alltemp/T7'
import AllDetails from '../Pages/AllDetails'
import Addtemplate from '../Pages/Addtemplate'
import DownloadTemplate from '../Pages/DownloadTemplate'
import Setting from '../Pages/Setting'

const Routers = () => {

    const {auth}=useContext(AuthContext)

    return (
        <>
        <Router>
                <Switch>
                    <Route exact path="/"><MainLayout><Home/></MainLayout></Route>
                    <Route exact path="/about"><MainLayout><About/></MainLayout></Route>
                    <Route exact path="/contact"><MainLayout><Contact/></MainLayout></Route>
                    <Route exact path="/template"><MainLayout><Template withRadio={false}/></MainLayout></Route>
            

                    {/* Logged Out Only Routes */}
                    {<Route exact path="/login">
                        {auth === false && <MainLayout><Login/></MainLayout>}
                        {auth === true && <Redirect to="/"></Redirect>}
                        {auth === undefined && <Loading />}
                    </Route>}
                    {<Route exact path="/signup">
                        {auth === false && <MainLayout><Signup/></MainLayout>}
                        {auth === true && <Redirect to="/"></Redirect>}
                        {auth === undefined && <Loading />}
                    </Route>}

                    {/* Logged In Only Routes */}
                   {<Route exact path="/card">
                        {auth === true && <ProtectedLayout><MyCards/></ProtectedLayout>}
                        {auth === false && <Redirect to="/"></Redirect>}
                        {auth === undefined && <Loading />}
                    </Route>}
                    {<Route exact path="/alldetails">
                        {auth === true && <ProtectedLayout pageColor='blue-page'><AllDetails/></ProtectedLayout>}
                        {auth === false && <Redirect to="/"></Redirect>}
                        {auth === undefined && <Loading />}
                    </Route>}
                    {<Route exact path="/Template/add">
                        {auth === true && <ProtectedLayout><Addtemplate /></ProtectedLayout>}
                        {auth === false && <Redirect to="/"></Redirect>}
                        {auth === undefined && <Loading />}
                    </Route>}
                    {<Route exact path="/Download/Template">
                        {auth === true && <ProtectedLayout><DownloadTemplate/></ProtectedLayout>}
                        {auth === false && <Redirect to="/"></Redirect>}
                        {auth === undefined && <Loading />}
                    </Route>}
                    {<Route exact path="/logout">
                        {auth === true && <ProtectedLayout><Logout/></ProtectedLayout>}
                        {auth === false && <Redirect to="/"></Redirect>}
                        {auth === undefined && <Loading />}
                    </Route>}
                    {<Route exact path="/setting">
                        {auth === true && <ProtectedLayout pageColor='blue-page'><  Setting/></ProtectedLayout>}
                        {auth === false && <Redirect to="/"></Redirect>}
                        {auth === undefined && <Loading />}
                    </Route>}
                    
                    {/* <Route exact path="/Addpersondetails"><MainLayout pageColor='blue-page'><Addpersonaldetails/></MainLayout></Route>
                    <Route exact path="/Combine"><MainLayout pageColor='blue-page'><Combine/></MainLayout></Route> */}



                    {/* testing routes */}
                    <Route exact path="/test"><MainLayout pageColor='blue-page'><T8/></MainLayout></Route>
                    <Redirect to="/"></Redirect>

                    
                </Switch> 
            </Router>
            
        </>
    )
}

export default Routers
