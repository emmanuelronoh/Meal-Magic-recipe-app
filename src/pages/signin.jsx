import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersAction, usersPostAction } from "../redux/slice/users";
import { useEffect } from "react";
import { setLogedInUser } from "../redux/slice/logedInUser";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { v4 as uuidv4 } from 'uuid';

const Signin = () => {
  let Users = useSelector((state) => state.users.users);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let [submitError, setSubmitError] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "", // New state variable for confirm password
    firstName: "",
    lastName: "",
    isAdmin: false,
    favourite: [],
    purchasedDone: [],
    purchased: [],
    id:uuidv4()
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "", // New state variable for confirm password error
    firstName: "",
    lastName: "",
  });

  // State variables for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlechange = (event) => {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSubmitError(false);
    validateInput(name, value);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$/;
    return passwordRegex.test(password);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email:
            value.length > 0 && !/\S+@\S+\.\S+/.test(value)
              ? "Invalid email address"
              : "",
        }));
        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            value.length > 0 && !validatePassword(value)
              ? "Password must contain at least 9 characters including one uppercase letter and one lowercase letter"
              : "",
        }));
        break;
      case "confirmPassword":
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword:
            user.password !== value ? "Passwords do not match" : "",
        }));
        break;
      case "firstName":
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: value.length < 1 ? "First name cannot be empty" : "",
        }));
        break;
      case "lastName":
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: value.length < 1 ? "Last name cannot be empty" : "",
        }));
        break;
      default:
        break;
    }
  };

  const handleclick = (event) => {
    event.preventDefault();
    const existingUser = Users.find((u) => u.email === user.email);
    if (
      user.email.length < 1 ||
      user.firstName.length < 1 ||
      user.lastName.length < 1 ||
      user.password.length < 1 ||
      user.confirmPassword.length < 1 || // Check if confirmPassword is empty
      Object.values(errors).some((error) => error !== "")
    ) {
      setSubmitError("Please correct the errors in the form.");
    } else if (existingUser) {
      setSubmitError("Email Already exists");
    } else {
      dispatch(usersPostAction(user));
      dispatch(setLogedInUser(user));
      setUser({
        email: "",
        password: "",
        confirmPassword: "", // Reset confirmPassword field
        firstName: "",
        lastName: "",
        isAdmin: false,
      });
      navigate("/home");
    }
  };

  useEffect(() => {
    dispatch(usersAction());
  }, [dispatch]);

  return (
    <>
      <section className="text-center text-lg-start gab-5">
        <div className="container py-4">
          <div className="row g-0 align-items-center justify-content-center mt-lg-5">
            <div className="col-lg-6 mb-5 mb-lg-0 ">
              <div className="card cascading-right">
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="text-center d-flex justify-content-center">
                    <div className="d-flex gap-2 align-items-center">
                      <span>
                        <span>Welcome to Meal</span>{" "}
                        <span style={{ color: "#198754" }}>Magic</span>
                      </span>
                      <img
                        src={"../images/chef.svg"}
                        alt="logo"
                        style={{ color: "#1c1c1c", width: "70px" }}
                      />
                    </div>
                  </h2>

                  <h3
                    className="fw-bold mb-5 btngreen"
                    style={{ color: "#198754" }}
                  >
                    Sign up your Account
                  </h3>
                  <form onSubmit={handleclick}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            name="firstName"
                            className={`form-control ${
                              errors.firstName && "is-invalid"
                            }`}
                            placeholder="First name"
                            onChange={handlechange}
                            value={user.firstName}
                          />
                          <div className="invalid-feedback">
                            {errors.firstName}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example2"
                            name="lastName"
                            className={`form-control ${
                              errors.lastName && "is-invalid"
                            }`}
                            placeholder="Last name"
                            onChange={handlechange}
                            value={user.lastName}
                          />
                          <div className="invalid-feedback">
                            {errors.lastName}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className={`form-control ${
                          errors.email && "is-invalid"
                        }`}
                        name="email"
                        placeholder="Email address"
                        onChange={handlechange}
                        value={user.email}
                      />
                      <div className="invalid-feedback">{errors.email}</div>
                    </div>

                    <div className="form-outline position-relative mb-4 position-relative">
                      <input
                        type={showPassword ? "text" : "password"} // Toggle password visibility
                        id="form3Example4"
                        className={`form-control ${
                          errors.password && "is-invalid"
                        }`}
                        name="password"
                        placeholder="Password"
                        onChange={handlechange}
                        value={user.password}
                      />
                      <div
                        className="password-icon position-absolute"
                        style={{ top: "10px", right: "30px" }}
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                      <div className="invalid-feedback">{errors.password}</div>
                    </div>
                    <div className="form-outline position-relative mb-4">
                      <input
                        type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                        id="form3Example5"
                        className={`form-control ${
                          errors.confirmPassword && "is-invalid"
                        }`}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handlechange}
                        value={user.confirmPassword}
                      />
                      <div
                        className="password-icon position-absolute"
                        style={{ top: "10px", right: "30px" }}
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    </div>
                    {submitError && (
                      <p style={{ color: "red" }}>{submitError}</p>
                    )}
                    <button
                      type="submit"
                      className="btn btn-success btn-block mb-4"
                    >
                      Sign up
                    </button>
                    <div>
                      Already have account?{" "}
                      <Link
                        to={"/login"}
                        style={{ textDecoration: "underline", color: "blue" }}
                      >
                        Login now
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-5 mb-5 mb-lg-0 mx-4 d-none d-lg-inline">
              <img src="images/5.jpg" className="w-75" alt="spon-photo" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
