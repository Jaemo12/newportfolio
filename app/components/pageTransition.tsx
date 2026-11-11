'use client';

import React from 'react';

// The old rotate/blur page transition is gone: the page is visible the moment
// it renders. The wrapper stays so layout.tsx and the stray routes keep working.
export const CrazyTransition = ({ children }: { children: React.ReactNode }) => (
  <div className="perspective">
    <div className="page-content">{children}</div>
  </div>
);
