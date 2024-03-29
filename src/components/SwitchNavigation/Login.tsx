import React, { useState, useContext } from 'react'
import { LoginType, loginScheme } from '../../schemas/loginSchema'
import useLogin from '../../hooks/useLogin'
import { LanguageContext } from '../../context/LanguageContext';
import useTranslate from '../../translations/Translations';

export default function LoginPage() {
    const [logemail, setEmail] = useState<undefined | string>(undefined)
    const [logpassword, setPassword] = useState<undefined | string>(undefined)
    const [loginStatus, setLoginStatus] = useState<string>("ready")


    //Get which language code we are on
    const { languageVal } = useContext(LanguageContext)

    //Custom useTranslate hook to load translated values
    const translations = useTranslate(languageVal as string)

    const loginHook = useLogin

    const login = () => {

        setLoginStatus("ready")

        const user: LoginType = {
            email: logemail as string,
            password: logpassword as string
        }

        try {

            loginScheme.validateSync(user)
            loginHook(user, setLoginStatus).then((tokenObj: {
                error: boolean,
                value: string
            }) => {
                console.log(tokenObj)
                const error = tokenObj.error
                if (error === true) {
                    setLoginStatus(tokenObj.value)
                } else {
                    alert("Token:" + tokenObj.value)
                }

            }).catch(err => {
                setLoginStatus((err as Error).message)
            })

        } catch (err) {
            setLoginStatus((err as Error).message)

        }

    }


    return (
        <div className='w-full h-full pt-32 flex justify-center content-center items-center'>

            <div className='flex flex-col w-64 gap-5'>
                <h1 className='text-xl text-primary text-center'>{translations.login}</h1>

                <input className='input input-bordered w-full max-w-xs' type='text' placeholder='Email' onChange={(e) => {
                    setEmail(e.target.value)
                }}></input>


                <input className='input input-bordered w-full max-w-xs' type='password' placeholder='Password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}></input>

                <button className='btn btn-primary max-w-xs' disabled={loginStatus === "Please wait..." ? true : false} onClick={login}> {translations.login}</button>
                <h3>{loginStatus !== "ready" ? loginStatus : null}</h3>
            </div>
        </div>

    )
}