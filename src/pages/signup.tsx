import Link from 'next/link'
import React from 'react'

const SignUp = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    SignUp
                </h1>
                <div className="flex justify-center">
                    <div
                        className="flex max-w-xs w-72 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 h-72 gap-5"
                    >
                        <input type="text" className='h-12 p-4 text-black outline-0' placeholder='Enter email' />
                        <input type="text" className='h-12 p-4 text-black outline-0' placeholder='Enter password' />
                        <input type="text" className='h-12 p-4 text-black outline-0' placeholder='Enter confirm password' />
                        <button className='border rounded-full h-full'>Sign Up</button>
                    </div>
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