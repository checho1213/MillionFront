import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import '../styles/panelPrincipal.css'
const TitleComponent = ({ titlePrimary, titleSecondary, newData }) => {
//   const items = [
//     {
//       label: "Update",
//       icon: "pi pi-refresh",
//     },
//     {
//       label: "Delete",
//       icon: "pi pi-times",
//     },
//     {
//       label: "React Website",
//       icon: "pi pi-external-link",
//       command: () => {
//         window.location.href = "https://reactjs.org/";
//       },
//     },
//     {
//       label: "Upload",
//       icon: "pi pi-upload",
//       command: () => {
//         window.location.hash = "/fileupload";
//       },
//     },
//   ];

  const leftContents = (
    <div style={{backgroundColor:"#f6f6f6;"}}>
      <div>
        <h1
          style={{
            marginBottom: "auto",
            color: "#491b9b",
            marginTop: "auto",
          }}
        >
          {titlePrimary}
        </h1>
      </div>
      <div>
        <h
          style={{
            marginBottom: "auto",
            color: "rgb(79 79 79)",
            marginTop: "auto",
          }}
        >
          {titleSecondary}
        </h>
      </div>
    </div>
  );

  const rightContents = (
    <Button label="Nuevo" onClick={newData} icon="pi pi-check" />
  );

  return <Toolbar style={{backgroundColor:"#f6f6f6;"}} start={leftContents} end={rightContents} />;
};

export default TitleComponent;