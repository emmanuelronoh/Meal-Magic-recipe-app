import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usersAction } from "../redux/slice/users";
import { setLogedInUser } from "../redux/slice/logedInUser";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const Users = useSelector((state) => state.users.users);
  let [submitError, setSubmitError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(usersAction());
  }, [dispatch]);

  const handlechange = (event) => {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSubmitError(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleclick = (event) => {
    event.preventDefault();
    if (!user.email || !user.password) {
      setSubmitError("Please fill in all fields.");
      return;
    }

    const existingUser = Users.find((u) => u.email === user.email);
    if (existingUser && user.password === existingUser.password) {
      console.log("Logged in");
      dispatch(setLogedInUser(existingUser));
      navigate("/home");
    } else {
      setSubmitError("Invalid Email or Password");
    }
  };

  return (
    <section className="text-center text-lg-start">
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card cascading-right">
              <div className="card-body p-5 shadow-5 text-center ">
                <h2 className="text-center d-flex justify-content-center">
                  <div className="d-flex gap-2 align-items-center ">
                    <span>
                      <span>Welcome to Meal</span>{" "}
                      <span style={{ color: "#198754" }}>Magic</span>
                    </span>
                    <img
                      className="mb-4 mb-sm-0"
                      src={"../images/chef.svg"}
                      alt="logo"
                      style={{
                        color: "#1c1c1c",
                        width: "70px",
                      }}
                    />
                  </div>
                </h2>
                <h2 className="fw-bold mb-5 btngreen">Login now</h2>
                <form onSubmit={handleclick}>
                  <div className="form-outline mb-4 text-start">
                    <label className="form-label" htmlFor="form3Example3">
                      Email address :
                    </label>
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      name="email"
                      placeholder="Email address"
                      onChange={handlechange}
                      value={user.email}
                    />
                  </div>
                  <div className="form-outline mb-4 text-start position-relative">
                    <label className="form-label" htmlFor="form3Example4">
                      Password :
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="form3Example4"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={handlechange}
                      value={user.password}
                    />
                    <button
                      className="password-icon position-absolute"
                      style={{ top: "42px", right: "30px" }}
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {submitError && <p style={{ color: "red" }}>{submitError}</p>}
                  <button
                    type="submit"
                    className="btn btn-success btn-block mb-4"
                  >
                    Log In
                  </button>
                  <div>
                    Don't have account?
                    <Link
                      className="mx-1"
                      to={"/signin"}
                      style={{ textDecoration: "underline", color: "blue" }}
                    >
                      Register now
                    </Link>
                  </div>{" "}
                </form>
              </div>
            </div>
          </div>

          <div className="d-none mx-5 d-lg-block col-lg-5 mb-5 mb-lg-0 ">
            <img
              src="images/3.jpg"
              style={{ width: "100%", height: "40rem" }}
              alt="login-photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
