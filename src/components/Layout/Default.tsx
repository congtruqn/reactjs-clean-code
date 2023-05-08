import React, { useState, useRef } from 'react';
import Sidebar from "./SideBar";
import Header from "./Header";
import { Route, Routes } from 'react-router-dom'
import classNames from "classnames";
import FarmProfile from "../../components/Farm/farmProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Props = {}
const Dashboard: React.FC<Props> = () => {
    const [mobileView, setMobileView] = useState();
    const [visibility, setVisibility] = useState(false);
    const [themeState] = useState({
        main: "default",
        sidebar: "dark",
        header: "white",
        skin: "light",
    });
    const sidebarClass = classNames({
        "nk-sidebar-mobile": mobileView,
        "nk-sidebar-active": visibility && mobileView,
    });
    const toggleSidebar = (e) => {
        e.preventDefault();
        if (visibility === false) {
          setVisibility(true);
        } else {
          setVisibility(false);
        }
      };
    return (
        <div className="nk-main">
          <Sidebar
            sidebarToggle={toggleSidebar}
            fixed
            mobileView={mobileView}
            theme={themeState.sidebar}
            className={sidebarClass}
          />
          <div className='nk-wrap'>
            <Header sidebarToggle={toggleSidebar} setVisibility={setVisibility} fixed theme={themeState.header} />
            <ToastContainer />
            <Routes>
                <Route path={`/farmprofille/*`} element={<FarmProfile />}></Route>
            </Routes>
            
          </div>

        </div>
    );

}

export default Dashboard;