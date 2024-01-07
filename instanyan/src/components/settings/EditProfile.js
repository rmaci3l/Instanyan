import React, { useEffect, useState }  from "react";
import { useForm } from 'react-hook-form'
import { updateProfile } from "../../redux/reduxActions";    
import { useDispatch, useSelector } from 'react-redux'
import {convertToBase64 } from '../utils/Utils'
import UserIcon from "../utils/userIcon";
import { Label, FileInput, Textarea, Button, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { AlertPopup } from "../utils";

const EditProfile = ({setClassSettings}) => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [ uploadedImage, setUploadedImage ] = useState();
    const [ formError, setFormError ] = useState('');

    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);


    // Profile form validation.
    const validateInput = (value) => {
        if (value.status.length > 60) {
            return "Too many words on your status! Maximum is 60 characters.";
        }
        if (value.about.length > 150) {
            return "Too many words on your about! Maximum is 150 characters.";
        }
        return null;
    }

    const submitForm = (data) => {
        if (data.status === '') {
            data.status = userInfo.status;
        }
        if (data.about === '') {
            data.about = userInfo.about;
        }
        const validationErrors = validateInput(data);
        if (validationErrors){
            setFormError(validationErrors);
        } else {
            dispatch(updateProfile(data))
            .then(() => {
                navigate('/profile');
            });
        }
    };

    const onFileChange = async (e) => {
        const MAX_FILE_SIZE = 3 * 1024 * 1024; //3mb max file size
        const file = e.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setFormError("Image file is too large! (>3MB).");
            } else {
                const base64 = await convertToBase64(file);
                setValue('avatar', base64);
                setUploadedImage(base64);
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
        <div className="single-page">
            <div className="flex">
                <h1>Update Purrfile</h1>
            </div>
            
            <form className="flex flex-col form-style mt-6" onSubmit={handleSubmit(submitForm)}>
                <div className="flex w-full bg-grey-medium p-4 px-2 sm:px-4 rounded-md">
                    <Avatar img={`${uploadedImage || userInfo.avatar}`} size="lg" bordered rounded className="relative w-fit h-fit justify-center items-center sm:shrink-0">
                        <Label htmlFor="file-upload" className="form-upload-alt">
                            <div className="hover:animate-spin hover:text-indigo-500 transition-colors duration-300">
                                <UserIcon iconName="edit" />
                            </div>
                            <FileInput id="file-upload" type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                        </Label>
                        <input type="hidden" {...register('avatar')} />
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-white-light">{userInfo.username}</span>
                        <span className="text-white-medium font-light text-sm">{userInfo.status}</span>
                    </div>                    
                </div>
                <div className="mt-4">
                    <div className="mb-1 block">
                        <Label htmlFor="form-status" value="Status" />
                    </div>
                    <Textarea type="text" placeholder={userInfo.status} {...register('status')} rows={2}/>
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="form-about" value="About" />
                    </div>                    
                    <Textarea type="text" className="" placeholder={userInfo.about} {...register('about')} rows={6} />
                </div>
                <Button type="submit" size="md">Update Profile</Button>
            </form>
            {formError && <AlertPopup error={formError} />}
        </div>
    );
}

export default EditProfile;