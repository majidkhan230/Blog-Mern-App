import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
function Topbar() {
  return (
    <div className='w-full h-16 border-b bg-white fixed z-20 flex justify-between items-center px-5'>
      <div>
      <h1 className="text-xl font-semibold uppercase tracking-tighter font-serif">
          <span className="text-4xl text-red-600">B</span>log
        </h1>
      </div>
      <div>
      <SearchBox/>
      </div>
      <div>
        <Button className="rounded-full">
          <MdLogin/>
          Sign In
        </Button>
      </div>
    </div>
  )
}

export default Topbar