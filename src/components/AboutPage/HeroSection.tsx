import { HeroGallery } from "./HeroGallery";

export const HeroSection = () => (
  <div className="relative overflow-hidden bg-white">
    <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div className="sm:max-w-lg">
          <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            A place where experiences & highTech are
          </h1>
          <p className="mt-4 text-xl font-bold tracking-tight text-blue-900 dark:text-gray-900">
            Book your appointment by one click and meet our professionals just to check on your health
          </p>
        </div>
        <div>
          <div className="mt-10">
            <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <HeroGallery />
              </div>
            </div>
            <a
              href="#"
              className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);