import React, { useState } from 'react';
import { motion } from 'framer-motion';
import tshirt from '../../assets/tshirt.webp';

interface Step2Props {
  formData: { tShirtSize: string };
  handleFormDataChange: (data: { tShirtSize: string }) => void;
  errors: {
    name: string;
    registrationNumber: string;
    tShirtSize: string;
    avatar: string;
  };
}

const tShirtSizes = ['S', 'M', 'L', 'XL'];

const Step2: React.FC<Step2Props> = ({ formData,errors, handleFormDataChange }) => {
  const [selectedSize, setSelectedSize] = useState(formData.tShirtSize);

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    handleFormDataChange({ tShirtSize: size });
  };

  return (
    <div>
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
      Select Your T-Shirt Size
    </h2>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
      {tShirtSizes.map((size) => (
        <motion.div
          key={size}
          className={`relative cursor-pointer border-2 rounded-lg p-2 ${
            selectedSize === size ? 'border-teal-600' : 'border-transparent'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelectSize(size)}
        >
          <img
            src={tshirt}
            alt={`${size} T-Shirt`}
            className="w-full h-28 mb-2 object-contain"
          />
          <p className="absolute bottom-0 w-full text-center text-lg font-bold text-gray-800 dark:text-white">
            {size}
          </p>
        </motion.div>
      ))}
    </div>
    {errors.tShirtSize && <p className="text-red-500">{errors.tShirtSize}</p>}
  </div>
  );
};

export default Step2;
