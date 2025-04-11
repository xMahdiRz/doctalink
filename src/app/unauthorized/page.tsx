import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import AuthButton from '@/components/header-auth';

export default async function UnauthorizedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <div className="flex-1 w-full flex flex-col gap-12 items-center justify-center">
      <div className="w-full">
        <AuthButton />
      </div>
      <div className="flex flex-col items-center gap-4 max-w-lg text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Access Denied
        </h1>
        <p className="text-gray-700">
          You don't have permission to access this resource.
        </p>
        {user ? (
          <div className="text-sm">
            <p>Logged in as: {user.email}</p>
            <p>Role: {user.user_metadata?.role || 'Unknown'}</p>
          </div>
        ) : (
          <p className="text-sm">You are not currently logged in.</p>
        )}
        <div className="flex gap-4 mt-4">
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/"
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
} 