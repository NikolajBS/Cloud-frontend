import "./App.css";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

function App() {
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
  const fetchMenu = async () => {
    return await axios
      .get(`${backendAddress}/menu`)
      .then((response) => response.data);
  };
  const { data, error, isLoading } = useQuery("menu", fetchMenu);

  const orderMutation = useMutation((order) =>
    axios.post(`${backendAddress}/order`, order)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const handlePlaceOrder = (item) => {
    orderMutation.mutate(item);
  };

  return (
    <>
      <h1>Menu</h1>
      {data.map((food) => (
        <li>
          {food.name} - {food.price}
          <button onClick={() => handlePlaceOrder(food)}>Add to cart</button>
        </li>
      ))}
    </>
  );
}

export default App;
