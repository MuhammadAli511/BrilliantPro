import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { testimonials } from "../../constants";
import { logo } from "../assets";

const LandingPage = () => {
    return (
        <div>
            <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
                <div className="flex items-center font-bold text-2xl">
                    <Link to="/">
                        BrilliantPro
                    </Link>
                </div>
                <div>
                    <Link to="/login" className="flex items-center text-sm font-semibold py-2 px-3 rounded border border-gray-900 text-gray-900">
                        Login
                    </Link>
                </div>
            </nav>
            <div className="mt-44 flex justify-center items-center flex-col overflow-y-hidden">
                <h1 className="text-4xl font-bold mb-8">Welcome to BrilliantPro</h1>
                <p className="text-lg mb-8">
                    We offer a wide range of courses to suit all your needs. From technical to non-technical, we've got it all.
                </p>
                <div className="mt-8" style={{ overflow: "hidden" }}>
                    <h2 className="text-2xl font-bold my-5 text-center">What Our Students Are Saying</h2>
                    <Slider
                        infinite={true}
                        speed={8000}
                        slidesToShow={3}
                        slidesToScroll={1}
                        autoplay={true}
                        autoplaySpeed={0}
                        pauseOnHover={false}
                        cssEase="linear"
                        className="grid grid-cols-1 mt-10"
                    >
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white shadow-md p-4 rounded border border-gray-300">
                                <p className="text-lg mb-4">{testimonial.text}</p>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm">{testimonial.location}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
