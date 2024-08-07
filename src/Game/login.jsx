import React from "react";
import Form from "./form";
import { backEndCallObj, getCurrentUser } from "../service/userRegister";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .email()
      .regex(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        "Email Should Not Contain Special Characters"
      )
      .required(),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/[A-Z]/, "UpperCase Letter")
      .regex(/[a-z]/, "LowerCase Letter")
      .regex(/[^\w]/, "Special Character")
      .regex(/[0-9]/, "Number"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;

      await backEndCallObj("/user/login", {
        email: data.email,
        password: data.password,
      });

      // toast.success("Login Successfully ");
      toast.success("✔️ Login is successful!");
      this.props.navigate("/start");
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
      <div className="login container">
        <div className="login">
          <h1 style={{ fontSize: "38px" }}>login</h1>
          <div className="col-sm-12 col-md-6 col-lg-4 container">
            <form style={{ marginTop: "25px" }} onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email", "email", true)}
              {this.renderInputs("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
            <br />
            <div className="create">
              Don't have an account?
              <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
{
  /* <div className="modal-dialog modal-dialog-centered">
  <div className="modal-content">
    <div className="modal-header btn-alignment">
      <h5 className="modal-title">Attachment Details</h5>
      <button
        type="button"
        className="btn-close"
        // data-dismiss="modal"
        aria-label="Close"
        onClick={hideAttachmentModal}
      ></button>
    </div>
    <div className="modal-body">
      <div onClick={submit}>
        <form>
          <label htmlFor="message" style={{ marginBottom: "10px" }}>
            Message:
          </label>
          <input
            type="text"
            className={`form-control ${
              error && error.details && error.details[0].path[0] === "messaged"
                ? "input-error"
                : ""
            }`}
            placeholder="Enter message"
            value={messaged}
            onChange={(e) => seMessaged(e.target.value)}
          />{" "}
          {error && error.messaged && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginBottom: "10px",
              }}
            >
              {error.messaged}
            </div>
          )}
          <label htmlFor="message" style={{ marginBottom: "10px" }}>
            Amount:
          </label>
          <input
            type="text"
            className={`form-control ${
              error && error.details && error.details[0].path[0] === "amount"
                ? "input-error"
                : ""
            }`}
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && error.amount && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginBottom: "20px",
              }}
            >
              {error.amount}
            </div>
          )}{" "}
        </form>
        <div>
          <div>
            <h3
              style={{
                color:
                  selectedValue === selectedFriend.user_to_name
                    ? "red"
                    : "green",
              }}
            >
              {selectedValue}
            </h3>

            <div
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <div>
                <div
                  className="d-flex flex-row mb-2"
                  style={{
                    width: "450px",
                    gap: "30px",
                    textAlign: "center",
                  }}
                >
                  <div
                    value={profile.username}
                    className="card"
                    style={{
                      width: "225px",
                      cursor: "pointer",
                      color: "green",
                      borderColor: "green",
                    }}
                  >
                    {/* {showSuccess && (
                    <span>&#10004;</span>
                  )} */
}
//                     You paid split equally <br />({`+${amount / 2}`})
//                   </div>

//                   <div
//                     value={profile.username}
//                     className="card"
//                     style={{
//                       width: "225px",
//                       cursor: "pointer",
//                       color: "green",
//                       borderColor: "green",
//                     }}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleChange(profile.username, "owed");
//                     }}
//                   >
//                     You are owed the full amount ({`+${amount / 1}`})
//                   </div>
//                 </div>
//                 <div
//                   className="d-flex flex-row mb-2"
//                   style={{
//                     width: "450px",
//                     gap: "30px",
//                     textAlign: "center",
//                   }}
//                 >
//                   {" "}
//                   <div
//                     className="card"
//                     style={{
//                       cursor: "pointer",
//                       color: "red",
//                       width: "225px",
//                       borderColor: "red",
//                     }}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleChange(
//                         profile.username === selectedFriend?.user_from_name
//                           ? selectedFriend?.user_to_name
//                           : selectedFriend?.user_from_name,
//                         "split"
//                       );
//                     }}
//                     value={`${
//                       profile.username === selectedFriend?.user_from_name
//                         ? selectedFriend?.user_to_name
//                         : selectedFriend?.user_from_name
//                     }

//               `}
//                   >
//                     {`${
//                       profile.username === selectedFriend?.user_from_name
//                         ? selectedFriend?.user_to_name
//                         : selectedFriend?.user_from_name
//                     } paid split equally`}{" "}
//                     ({`+${amount / 2}`})
//                   </div>
//                   <div
//                     className="card"
//                     style={{
//                       width: "150px",
//                       height: "50px",
//                     }}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleChange(
//                         profile.username === selectedFriend?.user_from_name
//                           ? selectedFriend?.user_to_name
//                           : selectedFriend?.user_from_name,
//                         "owed"
//                       );
//                     }}
//                   >
//                     {`${
//                       profile.username === selectedFriend?.user_from_name
//                         ? selectedFriend?.user_to_name
//                         : selectedFriend?.user_from_name
//                     } is owed the full amount`}{" "}
//                     ({`-${amount}`})
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {console.log(messaged, "messaged")}
//             {console.log(amount, "amount")}
//             {console.log(selectedValue, "selected")}
//             <button
//               type="submit"
//               style={{
//                 borderRadius: "10px",
//                 width: "90px",
//               }}
//               onClick={submit}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>; */}
