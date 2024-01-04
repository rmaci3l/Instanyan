import React, {useEffect}  from "react";
import Logo from "../../assets/logo.svg"
import { socialLinks } from "../../constants";
import { Link } from "react-router-dom";
import UserIcon from "../utils/userIcon";

function About({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);
    return(
        <div className="single-page">
            <div>
                <h1>About Us</h1>
            </div>
            <div className="flex w-full items-center justify-center pt-6 pb-2 ">
                <img src={Logo} className="w-1/2" />
            </div>
            <div className="title-style border-b border-grey-lighter py-4">
                <h2>What is Instanyan?</h2>
                <p>Instanyan is a proto-social media that only cats are allowed to participate! <b className="text-indigo-500">Our guidelines are</b>:</p>
                <div className="py-1">
                <ul>
                    <li>No human content. </li>
                    <li>No other animals. </li>
                    <li>Be respectful when engaging with your friends.</li>
                    <li>Share your nyanderful life!</li>
                </ul>
                </div>
                <p>We welcome any cats looking for a good time.</p>
            </div>
            <div className="title-style border-b border-grey-lighter py-4">
                <h2>What can or can't you do in Instanyan?</h2>
                <p>You are <b className="text-indigo-500">welcomed</b> to: 😸</p>
                <div className="py-1">
                    <ul>
                        <li>Post your daily feline life.</li>
                        <li>Like and interact with other cats.</li>
                    </ul>
                </div>
                <p>We don't <b className="text-indigo-500">tolerate</b>: 😾</p>
                <div className="py-1">
                    <ul>
                        <li>Any kind of disrespectful behavior.</li>
                        <li>Harmful or offensive content of any kind.</li>
                    </ul>
                </div>
            </div>
            <div className="py-4">
                <h2 className="sub-title">Follow me on</h2>
                <div className="flex w-full">
                    <div className="flex space-x-2 text-white-medium py-3">                        
                        {socialLinks.map((social) => (
                        <Link to={social.link}>
                            <div className="social-links-alt" key={social.id}>
                                <UserIcon iconName={social.icon} />
                                <p>{social.name}</p>
                            </div>
                        </Link>
                        ))}                                                                                                                                           
                    </div>
                </div>
            </div>
        </div>
        );
    }

export default About;