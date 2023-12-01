import "./App.css";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

function App() {
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS || "lol";
  console.log("Backend Address:", backendAddress);

  return (
    <>
      <p>this is a test</p>
    </>
  );
}

export default App;
