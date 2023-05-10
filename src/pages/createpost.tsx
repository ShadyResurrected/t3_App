import { Button, TextField } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Router } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { useRouter } from 'next/router'
import axios from 'axios'

const CreatePost = () => {
    const res = useSession()

    // if the user is not autheticated then redirect user to login page
    useEffect(() => {
        if (res.status === 'unauthenticated') Router.replace('/homepage')
    }, [res.status])

    const handleClick = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (res.status === 'authenticated') {
            signOut({ redirect: false })
            Router.replace('/homepage')
        }
    }


    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()

    // Extracting user id from query in url
    const userId = Number(router.query.id)

    const handleSubmit = async () => {
        await axios.post('http://localhost:3000/api/posts/create', {
            "title": title,
            "content": content,
            "authorId": userId
        })
    }


    return (
        <div className='p-4'>
            {/* Navbar */}
            <section className='flex justify-between mb-5'>
                <Link href='/homepage'>
                    <AiOutlineHome className='fill-blue-500 text-3xl cursor-pointer' />
                </Link>
                <h1>Welcome {res.data?.user?.name}, {res.data?.user?.email}</h1>
                <div className='flex justify-evenly w-72 gap-2'>
                    <button className='border rounded-full bg-black text-white w-36' onClick={handleClick}>Sign Out</button>
                </div>
            </section>

            <TextField id="outlined-basic" label="Title" variant="outlined" className='w-full' sx={{ marginBottom: 6 }} onChange={e => setTitle(e.target.value)} />

            <TextField id="outlined-basic" label="Write here" variant="outlined" className='w-full' multiline={true} rows={10} sx={{ marginBottom: 4 }} onChange={e => setContent(e.target.value)} />

            <Button variant="outlined" onClick={handleSubmit}>Save Post</Button>
        </div>
    )
}

export default CreatePost