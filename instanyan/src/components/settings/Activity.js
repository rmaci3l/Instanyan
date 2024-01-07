import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Button, Label, Input, ToggleSwitch } from "flowbite-react";
import { activity_settings } from "../../constants";

function Activity({ setClassSettings }) {
    const initialToggleStates = activity_settings.reduce((acc, option) => {
        acc[option.id] = false;
        return acc;
    }, {});

    const [ toggleStates, setToggleStates ] = useState(initialToggleStates);
    
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

      const handleToggleChange = (id, newValue) => {
        setToggleStates(prevState => ({
            ...prevState, [id]: newValue
        }));
      };

    return(
        <div className="single-page">
            <div>
                <h1>Activity</h1>
            </div>            
            <div className="flex flex-col">    
            <form className="flex flex-col w-full">
                <div>                    
                    {activity_settings.map((option) => (
                    <div className="flex flex-col border-b py-4 border-grey-lighter">
                        <div className="flex justify-between py-2">
                            <h2 htmlFor={option.label} className="text-base text-white-light font-light">{option.name} </h2>
                            <ToggleSwitch 
                                className="toggle-button"
                                id={option.id}
                                checked={toggleStates[option.id]}
                                onChange={(newValue) => handleToggleChange(option.id, newValue)} 
                            />
                        </div>
                        <div>
                            <p className="text-white-medium font-light text-sm">{option.description}</p>
                        </div>
                    </div>                    
                    ))}
                </div>
                <div className="flex form-style w-full mt-4">
                    <Button className="flex w-full" type="submit" size="md">Save Settings</Button>
                </div>                
            </form>                                
            </div>
        </div>
    );
}

export default Activity;