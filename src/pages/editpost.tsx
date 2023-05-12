import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { AiOutlineHome } from 'react-icons/ai'

import { TextField, Button } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Router from 'next/router'
import Link from 'next/link'

import toast from 'react-hot-toast';

export async function getServerSideProps(context) {
    //you can make DB queries using the data in context.query
    return {
        props: {
            postId: context.query.postId, //pass it to the page props
            authorId: context.query.id
        }
    }
}

const editpost = (props) => {
    const { status, data } = useSession()

    const handleClick = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (status === 'authenticated') signOut()
        else Router.replace('/login')
    }

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')


    const [canEdit, setCanEdit] = useState(false)
    const [enabled, setEnabled] = useState(true)

    // post id and author id from the url
    const postId = props.postId
    const authorId = Number(props.authorId)


    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/posts/getPost`, {
            postId
        }).then((res) => {
            setTitle(res.data.title)
            setContent(res.data.content)
        })
            .catch((err) => console.log(err))
    }, [])


    const handleEdit = () => {
        if (authorId !== Number(data?.user?.id)) return toast.error('Cannot edit another user post');

        setCanEdit(true)
        setEnabled(false)
    }

    const handleSave = async () => {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/posts/updatePost`, {
            title, content, postId
        })

        if (res?.data?.success) {
            toast.success('Post Updated')
            setCanEdit(false)
            setEnabled(true)
        }
    }

    return (
        <main className='p-4'>
            {/* Navbar */}
            <section className='flex justify-between mb-5'>
                <Link href='/homepage'>
                    <AiOutlineHome className='fill-blue-500 text-3xl cursor-pointer' />
                </Link>
                <h1>Edit Post</h1>
                <div className='flex justify-evenly w-96 gap-2'>
                    {status === "authenticated" && <Link href={{
                        pathname: `/createpost`,
                        query: {
                            id: data?.user?.id,
                        },
                    }}> <button className='border rounded-full bg-black text-white w-36 h-10'>Create New Post</button> </Link>}
                    {status === "authenticated" &&
                        <Link href={{
                            pathname: `/profile`,
                            query: {
                                id: data?.user?.id,
                            },
                        }}>
                            <button className='border rounded-full bg-black text-white w-36 h-10'>View Profile</button> </Link>}
                    <button className='border rounded-full bg-black text-white w-36' onClick={handleClick}>{status === 'unauthenticated' ? "Log In" : "Sign Out"}</button>
                </div>
            </section>


            <TextField disabled={enabled} value={title} placeholder="Enter title" variant="outlined" className='w-full' sx={{ marginBottom: 6 }} onChange={e => setTitle(e.target.value)} />

            <TextField disabled={enabled} value={content} placeholder="Enter content" variant="outlined" className='w-full' multiline={true} rows={10} sx={{ marginBottom: 4 }} onChange={e => setContent(e.target.value)} />

            {canEdit && <Button variant="outlined" sx={{ marginRight: 4 }} onClick={handleSave}>Save Post</Button>}
            <Button variant="outlined" onClick={handleEdit} disabled={!enabled}>Edit Post</Button>
        </main>
    )
}

export default editpost