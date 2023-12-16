import React, {useEffect, useState}  from "react";
import { updateProfile } from "../../redux/reduxActions";    
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {convertToBase64 } from '../utils/Utils'

const EditProfile = ({setClassSettings}) => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm()
    
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    const submitForm = (data) => {       
        dispatch(updateProfile(data))
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setValue('profile_image', base64);
        }
    };

    return(
        <div className="p-4 rounded shadow-lg flex-col">
            <div className="flex">
                <h1>Profile Update</h1>
            </div>
            
            <div className="flex w-full justify-center mt-12">
                <form className="w-full" onSubmit={handleSubmit(submitForm)}>
                    <label htmlFor="form-status">Picture</label>
                    <input className="form-input" 
                        type="file" accept="image/" 
                        onChange={onFileChange} />
                    <input type="hidden" {...register('profile_image')} />
                    <div className="py-1"></div>
                    <label htmlFor="form-status">Status</label>
                    <textarea className="form-input" type="text" maxLength={60} defaultValue={userInfo.status} {...register('status', {maxLength: 60})} required></textarea>
                    <div className="py-1"></div>
                    <label htmlFor="form-about">About</label>
                    <textarea className="form-input" rows={3} type="text" maxLength={150} defaultValue={userInfo.about} {...register('about', {maxLength: 150})} required></textarea>
                    <div className="py-1"></div>                    
                    <button className="form-button" type="submit">Update</button>
                </form>
            </div>              
        </div>
    );
}

export default EditProfile;