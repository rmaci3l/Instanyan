import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Label, Input, FileInput, Textarea, TextInput, Button, Alert } from "flowbite-react";
import { convertToBase64 } from '../utils/Utils'
import { createPost } from "../../redux/reduxActions";
import AlertPopup from "../utils/Alert";
import { useNavigate } from "react-router-dom";
import UserIcon from "../utils/userIcon";
import { UploadDefault } from "../../assets"

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
        <div className="flex p-4 sm:ml-20 sm:w-2/5 sm:bg-grey-medium">
            <div className="flex flex-col w-full">
                <div className="title-style">
                    <h1>Create a new post</h1>
                </div>
                <form className="flex flex-col form-style mt-2" onSubmit={handleSubmit(submitForm)}>
                    <div className="flex w-full h-80 sm:h-96 bg-grey-heavy rounded relative">
                        <div style={{ backgroundImage: `url('${postImage || UploadDefault}')` }} className="form-upload-image">

                        </div>
                        <Label htmlFor="file-upload" className="form-upload">
                            <div className="flex justify-center items-center space-x-2">
                                <UserIcon iconName="upload" />
                                <p>Upload Image</p>
                            </div>
                            <FileInput id="file-upload" type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                        </Label> 
                        <input type="hidden" {...register('image')} />
                    </div>    
                    
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