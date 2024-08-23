import React, { useState } from 'react';
import noImage from '../../assets/no_person.jpg';
interface Step3Props {
  formData: { avatar: File | null };
  handleFormDataChange: (data: { avatar: File | null }) => void;
  errors: {
    name: string;
    registrationNumber: string;
    tShirtSize: string;
    avatar: string;
  };
}

const Step3: React.FC<Step3Props> = ({ errors,handleFormDataChange }) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      handleFormDataChange({ avatar: file });
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Upload Your Image</h2>
      <div className="flex flex-col items-center">
        <label
          htmlFor="avatarUpload"
          className={`relative w-36 h-36 border-2 border-dashed ${avatarPreview? 'border-teal-600' : null} rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center`}
        >
          <img
            src={avatarPreview || noImage}
            alt="Avatar Preview"
            className="w-32 h-32 rounded-full object-cover"
          />
        </label>
        <input
          type="file"
          id="avatarUpload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {errors.avatar && <p className="text-red-500">{errors.avatar}</p>}
    </div>
  );
};

export default Step3;
