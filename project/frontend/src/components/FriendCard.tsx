import React from 'react';
import Icon from './common/Icon';
import FriendFormData from './interface/FriendFormData';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';

const InfoField = ({ icon, label, value }: { icon: string; label: string; value: string | null | undefined }) => (
    <div className='flex items-center gap-3'>
        <Icon path={icon} />
        <div className='flex-1'>
            <p className='text-xs text-zinc-500 mb-0.5'>{label}</p>
            <p className='text-sm text-zinc-700'>{value || "N/A"}</p>
        </div>
    </div>
);

interface FriendCardProps {
    friend: any;
    userId: string | null;
    deleteFriend: (params: { userID: string; id: string }) => void;
    toggleModal: (action?: 'add' | 'edit') => void;
    setFormData: React.Dispatch<React.SetStateAction<FriendFormData>>;
}

const FriendCard = ({ friend, userId, deleteFriend, toggleModal, setFormData }: FriendCardProps) => {
    const updateFriend = useMutation(api.friends.updateFriend);
    return (
        <li className='bg-white border-2 border-zinc-700 rounded-lg p-5 max-w-full md:max-w-[320px]'>
            <div className='mb-5 pb-4 border-b-2 border-zinc-500'>
                <h3 className='text-lg font-medium text-zinc-900 mb-1'>{friend?.fullname || "Unknown"}</h3>
            </div>

            <div className='space-y-3 mb-5'>
                <InfoField
                    icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    label="Email"
                    value={friend?.email}
                />

                <InfoField
                    icon="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    label="Phone"
                    value={friend?.phoneNumber}
                />

                <InfoField
                    icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    label="First Met"
                    value={friend?.firstMeet}
                />

                <InfoField
                    icon="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zm3-10a2 2 0 100-4 2 2 0 000 4zm-2 4h4m-4 2h4"
                    label="Identity"
                    value={friend?.identity}
                />
            </div>

            {friend?.notesAboutFriend && friend.notesAboutFriend !== "N/A" && (
                <div className='mb-5 pt-4 border-t-2 border-zinc-700'>
                    <p className='text-xs text-zinc-500 mb-2'>Notes</p>
                    <p className='text-sm text-zinc-600 leading-relaxed'>{friend.notesAboutFriend}</p>
                </div>
            )}

            <div className='flex gap-3 pt-4 border-t border-zinc-200'>
                <button
                    onClick={async () => {
                        if (!userId) {
                            console.error("User not authenticated");
                            return;
                        }
                        toggleModal("edit");
                        setFormData({
                            id: friend.id,
                            fullName: friend.fullname || '',
                            email: friend.email || '',
                            identity: friend.identity || '',
                            placeOfMeeting: friend.firstMeet || '',
                            phoneNumber: friend.phoneNumber || '',
                            notesAboutFriend: friend.notesAboutFriend || ''
                        });
                    }}
                    className='w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-900 rounded-lg transition-colors'
                >
                    <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                </button>
                <button
                    onClick={async () => {
                        if (!userId) {
                            console.error("User not authenticated");
                            return;
                        }
                        if (window.confirm(`Are you sure you want to delete ${friend?.fullname || 'this friend'}?`)) {
                            deleteFriend({
                                userID: userId,
                                id: friend.id
                            });
                        }
                    }}
                    className='w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors'
                >
                    <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            </div>
        </li>
    );
};

export default FriendCard;