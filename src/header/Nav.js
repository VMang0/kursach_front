import React, {useContext, useState, useEffect } from 'react'
import { FaInstagram , FaGithubAlt, FaTelegramPlane} from 'react-icons/fa';
import './Nav.css';
import {Link} from "react-router-dom";
import { useLocation  } from 'react-router-dom';
import { AuthContext } from "../contexts/authContext";
export function Nav() {
    const { authData, setAuthData } = useContext(AuthContext);
    const [activeLink, setActiveLink] = useState("");

    const handleLogout = () => {
        setAuthData(null);
        localStorage.removeItem("user");
        window.location.href = '/';
    };

    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const handleClick = (link) => {
        setActiveLink(link === activeLink ? location.pathname : link);
    };

    const getLinks = () => {
        if (authData && authData.roles[0] === 'ADMIN') {
            return (
                <>
                    <li><Link to = "/" className={`link ${activeLink === "/" ? "active" : ""}`} onClick={() => handleClick("/")}>
                        Номера и апартаменты</Link></li>
                    <li><Link to = "/" className={`link ${activeLink === "/" ? "active" : ""}`} onClick={() => handleClick("/")}>
                        Конференц-залы</Link></li>
                    <li><Link to = "/admin/dashboard-user"
                              className={`link ${activeLink === "/admin/dashboard-user" ? "active" : ""}`}
                              onClick={() => handleClick("/admin/dashboard-user")} >
                        Управление пользователями</Link></li>
                    <li><Link to = "/admin/dashboard-manager"
                              className={`link ${activeLink === "/admin/dashboard-manager" ? "active" : ""}`}
                              onClick={() => handleClick("/admin/dashboard-manager")}>
                        Управление менеджерами</Link></li>
                </>
            );
        } else if (authData && authData.roles[0] === "USER") {
            return (
                <>
                    <li><Link to = "/" className="link" >Номера и апартаменты</Link></li>
                    <li><Link to = "/" className="link" >Контакты</Link></li>
                    <li><Link to = "/test" className="link" >О нас</Link></li>
                    <li><Link to = "/home" className="link" >Ресторан</Link></li>
                    <li><Link to = "/user" className="link" >Конференц-залы</Link></li>
                </>
            );
        } else if (authData && authData.roles[0] === 'MANAGER') {
            return (
                <>
                    <li><Link to = "/" className="link" >Номера и апартаменты</Link></li>
                    <li><Link to = "/user" className="link" >Управление питанием</Link></li>
                    <li><Link to = "/user" className="link" >Управление коференц-залами</Link></li>
                    <li><Link to = "/user" className="link" >Конференц-залы</Link></li>
                </>
            );
        }else {
            return (
                <>
                    <li><Link to = "/" className="link" >Номера и апартаменты</Link></li>
                    <li><Link to = "/" className="link" >Контакты</Link></li>
                    <li><Link to = "/test" className="link" >О нас</Link></li>
                    <li><Link to = "/home" className="link" >Ресторан</Link></li>
                    <li><Link to = "/user" className="link">Конференц-залы</Link></li>
                </>
            );
        }
    };

    return (
        <div className="container">
            <nav className="navbar">
                <div className="left_navbar">
                    <ul className="list_icon">
                        <li><p className="link_style">+375(44)7339153</p></li>
                        <li><button className="icon_btn instagram" ><FaInstagram /></button></li>
                        <li><button className="icon_btn github" ><FaGithubAlt /></button></li>
                        <li><button className="icon_btn telegram"><FaTelegramPlane /></button></li>
                    </ul>
                </div>
                <Link className="center_navbar" to = "/"><p className="white_text">VMANGO</p></Link>
                <div className="right_navbar">
                        <div className="right_navbar">
                            {authData
                                ? <Link className="btn btn-5" onClick={handleLogout}>Выйти</Link>
                                : <Link className="btn btn-5" to="/loginuser">Войти</Link>
                            }
                        </div>
                </div>
            </nav>
            <div>
                <ul className="links-header">{getLinks()}</ul>
            </div>
        </div>
    )
}
