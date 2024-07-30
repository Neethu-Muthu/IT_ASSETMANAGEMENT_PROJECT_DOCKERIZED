import React from 'react';

const Hero = () => {
    return (
        <>
            <header className="bg-blue-100 shadow-md py-4 px-6 flex justify-between items-center">
                <div className="text-xl font-bold">AssetPro Application</div>
                <nav className="space-x-4">
                    <a href="/sign-up" className="text-blue-600 font-bold hover:text-gray-900">Signup</a>
                    <a href="/login" className="text-blue-600 font-bold hover:text-gray-900">Login</a>
                </nav>
            </header>

            <section className="bg-cover bg-center text-black py-20 px-6" style={{ backgroundImage: `url('/src/assets/images/Line Texture Gradient Neon Color Background, Business, Simple, Line Background Image And Wallpaper for Free Download.jpeg')` }}>
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome to IT Asset Management Application</h1>
                    <p className="text-xl text-slate-900 mb-8">Efficiently track and manage your assets with our simple and intuitive application.</p>
                    <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold inline-block">Get Started</a>
                </div>
            </section>

            <section className="bg-white shadow-md py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center">
                            <img src="/src/assets/images/data-science.png" alt="Feature Icon" className="mr-2 w-10 h-8" />
                            <span>Track asset details such as location, status, and maintenance history.</span>
                        </li>
                        <li className="flex items-center">
                            <img src="/src/assets/images/data-science.png" alt="Feature Icon" className="mr-2 w-10 h-8" />
                            <span>Generate reports to analyze asset utilization and performance.</span>
                        </li>
                        <li className="flex items-center">
                            <img src="/src/assets/images/data-science.png" alt="Feature Icon" className="mr-2 w-10 h-8" />
                            <span>Manage asset maintenance schedules and service logs.</span>
                        </li>
                        <li className="flex items-center">
                            <img src="/src/assets/images/data-science.png" alt="Feature Icon" className="mr-2 w-10 h-8" />
                            <span>Customizable settings to fit your organization's needs.</span>
                        </li>
                    </ul>
                </div>
            </section>

            <footer className="bg-gray-200 py-4 px-6 text-center">
                &copy; 2024 Asset Management. All rights reserved.
            </footer>
        </>
    );
}

export default Hero;
