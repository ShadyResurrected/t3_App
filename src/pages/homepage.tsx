import React from 'react'

import { AiOutlineHome } from 'react-icons/ai'

import { Card, CardContent, Typography, CardActions, Button, Pagination } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Router from 'next/router'

const Homepage = () => {

    const { status } = useSession()

    const handleClick = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (status === 'authenticated') signOut()
        else Router.replace('/login')
    }

    return (
        <main className='p-4'>
            {/* Navbar */}
            <section className='flex justify-between mb-5'>
                <AiOutlineHome className='fill-blue-500 text-3xl cursor-pointer' />
                <h1>Home Page</h1>
                <div className='flex justify-evenly w-96 gap-2'>
                    {status === "authenticated" && <button className='border rounded-full bg-black text-white w-36 h-10'>Create New Post</button>}
                    {status === "authenticated" && <button className='border rounded-full bg-black text-white w-36 h-10' onClick={() => Router.replace('/profile')}>View Profile</button>}
                    <button className='border rounded-full bg-black text-white w-36' onClick={handleClick}>{status === 'unauthenticated' ? "Log In" : "Sign Out"}</button>
                </div>
            </section>

            {/* Blogs */}
            <Typography sx={{ fontSize: 40 }}>Your Blogs</Typography>
            <section className='grid grid-cols-4 gap-5'>

                <Card sx={{ width: 220 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Blog Heading
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            Small Description
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Read More</Button>
                    </CardActions>
                </Card>

                <Card sx={{ width: 220 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Blog Heading
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            Small Description
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Read More</Button>
                    </CardActions>
                </Card>

                <Card sx={{ width: 220 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Blog Heading
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            Small Description
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Read More</Button>
                    </CardActions>
                </Card>

                <Card sx={{ width: 220 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Blog Heading
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            Small Description
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Read More</Button>
                    </CardActions>
                </Card>

                <Card sx={{ width: 220 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Blog Heading
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            Small Description
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Read More</Button>
                    </CardActions>
                </Card>

                <Card sx={{ width: 220 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Blog Heading
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            Small Description
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Read More</Button>
                    </CardActions>
                </Card>

                <Card sx={{ width: 220 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Blog Heading
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            Small Description
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Read More</Button>
                    </CardActions>
                </Card>

            </section>

            {/* Pagination */}
            <section className='flex justify-center mt-5' >
                <Pagination count={10} color="primary" />
            </section>
        </main>
    )
}

export default Homepage