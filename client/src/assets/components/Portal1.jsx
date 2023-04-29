import Sidenav from './Sidenav'
import Nav from './Nav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Portal1() {
    return (
        <>
            <div id="page-top">
                <div id="wrapper">
                    <Sidenav />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Nav />
                            <div className="container-fluid">
                                <Outlet />
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Portal1