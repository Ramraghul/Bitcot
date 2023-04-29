import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Sidenav from './Sidenav';
import Footer from './Footer';

function Portal() {
    const [view, setView] = useState(true);
    return (
        <>
            <div className="App">
                {/* Header */}
                <Nav  view={view} setView={setView} />
                {/* sidebar */}
                <div className="page-wrapper">
                    <Sidenav  view={view} />
                    <div className="content-area-wrapper">
                        <div className="content-area-wrapper">
                            <div className="content-wrapper">
                                {/* ------------------------Component will update here------------------------------------- */}
                                <Outlet />
                                {/* ------------------------Component will update here------------------------------------- */}
                            </div>
                        </div>
                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Portal