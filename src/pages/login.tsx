import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import Router from 'next/router'
import React, { FormEventHandler, useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const res = await signIn('credentials', {
            name,
            email,
            password,
            redirect: false // prevent it from redirecting
        })
        if (res?.ok === true) return Router.replace('/homepage')

    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-[hsl(280,100%,70%)]">
                    Log In
                </h1>
                <div className="flex justify-center">
                    <form
                        className="flex max-w-xs w-72 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 h-64 gap-5"
                        onSubmit={handleSubmit}
                    >
                        <input type="text" className='h-12 p-4 text-black outline-0' placeholder='Enter name' onChange={e => setName(e.target.value)} />
                        <input type="email" className='h-12 p-4 text-black outline-0' required placeholder='Enter email' onChange={e => setEmail(e.target.value)} />
                        <input type="password" className='h-12 p-4 text-black outline-0' required placeholder='Enter password' onChange={e => setPassword(e.target.value)} />
                        <button className='border rounded-full h-full'>Log In</button>
                    </form>
                </div>
                <p className='text-white'>Create an account {" "}
                    <Link href='/signup' className='text-blue-400'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login