import React, { useEffect, useState } from "react";
import { Categories, Navbar } from "../components";

const NotImplemented = () => {




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
            </div>
        </div>
        </>
    )
}

export default NotImplemented