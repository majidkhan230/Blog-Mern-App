import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* <img src="/assets/images/logo.png" className="w-12"  /> */}
        <h1 className="text-xl font-semibold uppercase tracking-tighter font-serif">
          <span className="text-4xl text-red-600">B</span>log
        </h1>
      </SidebarHeader>
      <SidebarContent  className='bg-white'>
        <SidebarGroup>
            {/* <SidebarGroupLabel>Hello</SidebarGroupLabel> */}
            <SidebarMenuButton>
              <IoHomeOutline />
              <Link to="/">Home</Link>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <BiCategoryAlt/>
              <Link to="/category">Categories</Link>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <GrBlog/>
              <Link to="/>/">Blogs</Link>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <FaRegComments/>
              <Link to="/>/">Comments</Link>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <LuUsers/>
              <Link to="/>/">Users</Link>
            </SidebarMenuButton>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenuButton>
            <GoDot />
            <Link to="about">Categories Item</Link>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <GoDot />
            <Link to="contact">Contact Us</Link>
          </SidebarMenuButton>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
