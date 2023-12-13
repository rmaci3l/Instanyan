import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {convertToBase64 } from '../utils/Utils'
import { updateProfile } from "../../redux/reduxActions";


function Post() {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();



    const submitForm = (data) => {       
        console.log(data);
        //dispatch(updateProfile(data))
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setValue('image', base64);
        }
    };

    
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    
    return(
        <div className="flex h-screen p-4 sm:ml-20 sm:w-2/5">
            <form className="w-full" onSubmit={handleSubmit(submitForm)}>
                <label htmlFor="form-status">Picture</label>
                <input className="form-input" 
                    type="file" accept="image/" 
                    onChange={onFileChange} />
                <input type="hidden" {...register('image')} />
                <div className="py-1"></div>
                <label htmlFor="form-status">Content</label>
                <textarea className="form-input" rows={5} type="text" maxLength={1000} placeholder="Write your post info." {...register('content', {maxLength: 1000})} required></textarea>
                <div className="py-1"></div>
                <label htmlFor="form-about">Hashtags</label>
                <textarea className="form-input" rows={2} type="text" maxLength={100} placeholder="#lovecats #nyan #meow" {...register('hashtags', {maxLength: 100})} required></textarea>
                <div className="py-1"></div>                    
                <button className="form-button">Post!</button>
            </form>
        </div>
    );
}

export default Post