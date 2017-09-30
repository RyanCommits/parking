import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePickerField from "./DatePickerField";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import "react-datepicker/dist/react-datepicker.css";

class ListingForm extends Component {
  state = { address: '', lat: null, lng: null }

  handleSelect = address => {
    this.setState({ address });

    // Geocode address in order to get to the lat and long.
    // We only want the first element in the array as it is likely the most
    // relevant result.

    // set the state now for lat and long
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(data => this.setState({ lat: data.lat, lng: data.lng }, () => {console.log(this.state.lat, this.state.lng)}))
      .catch(err => console.log(err))
  }

  render() {
    const { onAddressChange, onPriceChange, onSubmit } = this.props;

    const inputProps = {
      value: this.state.address,
      onChange: address => { this.setState({ address })}
    }

    return (
      <div className="container">
        <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect} />
        <form className="col s12">
          <div className="row">
            <div className="input-field col s8">
              <input
                onChange={event => onAddressChange(event.target.value)}
                id="address"
                type="text"
                className="validate"
              />
              <label htmlFor="address">Address</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s8">
              <input
                onChange={event => onPriceChange(event.target.value)}
                id="price"
                type="number"
                className="validate"
              />
              <label htmlFor="price">Price</label>
            </div>
          </div>

          <div className="row">
            Start time: <DatePickerField />
            End time: <DatePickerField />
          </div>

          <Link
            to="/"
            onClick={onSubmit}
            className="waves-effect waves-light btn"
          >
            Submit
          </Link>
        </form>
      </div>
    );
  }
}

export default ListingForm;
