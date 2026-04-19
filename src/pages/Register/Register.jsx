import React, { use, useState } from "react";
import registerImg from "./../../assets/register-img.png";
import logo from "./../../assets/react.svg";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        return fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    const fullName = `${firstName} ${lastName}`.trim();

    createUser(email, password)
      .then((result) => {
        return updateUserProfile(fullName, photoURL).then(() => result);
      })
      .then((result) => {
        const newUser = {
          name: fullName,
          email: result.user.email,
          image: photoURL,
        };
        return fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="bg-secondary w-full lg:w-1/2 flex justify-center items-center p-4">
        <img
          src={registerImg}
          alt=""
          className="max-h-[60vh] lg:max-h-[80%] object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
        <div className="text-center space-y-3 w-full max-w-md">
          <div className="flex justify-center items-center">
            <img src={logo} alt="" className="max-h-[40vh] lg:max-h-[60%] object-contain" />
          </div>
          <h4 className="text-xl">Welcome to FreelancerHub</h4>
          <h2 className="text-4xl font-bold">Register Account</h2>

          <div>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset space-y-2 text-left">
                {/* First & Last Name */}
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="label">First Name</label>
                    <input type="text" name="firstName" className="input w-full" placeholder="First Name" />
                  </div>
                  <div className="w-1/2">
                    <label className="label">Last Name</label>
                    <input type="text" name="lastName" className="input w-full" placeholder="Last Name" />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="label">Image URL</label>
                  <input type="text" name="photoURL" className="input w-full" placeholder="Profile Image URL" />
                </div>

                {/* Email */}
                <div>
                  <label className="label">Email</label>
                  <input type="email" name="email" className="input w-full" placeholder="Email" />
                </div>

                {/* Password */}
                <div>
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input w-full pr-10"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="label">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="input w-full pr-10"
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="text-sm">
                    I agree to the{" "}
                    <a className="link link-primary">Terms & Conditions</a>
                  </span>
                </div>

                <button className="btn btn-neutral mt-4 w-full">Create Account</button>
              </fieldset>
            </form>
          </div>

          <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>

          <div className="mt-2">
            <p>Already have an account? <Link to="/login"><span className="font-bold underline">Login Now</span></Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
