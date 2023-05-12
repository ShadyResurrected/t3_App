import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { AiOutlineHome } from 'react-icons/ai'

import { Card, CardContent, Typography, CardActions, Button, Pagination } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Router from 'next/router'
import Link from 'next/link'

const Homepage = () => {

    const { status, data } = useSession()

    const handleClick = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (status === 'authenticated') signOut()
        else Router.replace('/login')
    }

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/posts/getAll`)
            .then((res) => {
                setPosts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const [currentPage, setCurrentPage] = useState(1)

    const postsPerPage = 10;
    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage

    const records = posts.slice(firstIndex, lastIndex)

    const npage = Math.ceil(posts.length / postsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    return (
        <main className='p-4'>
            {/* Navbar */}
            <section className='flex justify-between mb-5'>
                <AiOutlineHome className='fill-blue-500 text-3xl cursor-pointer' />
                <h1>Home Page</h1>
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

            {/* Blogs */}
            <Typography sx={{ fontSize: 40 }}>Your Blogs</Typography>
            <section className='grid grid-cols-4 gap-5'>

                {
                    records.map((article) => (
                        <Card sx={{ width: 220 }} key={article.id}>
                            <CardContent>
                                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                    {article?.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5, fontSize: 10 }} color="text.secondary">
                                    {article?.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href={{
                                    pathname: `/editpost`,
                                    query: {
                                        id: article?.authorId,
                                        postId: article?.id
                                    },
                                }}>

                                    <Button size="small">Read More</Button></Link>
                            </CardActions>
                        </Card>
                    ))
                }



            </section>

            {/* Pagination */}
            <section className='flex justify-center mt-5' >
                <div className="pagination">
                    <a href="#" onClick={prevPage}>&laquo;</a>
                    {
                        numbers.map((n, i) => (
                            <a
                                href="#"
                                key={i}
                                className={`${currentPage === n ? 'active' : ''}`}
                                onClick={() => changeCPage(n)}
                            >{n}</a>
                        ))
                    }
                    <a href="#" onClick={nextPage}>&raquo;</a>
                </div>
            </section>
        </main>
    )

    function changeCPage(id: number) {
        setCurrentPage(id)
    }

    function prevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
}

export default Homepage