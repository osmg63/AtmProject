import { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import MyNavbar from "../component/MyNavbar";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const GET_URL = "https://localhost:44355/api/Atm/GetAll";

function ViewMap() {
  const [rows, setRows] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_KEY,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GET_URL);
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <MyNavbar />
      <div style={{ 
        flex: 1, 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
      }}>
        {isLoaded ? (
          <div style={{ 
            width: "90%",  
            height: "80%", 
          }}>
            <GoogleMap
              center={{ lat: 38.734802, lng:  35.467987 }}
              zoom={6}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {rows.map(({ id, name, adress, cityName, districtName, latitude, longitude }) => (
                <MarkerF
                  key={id}
                  position={{ lat: latitude, lng: longitude }}
                  onClick={() => handleActiveMarker(id)}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <Card sx={{ minWidth: 275 }}>
                          <CardContent>
                          
                            <Typography variant="h5" component="div">
                              {name}
                            </Typography>
                            <Typography variant="h5" component="div" padding={1}>
                            
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                              {cityName}, {districtName}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Link to={`/AtmDetail/${id}`} style={{ textDecoration: 'none' }}>
                              <AdsClickIcon></AdsClickIcon>
                            </Link>
                          </CardActions>
                        </Card>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ViewMap;
