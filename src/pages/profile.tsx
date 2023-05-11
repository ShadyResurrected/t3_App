import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { AiOutlineHome } from 'react-icons/ai'

import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Router from 'next/router'
import Link from 'next/link'

export async function getServerSideProps(context) {
  //you can make DB queries using the data in context.query
  return {
    props: {
      authorId: context.query.id
    }
  }
}


const Profile = (props) => {

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
  const userId = Number(props.authorId)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.post('http://localhost:3000/api/posts/getSingle', {
      "authorId": userId
    }).then((res) => {
      setPosts(res.data)
    })
      .catch(err => console.log(err))
  }, [])

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

        {
          posts.map((article) => (
            <Card sx={{ width: 220 }}>
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
                  <Button size="small">Read More</Button>
                </Link>
              </CardActions>
            </Card>
          ))
        }

      </section>
    </main>
  )
}

export default Profile