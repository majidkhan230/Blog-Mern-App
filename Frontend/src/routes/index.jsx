import Layout from "@/layout/Layout.jsx";
import AddCategory from "@/pages/Category/AddCategory";
import CategoryDetails from "@/pages/Category/CategoryDetails";
import EditCategory from "@/pages/Category/EditCategory";
import Profile from "@/pages/Profile";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

export const routes = [
  {
    path: "/",
    element: <Layout />,
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
        path: "category/add", 
        element: <AddCategory />,
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
