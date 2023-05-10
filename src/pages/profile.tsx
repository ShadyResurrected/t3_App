import React, { useEffect } from 'react'

import { AiOutlineHome } from 'react-icons/ai'

import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Router from 'next/router'
import Link from 'next/link'

const Profile = () => {

  const { status, data } = useSession()

  // if the user is not autheticated then redirect user to login page
  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/homepage')
  }, [status])

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (status === 'authenticated') {
      signOut({ redirect: false })
      Router.replace('/homepage')
    }
  }

  return (
    <main className='p-4'>
      {/* Navbar */}
      <section className='flex justify-between mb-5'>
        <Link href='/homepage'>
          <AiOutlineHome className='fill-blue-500 text-3xl cursor-pointer' />
        </Link>
        <h1>Welcome {data?.user?.name}, {data?.user?.email}</h1>
        <div className='flex justify-evenly w-72 gap-2'>
          <Link href={{
            pathname: `/createpost`,
            query: {
              id: data?.user?.id,
            },
          }}><button className='border rounded-full bg-black text-white w-36 h-10'>Create New Post</button></Link>
          <button className='border rounded-full bg-black text-white w-36' onClick={handleClick}>Sign Out</button>
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
    </main>
  )
}

export default Profile