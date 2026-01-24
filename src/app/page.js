'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Welcome from './welcome/page';

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleOAuthSignIn = (provider) => {
    signIn(provider, { callbackUrl: '/' });
  };

  if(session) {
    return <Welcome session={session}></Welcome>
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      
      {/* PURPLE BLOB */}
      <div
        className={`
          absolute inset-y-0 w-full h-1/3 md:w-1/2 md:h-full bg-[#6A0DAD] transition-all duration-1000 ease-out
          ${isRegistering 
            ? 'top-0 md:translate-x-full' 
            : 'bottom-0 translate-x-0'
          }
          ${!isLoaded ? 'scale-100' : 'scale-100'}
        `}
        style={{
          left: isRegistering ? 'auto' : '0',
          right: isRegistering ? 'auto' : '0',
          borderRadius: isLoaded 
            ? (isRegistering ? '20rem 0 0 20rem' : '0 20rem 20rem 0')
            : (isRegistering ? '15rem 0 0 15rem' : '0 15rem 15rem 0')
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 min-h-screen items-center text-center md:text-left">
        
        {/* TEXT PANEL */}
        <div
          className={`p-8 md:p-10 flex flex-col justify-center transition-all duration-700
            ${isRegistering ? 'md:order-2' : 'md:order-1'}
          `}
        >
          <h1 className="text-4xl font-bold mb-4 text-white">
            {isRegistering 
              ? "Welcome to the beginning of your journey!" 
              : "Welcome back!"}
          </h1>
          <p className="mb-6 text-white/90">
            {isRegistering
              ? "Let's get you started by creating your account"
              : "Let's continue that journey you started."}
          </p>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className={`
              ${isRegistering ? "self-center md:self-start" : "self-center md:self-start"}
              w-fit px-8 py-3 border border-white rounded-full 
              text-sm text-white font-medium 
              hover:bg-white hover:text-[#6A0DAD] transition
            `}
          >
            {isRegistering ? "Go to Sign In" : "Go to Create Account"}
          </button>
        </div>

        {/* FORM PANEL*/}
        <div
          className={`p-8 md:p-10 flex flex-col justify-center transition-all duration-300
            ${isRegistering ? 'order-1' : 'order-2'}
          `}
        >

          <form className="w-full max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 items-center justify-center flex">
              {isRegistering ? "Create Account" : "Sign In"}
            </h2>

            {/* LOGIN OPTIONS */}
            <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">{isRegistering ? "Create with" : "Or continue with" }</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <SocialButton icon="G" label="Google" onClick={()=> handleOAuthSignIn('google')}/>
                  <SocialButton icon="f" label="Facebook" onClick={()=> handleOAuthSignIn('facebook')}/>
                </div>
            </div>
            {isRegistering && <Input placeholder="Name" />}
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            {isRegistering && <Input placeholder="Confirm Password" />}

            <button
              type="submit"
              className="w-full bg-[#6A0DAD] text-white py-3 rounded-full font-medium hover:bg-[#5a0c9d] transition"
            >
              {isRegistering ? "Create" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// INPUT COMPONENT
function Input({ placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:border-[#6A0DAD] focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]/20 transition"
    />
  );
}

// SOCIAL BUTTON
function SocialButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-full hover:border-[#6A0DAD] hover:bg-[#6A0DAD]/5 transition"
    >
      <span className="text-lg font-bold text-gray-700">{icon}</span>
    </button>
  );
}