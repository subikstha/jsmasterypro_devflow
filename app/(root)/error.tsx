'use client';
import { RequestError } from '@/lib/http-errors';
import React from 'react';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  if (error instanceof RequestError) {
    return <div>Error Code: {error.statusCode}</div>;
  }

  return <div>Something went wrong {}</div>;
};

export default Error;
