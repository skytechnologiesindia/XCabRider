import React from 'react';
import Footer from '../../Footer';

const TripBottomNav = ({
  activeTab = 'BOOK',
  onTabPress,
}) => {
  return (
    <Footer
      activeTab={activeTab}
      firstTabLabel="BOOK"
      isAbsolute={false}
      onTabPress={onTabPress}
      style={{ paddingBottom: 16 }}
    />
  );
};

export default TripBottomNav;
