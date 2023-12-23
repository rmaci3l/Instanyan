import React, { useEffect, useState } from 'react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

function Error({children, ...props}) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Fade in on render.
    const fadeOutTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

      return () => {
        clearTimeout(fadeOutTimeout);
    };
  }, []);


  return (
    <div className={`flex absolute inset-x-0 bottom-0 text-xs justify-center 
      transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-2/3 m-8">
        <Alert color="failure" icon={HiInformationCircle}>
          <span>{children}</span>
        </Alert>
      </div>
    </div>
  );
}

export default Error