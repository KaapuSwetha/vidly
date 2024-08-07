import { Component } from "react";
import Select from "./select";
import Joi from "joi-browser";
import InputPass from "./inputpass";
import InputMail from "./inputmail";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    loading: false,
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  validate = () => {
    const option = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, option);

    if (!error) return null;
    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;
    this.setState({ loading: true });
    await this.doSubmit();
    this.setState({ loading: false });
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    const val = this.validate();
    return (
      <div>
        <button disabled={this.state.loading || val} className="btn btn-danger">
          {this.state.loading ? "Please wait" : label}
        </button>
      </div>
    );
  }

  renderInput(name, label, type, autofocus) {
    const { data, errors } = this.state;
    return (
      <InputMail
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        autoFocus={autofocus}
      />
    );
  }
  renderInputs(name, label, type, autofocus) {
    const { data, errors } = this.state;
    return (
      <InputPass
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        autoFocus={autofocus}
      />
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        onChange={this.handleChange}
        value={data[name]}
        options={options}
        error={errors[name]}
      />
    );
  }
}

export default Form;
