import React from 'react';
import FileUpload from './components/FileUpload';


function App() {
  return (
    <div className="container mt-4">
      <h3 className = "display-3 text-center mb-2">Upload Files
      <i className="fab fa-react"/>
      </h3>
      
      <FileUpload/>
     
    </div>
  );
}

export default App;
