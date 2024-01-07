import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { Label, Radio } from 'flowbite-react';
import { countries } from "../../constants";
import "flag-icons/css/flag-icons.min.css";

function Language({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    const Flag = ({ countryCode }) => (
        <span className={`fi fi-${countryCode}`}></span>
    );

    return(
            <div className="single-page">
                <div>
                    <h1>Language</h1>
                </div>
                <div className="flex flex-col">
                    <h2 className="mt-2 sub-title">Select your language</h2>
                    <form className="flex flex-col w-full form-style mt-6">
                        <div className="flex w-full justify-between p-2 rounded bg-grey-medium">
                            <div className="space-x-2">
                                <Radio id="en-us" className="radio" name="countries" value="English, US" defaultChecked/>
                                <Label htmlFor="en-us">English, US</Label>                                
                            </div>
                            <Flag countryCode="us" />
                        </div>
                        {countries.map((country) => (
                            <div className="flex w-full items-center justify-between p-2 rounded bg-grey-medium">
                                <div className="space-x-2">
                                    <Radio id={country.id} className="radio" name="countries" value={country.name} disabled />
                                    <Label htmlFor={country.id} disabled>{country.name}</Label>
                                </div>
                                <Flag  countryCode={country.flag}/>
                            </div>                            
                        ))}
                    </form>
                </div>
            </div>
        );
    }

export default Language;