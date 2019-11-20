import React from "react";
import "./styles/styles.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Pro Tip: Using the resolveData prop - Any time the data prop value
          changes (using a === comparison), the table will update, but sometimes
          you need to materialize, alter, or shape this data before it enters
          the table. To do this, you can use the resolveData prop! It receives
          the data prop as the only parameter and returns the resolved data.
        </p>
      </header>
    </div>
  );
}

export default App;
