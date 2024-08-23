import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import MultiStepForm from './components/forms/MultiStepForm';

const Home: React.FC = () => {
    const controls = useAnimation();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => {
        setIsFormOpen(true);
      };
    
      const handleCloseForm = () => {
        setIsFormOpen(false);
      };

    useEffect(() => {
        const interval = setInterval(() => {
            controls.start({
                x: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.5 },
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [controls]);

    return (
        <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Team
              <span className="bg-clip-text bg-gradient-to-tl from-teal-600 to-green-600 text-transparent"> Revanta</span>
            </h1>
          </div>
  
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Welcome to the Team Revanta registration portal! Complete this form to register your details and select your team t-shirt size for the upcoming season.
            </p>
          </div>
  
          <div className="mt-8 gap-3 flex justify-center">
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-teal-600 to-green-600 hover:from-green-600 hover:to-teal-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:from-green-600 focus:to-teal-600 py-3 px-4"
              href="#"
              onClick={handleOpenForm}
            >
              Get started
              <motion.svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <path d="m9 18 6-6-6-6" />
              </motion.svg>
            </a>
          </div>
        </div>
  
        {/* Modal Overlay */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Content */}
              <motion.div
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={handleCloseForm}
                  className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-600"
                >
                  &#x2715; 
                </button>
                <MultiStepForm />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
};

export default Home;
