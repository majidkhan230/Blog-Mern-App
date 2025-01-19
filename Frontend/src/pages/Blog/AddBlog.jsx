import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import dummyImage from "/assets/images/logo.png";
import { BiImageAdd } from "react-icons/bi";
import { postReq } from "@/api";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const formSchema = z.object({
  category: z
    .string()
    .min(2, { message: "category must be at least 2 characters." }),
  title: z.string().min(2, { message: "title must be at least 2 characters." }),
  slug: z.string().min(2, { message: "slug must be at least 2 characters." }),
  blogContent: z
    .string()
    .min(2, { message: "category must be at least 2 characters." }),
});

function AddBlog() {
  const [file, setFile] = useState("");
  const [filePreview, setPreview] = useState("");

  const user = useSelector((state) => state.user.user);
  // console.log(user._id)

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const blogTitle = form.watch("title");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  const handleFileSelection = (acceptedFiles) => {
    const file = acceptedFiles[0];

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // fetching categories
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch("/category/all-category");

  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  async function onSubmit(values) {
    console.log(values);
    const formData = new FormData();
    formData.append("author", user?._id);
    formData.append("category", values.category);
    formData.append("title", values.title);
    formData.append("slug", values.slug);

    formData.append("blogContent", values.blogContent);
    if (file) formData.append("featuredImage", file);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const res = await postReq("/blog/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res && res.data.success === true) {
      console.log(res);
      navigate("/blog");
    } else {
      console.log("error", res.error.message);
    }
  }
  if (loading) return <Loading />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryData &&
                          categoryData?.categories?.length > 0 &&
                          categoryData.categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    {/* <FormControl>
                      <Input placeholder="pleaser enter category" {...field} />
                    </FormControl>
                    <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="please enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-1">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="please enter slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-1 ">
              <Dropzone
                onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                accept={{
                  "image/jpeg": [],
                  "image/png": [],
                  "image/jpg": [],
                }}
                maxSize={2 * 1024 * 1024}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <span className="mb-2 block">Featured Image</span>
                    <input {...getInputProps()} />
                    <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed rounded">
                      {/* <img src={filePreview ? filePreview : dummyImage} */}
                      {filePreview ? (
                        <img
                          src={filePreview}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <BiImageAdd className="text-4xl text-gray-400" />
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="mb-1">
              <FormField
                control={form.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="please enter blog content"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-3">
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AddBlog;
