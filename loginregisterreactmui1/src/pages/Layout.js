
import { CssBaseline } from "@mui/material";

import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
    <CssBaseline />
    <Navbar />
    <Outlet />
    
    </>
  )
}

export default Layout