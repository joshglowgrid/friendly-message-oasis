
import React from 'react';
import { TinaEditProvider } from 'tinacms/dist/edit-state';

interface TinaProviderProps {
  children: React.ReactNode;
}

const TinaProvider: React.FC<TinaProviderProps> = ({ children }) => {
  // We need to check if we're running in the browser before accessing window
  const isClient = typeof window !== 'undefined';
  const isAdmin = isClient && window.location.pathname.startsWith('/admin');

  // Don't wrap the admin page in the TinaEditProvider
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <TinaEditProvider
      editMode={
        <button 
          onClick={() => window.location.href = `/admin/#/collections/page/`}
          className="fixed bottom-4 right-4 z-50 bg-orange-500 text-white rounded-full p-2"
        >
          Edit Content
        </button>
      }
      showEditButton={true}
    >
      {children}
    </TinaEditProvider>
  );
};

export default TinaProvider;
