import React, { Suspense } from 'react';
import BookTicket from '@/components/BookTicket';

const Booked = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <BookTicket />
      </Suspense>
    </div>
  );
};

export default Booked;
