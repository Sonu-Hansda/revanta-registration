import React from 'react';

interface Step1Props {
  formData: { name: string; registrationNumber: string };
  handleFormDataChange: (data: { name?: string; registrationNumber?: string }) => void;
  errors: {
    name: string;
    registrationNumber: string;
    tShirtSize: string;
    avatar: string;
  };
}

const Step1: React.FC<Step1Props> = ({ formData,errors, handleFormDataChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          value={formData.name}
          onChange={(e) => handleFormDataChange({ name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Registration Number</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          value={formData.registrationNumber}
          onChange={(e) => handleFormDataChange({ registrationNumber: e.target.value })}
        />
      </div>
      {errors.name && <p className="text-red-500">{errors.name}</p>}
      {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber}</p>}
    
    </div>
  );
};

export default Step1;
