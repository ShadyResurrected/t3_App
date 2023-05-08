import Link from 'next/link'
import React from 'react'

const Login = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-[hsl(280,100%,70%)]">
                    Log In
                </h1>
                <div className="flex justify-center">
                    <div
                        className="flex max-w-xs w-72 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 h-52 gap-5"
                    >
                        <input type="text" className='h-12 p-4 text-black outline-0' placeholder='Enter email' />
                        <input type="text" className='h-12 p-4 text-black outline-0' placeholder='Enter password' />
                        <button className='border rounded-full h-full'>Log In</button>
                    </div>
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