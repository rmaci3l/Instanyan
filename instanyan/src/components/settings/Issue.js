import React, {useEffect}  from "react";
import { Form } from "react-hook-form";
import { Select, Textarea, Button, Label } from "flowbite-react";

function Issue({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    return(
        <div className="single-page">
            <div>
                <h1>Report an Issue</h1>
            </div>            
            <div className="flex flex-col">                
                <form className="flex flex-col w-full form-style mt-4">
                    <div>
                        <Label className="sub-title" htmlFor="issues" value="Select your Issue" />
                    </div>                    
                    <Select id="issues" required>
                        <option>Interface Issues</option>
                        <option>Account Problems</option>
                        <option>Can't Post Content</option>
                        <option>Can't Change Profile</option>
                        <option>Can't Like Content</option>
                        <option>Another Issue</option>
                    </Select>
                    <div>
                        <Label className="sub-title" htmlFor="details" value="Detail your problem" />
                    </div>                    
                    <Textarea id="details" placeholder="Write more about the problem you are facing." required rows={6}></Textarea>
                    <Button className="mt-2" type="submit" size="md">Send Issue</Button>
                </form>
            </div>
        </div>
    );
}

export default Issue;