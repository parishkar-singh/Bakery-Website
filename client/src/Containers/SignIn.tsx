import axios from "axios";
import AuthInput from "@/Components/Inputs/AuthInput.tsx";
import {useForm} from "react-hook-form";
import {MdOutlineMailOutline} from "react-icons/md";
import { AiOutlineLock} from "react-icons/ai";
import {object, string, TypeOf} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import {useAuth} from "@/Context/AuthContext.tsx";
import {SERVER_ENDPOINT} from "@/Utils/Constants.ts";
import { motion } from "framer-motion";

const createSessionSchema = object({
    email: string().nonempty({
        message: "Email is required"
    }),
    password: string().min(6).nonempty({
        message: "Password is required"
    }),
})

interface Payload {
    id: string;
    username: string;
    email: string;
    picture?: string;
}

interface UserState {
    userData: Payload | null;
    loading: boolean;
    error: string | null;
}

type CreateSessionInput = TypeOf<typeof createSessionSchema>

const SignIn = () => {
    const { user, login, logout } = useAuth();
    const {register, formState: {errors}, handleSubmit} = useForm<CreateSessionInput>({
        resolver: zodResolver(createSessionSchema)
    })
    const [loginError, setLoginError] = useState(null)
    const mapResponseToPayload = (response: any) => {
        return {
            id: response._id,
            username: response.name,
            email: response.email,
            picture: response.picture ? response.picture : undefined,
        };
    };

    const onSubmit = async (data: CreateSessionInput) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/sessions/`, data, {withCredentials: true})
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/users/me`, {withCredentials: true})
            login(mapResponseToPayload(response.data));
            // console.log(user)
            window.location.href = '/';

        } catch (e: any) {
            setLoginError(e.message)
        }
    }
    const onlogout = async () => {
        try {
            logout();
            window.location.href = '/';

        } catch (e: any) {
            setLoginError(e.message)
        }
    }


    return (
        <motion.div
            initial={{scale: 0 ,x:2160}}
            animate={{scale: 1,rotate:-360 ,x:0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.5
            }} className={` bg-orange-500 w-full h-full flex flex-col items-center justify-center`}>
            <div className={` flex flex-col items-center justify-center gap-10 `}>
                <h1 className={`text-white font-sonsie text-5xl text-center  font-black`}>Login</h1>
                <form className={`flex flex-col`} onSubmit={handleSubmit(onSubmit)}>
                    <div className={`flex flex-col gap-4`}>
                        <AuthInput
                            icon={MdOutlineMailOutline}
                            placeholder={`Your email address`}
                            type={`email`}
                            name={'email'}
                            register={register}
                            error={errors.email?.message as string | undefined}
                        />
                        <AuthInput
                            icon={AiOutlineLock}
                            placeholder={`Enter your password`}
                            type={`password`}
                            name={'password'}
                            register={register}
                            error={errors.password?.message as string | undefined}
                        />
                    </div>
                    <button type={`submit`} className={`bg-[#5b54e0] mt-8 p-2 px-14 rounded-lg text-white`}>Sign In
                    </button>
                </form>
            </div>
        </motion.div>
    )
}
export default SignIn;