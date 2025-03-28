
import React from 'react';
import { TinaEditProvider } from 'tinacms/dist/edit-state';

interface TinaProviderProps {
  children: React.ReactNode;
}

const TinaProvider: React.FC<TinaProviderProps> = ({ children }) => {
  const isAdmin = window.location.pathname.startsWith('/admin');

  // Don't wrap the admin page in the TinaEditProvider
  if (isAdmin) {
    return <>{children}</>;
  }

  const enterEditMode = () => {
    window.location.href = `/admin/#/collections/page/`;
  };

  return (
    <TinaEditProvider
      editMode={false}
      showEditButton={true}
      enterEditMode={enterEditMode}
    >
      {children}
    </TinaEditProvider>
  );
};

export default TinaProvider;
