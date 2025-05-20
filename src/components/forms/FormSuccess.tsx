
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormSuccessProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  buttonText?: string;
}

const FormSuccess = ({
  title = 'Thank You!',
  message = 'We\'ve received your request and will get back to you shortly.',
  onReset,
  buttonText = 'Send Another Message'
}: FormSuccessProps) => {
  return (
    <div className="glass-panel p-8 text-center animate-fade-in">
      <div className="orange-gradient-text text-4xl mb-4">✓</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-white/80 mb-4">{message}</p>
      {onReset && (
        <Button
          variant="outline"
          onClick={onReset}
          className="mt-4 text-orange-400 hover:text-orange-500 border-orange-400 hover:border-orange-500"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default FormSuccess;
