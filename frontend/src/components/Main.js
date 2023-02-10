import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Order from './Order';

export default function Main() {
  return (
    <>
      <Header />
      <main className="">
        <div className="mx-auto max-w-7xl">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="h-auto rounded-lg border-4 border-dashed border-gray-200 pb-5" >
              <Order />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
      <Footer />
    </>
  )
}
