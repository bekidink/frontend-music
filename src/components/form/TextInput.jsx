import React from 'react';

const TextInput = ({ register, name, placeholder, error }) => {
  const handlePaste = (event) => {
    event.preventDefault(); // Prevent default paste behavior
  };

  return (
    <div className="w-full my-3">
      <input
        className={`w-full p-3 rounded-md text-base font-semibold text-textColor outline-none border shadow-sm ${
          error ? 'border-red-500' : 'border-gray-300'
        } bg-transparent`}
        type="text"
        placeholder={placeholder}
        {...register(name, { required: `${placeholder} is required` })}
        onPaste={handlePaste}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TextInput;
