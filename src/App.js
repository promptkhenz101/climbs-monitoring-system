import { HashRouter as Router } from "react-router-dom";
import Main from "./pages/main";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Main />
      </Router>
    </div>
  );
}

export default App;
