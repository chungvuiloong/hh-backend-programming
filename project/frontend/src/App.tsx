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
        <div>
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Friend List
        </h1>
            <div>
                <h1>Convex + Google Auth</h1>
                {/* <p>Signed in as {user?.fullName}</p>
                <button onClick={callApi}>Call API</button> */}
          <header>
    {/* <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn> */}
              </header>
            </div>
        <LocationDisplay />
        <div>
          <Form />
        </div>
        <div>
            <FriendList />

        </div>
    </div>
  );
}

export default App;
