import Layout from '@/layout/Layout.jsx'
import Profile from '@/pages/Profile'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'


export const routes = [
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"/profile",
                element:<Profile/>

            }
        ]        
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