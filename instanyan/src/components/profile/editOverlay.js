import { updateProfile } from "../../redux/reduxActions";    
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

const OverlayMenu = ({ onClose }) => {
    const profile = useSelector((state) => state.profile);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()

    const submitForm = (data) => {
        console.log(data);
        dispatch(updateProfile(data))
    }

    // useEffect(() => {
    //     dispatch(updateProfile({about: profile.about, status: profile.status}))
    // }, [profile.status, profile.about, dispatch])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
            <div className="bg-stone-950 p-4 rounded shadow-lg flex-col w-4/5 h-3/5">
                <div className="flex" >
                    <button onClick={onClose}>x</button>
                </div>
                <div className="flex">
                    <h1>Profile Update</h1>
                </div>
                
                <div className="flex w-full justify-center mt-12">
                    <form className="w-full" onSubmit={handleSubmit(submitForm)}>
                        <label htmlFor="form-status">Status</label>
                        <textarea className="form-input" type="text" maxLength={60} defaultValue={userInfo.status} {...register('status', {maxLength: 60})} required></textarea>
                        <div className="py-1"></div>
                        <label htmlFor="form-about">About</label>
                        <textarea className="form-input" rows={3} type="text" maxLength={150} defaultValue={userInfo.about} {...register('about', {maxLength: 150})} required></textarea>
                        <div className="py-1"></div>                    
                        <button className="form-button">Update</button>
                    </form>
                </div>  
                
            </div>
        </div>
    );
};

export default OverlayMenu;