import './App.css';
import React, { useState } from 'react';
import LocationDisplay from './components/LocationDisplay';
import Form from './components/FriendForm';
import FriendList from './components/FriendsList';
import { useUser } from '@clerk/clerk-react';
import Header from './components/layout/Header';

interface FriendFormData {
    id: string;
    fullName: string;
    email?: string;
    identity?: string;
    placeOfMeeting?: string;
    phoneNumber?: string;
    notesAboutFriend?: string;
}

function App() {
    const { isSignedIn } = useUser();
    const [ formAction, setFormAction ] = React.useState<'add' | 'edit'>('add');
    const [formData, setFormData] = useState<FriendFormData>({
        id: '',
        fullName: '',
        email: '',
        identity: '',
        placeOfMeeting: "",
        phoneNumber: '',
        notesAboutFriend: ''
    });

    return (
        <div className="container mx-auto p-4">
            <Header />
            <div className='mt-5 flex flex-col gap-5'>
                <LocationDisplay />
                {isSignedIn ? null : "Sign in to add new friends."}
                <div>
                    
                    {isSignedIn ? 
                        <Form 
                            formAction={formAction} 
                            setFormAction={setFormAction} 
                            formData={formData} 
                            setFormData={setFormData} /> 
                        : ""
                    }
                </div>
                <div className='p-4'>
                    {isSignedIn ? <FriendList /> : ""}
                </div>
            </div>
        </div>
  );
}

export default App;
