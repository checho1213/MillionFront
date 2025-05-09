import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertiesThunk } from "../state/propertySlice";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const PropertyList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchPropertiesThunk());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {/* <div className="grid">
        {items.map((p) => (
          // <div key={p.name} className="card">
          //   <h3>{p.name}</h3>
          //   <p>{p.address}</p>
          //   <p><b>${p.price.toLocaleString()}</b></p>
          // </div>

          <React.Fragment key={p.name}>
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                {p.name}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </React.Fragment>
        ))}
      </div> */}
    </>
  );
};

export default PropertyList;
