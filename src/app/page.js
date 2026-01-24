'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Welcome from './welcome/page';

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setTimeout(() => setIsPageLoaded(true), 100);
  }, []);

  const handleOAuthSignIn = (provider) => {
    signIn(provider, { callbackUrl: '/' });
  };

  if(status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">
      <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span>Loading...</span>
    </div>
  }

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
          ${!isPageLoaded ? 'scale-100' : 'scale-100'}
        `}
        style={{
          left: isRegistering ? 'auto' : '0',
          right: isRegistering ? 'auto' : '0',
          borderRadius: isPageLoaded 
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
            ${isRegistering ? 'order-1 animate-slide-in-right' : 'order-2 animate-slide-in-left'}
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