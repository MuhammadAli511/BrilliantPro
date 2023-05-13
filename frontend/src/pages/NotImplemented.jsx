import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Navbar } from "../components";

const NotImplemented = () => {


    function redirection(){
        if (localStorage.getItem("token") === null) {
            navigate("/admin/login");
        } else {
            navigate("/admin/dashboard");
        }
    }


    return (
        <>
        <Navbar />
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto text-center">
                <h1 className="text-5xl font-bold">404</h1>
                <p className="text-2xl font-bold mt-4">Page not found</p>
                <p className="text-lg mt-4">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <Link to="/admin/dashboard" className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full mt-6 inline-block">
                    Back to Home
                </Link>

            </div>
        </div>
        </>
    )
}

export default NotImplemented