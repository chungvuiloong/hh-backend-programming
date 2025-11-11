import './App.css';
import LocationDisplay from './components/LocationDisplay';
import Form from './components/FriendForm';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Friend List
        </h1>
            <div>
                <h1>Convex + Google Auth</h1>
            <header>
     <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
                </header>
            </div>
        <LocationDisplay />
        <div>
          <Form />
        </div>
    </div>
  );
}

export default App;
