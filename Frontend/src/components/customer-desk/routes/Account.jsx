import React from 'react';
import { motion } from 'framer-motion';
import EncryptButton from './Encrypt';
import EncryptButton2 from './Encrypt2';

function Account() {
  return (
    <div className="flex flex-col items-center justify-start m-11 p-11 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-10">Account Settings</h1>

      <div className='flex flex-col gap-4'>
        {/* Logout Button */}
        <EncryptButton />

        {/* Deactivate Account Button */}
        <EncryptButton2 />
      </div>
    </div>
  );
}

export default Account;
