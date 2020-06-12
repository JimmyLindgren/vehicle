import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/icons/Commute";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import VehicleTable from "./vehicleTable";
import "./app.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AppBar>
          <Toolbar>
            <Icon className="icon" />
            <Typography variant="h5" color="inherit" noWrap>
              Keep track of vehicles
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <VehicleTable></VehicleTable>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
