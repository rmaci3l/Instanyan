import React from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';


const SearchPopUp = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
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
        const queryParams = new URLSearchParams({ search: input }).toString();
        navigate(`/explore?${queryParams}`)
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