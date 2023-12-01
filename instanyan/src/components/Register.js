import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    
    let navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        tempErrors.email = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? "" : "Email is not valid.";
        tempErrors.password = (password.length > 6) ? "" : "Password must be at least 7 characters long.";
        setErrors(tempErrors);
        if (tempErrors.password !== '') {
            /*Future implement popup with password correction. */
            console.log('Wrong pass');
        }
        if (tempErrors.email !== '') {
            /* Future implement popup with email correction. */
            console.log('Wrong mail.')
        }
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleRegister = async (e) =>{
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:5000/auth/register',{
                    name, email, username, password
                });
                alert(response.data.message);
                if (response.data.redirect){
                    navigate(response.data.redirect);
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else{
                    console.error("Error found ", error);
                }            
            }            
        }
    };

    return(
        <div className="flex flex-col h-full p-8 sm:w-auto">
            <div className="flex flex-wrap p-2">
                <div className="flex w-full items-center justify-center">
                    <img className='h-16 w-16' src={Logo} alt='Instanyan'/>
                    <h1 className="font-semibold text-4xl tracking-wider">Instanyan</h1>
                </div>
                <div className="flex w-full mt-6 justify-center text-center">
                    <span className="font-light text-xl">
                        Create your account and connect with hundreds of kittens!
                    </span>
                </div>
            </div>
            <div className="flex w-full justify-center mt-12">
                <form className="" onSubmit={handleRegister}>
                    <label className="">E-mail</label>
                    <input className="w-full p-1 rounded text-black" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                    <div className="py-1"></div>
                    <label className="">Name</label>
                    <input className="w-full p-1 rounded text-black" type="text" id="name" value={name} onChange={e => setName(e.target.value)}></input>
                    <div className="py-1"></div>
                    <label className="">Username</label>
                    <input className="w-full p-1 rounded text-black" type="text" id="username" value={username} onChange={e => setUsername(e.target.value)}></input>
                    <div className="py-1"></div>
                    <label className="">Password</label>
                    <input className="w-full p-1 rounded text-black" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}></input>

                    <button className="mt-6 p-2 rounded-md w-full bg-gradient-to-r from-cyan-500 to-blue-500">Sign-up</button>
                </form>
            </div>            
            <div className="mt-8 flex justify-center">
                <p>Have an account?</p>
                <Link to="/login">
                    <p className="ml-1 text-sky-500">Sign-in</p>
                </Link>
            </div>
        </div>
    );
}

export default Register;