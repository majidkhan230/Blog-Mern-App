import Layout from '@/layout/Layout.jsx'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'


export const routes = [
    {
        path:"/",
        element:<Layout/>,
        
    },
    {
        path:"/sign-in",
        element: <SignIn/>
    },
    {
        path:"/sign-up",
        element: <SignUp/>
    },
]