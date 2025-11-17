import './App.css';
import React, { useState } from 'react';
import LocationDisplay from './components/LocationDisplay';
import Form from './components/FriendForm';
import FriendList from './components/FriendsList';
import { useUser } from '@clerk/clerk-react';
import Header from './components/layout/Header';
import Button from './components/common/Button';
import FriendFormData from './components/interface/FriendFormData';

function App() {
    const { isSignedIn } = useUser();
    const [ isModalOpened, setIsModalOpened ] = React.useState<boolean>(false);
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

    const toggleModal = React.useCallback((action?: 'add' | 'edit' | undefined) => {
        if (action) setFormAction(action);
        setIsModalOpened(!isModalOpened);
    }, [isModalOpened]);

    return (
        <div className='relative'>        
            {isSignedIn && isModalOpened ? 
                    <Form 
                        formAction={formAction} 
                        setFormAction={setFormAction} 
                        formData={formData} 
                        setFormData={setFormData} 
                        toggleModal={toggleModal}
                        /> 
                    : <></>}
            <div className="container mx-auto p-4">
                <Header />            
                <div className='mt-5 flex flex-col gap-5'>
                    <LocationDisplay />
                    {isSignedIn ? null : "Sign in to add new friends."}
                    <div>
                        <div className='flex flex-row-reverse'>
                            <Button path="M18 9v3m0 0v3m0-3h3m-3 0h-3m-9 4.5c0-1.657 1.343-3 3-3h4c1.657 0 3 1.343 3 3M15 7a4 4 0 11-8 0 4 4 0 018 0z" 
                                onClick={() => toggleModal("add")}>Add Friend
                            </Button>
                        </div>
                    </div>
                    <div className='p-4'>
                        {isSignedIn ? <FriendList toggleModal={toggleModal} /> : ""}
                    </div>
                </div>
            </div>
        </div>
  );
}

export default App;
