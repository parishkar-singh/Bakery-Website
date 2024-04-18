import {AiFillFacebook, AiFillGoogleCircle, AiOutlineLock} from "react-icons/ai";
import {useForm} from "react-hook-form";
import {object, string, TypeOf} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from "axios";
import React, {useState} from "react";
import AuthInput from "@/Components/Inputs/AuthInput";
import {MdOutlineMailOutline} from "react-icons/md";
import {IoIosContact} from "react-icons/io";
import {FcGoogle} from "react-icons/fc";
import {SERVER_ENDPOINT} from "@/Utils/Constants.ts";
import { motion } from "framer-motion";
const createUserSchema = object({
    name: string().nonempty({message: 'Name is required'}),

    password: string({
        required_error: 'Password is required'
    }).min(6, 'Password must be at least 6 characters'),

    passwordConfirmation: string({
        required_error: 'Password confirmation is required'
    }),
    email: string({
        required_error: 'Email is required'
    }).email('Not a valid email'),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
})
type CreateUserInput = TypeOf<typeof createUserSchema>

const SignUp = () => {
    const [registerError, setRegisterError] = useState(null)
    const {register, formState: {errors}, handleSubmit} = useForm<CreateUserInput>(
        {
            resolver: zodResolver(createUserSchema)
        }
    );
    const onSubmit = async (data: CreateUserInput) => {
        try {
            console.log(SERVER_ENDPOINT)
            await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/users/`, data)
            window.location.href = '/';

        } catch (e: any) {
            setRegisterError(e.message)
        }
    }
    return (
        <motion.div
            initial={{scale: 0 ,x:-2160}}
            animate={{scale: 1 ,rotate:360,x:0}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.5
            }} className={`bg-green-500 w-full h-full flex flex-col items-center justify-center `}>
            <div className={` flex flex-col items-center gap-8  `}>
                <h1 className={`text-white font-sonsie text-4xl font-black text-center `}>Start having some biskits</h1>

                <form className={`flex flex-col`} onSubmit={handleSubmit(onSubmit)}>
                    <div className={`flex flex-col gap-4`}>
                        <AuthInput
                            icon={IoIosContact}
                            placeholder="Your name"
                            type="text"
                            name="name"
                            register={register}
                            error={errors.name?.message as string | undefined}
                        />

                        {/* AuthInput for email */}
                        <AuthInput
                            icon={MdOutlineMailOutline}
                            placeholder="Your email address"
                            type="email"
                            name="email"
                            register={register}
                            error={errors.email?.message as string | undefined}
                        />

                        {/*AuthInput for password */}
                        <AuthInput
                            icon={AiOutlineLock}
                            placeholder="Enter your password"
                            type="password"
                            name="password"
                            register={register}
                            error={errors.password?.message as string | undefined}
                        />

                        {/*AuthInput for password confirmation*/}
                        <AuthInput
                            icon={AiOutlineLock}
                            placeholder="Confirm your password"
                            type="password"
                            name="passwordConfirmation"
                            register={register}
                            error={errors.passwordConfirmation?.message as string | undefined}/>
                    </div>
                    <button type={`submit`} className={`bg-[#5b54e0] mt-8 p-2 px-14 rounded-lg text-white`}>Next
                    </button>
                </form>
            </div>
        </motion.div>
    )
}
export default SignUp;