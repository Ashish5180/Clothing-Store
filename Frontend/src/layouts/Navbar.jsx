'use client'

import { Fragment, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, Popover, PopoverGroup, PopoverButton } from '@headlessui/react';
import { Bars3Icon, UserIcon, ShoppingBagIcon, XMarkIcon,BuildingStorefrontIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; // Import Link from React Router

const navigation = {
  pages: [
    { name: 'Store', href: '/store' }, // Adjust href for React Router paths
    { name: 'About Us', href: '/about' }, // Adjust href for React Router paths
    { name: 'Contact Us', href: '/contact' }, // Adjust href for React Router paths
  ],
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMobileMenu = () => setOpen(false);
  return (
    <div className="bg-[#F5F5F5]">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link 
                   to={page.href} 
                   className="-m-2 block p-2 font-medium text-gray-900"
                   onClick={closeMobileMenu}
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link to="/signin" className="-m-2 block p-2 font-medium text-gray-900"
                onClick={closeMobileMenu}>
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link to="/signup" className="-m-2 block p-2 font-medium text-gray-900"
                onClick={closeMobileMenu}>
                  Create account
                </Link>
              </div>
              

                {/* Cart */}
                
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white ">
        <nav aria-label="Top" className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt="Logo"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </Link>
              </div>

              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link key={page.name} to={page.href} className="flex items-center text-lg font-medium text-gray-700 hover:text-gray-800">
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex gap-x-3 items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link to="/signin" className="text-lg font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </Link>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <Link to="/signup" className="text-lg font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </Link>
                </div>

                <div className="flex lg:ml-6 md:hidden">
                  <Link to="/store" className="p-2 text-gray-700 hover:text-gray-500">
                    <span className="sr-only">Store</span>
                    <BuildingStorefrontIcon aria-hidden="true" className="h-6 w-6" />
                  </Link>
                </div>

                <div className="flex lg:ml-6 md:hidden">
                  <Link to="/about" className="p-2 text-gray-700 hover:text-gray-500">
                    <span className="sr-only">Profile</span>
                    <InformationCircleIcon aria-hidden="true" className="h-6 w-6" />
                  </Link>
                </div>



                {/* Profile Icon */}
                <div className="flex lg:ml-6">
                  <Link to="/dashboard" className="p-2 text-gray-700 hover:text-gray-500">
                    <span className="sr-only">Profile</span>
                    <UserIcon aria-hidden="true" className="h-6 w-6" />
                  </Link>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-700 group-hover:text-gray-500"
                    />
                    
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
