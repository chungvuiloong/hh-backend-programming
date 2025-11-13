const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://friend-list-d047c88faa49.herokuapp.com'
    : 'http://localhost:8080';

export const friendsService = {
    getAllFriends: async (userID: string): Promise<any> => {
        const response = await fetch(`${API_BASE_URL}/convex/listOfFriends/${encodeURIComponent(userID)}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch friends: ${response.status}`);
        }
        return response.json();
    }
}