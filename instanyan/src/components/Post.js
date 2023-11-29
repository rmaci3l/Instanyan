import React, {useState, useRef} from "react";
import {Navbar, MobNav} from './';

function Post(params) {
    const fileInput = React.createRef();
    const [imageSrc, setImageSrc] = useState(null)

    const handleButtonClick = () => {
        fileInput.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        };
        
    };
    
    return(
        <div className='flex h-screen sm:flex-row flex-col w-full sm:w-2/3 sm:gap-20'>
            <Navbar />
            <div className="flex flex-grow flex-col w-full p-4">
                <div className="flex bg-stone-900 border-gray-600 w-full h-2/4 overflow-hidden rounded">
                    {imageSrc && <div className=""><img src={imageSrc} className="max-w-full h-auto"/></div>}
                </div>
                <div className="flex w-full flex-grow py-4">
                    <input type="text" className="p-2 w-full bg-stone-950"></input>
                </div>
                <div className="flex mb-20 space-x-2 sm:mb-5">
                    <input type='file' accept="image/*" ref={fileInput} className="hidden" onChange={handleFileChange} />
                    <button className="w-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounder" onClick={handleButtonClick}>
                        Upload Image
                    </button>
                    <button className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounder">
                        Go
                    </button>
                </div>
            </div>
            <MobNav />
        </div>
    );
}

export default Post