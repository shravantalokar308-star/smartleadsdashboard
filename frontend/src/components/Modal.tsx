import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  const { isDark } = useDarkMode();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-lg p-6 max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl cursor-pointer">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
