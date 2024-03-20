import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Error() {
  return (
    <div className="bg-dark vh-100">
    <div className="d-flex align-items-center justify-content-center h-100">
        <div className="bg-gray d-flex justify-content-center align-items-center rounded">
            <div className="d-flex flex-column justify-items-center pe-16 text-center align-items-center h-100 ">
                <img className="ps-4 hidden-lg" src="https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png" alt="error 404" />
                <h1 className="pe-4 pt-8 pb-4 text-center fs-4 fw-bold mt-3 text-light">OOPS! </h1>
                <p className="ps-4 pb-10 text-center text-light">No signal here! we cannot find the page you are looking for </p>
                <Link to={"/"} className="btn btn-primary">Back to Home</Link>
            </div>
        </div>
    </div>
</div>  )
}

export default Error