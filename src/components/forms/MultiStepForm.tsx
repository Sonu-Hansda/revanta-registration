import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

interface FormData {
  name: string;
  registrationNumber: string;
  tShirtSize: string;
  avatar: File | null;
}

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    registrationNumber: '',
    tShirtSize: '',
    avatar: null,
  });

  const [direction, setDirection] = useState(1);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState<boolean | null>(null);

  const [errors, setErrors] = useState({
    name: '',
    registrationNumber: '',
    tShirtSize: '',
    avatar: '',
  });

  const validateStep = (step: number): boolean => {
    let valid = true;
    const newErrors = { name: '', registrationNumber: '', tShirtSize: '', avatar: '' };

    if (step === 1) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
        valid = false;
      }
      if (!/^20\d{2}[A-Z]{4}\d{3}$/.test(formData.registrationNumber.toUpperCase())) {
        newErrors.registrationNumber = 'Invalid registration number format';
        valid = false;
      }
    }
    if (step === 2 && !formData.tShirtSize) {
      newErrors.tShirtSize = 'T-Shirt size must be selected';
      valid = false;
    }
    if (step === 3 && !formData.avatar) {
      newErrors.avatar = 'Avatar image must be selected';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      setIsFirstRender(false);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setIsFirstRender(false);
  };

  const handleFormDataChange = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  const handleSubmit = async () => {
    // Determine the branch based on the registration number
    const getBranchFromRegistrationNumber = (regNum: string): string => {
      const regNumber = regNum.toUpperCase();
      if (regNumber.includes('CM')) return 'Engineering and Computational Mechanics';
      if (regNumber.includes('CS')) return 'Computer Science and Engineering';
      if (regNumber.includes('CE')) return 'Civil Engineering';
      if (regNumber.includes('EE')) return 'Electrical Engineering';
      if (regNumber.includes('ECE')) return 'Electronics and Communication Engineering';
      if (regNumber.includes('ME')) return 'Mechanical Engineering';
      if (regNumber.includes('PI')) return 'Producation and Industrial Engineering';
      if (regNumber.includes('MME')) return 'Metallurgical and Materials Engineering';

      return 'Unknown Branch';
    };
  
    const branch = getBranchFromRegistrationNumber(formData.registrationNumber);
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('registrationNumber', formData.registrationNumber);
    formDataToSend.append('tShirtSize', formData.tShirtSize);
    formDataToSend.append('branch', branch);
  
    try {
      const response = await fetch('https://formspree.io/f/xqazyojg', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
        },
      });
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        setIsSubmissionSuccessful(true);
        setCurrentStep(4);
      } else {
        setIsSubmissionSuccessful(false);
        setCurrentStep(5);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmissionSuccessful(false);
      setCurrentStep(5);
    }
  };
  

  const handleStartOver = () => {
    setCurrentStep(1);
    setIsSubmissionSuccessful(null);
    setFormData({
      name: '',
      registrationNumber: '',
      tShirtSize: '',
      avatar: null,
    });
    setErrors({
      name: '',
      registrationNumber: '',
      tShirtSize: '',
      avatar: '',
    });
    setIsFirstRender(true);
  };

  const variants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
    }),
  };

  const springTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 overflow-hidden">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentStep}
          variants={variants}
          custom={direction}
          initial={isFirstRender && currentStep === 1 ? false : 'initial'}
          animate="animate"
          exit="exit"
          transition={springTransition}
        >
          {currentStep === 1 && (
            <Step1
              formData={formData}
              handleFormDataChange={handleFormDataChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <Step2
              formData={formData}
              handleFormDataChange={handleFormDataChange}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <Step3
              formData={formData}
              handleFormDataChange={handleFormDataChange}
              errors={errors}
            />
          )}
          {currentStep === 4 && isSubmissionSuccessful && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-500 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </motion.div>
              <h2 className="mt-4 text-xl font-semibold text-green-600">
                You have successfully registered yourself!
              </h2>
              <button
                onClick={handleStartOver}
                className="mt-6 px-6 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
              >
                Start Over
              </button>
            </div>
          )}
          {currentStep === 5 && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </motion.div>
              <h2 className="mt-4 text-xl font-semibold text-red-600">
                Unable to register yourself!
              </h2>
              <button
                onClick={handleStartOver}
                className="mt-6 px-6 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
              >
                Start Over
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between">
        {currentStep > 1 && currentStep < 4 && (
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            Back
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={nextStep}
            className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={handleSubmit}
            className="ml-auto text-center bg-gradient-to-tl from-teal-600 to-green-600 hover:from-green-600 hover:to-teal-600 border border-transparent text-white text-sm font-medium rounded-md py-3 px-4"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
