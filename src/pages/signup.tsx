import Link from 'next/link'
import React, { useState } from 'react'

import { PrismaClient } from '@prisma/client'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const prisma = new PrismaClient()
    const handleSubmit = async() => {
        const user = await prisma.user.create({
            data: {
              email: 'elsa@prisma.io',
              name: 'Elsa Prisma',
              password : '12345'
            },
          })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    SignUp
                </h1>
                <div className="flex justify-center">
                    <form
                        className="flex max-w-xs w-72 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 h-72 gap-5"
                        onSubmit={handleSubmit}
                    >
                        <input type="text" className='h-12 p-4 text-black outline-0' placeholder='Enter email' />
                        <input type="text" className='h-12 p-4 text-black outline-0' placeholder='Enter password' />
                        <input type="text" className='h-12 p-4 text-black outline-0' placeholder='Enter confirm password' />
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