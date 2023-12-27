import React, {useState, useEffect} from "react";
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/reduxActions";
import AlertPopup from "../popup/Alert";
import { TextInput, Label, Button } from "flowbite-react";
import { HiMail, HiLockClosed, HiOutlineUser, HiOutlineGlobe } from 'react-icons/hi';
import AuthHeader from "./AuthHeader";

function Register(){   
    const {loading, userInfo, error, success } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [errors, setErrors] = useState({ message: "" })

    useEffect(() => {
        if (success) navigate('/login')
    }, [navigate, success])

    function validate(userdata) {    
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(userdata.email)) {
            return {message: "Incorrect e-mail."};
        }
        if (userdata.username.includes(' ')){
            return {message: "Username must not have spaces."};
        }
        if (userdata.password.length < 8){
            return {message: "Password must be at least 8 characters long."};
        }        
        if (userdata.password !== userdata.confirmPassword){
            return {message: "Passwords don't match."};
        }        
        return null;
    };

    const submitForm = (data) => {
        // client-validate mail and password
        const validationErrors = validate(data);
        if (validationErrors) {
            setErrors(validationErrors);
        }
        else {
            data.email = data.email.toLowerCase();
            dispatch(registerUser(data));
        }
    };

    return(
        <div className="flex h-screen w-full">
            <div className="flex flex-col p-6 sm:justify-center sm:w-1/3 sm:bg-grey-heavy">
                <AuthHeader sub={"Create your account and begin your journey to connect with hundreds of kittens!"} />            
                <div className="w-full">
                    <form className="flex flex-col form-style" onSubmit={handleSubmit(submitForm)}>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="form-email" value="E-mail"/>
                            </div>
                            <TextInput type="email" rightIcon={HiMail}  {...register('email')} placeholder="youremail@domain.com" required />
                        </div>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="form-name" value="Name" />
                            </div>
                            <TextInput type="text" rightIcon={HiOutlineUser} {...register('name')} placeholder="Purr Meow" required />
                        </div>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="form-username" value="Username" />
                            </div>
                            <TextInput type="text" rightIcon={HiOutlineGlobe} {...register('username')} placeholder="purrmeow" required />
                        </div>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="form-password" value="Password" />
                            </div>
                            <TextInput type="password" rightIcon={HiLockClosed} {...register('password')} placeholder="So secret!" required />
                        </div>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="form-confirmPassword" value="Confirm Password" />
                            </div>
                            <TextInput type="password" rightIcon={HiLockClosed} {...register('confirmPassword')} placeholder="Be sure it matches." required />
                        </div>
                        <Button type="submit" size="md">Register</Button>
                    </form>
                    <div className="mt-8 flex justify-center">
                        <span>Have an account?</span>
                        <Link className="ml-1 indigo-link" to="/login">
                            Sign-in!
                        </Link>
                    </div>
                </div>
                {error && <AlertPopup error={error} />}
                {errors.message && <AlertPopup error={errors.message} />}        
            </div>
        </div>
    );
}

export default Register;