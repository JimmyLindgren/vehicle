import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  table: {
    width: 1200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  grid: {
    margin: " 70px 0 0 0",
  },
});

class VehicleTable extends Component {
  state = {
    interval: null,
    isAutoUpdate: false,
    vehicles: [],
    vehiclesInList: [],
    customerSelected: "",
    customers: [],
    statusSelected: "",
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  getStatus(status) {
    return status === 0 ? (
      <Chip label="Unknown"></Chip>
    ) : (
      <Chip style={{ backgroundColor: green[200] }} label="Connected"></Chip>
    );
  }

  getData() {
    axios
      .get("http://localhost:53300/api/vehicle/")
      .then((response) => {
        this.updateVehiclesAndCustomers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateVehiclesAndCustomers(vehicles) {
    this.setState({ vehicles: vehicles }, () => this.filterVehicles());

    let customers = [];
    vehicles.forEach((vehicle) => {
      var index = customers.findIndex(
        (customer) => customer.name === vehicle.customer.name
      );
      if (index === -1) {
        customers.push(vehicle.customer);
      }
    });

    this.setState({ customers: customers });
  }

  handleAutoUpdateChange(event) {
    if (event.target.checked) {
      let intervalId = setInterval(() => this.getData(), 60000);
      this.setState({ interval: intervalId });
    } else {
      clearInterval(this.state.interval);
    }

    this.setState({ isAutoUpdate: event.target.checked });
  }

  getCustomerMenuItems() {
    return this.state.customers.map((customer) => (
      <MenuItem key={customer.name} value={customer.name}>
        {customer.name}
      </MenuItem>
    ));
  }

  customerFilterChanged(event) {
    this.setState({ customerSelected: event.target.value }, () =>
      this.filterChange()
    );
  }

  statusFilterChanged(event) {
    this.setState({ statusSelected: event.target.value }, () =>
      this.filterChange()
    );
  }

  filterChange() {
    if (
      this.state.customerSelected === "" &&
      this.state.statusSelected === ""
    ) {
      this.getData();
    } else {
      this.filterVehicles();
    }
  }

  filterVehicles() {
    let vehicles = this.state.vehicles;

    vehicles = vehicles.filter((vehicle) => {
      let customerMatch = true;
      if (this.state.customerSelected) {
        customerMatch = vehicle.customer.name === this.state.customerSelected;
      }

      let statusMatch = true;
      if (this.state.statusSelected) {
        statusMatch = vehicle.status === Number(this.state.statusSelected);
      }
      return customerMatch && statusMatch;
    });

    this.setState({
      vehiclesInList: vehicles,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.grid} container direction="column" spacing={5}>
        <Grid item>
          <Grid container alignItems="center" spacing={5}>
            <Grid item>
              <Typography variant="h6" color="inherit">
                Filter
              </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="customer-select-label">Customer</InputLabel>
                <Select
                  labelId="customer-select-label"
                  id="customer-select"
                  value={this.state.customerSelected}
                  onChange={(e) => this.customerFilterChanged(e)}
                >
                  <MenuItem value="">
                    <em>Any</em>
                  </MenuItem>
                  {this.getCustomerMenuItems()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  aria-label="Status"
                  row
                  name="status1"
                  value={this.state.statusSelected}
                  onChange={(e) => this.statusFilterChanged(e)}
                >
                  <FormControlLabel value="" control={<Radio />} label="Any" />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Unknown"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Connected"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle ID</TableCell>
                  <TableCell>Registration number</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.vehiclesInList.map((vehicle) => (
                  <TableRow key={vehicle.vehicleId}>
                    <TableCell component="th" scope="row">
                      {vehicle.vehicleId}
                    </TableCell>
                    <TableCell>{vehicle.registrationNumber}</TableCell>
                    <TableCell>{vehicle.customer.name}</TableCell>
                    <TableCell>{this.getStatus(vehicle.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container justify="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.isAutoUpdate}
                onChange={(e) => this.handleAutoUpdateChange(e)}
                name="autoUpdateCheck"
              />
            }
            label="Get automatic updates"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.getData()}
          >
            Update vehicles
          </Button>
        </Grid>
      </Grid>
    );
  }
}

VehicleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleTable);
