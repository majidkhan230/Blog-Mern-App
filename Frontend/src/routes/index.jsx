import Layout from "@/layout/Layout.jsx";
import AddBlog from "@/pages/Blog/AddBlog";
import BlogDetails from "@/pages/Blog/BlogDetails";
import EditBlog from "@/pages/Blog/EditBlog";
import ViewBlogDetails from "@/pages/Blog/ViewBlogDetails";
import AddCategory from "@/pages/Category/AddCategory";
import CategoryDetails from "@/pages/Category/CategoryDetails";
import EditCategory from "@/pages/Category/EditCategory";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [ 
      {
        path:"/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "category",
        element: <CategoryDetails />,
      },
      {
        path: "category/edit/:id",
        element: <EditCategory />,
      },
      {
        path: "category/add", 
        element: <AddCategory />,
      },
      {
        path: "blog",
        element: <BlogDetails />,
      },
      {
        path: "blog/edit/:id",
        element: <EditBlog />,
      },
      {
        path: "blog/add", 
        element: <AddBlog/>,
      },
      {
        path: "/blog/:category/:slug",
        element: <ViewBlogDetails/>,
      }
    ],
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <div>Page not found</div>,
  },
];
