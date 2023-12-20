import React from "react";
import { useForm } from 'react-hook-form';


const SearchPopUp = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="absolute top-16 right-12 bg-stone-950 rounded p-4">
            <div className="">
                <form className="space-x-2" onSubmit={handleSubmit(onSubmit)}>
                    <input className=" text-gray-600" name="searchForm" {...register("searchForm")} placeholder="Type desired @user or #hashtag for posts." />
                    <button type="submit">Search</button>                
                </form>
            </div>
        </div>
    )
};

export default SearchPopUp;