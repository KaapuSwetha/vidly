import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { register } from "../service/userRegister";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Register extends Form {
  state = {
    data: { firstname: "", lastname: "", email: "", password: "", conform: "" },
    errors: {},
  };
  schema = {
    firstname: Joi.string()
      .min(3)
      .max(55)
      .regex(
        /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
        "First Name Should Not Contain Special Characters or Numbers or Spaces at last"
      )
      .required(),
    lastname: Joi.string()
      .min(3)
      .max(55)
      .regex(
        /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
        "Last Name Should Not Contain Special Characters or Numbers or Spaces at last"
      )
      .forbidden(Joi.ref("firstname"))
      .required(),
    email: Joi.string()
      .email()
      .regex(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        "Email Should Not Contain Special Characters"
      )
      .required(),
    password: Joi.string()
      .min(8)
      .regex(/[A-Z]/, "UpperCase Letter")
      .regex(/[a-z]/, "LowerCase Letter")
      .regex(/[^\w]/, "Special Character")
      .regex(/[0-9]/, "Number")
      .required(),
    conform: Joi.string().required(),
  };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      if (conform.value === password.value) {
        const response = await register("/user/register", {
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          password: data.password,
          confirmPassword: data.conform,
        });
        console.log(response);
        toast.success("✔️ Registration is Successfull ");
        this.props.navigate("/");
      } else {
        toast.info("Please Enter Again");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="container ">
        <div className="register">
          <h1>Register</h1>

          <div className="col-sm-12 col-md-6 col-lg-4 container">
            <form style={{ marginTop: "15px" }} onSubmit={this.handleSubmit}>
              {this.renderInput("firstname", "First Name", "text", true)}
              {this.renderInput("lastname", "Last Name", "text")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInputs("password", "Password", "password")}
              {this.renderInputs("conform", "Confirm-Password", "password")}
              {this.renderButton("Create Account")}
            </form>
            <br />
            <div className="create">
              <p>Already have an account?</p>
              <Link to="/">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
