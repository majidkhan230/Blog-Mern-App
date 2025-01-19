import React, { useState } from "react";
import { FaComment } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { postReq } from "@/api";
import { useSelector } from "react-redux";
import CommentList from "./CommentList";

function Comment({props}) {
  const [newComment,setNewComment] = useState()
  
  const user = useSelector((user)=>user.user.user)
  const formSchema = z.object({
    comment: z.string().min(2).max(50),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);

    try {
      const  res= await postReq("/comment/add", {
        comment: values.comment,
        user: user._id,
        blogid:props.blogid
      })

      console.log(res)
      setNewComment(res?.data?.comment)


      form.reset()
    } catch (error) {
      console.log(error.message);
    }



  }

  return (
    <div>
      {/* comment header */}
      <div className="flex items-center">
        <FaComment className="w-8 h-8 text-violet-500" />
        <p className="text-2xl my-2 ml-2 ">Comment</p>
      </div>
      {/* add comments */}
      <div className="addComment">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="type of your comment here"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      {/* comment list */}
      <div>
        <div className="comments ">
        <CommentList props={{blogId:props.blogid,newComment}}/>
        </div>
      </div>
    </div>
  );
}

export default Comment;
