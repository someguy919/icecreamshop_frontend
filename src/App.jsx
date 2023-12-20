import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [iceCream, setIceCream] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/flavors');
        setIceCream(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteFlavor = async (flavorToDelete) => {
    try {
      await axios.delete(`http://localhost:8080/api/flavors/${flavorToDelete.id}`);
      const newFlavors = iceCream.filter((flavor) => flavor.id !== flavorToDelete.id);
      setIceCream(newFlavors);
    } catch (error) {
      console.error('Error deleting flavor:', error);
    }
  };


  return (
    <div>
      <h1>Ice Cream Shop</h1>
      <ul>
        {iceCream.map((flavor) => (
          <li key={flavor.id}>
            Flavor: {flavor.name} 
            <button onClick={() => {deleteFlavor(flavor)}}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
