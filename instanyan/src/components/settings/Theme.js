import React, {useEffect}  from "react";
import { Label, Radio } from "flowbite-react";
import { themes } from "../../constants";

function Theme({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);


    return(
        <div className="single-page">
            <div>
                <h1>Theme</h1>
            </div>      
            <div className="flex flex-col">
                <h2 className="mt-2 sub-title">Select your Theme</h2>
                <form className="flex flex-col w-full form-style mt-6">
                    <div className="flex w-full justify-between p-2 rounded bg-grey-medium">
                        <div className="space-x-2">
                            <Radio id="grey-dark" className="radio" name="themes" value="Grey Dark" defaultChecked />
                            <Label htmlFor="grey-dark">Grey Dark</Label>
                        </div>
                        <div className={`rounded-full h-4 w-4 self-center border border-grey-lighter
                            bg-gradient-to-r from-grey-heavy to-grey-medium`}>
                        </div>
                    </div>
                    {themes.map((theme) => (
                    <div className="flex w-full justify-between p-2 rounded bg-grey-medium">
                        <div className="space-x-2">
                            <Radio id={theme.id} className="radio" name="themes" value={theme.name} disabled />
                            <Label htmlFor={theme.id} disabled>{theme.name}</Label>
                        </div>
                        <div className={`rounded-full h-4 w-4 self-center border border-grey-lighter
                            bg-gradient-to-r ${theme.color}`}>
                        </div>
                    </div>
                    ))}

                </form>
            </div>
        </div>
    );
}

export default Theme;