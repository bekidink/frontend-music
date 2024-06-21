import React from 'react'

export default function TextInput({name,setName,placeholder}) {
  const handlePaste = (event) => {
    event.preventDefault(); // Prevent default paste behavior
    // Optionally, you can show a message or perform some action to handle the paste attempt
  };
  return (
    <input
        className="w-full my-3 p-3 rounded-md text-base font-semibold text-textColor outline-none border shadow-sm border-gray-300 bg-transparent"
        type="text"
        placeholder={placeholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPaste={handlePaste}
      />
  )
}
