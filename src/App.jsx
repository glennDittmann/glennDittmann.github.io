import { useState } from "react"
import Clicker from "./components/Clicker"


export default function App({ children }) {
  const [hasClicker, setHasClicker] = useState(true)
  const [count, setCount] = useState(0)

  const toggleClicker = () => {
    setHasClicker(!hasClicker)
  }

  const increment = () => {
    setCount(count + 1)
  }

  return <>
          { children }
          <div>Total count: { count }</div>
          <button onClick={toggleClicker}>
            {hasClicker ? "Hide" : "Show"} Clicker
          </button>
          {hasClicker && <Clicker increment={increment} keyName="countA" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` }/>}
          {hasClicker && <Clicker increment={increment} keyName="countB" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` }/>}
          {hasClicker && <Clicker increment={increment} keyName="countC" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` }/>}
          {hasClicker && <Clicker increment={increment} keyName="countD" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` }/>}
        </>
}