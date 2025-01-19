import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { Link } from 'react-router-dom'

const RelatedBlog = ({ props }) => {
    console.log(props)
    const { data, loading, error } = useFetch(`/blog/get-related-blog/${props.category}/${props.currentBlog}`)
console.log(data)
    if (loading) return <div>Loading....</div>
    return (
        <div>
            <h2 className='text-2xl font-bold mb-5'>Related Blogs</h2>
            <div>
                {data && data.relatedBlog.length > 0
                    ?
                    data.relatedBlog.map(blog => {
                        return (
                            <Link key={blog._id} to={`/blog/${props.category}/${blog.slug}`} >
                                <div className='flex items-center gap-2 mb-3'>
                                    <img className='w-[100px] h-[70px] object-cover rounded-md' src={blog.featuredImage ||
                                        "https://placehold.co/600x400?text=No+image+"}
                                         />
                                    <h4 className='line-clamp-2 text-lg font-semibold'>{blog.title}</h4>
                                </div>
                            </Link>
                        )
                    })

                    :
                    <div>
                        No Related Blog
                    </div>
                }

            </div>
        </div>
    )
}

export default RelatedBlog