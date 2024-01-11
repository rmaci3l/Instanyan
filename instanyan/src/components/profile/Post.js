import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Label, FileInput, Textarea, TextInput, Button } from "flowbite-react";
import { createPost } from "../../redux/reduxActions";
import{ AlertPopup, Loading, UserIcon, convertToBase64 } from "../utils/";
import { useNavigate } from "react-router-dom";
import { UploadDefault } from "../../assets"

function Post() {    
    const dispatch = useDispatch();
    const { handleSubmit, register, setValue  } = useForm();
    const { loading } = useSelector((state) => state.posts);
    const [ formError, setFormError ] = useState('');
    const [ postImage, setPostImage ] = useState();
    const navigate = useNavigate();
        
    // Post form validation.
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
    
    // Submit post form.
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

    // Uploaded file validation.
    const onFileChange = async (e) => {
        const MAX_FILE_SIZE = 3 * 1024 * 1024; //3mb max file size
        const file = e.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setFormError("Image file is too large! (>3MB).");
            }
            else {
                const base64 = await convertToBase64(file);
                setValue('image', base64);
                setPostImage(base64);
            }
        }
    };


    // Clear errors after 4 seconds.
    useEffect(() => {
        let timer
            if (formError) {
            timer = setTimeout(() => {
                setFormError('');
            }, 4000);  
        }
        return () => {
        if (timer) clearTimeout(timer);
        };
    }, [formError]);
    
    return(
        <div className="flex w-full sm:justify-center mb-20">
            <div className="flex flex-col w-full sm:w-4/5 md:w-4/6 lg:w-3/5 xl:w-2/4 2xl:w-2/5 sm:bg-grey-medium p-4">
                <div className="title-style border-b border-grey-lighter mb-4 py-1 sm:py-6">
                    <h1>Create a new post</h1>
                </div>
                <form className="flex flex-col form-style mt-2" onSubmit={handleSubmit(submitForm)}>
                    <div className="flex w-full h-80 sm:h-96 bg-grey-heavy rounded relative">
                        <div className="form-upload-image">
                            <img src={postImage || UploadDefault} className="object-cover object-center h-full w-full rounded-md" alt=""/>
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
            {loading && 
                <div className="fixed top-0 right-0 w-full h-screen bg-grey-heavy bg-opacity-70">
                    <Loading />
                </div>
            } 
        </div>
    );
}

export default Post