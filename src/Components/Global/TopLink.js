import React from "react";
import { NavLink } from "react-router-dom";

const TopLink = (props) => {
    const { links } = props
    return(
        <div className ="row ">
            <div className ="col">
                <ol className ="breadcrumb text-muted fs-6 fw-bold">
                    <li className ="breadcrumb-item  pe-3"><NavLink  to="/" className="pe-3">Home</NavLink></li>
                    {links && links.length > 0 && links.map((link,i)=> (
                        <li className ="breadcrumb-item pe-3" key={i}>
                            <NavLink to={`/${link.toLowerCase()}`} className="pe-3"> {link} </NavLink>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default TopLink;