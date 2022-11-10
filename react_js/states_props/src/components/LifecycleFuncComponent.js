import { useState } from "react";

export const LifecycleFuncComponent = ({ incrementor }) => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(count => (count + incrementor));
    }    

    return (
      <div>
          <h2>LifecycleFuncComponent</h2>
          <p>Counter value : {counter}</p>
          <button
              onClick={increment}
          >Increment</button>
      </div>
    )
}