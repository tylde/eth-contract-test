import React from 'react';
import { Button } from 'src/_lib/components/Button';

export function InstallMetamask() {
  return (
    <a href="https://metamask.io/download/" target="_blank" rel="noreferrer noopener">
      <Button width="100%">Install Metamask</Button>
    </a>
  );
}
