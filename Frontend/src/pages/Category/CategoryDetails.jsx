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


const CategoryDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data: categoryData, loading, error } = useFetch(`/category/all-category`, [refreshData])

console.log(categoryData,loading,error)


    const handleDelete = async(id) => {
        
        const deleteRes = await delReq(`category/delete/${id}`)
        
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
                            <Link to={'/category/add'}>
                                Add Category
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Category </TableHead>
                                <TableHead>Slug </TableHead>

                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categoryData && categoryData?.categories?.length > 0 ?

                                categoryData.categories.map(category =>
                                    <TableRow key={category._id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                                                <Link to={`/category/edit/${category._id}`}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <AlertDiaglog onClick={() => handleDelete(category._id)}  />
                                            {/* <Button onClick={() => handleDelete(category._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" >
                                                <FaRegTrashAlt />
                                            </Button> */}
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

export default CategoryDetails