// import React, { useCallback, useRef, useState } from 'react'
import Rightbar from '../../Components/RightSide/RightSide'
import Sidebar from '../../Components/LeftSide/Sidebar'
import CreatePost from '../../Components/CreatePost/CreatePost'
import Posts from '../../Components/Posts/Posts'
import Navbar from '../../Components/Navbar/Navbar'


const Home = () => {
  return (
    <div className='bg-dark' style={{ color: "#fff" }}>
      {/* <Navbar /> */}
      <div className="container-fluid">
        <div className="row p-0">
          <div className="col-lg-3 col-2 p-0 border-right ">
            <Sidebar/>
          </div>
          <div className="col-lg-6 col-10  ">
            <Navbar/>
            <div className="">
              <CreatePost />
              <Posts />
            </div>
          </div>
          <div className="col-3 p-0 m-0 border-left">
            <div style={{position:'fixed',top:'0px',bottom:'0px'}}>
              <Rightbar className="vh-100"/>
            </div>
          </div>
        </div>
      </div>I
    </div>
  )
}

export default Home
