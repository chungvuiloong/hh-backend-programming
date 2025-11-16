import './App.css';
import React from 'react';
import LocationDisplay from './components/LocationDisplay';
import Form from './components/FriendForm';
import FriendList from './components/FriendsList';
import { useUser } from '@clerk/clerk-react';
import Header from './components/layout/Header';

function App() {
    const { isSignedIn } = useUser();

    return (
        <div className="container mx-auto p-4">
            <Header />
            <div className='mt-5 flex flex-col gap-5'>
                <LocationDisplay />
                {isSignedIn ? null : "Sign in to add new friends."}
                <div>
                    {isSignedIn ? <Form /> : ""}
                </div>
                <div className='p-4'>
                    {isSignedIn ? <FriendList /> : ""}
                </div>
            </div>
        </div>
  );
}

export default App;
