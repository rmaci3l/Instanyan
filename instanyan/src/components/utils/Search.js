import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { TextInput, Button } from "flowbite-react";
import InlineAlert from "./InlineAlert";
import { toggleSearchPopup } from "../../redux/popup/popupSlice";

const SearchPopUp = () => {
    const { handleSubmit, register, setError, formState: { errors } } = useForm();
    const navigate = useNavigate();  
    const dispatch = useDispatch();

    const validateInput = (value) => {
        if (value.query.includes(' ')) {
            return "Spaces are not allowed.";
        }
        if (!value.query.startsWith('@') && !value.query.startsWith('#')) {
            return "Must start with @ or #.";
        }
        return null;
    }
    
    const submitForm = (data) => {
        const validationErrors = validateInput(data);
        if (validationErrors) {
            setError("query", { type: "manual", message : validationErrors});
        }
        else {
            const queryParams = new URLSearchParams({ search: data.query }).toString();
            dispatch(toggleSearchPopup());
            navigate(`/explore?${queryParams}`);
        }
    }
    
    return (
        <div className="absolute w-full top-12 right-0 p-2 animate-fade-down sm:fixed sm:top-0 sm:w-1/2 sm:right-1/4">
            <div className="static p-3 px-2 bg-grey-medium shadow-lg rounded-md">
                <form className="flex -mt-1 form-style" onSubmit={handleSubmit(submitForm)}>
                    <TextInput className="w-full" size="sm" type="text" {...register('query')} placeholder="@user or #hashtag" required />
                    <Button type="submit" size="sm">Search</Button>   
                </form>
                <div className="absolute bottom-[4px] pl-[2px]">
                  {errors.query && <InlineAlert alert={errors.query.message} />}
                </div>
            </div>
        </div>
    )
};

export default SearchPopUp;