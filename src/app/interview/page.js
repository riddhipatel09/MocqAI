import React, { Suspense } from 'react';
import InterviewClient from '@/components/InterviewClient';

export default function InterviewPage() {
  return (
    <Suspense fallback={<div>Loading interview...</div>}>
      <InterviewClient />
    </Suspense>
  );
}
