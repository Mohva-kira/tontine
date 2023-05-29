import React, { useState } from "react";


function Popup({isOpen, setIsOpen, children, title, handleOpen}, props) {
  

  return (
    <>
      
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
            <div className="flex justify-end pt-4 pr-4">
              <button onClick={handleOpen} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M18.293 5.293a1 1 0 00-1.414 0L12 10.586 7.707 6.293a1 1 0 00-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 000 1.414 1 1 0 001.414 0L12 13.414l4.293 4.293a1 1 0 001.414-1.414L13.414 12l4.293-4.293a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <div>
                {children}
                </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default Popup;