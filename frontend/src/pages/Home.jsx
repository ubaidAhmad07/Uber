import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-screen pt-10 bg-[url(/images/homepic.jpg)] w-full flex justify-between flex-col bg-cover bg-center'  >  
      <img className='w-20 ml-7' src="/images/Uber-Logo.png" alt="Uber Logo" />
      <div className='bg-white pb-7 py-8 px-5'>
        <h2 className='text-3xl font-bold text-center'>Get Started with Uber</h2>
        <Link to='/login' className='flex justify-center items-center w-full mt-3 mb-2 bg-black text-white py-2 px-4 rounded-md'>Continue</Link>
      </div>
    </div>
  )
}

export default Home