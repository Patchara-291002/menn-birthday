import React from 'react'
import Home from './Home/page'
import Photo from './Photo/page'
import Letter from './Letter/page'
import Camera from './Camera/page'

export default function page() {
  return (
    <div
      className='pb-[50px]'
    >
      <Home />
      <Photo />
      <Letter />
      <Camera />
    </div>
  )
}
