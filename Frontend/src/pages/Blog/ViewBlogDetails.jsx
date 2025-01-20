import Loading from "@/components/Loading";
import { Avatar } from "@/components/ui/avatar";
import { useFetch } from "@/hooks/useFetch";
import { AvatarImage } from "@radix-ui/react-avatar";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import usericon from "/assets/images/user-icon.png";
import Comment from "@/components/Comment";
import RelatedBlog from "@/components/RelatedBlog";

const ViewBlogDetails = () => {
  const { slug, category } = useParams();
  console.log({slug,category})

  const { data, loading, error } = useFetch(`/blog/get-blog/${slug}`);
  console.log(data, loading, error);
  if (loading) return <Loading />;
  return (
    <div className="md:flex-nowrap flex-wrap flex justify-between gap-20">
      {data && data.blog && (
        <>
          <div className="border rounded md:w-[70%] w-full p-5">
            <h1 className="text-2xl font-bold mb-5">{data.blog.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                <Avatar>
                  <AvatarImage src={data.blog.author.avatar || usericon} />
                </Avatar>
                <div>
                  <p className="font-bold">{data.blog.author.name}</p>
                  <p>
                    Date: {moment(data.blog.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                {/* <LikeCount props={{ blogid: data.blog._id }} />
                                <CommentCount props={{ blogid: data.blog._id }} /> */}
              </div>
            </div>
            <div className="my-5">
              <img
                src={
                  data.blog.featuredImage || "https://dummyimage.com/16:9x1080/"
                }
                className="rounded"
              />
            </div>

            <div>{data.blog.blogContent}</div>

            <div className="border-t mt-5 pt-5">
              <Comment props={{blogid:data?.blog?._id}} />
            </div>
          </div>
        </>
      )}
      <div className="border rounded md:w-[30%] w-full p-5">
        <RelatedBlog props={{ category: category, currentBlog: slug }} />
      </div>
    </div>
  );
};

export default ViewBlogDetails;
