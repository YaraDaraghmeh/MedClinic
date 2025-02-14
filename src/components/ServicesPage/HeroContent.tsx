export const HeroContent = () => (
    <div className="w-full md:w-1/2 mb-12 md:mb-0">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight !!text-white  !text-gray-300">
        Care.<br />Innovation.<br />Trust.
      </h1>
      <p className="text-xl mb-8 !text-gray-300">For A better life check your in body every 6 months</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <a href="#" className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-full hover:bg-blue-100 transition duration-300 text-center">Book Appointment</a>
        <a href="#" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-900 transition duration-300 text-center">Learn More</a>
      </div>
    </div>
  );