/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import flipkartLogo from '../images/logo/flipkart.png';
import goldenStar from '../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu,
} from '../components/derived/HeaderContent';
import { login, signout } from '../store/actions/action';
import '../styles/header.css'


const Header = (props) => {
    const [loginModal, setLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLoginModalClose = () => {
        setLoginModal(false);
        setEmail('');
        setPassword('');
    }
    const handleLoginModalShow = () => {
        setLoginModal(true);
    }

    const userLogin = () => {
        dispatch(login({ email, password }));
    }

    const logout = () => {
        dispatch(signout());
        setEmail('');
        setPassword('');
    }

    useEffect(() => {

        if(auth.authenticate){
            handleLoginModalClose();
        }

    }, [auth.authenticate]);

    const renderLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a className="firstName">
                        {auth.user.firstName}
                    </a>
                }
                menus={[
                    { label: "My Profile", href: "", icon: null },
                    { label: "SuperCoin Zone", href: "", icon: null },
                    { label: "Flipkart Plus Zone", href: "", icon: null },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                    },
                    { label: "Wishlist", href: "", icon: null },
                    { label: "My Chats", href: "", icon: null },
                    { label: "Coupons", href: "", icon: null },
                    { label: "Rewards", href: "", icon: null },
                    { label: "Notifications", href: "", icon: null },
                    { label: "Gift Cards", href: "", icon: null },
                    { label: "Logout", href: "", icon: null, onClick: logout },
                ]}
            />
        );
    };

    const renderNonLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a
                        className="loginButton"
                        onClick={() => {
                            //setSignup(false);
                            handleLoginModalShow();
                        }}
                    >
                        Login
              </a>
                }
                menus={[
                    { label: "My Profile", href: "", icon: null },
                    { label: "Flipkart Plus Zone", href: "", icon: null },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                        onClick: () => {
                            !auth.authenticate && handleLoginModalShow();
                        },
                    },
                    { label: "Wishlist", href: "", icon: null },
                    { label: "Rewards", href: "", icon: null },
                    { label: "Gift Cards", href: "", icon: null },
                ]}
                firstMenu={
                    <div className="firstmenu">
                        <span>New Customer?</span>
                        <a
                            onClick={() => {
                                handleLoginModalShow();
                                //setSignup(true);
                            }}
                            style={{ color: "#2874f0" }}
                        >
                            Sign Up
                </a>
                    </div>
                }
            />
        );
    };

    return (
        <div className="header">
            <Modal
                visible={loginModal}
                onClose={handleLoginModalClose}
            >
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="rightspace">



                            <MaterialInput
                                type="text"
                                label="Email/Mobile Number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    margin: "0 20px",
                                }}
                            />
                            <MaterialInput
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                // rightElement={ <a href="#">Forgot?</a>}
                                style={{
                                    margin: "0 20px",
                                }}
                            />
                            <MaterialButton
                                title={'Login'}
                                //title={signup ? "Register" : "Login"}
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    margin: "40px 0 20px 0",
                                }}
                                onClick={userLogin}
                            />
                            <p style={{ textAlign: "center" }}>OR</p>
                            <MaterialButton
                                title="Request OTP"
                                bgColor="#ffffff"
                                textColor="#2874f0"
                                style={{
                                    margin: "20px 0",
                                }}
                            />

                        </div>
                    </div>
                </div>
            </Modal>
            <div className="subHeader">
                {/* Logo  */}
                <div className="logo">
                    <a href="/">
                        <img src={flipkartLogo} className="logoimage" alt="" />
                    </a>
                    <a href="/" style={{ marginTop: "-10px" }}>
                        <span className="exploreText">Explore</span>
                        <span className="plusText">Plus</span>
                        <img src={goldenStar} className="goldenStar" alt="" />
                    </a>
                </div>
                {/* logo ends here */}

                {/* search component */}
                <div
                    style={{
                        padding: "0 10px",
                    }}
                >
                    <div className="searchInputContainer">
                        <input
                            className="searchInput"
                            placeholder={"search for products, brands and more"}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch
                                style={{
                                    color: "#2874f0",
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* search component ends here */}

                {/* right side menu */}
                <div className="rightMenu">
                    {
                        auth.authenticate
                        ?
                            renderLoggedInMenu()
                        :
                            renderNonLoggedInMenu()
                    }
                    <DropdownMenu
                        menu={
                            <a className="more">
                                <span>More</span>
                                <IoIosArrowDown />
                            </a>
                        }
                        menus={[
                            { label: "Notification Preference", href: "", icon: null },
                            { label: "Sell on flipkart", href: "", icon: null },
                            { label: "24x7 Customer Care", href: "", icon: null },
                            { label: "Advertise", href: "", icon: null },
                            { label: "Download App", href: "", icon: null },
                        ]}
                    />
                    <div>
                        <a className="cart">
                            <IoIosCart />
                            <span style={{ margin: "0 10px" }}>Cart</span>
                        </a>
                    </div>
                </div>
                {/* right side menu ends here */}
            </div>
        </div>
    );
};

export default Header;
