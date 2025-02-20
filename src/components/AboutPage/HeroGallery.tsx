 const HeroGallery = () => (
    <div className="flex items-center space-x-6 lg:space-x-8">
      {/* First Column */}
      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
          <img 
            src="./src/assets/About1.jpg" 
            className="h-full w-full object-cover object-center" 
            alt="Medical facility"
          />
        </div>
        <div className="h-64 w-44 overflow-hidden rounded-lg">
          <img 
            src="./src/assets/About2.jpg" 
            alt="Doctor consultation" 
            className="h-full w-full object-cover object-center" 
          />
        </div>
      </div>
  
      {/* Second Column */}
      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        <div className="h-64 w-44 overflow-hidden rounded-lg">
          <img 
            src="./src/assets/About3.jpg" 
            alt="Laboratory" 
            className="h-full w-full object-cover object-center" 
          />
        </div>
        <div className="h-64 w-44 overflow-hidden rounded-lg">
          <img 
            src="./src/assets/About4.jpg" 
            alt="Medical equipment" 
            className="h-full w-full object-cover object-center" 
          />
        </div>
        <div className="h-64 w-44 overflow-hidden rounded-lg">
          <img 
            src="./src/assets/About5.jpg" 
            alt="Hospital room" 
            className="h-full w-full object-cover object-center" 
          />
        </div>
      </div>
  
      {/* Third Column */}
      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        <div className="h-64 w-44 overflow-hidden rounded-lg">
          <img 
            src="./src/assets/About6.jpg" 
            alt="Nurse care" 
            className="h-full w-full object-cover object-center" 
          />
        </div>
        <div className="h-64 w-44 overflow-hidden rounded-lg">
          <img 
            src="./src/assets/About7.jpg" 
            alt="Medical team" 
            className="h-full w-full object-cover object-center" 
          />
        </div>
      </div>
    </div>
  );
  export default HeroGallery;