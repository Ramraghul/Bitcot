import React, { useState } from 'react'
import Path from '../images/icons/Path.svg';
import { Link } from 'react-router-dom';


function Sidenav(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <>
            <aside className={`sidebar-wrapper custom-scrollbar wow fadeInLeft ${props.view ? 'open' : ''}`}>
                <div className="sidebar-content-wrapper">
                    <ul className="sidebar-list">
                        <li className={isExpanded ? 'sidebar-list-item has-subnav active open' : 'sidebar-list-item has-subnav active'} id="listTem">
                            <button className="sidebar-link" id="pro_toggle"  onClick={()=>{handleToggle()}}>
                                <img src={Path} alt="Product List" />
                                <span className="item-text">Ecommerce</span>
                            </button>
                            <ul>
                                <li>
                                    <Link to={"/portal"} className="sidebar-link">Product List</Link>
                                </li>
                                <li>
                                    <Link to={"/portal/createproduct"} className="sidebar-link">Add Product</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
        </>

    )
}

export default Sidenav
