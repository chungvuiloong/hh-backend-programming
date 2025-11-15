import './App.css';
import React from 'react';
import LocationDisplay from './components/LocationDisplay';
import Form from './components/FriendForm';
import FriendList from './components/FriendsList';
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

function App() {
    // const { userId } = useAuth();
    const { isLoaded, isSignedIn, user } = useUser();
    // const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth();
    // console.log("auth", userId, getToken());
    // console.log(sessionId, isLoaded, isSignedIn);
    // console.log(getToken().then(dt => console.log("token", dt))); // async token fetch
    // console.log("user", user?.firstName, user?.lastName, user?.fullName, user?.primaryEmailAddress?.emailAddress);
    // const { isSignedIn, user, isLoaded } = useUser();
    // console.log("user", user?.id, isSignedIn, isLoaded);


    // console.log(fetch('https://loved-mackerel-84.clerk.accounts.dev/'))

    const addNewUser = useMutation(api.users.addNewUser);
    const checkUser = useQuery(api.users.checkUser, { userID: user?.id || '' });

    React.useEffect(() => {
        const registerUser = async () => {
            if (isLoaded && isSignedIn && user) {
                console.log("Registering user:", user.id, user.fullName);
                await addNewUser({
                    userID: user.id,
                    fullName: user.fullName || '',
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.primaryEmailAddress?.emailAddress || '',
                });
            }
        };
        if (checkUser === null) {
            registerUser();
        }
    }, [isLoaded, isSignedIn, user, addNewUser, checkUser]);

    // React.useEffect(() => {

    return (
        <div className="container mx-auto p-4">
            <header className='py-5 border-b-2 border-slate-700 flex flex-row justify-between'>
                <h1 className="text-4xl font-bold text-center text-gray-800">
                    Friend List
                </h1>
                <div>
                    <SignedOut>
                        <div className='px-8 py-4 flex items-center gap-2 border-2 border-zinc-700 rounded-full'>
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fillRule="evenodd">
                                    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                                </g>
                            </svg>
                        <SignInButton />
                        </div>

                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </header>
            <div className='mt-5 flex flex-col gap-5'>
                <LocationDisplay />
                <div>
                <Form />
                </div>
                <div className='p-4'>
                    {isSignedIn ? <FriendList /> : <p>Sign in to manage your friends list.</p>}
                </div>
            </div>
        </div>
  );
}

export default App;
