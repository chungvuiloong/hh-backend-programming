import React, { useState } from 'react';
import { locationService } from '../services/locationService';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import Button from './common/Button';
import FormInput from './common/FormInput';

import FriendFormData from './interface/FriendFormData';        

interface FriendFormProps {
    toggleModal: (action?: 'add' | 'edit') => void;
    formData: FriendFormData;
    setFormData: React.Dispatch<React.SetStateAction<FriendFormData>>;
    formAction: 'add' | 'edit';
    setFormAction: React.Dispatch<React.SetStateAction<'add' | 'edit'>>;
}

const FriendForm: React.FC<FriendFormProps> = ({ toggleModal, formData, setFormData, formAction, setFormAction }) => {
    const { userId } = useAuth();
    const addFriend = useMutation(api.users.addFriendToUser);
    const [city, setCity] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCityAndCountry = async () => {
        try {
            const city = await locationService.getCity();
            const country = await locationService.getCountry();

            setCity(city);
            setCountry(country);
            if (!formData.placeOfMeeting) {
                setFormData((prev: FriendFormData) => ({
                    ...prev,
                    placeOfMeeting: `${city}, ${country}`.trim()
                }));
            }
        } catch (err) {
            console.error('Failed to get location:', err);
        }
    };

    React.useEffect(() => {
        getCityAndCountry();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormData((prev: FriendFormData) => ({
            ...prev,
            [name]: value
        }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!userId) {
            setError("User not authenticated");
            return;
        }

        setIsSubmitting(true);

        try {
            // This sends data to the Convex backend
            // await addFriend({
            //     userID: userId,
            //     friend: {
            //         id: formAction === 'edit' ? formData.id : crypto.randomUUID(),
            //         fullname: formData.fullName,
            //         firstMeet: formData.placeOfMeeting || '',
            //         identity: formData.identity,
            //         email: formData.email,
            //         phoneNumber: formData.phoneNumber,
            //         notesAboutFriend: formData.notesAboutFriend
            //     }
            // });

            // This sends data to the Java backend
            const response = await fetch(`http://localhost:8080/convex/friend/${userId}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: formAction === 'edit' ? formData.id : crypto.randomUUID(),
                    fullname: formData.fullName + "Java",
                    firstMeet: formData.placeOfMeeting || '',
                    identity: formData.identity,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    notesAboutFriend: formData.notesAboutFriend
                }),
            }); 
            const result = await response.json();
            console.log('java', result);

            setFormData({
                id: '',
                fullName: '',
                email: '',
                identity: '',
                placeOfMeeting: `${city}, ${country}`.trim(),
                phoneNumber: '',
                notesAboutFriend: ''
            });

            toggleModal();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save friend');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            id: '',
            fullName: '',
            email: '',
            identity: '',
            placeOfMeeting: `${city}, ${country}`.trim(),
            phoneNumber: '',
            notesAboutFriend: ''
        });
        setFormAction('add');
        toggleModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {formAction === 'edit' ? 'Edit Friend' : 'Add New Friend'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="Enter full name"
                        />
                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                        />
                        <FormInput
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                        />
                        <FormInput
                            label="Identity"
                            name="identity"
                            value={formData.identity}
                            onChange={handleChange}
                            placeholder="How do you know them?"
                        />
                        <FormInput
                            label="Place of Meeting"
                            name="placeOfMeeting"
                            value={formData.placeOfMeeting}
                            onChange={handleChange}
                            placeholder="Where did you meet?"
                        />
                        <FormInput
                            label="Notes"
                            name="notesAboutFriend"
                            value={formData.notesAboutFriend}
                            onChange={handleChange}
                            placeholder="Any notes about this friend"
                        />

                        {/* Footer */}
                        <div className="flex flex-row gap-3 pt-4 border-t border-gray-200 mt-4">
                            <Button
                                type="submit"
                                className="flex-1"
                                loading={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : (formAction === 'edit' ? 'Update' : 'Add Friend')}
                            </Button>
                            <Button
                                type="reset"
                                className="flex-1"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(FriendForm);
