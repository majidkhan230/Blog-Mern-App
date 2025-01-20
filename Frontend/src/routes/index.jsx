import SearchResult from "@/components/SearchResult";
import { RouteSearch } from "@/helpers/routeName.js";
import Layout from "@/layout/Layout.jsx";
import AuthRouteProtection from "@/pages/AuthRouteProtection";
import AddBlog from "@/pages/Blog/AddBlog";
import BlogByCategory from "@/pages/Blog/BlogByCategory";
import BlogDetails from "@/pages/Blog/BlogDetails";
import EditBlog from "@/pages/Blog/EditBlog";
import ViewBlogDetails from "@/pages/Blog/ViewBlogDetails";
import AddCategory from "@/pages/Category/AddCategory";
import CategoryDetails from "@/pages/Category/CategoryDetails";
import EditCategory from "@/pages/Category/EditCategory";
import Home from "@/pages/Home";
import OnlyAdminAllowed from "@/pages/OnlyAdminAllowed";
import Profile from "@/pages/Profile";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";




export const routes =  [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog/:category",
        element: <BlogByCategory/>,
      },
      {
        element: <AuthRouteProtection />,
        children: [
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
            path: "blog",
            element: <BlogDetails />,
          },
         
          {
            path: RouteSearch(),
            element: <SearchResult />,
          },
        ],
      },
      {
        element: <OnlyAdminAllowed />,
        children: [
          {
            path: "category/add",
            element: <AddCategory />,
          },
          {
            path: "blog/add",
            element: <AddBlog />,
          },
          {
            path: "blog/edit/:id",
            element: <EditBlog />,
          },
          {
            path: "category/edit/:id",
            element: <EditCategory />,
          },
        ],
      },
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