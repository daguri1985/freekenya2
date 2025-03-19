"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Use 'next/router' for Pages Router

export default function Header() {
  const router = useRouter();

  const handleAspirantClick = () => {
    router.push('/aspirant'); // Replace '/aspirant' with the actual path to your aspirant page
  };
  return (
    <header 
      className="relative container mx-auto px-18 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left bg-cover bg-center"
      style={{ backgroundImage: "url('/city.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Empowering Kenyans for a Just and Equitable Society
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-200">
          Established in July 2018, the FreeKenya Movement strives to liberate Kenya from political, social, and economic challenges. Our journey
          began with addressing the VAT on petroleum products and expanded alongside the #FreeBobiWine Movement. We are dedicated to
          fostering transparency, accountability, and citizen participation to create a fair and just society for all Kenyans.
        </p>
        <button className="mt-6 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-300" 
        onClick={handleAspirantClick}>
          Are You an Aspirant? Register Here
        </button>
      </div>

      {/* Right Column: Image */}
      <div className="relative z-10 flex justify-center md:justify-end">
        <Image 
          src="/freekenya1.png" 
          alt="FreeKenya Movement" 
          width={512} 
          height={512} 
          className="rounded-lg shadow-lg w-3/4 sm:w-2/3 md:w-full max-w-xs md:max-w-md"
        />
      </div>
    </header>
  );
}
