import React, {useState} from "react";
import AuthButton from "../Components/Buttons/AuthButton";
import Input from "../Components/Inputs/Input";

const SignIn: React.FC<{ handleSwitch: () => void }> = ({handleSwitch}) => {
    function handleSignIn(): void {
    }

    return (
        <>
            <Input placeholder="Email" type={`text`}/>
            <Input placeholder="Password" type={`password`}/>
            <span>
        Don't have an account?
        <span onClick={handleSwitch} className="cursor-pointer text-blue-500"> signup</span>
      </span>
            <AuthButton href={'/'} text="Login"/>
        </>
    );
};

// Sign Up component
const SignUp: React.FC<{ handleSwitch: () => void }> = ({handleSwitch}) => {
    function handleSignUp(): void {
    }

    return (
        <>
            <Input placeholder="Name" type={`text`}/>
            <Input placeholder="Email" type={`text`}/>
            <Input placeholder="Password" type={`password`}/>
            <Input placeholder="Confirm Password" type={`password`}/>
            <span>
        Already have an account?
        <span onClick={handleSwitch} className="cursor-pointer text-blue-500"> signin</span>
      </span>
            <AuthButton href={'/'} text="Sign Up"/>
        </>
    );
};

const Auth: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string>("SignIn")

    const handleSwitch = (): void => {
        setActiveComponent(prevComponent => prevComponent === "SignIn" ? "SignUp" : "SignIn");
    }

    return (
        <div
            className="flex bg-white dark:bg-black text-black dark:text-white flex-col justify-center items-center w-screen h-screen gap-4">
            <h1 className="font-bold text-3xl md:text-5xl">SprintV Sandbox</h1>
            {activeComponent === "SignIn" ? <SignIn handleSwitch={handleSwitch}/> :
                <SignUp handleSwitch={handleSwitch}/>}
        </div>
    )
}

export default Auth;
