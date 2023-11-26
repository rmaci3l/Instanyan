import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {navLinks} from '../constants';

function MobNav(){
    return(
        <div className='fixed bottom-0 p-4 flex w-full sm:hidden border-t border-gray-600 bg-black'>
            <div className='font-light flex w-full space-x-16 justify-center'>
                {navLinks.filter(nav => nav.id !== "notifications" && nav.id !== "search").map((nav, index) => (
                    <FontAwesomeIcon icon={nav.icon} className='text-[22px]' />
                ))}
            </div>
        </div>
    );
}

export default MobNav;