import React, { useState } from "react";
import "./All.css";
import { useLocation } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userVerify } from "../services/Apis";

const Otp = (props) => {
  // let time = props.chk.date.toLocaleString('en-US',{month:'long'})
  // let year = props.chk.date.getFullYear()

  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(0);
  const setOtpHandler = (event) => {
    setOtp(event.target.value);
  };
  const otpVerificationHandler = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("please enter otp");
    } else {
      const data = {
        otp,
        email: location.state,
      };
      const response = await userVerify(data);
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        toast.success(response.data.message);
        //  console.log(response.data.user)
        setTimeout(() => {
          navigate("/dashboard", { state: response.data.user });
        }, 2000);
      } else if(response.status !== 200) {
        toast.error("Invalid OTP");
        setTimeout(() => {
          window.location.reload();
        },1500);
      }
    }
    //verify OTP
  };
  return (
    <>
      <section>
        <div className="form_group">
          <div className="header_form">
            <h1>OTP</h1>
          </div>
          <form>
            <div className="enter_in_form">
              <label htmlFor="otp">OTP verification</label>
              <input
                type="number"
                name="otp"
                onChange={setOtpHandler}
                placeholder="Enter OTP"
              />
            </div>
            <button className="btn" onClick={otpVerificationHandler}>
              Verify OTP/Login
            </button>
            <p className="txt">
              Change Email Id <NavLink to="/">LogIn Page</NavLink>{" "}
            </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Otp;
