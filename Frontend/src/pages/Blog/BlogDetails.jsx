import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { delReq } from '@/api'
import AlertDiaglog from '@/components/AlertDiaglog'


const BlogDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data: blogData, loading, error } = useFetch(`/blog/all-blog`, [refreshData])

console.log(blogData,loading,error)


    const handleDelete = async(id) => {
        
        const deleteRes = await delReq(`blog/delete/${id}`)
        
        if(deleteRes.data.success){
            setRefreshData(!refreshData)
        }else{
            console.log(deleteRes.data.message)
        }
        
    }

    if (loading) return <Loading />
    return (
        <div>
            <Card>
                <CardHeader>
                    <div>
                        <Button asChild>
                            <Link to={'/blog/add'}>
                                Add Blog
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Author </TableHead>
                                <TableHead>Category Name </TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogData && blogData?.length > 0 ?

                                blogData.map(blog =>
                                    <TableRow key={blog._id}>
                                        <TableCell>{blog.author}</TableCell>
                                        <TableCell>{blog.category}</TableCell>
                                        <TableCell>{blog.title}</TableCell>
                                        <TableCell>{blog.slug}</TableCell>
                                        <TableCell>{blog.createdAt}</TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                                                <Link to={`/blog/edit/${blog._id}`}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            {/* <AlertDiaglog onClick={() => handleDelete(blog._id)}  /> */}
                                            <Button onClick={() => handleDelete(blog._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" >
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                )

                                :

                                <TableRow>
                                    <TableCell colSpan="3">
                                        Data not found.
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default BlogDetails