import './App.css';
import LocationDisplay from './components/LocationDisplay';
import Form from './components/FriendForm';

function App() {   

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Friend List
        </h1>
        <LocationDisplay />
        <div>
          <Form />
        </div>
    </div>
  );
}

export default App;
