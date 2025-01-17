import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { postReq } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/features/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { FaCamera } from "react-icons/fa6";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { UserRoundSearchIcon } from "lucide-react";
import dummyImage from "/assets/images/user-icon.png";
function Profile() {
  const user = useSelector((state) => state.user);
  // console.log(user);

  const [file, setFile] = useState();
  const [filePreview, setPreview] = useState();
  const { data, loading, error } = useFetch(`/user/get-user/${user.user._id}`);
  console.log("fetched  data", data, loading, error);

  useEffect(() => {
    if (data && data.success) {
      form.reset({
        name: data.user.name,
        email: data.user.email,
        bio: data.user.bio,
      });
    }
  }, [data]);

  //   const navigate = useNavigate()
  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    bio: z.string(),
    // password: z.string().min(8, "password must be atleast 8 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("bio", values.bio);
    // console.log(formData.values(),file)
    if (file) formData.append("avatar", file);
    const res = await postReq(`/user/update-user/${user?.user?.id}`, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await res?.data?.user;

    dispatch(setUser(data));
    // if (res && res.success) {
    //   // dispatch(setUser(res.data));
    //   navigate("/profile");
    // } else {
    //   console.log("error", res);
    // }
    // navigate('/profile')
  }

  const handleInputFiles = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  if (loading)
    return (
      <div className="w-full min-h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  return (
    <div className="max-w-full  flex justify-center items-center ">
      <Card className="w-full">
        <CardHeader className="flex justify-center items-center ">
          <Dropzone onDrop={(acceptedFiles) => handleInputFiles(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Avatar className="w-20 h-20 relative group">
                    <AvatarImage
                      src={
                        filePreview
                          ? filePreview
                          : user.user.avatar
                          ? user.user.avatar
                          : dummyImage
                      }
                    />
                    {/* <FaCamera className="z-50 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2" /> */}
                    <div className="w-full h-full bg-black  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center    rounded-full  border-2 border-purple-500 group-hover:flex hidden">
                      <FaCamera className="text-purple-500" />
                    </div>
                  </Avatar>
                </div>
              </section>
            )}
          </Dropzone>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-1">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          type="password"
                          placeholder="Enter bio"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-1">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new  password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
