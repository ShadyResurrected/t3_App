import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'

import { toast } from 'react-hot-toast'



const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const res = await signIn('credentials', {
            name,
            email,
            password,
            confirmPassword,
            redirect: false // prevent it from redirecting
        })
        if (res?.ok === true) {
            toast.success("Registered Successfully")
            Router.replace('/homepage')
        } else toast.error('Something went wrong')

    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    SignUp
                </h1>
                <div className="flex justify-center">
                    <form
                        className="flex max-w-xs w-72 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 h-84 gap-5"
                        onSubmit={handleSubmit}
                    >
                        <input type="text" className='h-12 p-4 text-black outline-0' required placeholder='* Enter name' onChange={e => setName(e.target.value)} />
                        <input type="text" className='h-12 p-4 text-black outline-0' required placeholder='* Enter email' onChange={e => setEmail(e.target.value)} />
                        <input type="password" className='h-12 p-4 text-black outline-0' required placeholder='* Enter password' onChange={e => setPassword(e.target.value)} />
                        <input type="password" className='h-12 p-4 text-black outline-0' required placeholder='* Enter confirm password' onChange={e => setConfirmPassword(e.target.value)} />
                        <button className='border rounded-full h-full' type='submit'>Sign Up</button>
                    </form>
                </div>
                <p className='text-white'>Already have an account {" "}
                    <Link href='/login' className='text-blue-400'>
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default SignUp