import React from 'react'

import { AiOutlineHome } from 'react-icons/ai'

import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'

const Profile = () => {
  return (
    <main className='p-4'>
      {/* Navbar */}
      <section className='flex justify-between mb-5'>

        <AiOutlineHome className='fill-blue-500 text-3xl cursor-pointer' />
        <div className='flex justify-evenly w-72 gap-2'>
          <button className='border rounded-full bg-black text-white w-36 h-10'>Create New Post</button>
          <button className='border rounded-full bg-black text-white w-36'>Sign Out</button>
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