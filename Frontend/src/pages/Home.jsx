import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

function Home() {
       const { data: blogData, loading, error } = useFetch(`/blog/all-blogs`, )
   
    if (loading) return <Loading />
    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 pt-5'>
            {blogData && blogData.blogs.length > 0
                ?
                blogData.blogs.map(blog => <BlogCard key={blog._id} props={blog} />)
                :
                <div>Data Not Found.</div>
            }
        </div>
    )
}

export default Home