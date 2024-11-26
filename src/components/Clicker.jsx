import { useEffect, useState } from "react";

export default function Clicker({ increment, keyName, color }) {
  console.log('Component mounted');
  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0));

  useEffect(() => {
    return () => {
      console.log('Component unmounted');
      localStorage.removeItem(keyName);
    }
  }, []);

  useEffect(() => {
    console.log('Count changed:', count);
    localStorage.setItem(keyName, count);
  }, [count]);

  const increaseCount = () => {
    setCount(count + 1);
    increment();
  }
  
  return <div>
      <h1 style={{color}}>Count: { count }</h1>
      <button onClick={increaseCount}>+1</button>
    </div>
}