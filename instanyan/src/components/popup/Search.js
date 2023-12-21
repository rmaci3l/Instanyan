import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/explore/exploreSlice";



const SearchPopUp = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const validateInput = (value) => {
        if (value.includes(' ')) return "Spaces are not allowed.";
    
        if (!value.startsWith('@') && !value.startsWith('#')) {
            return "Must start with @ or #.";
        }

        return true;
    }

    const onSubmit = (data) => {
        const input = data.userInput;
        dispatch(setSearch(input));
        navigate('/explore')
    }

    return (
        <div className="absolute top-16 right-12 bg-stone-950 rounded p-4">
            <div className="">
                <form className="space-x-2" onSubmit={handleSubmit(onSubmit)}>
                    <Controller 
                        name="userInput"
                        control={control}
                        defaultValue=""
                        rules={{ validate: validateInput }}
                        render={({field}) => <input placeholder="@user or #hashtag." 
                        className=" text-gray-600" {...field}
                        />}
                    />
                    {errors.userInput && <p>{errors.userInput.message}</p>}
                    <button type="submit">Search</button>                
                </form>
            </div>
        </div>
    )
};

export default SearchPopUp;