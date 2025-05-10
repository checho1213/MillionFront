import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertiesThunk } from "../state/propertySlice";
import TitleComponent from "../../../shared/components/panelPrincipal";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";

const PropertyList = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchPropertiesThunk());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const newProduct = () => {
    alert("Hoka");
  };
  return (
    <>
      <TitleComponent
        titlePrimary="Dashboard Propieadades"
        titleSecondary="Podrá consultar, visualizar y administrar todas las propiedades registradas en el sistema."
        newData={newProduct}
      ></TitleComponent>
      <Card
        title="Formulario de búsqueda"
        subTitle="Diligencie el grupo de parámetros que considere para consultar las propiedades de su interés."
      >
        <div class="flex">
          <div className="flex flex-column m-2">
            <label htmlFor="username">Propietario</label>
            <InputText id="username" aria-describedby="username-help" />
          </div>
          <div className="flex flex-column m-2">
            <label htmlFor="username">Nombre de la propiedad</label>
            <InputText id="username" aria-describedby="username-help" />
          </div>
          <div className="flex flex-column m-2">
            <label htmlFor="username">Direción de la propiedad</label>
            <InputText id="username" aria-describedby="username-help" />
          </div>
          <div className="flex flex-column m-2">
            <label htmlFor="username">Precio</label>
            <InputText id="username" aria-describedby="username-help" />
          </div>
        </div>        
      </Card>
      <br></br>
      <Card        
        subTitle="Resultados de la búsqueda."
      >

      </Card>
    </>

    // <div className="grid">
    //   {items.map((p) => (
    //     <div key={p.name} className="card">
    //       <h3>{p.name}</h3>
    //       <p>{p.address}</p>
    //       <p><b>${p.price.toLocaleString()}</b></p>
    //     </div>

    //   ))}
    // </div>
  );
};

export default PropertyList;
