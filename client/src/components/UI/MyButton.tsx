import React from 'react';

interface MyButtonProps {
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  func: () => void;
  isValid?: any;
  children: string;
}

const MyButton: React.FC<MyButtonProps> = ({ className, func, isValid, children, type }) => {
  return (
    <button
      disabled={isValid}
      className={`btn ${className}`}
      onClick={func}
      type={type || 'button'}>
      {children}
    </button>
  );
};

export default MyButton;
