import React from "react";
import { Spinner } from "flowbite-react";

const Loading = () => {
 
    return(
        <div className="flex w-full -mt-6 h-screen flex-col space-y-4 justify-center items-center">
            <Spinner size="xl" className="fill-indigo-500 w-14 h-14" />
            <span className="text-white-medium">Meowding</span>
        </div>
    );
}

export default Loading;