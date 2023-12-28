import React, { useEffect, useState }  from "react";
import { useForm } from 'react-hook-form'
import { updateProfile } from "../../redux/reduxActions";    
import { useDispatch, useSelector } from 'react-redux'
import {convertToBase64 } from '../utils/Utils'
import UserIcon from "../utils/userIcon";
import { Label, FileInput, Textarea, TextInput, Button, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const EditProfile = ({setClassSettings}) => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [ uploadedImage, setUploadedImage ] = useState();

    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    const submitForm = (data) => {
        if (data.status === '') {
            data.status = userInfo.status;
        }
        if (data.about === '') {
            data.about = userInfo.about;
        }
        dispatch(updateProfile(data))
        .then(() => {
            navigate('/profile');
        });
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setValue('avatar', base64);
            setUploadedImage(base64);
        }
    };

    return(
        <div className="single-page">
            <div className="flex">
                <h1>Update Profile</h1>
            </div>
            
            <form className="flex flex-col form-style mt-6" onSubmit={handleSubmit(submitForm)}>
                <div className="flex w-full bg-grey-medium p-4 rounded-md">
                    <Avatar img={`${uploadedImage || userInfo.avatar}`} size="lg" bordered rounded className="relative">
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
                    <TextInput type="text" placeholder={userInfo.status} {...register('status', {maxLength: 60})} />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="form-about" value="About" />
                    </div>                    
                    <Textarea type="text" className="" placeholder={userInfo.about} {...register('about', {maxLength:150})} />
                </div>
                <Button type="submit" size="md">Update Profile</Button>
            </form>
        </div>
    );
}

export default EditProfile;