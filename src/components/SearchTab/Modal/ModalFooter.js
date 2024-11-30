import React from 'react';

export const ModalFooter = ({ children }) => {
  return (
    <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
      {children}
    </div>
  );
};