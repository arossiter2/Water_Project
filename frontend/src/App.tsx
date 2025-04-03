import "./App.css";
import ProjectList from "./ProjectList";
import CategoryFilter from "./CategoryFilter";
import WelcomeBan from "./WelcomeBan";
import { useState } from "react";

function App() {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  
  return (
    <>
      <div className="container mt-4">
        <div className="row bg-primary text-white">
          <WelcomeBan />
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter selectedCategories = {selectedCategories} setSelectedCategories={setSelectedCategories}/>
          </div>
          <div className="col-md-9">
            <ProjectList selectedCategories={selectedCategories}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
