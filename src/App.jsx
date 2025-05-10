import React from "react";
import PropertyList from "./ui/properties/components/PropertyList";
import { PrimeReactProvider } from "primereact/api";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => (
  <PrimeReactProvider>
    <div className="container">
      <PropertyList />
    </div>
  </PrimeReactProvider>
);

export default App;
