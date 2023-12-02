import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/images/logo.jpg';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login',{
                email, password
            });           
            alert(response.data.message);
            const user = { name: 'John Doe', username: 'johndoe123'};
            dispatch(loginUser(user));
            if (response.data.redirect){
                navigate(response.data.redirect);
            }
        } catch (error) {
            if (error.response){
                alert(error.response.data.message);
            } else {
                console.error("Error found: ", error);
                alert("Error sending request");
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
                        Instanyan is a social media only for cats. Sign-in and join this purrfect place.
                    </span>
                </div>
            </div>
            <div className="flex w-full justify-center mt-12">
                <form className="" onSubmit={handleLogin}>
                    <label className="">E-mail</label>
                    <input className="w-full p-1 rounded text-black" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                    <div className="py-2"></div>
                    <label className="">Password</label>
                    <input className="w-full p-1 rounded text-black" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>

                    <button className="form-button">Login</button>
                </form>
            </div>            
            <div className="mt-8 flex justify-center">
                <p>Don't have an account?</p>
                <Link to="/register">
                    <p className="ml-1 text-sky-500">Sign-up</p>
                </Link>
            </div>
        </div>
    );
}

export default Login;