'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function Welcome({ session }) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Welcome to the App! {session.user.name}</h1>
            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Sign Out
            </button>
        </div>
    );
}