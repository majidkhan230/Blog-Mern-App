import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import usericon from "/assets/images/user-icon.png";
import { useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import moment from "moment";
import Loading from "./Loading";
function CommentList({ props }) {
  const user = useSelector((user) => user.user);
  console.log(props);

  const { data, loading, error } = useFetch(`/comment/get/${props.blogId}`, [
    props.refreshData,
  ]);
  console.log(data, loading, error);

  if (loading) return <Loading />;
  return (
    <>
      <h4 className="text-xl font-light mt-4">Comments</h4>
      {data && data?.comments.length > 0 ? 
        data?.comments?.map((comment) => (
          <div key={comment._id}>
            <div className=" flex items-center mt-4">
              <Avatar>
                <AvatarImage
                  className="w-6 h-6 object-contain"
                  src={comment?.user.avatar || usericon}
                ></AvatarImage>
              </Avatar>
              <p className="mt-2 ml-2 font-semibold">
                {comment?.user.name || "username"}
              </p>
            </div>
            <p>{comment.comment}</p>
            <small className="text-sm text-gray-600">
              {moment(comment.createdAt).format("LLLL")}
            </small>
          </div>
        ))
        :
        <p className="text-center text-gray-600 mt-4">No comments yet.</p>
    }
    </>
  );
}

export default CommentList;
