////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   x Fill in the shipping fields with the values from billing
//   x Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {
  state = {
    billingName: "Jordan Hudgens",
    billingState: "TX",
    shippingName: "",
    shippingState: "",
    duplicateBilling: false
  };

  handleSubmit(e) {
    console.log(serializeForm(e.target, { hash: true }));
  }

  componentWillMount() {
    const formState = localStorage.formState;

    if (formState) {
      this.setState(JSON.parse(formState));
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      localStorage.formState = JSON.stringify(this.state);
    })
  }

  render() {
    const {
      billingName,
      billingState,
      duplicateBilling,
      shippingName,
      shippingState
    } = this.state;

    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name: <input
                  type="text"
                  defaultValue={billingName}
                  onChange={event =>
                    this.setState({
                      billingName: event.target.value
                    })}
                />
              </label>
            </p>
            <p>
              <label>
                Billing State: <input
                  type="text"
                  size="2"
                  defaultValue={billingState}
                  onChange={event =>
                    this.setState({
                      billingState: event.target.value
                    })}
                />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input
                type="checkbox"
                defaultChecked={duplicateBilling}
                onChange={() => this.setState({ duplicateBilling: !duplicateBilling, shippingName: billingName, shippingState: billingState })}
              /> Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name: <input
                  type="text"
                  value={!duplicateBilling ? shippingName : billingName }
                  onChange={() => this.setState({ shippingName: event.target.value })}
                  readOnly={duplicateBilling}
                />
              </label>
            </p>
            <p>
              <label>
                Shipping State: <input
                  type="text"
                  value={!duplicateBilling ? shippingState : billingState }
                  onChange={() => this.setState({ shippingState: event.target.value })}
                  readOnly={duplicateBilling}
                />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
