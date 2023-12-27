import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Label, Input, FileInput, Textarea, TextInput, Button, Alert } from "flowbite-react";
import { convertToBase64 } from '../utils/Utils'
import { createPost } from "../../redux/reduxActions";
import AlertPopup from "../popup/Alert";
import { useNavigate } from "react-router-dom";

function Post() {    
    const dispatch = useDispatch();
    const { handleSubmit, register, setValue  } = useForm();
    const [ formError, setFormError ] = useState('');
    const [ postImage, setPostImage ] = useState();
    const navigate = useNavigate();

    const validateInput = (value) => {
        if (value.content.length > 1000) {
            return "Your post is too big.";
        }
        if (!value.hashtags.startsWith('#')) {
            return "Invalid hashtags.";
        }
        if (value.hashtags.length > 100) {
            return "Too many hashtags.";
        }
        if (value.image === '') {
            return "No image attached.";
        }
        return null;
    }
    
    const submitForm = (data) => {       
        const validationErrors = validateInput(data);
        if (validationErrors) {
            setFormError(validationErrors);
        }
        else {
            dispatch(createPost(data))
            .then(() => {
                navigate('/profile');
            })
            .catch((error) => {
                setFormError("Failed to process the request.");
            });            
        }        
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setValue('image', base64);
            setPostImage(base64);
        }
    };

    
    return(
        <div className="flex p-4 sm:ml-20 sm:w-2/5">
            <div className="flex flex-col w-full">
                <div className="flex w-full ">
                    <img src={postImage} className="aspect-square"/>
                </div>
                <form className="flex flex-col form-style" onSubmit={handleSubmit(submitForm)}>
                    <FileInput type="file" accept="image/*" onChange={onFileChange} />
                    <input type="hidden" {...register('image')} />
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="form-about" value="Content" />
                        </div>
                        <Textarea type="text" placeholder="Tell us more about your post." {...register('content', {maxLength: 1000})} required />                        
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="form-hashtags" value="Hashtags" />                            
                        </div>
                        <TextInput type="text" placeholder="#lovecats #nyan #meow" {...register('hashtags', {maxLength: 100})} required />
                    </div>
                    <Button type="submit" size="md">Create Post</Button>                    
                </form>
                {formError && <AlertPopup error={formError} />}
            </div>
        </div>
    );
}

export default Post