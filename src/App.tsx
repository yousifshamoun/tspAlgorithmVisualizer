import React from 'react';
import Aside from './components/Aside';
import Map from './components/Map';
function App() {
    return (
        <div className="flex">
            <div className="w-5/16">
                <Aside />
            </div>
            <div>
                <Map />
            </div>
        </div>
    );
}

export default App;
