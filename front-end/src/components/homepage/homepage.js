import React, { useState } from "react";
import axios from "axios";
import "./homepage.css";
import { useHistory } from "react-router-dom";

const Homepage = ({ user, setLoginUser }) => {
  const [visible, setVisible] = useState("hidden");
  const [details, setDetails] = useState({
    userEmail: user.email,
    age: "",
    gender: "",
    mobile: "",
    dob: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };
  const updateDetails = () => {
    const { userEmail, age, gender, mobile, dob } = details;
    if (userEmail && age && gender && mobile && dob) {
      axios.post("http://localhost:9002/updateProfile", details).then((res) => {
        alert(res.data.message);
      });
    } else {
      alert("invalid input");
    }
  };
  return (
    <div className="homepage">
      <h1>Welcome</h1>
      <div className="updateProfile">
        <label>
          Age
          <input
            type="text"
            name="age"
            value={details.age}
            placeholder="Age"
            onChange={handleChange}
          />
        </label>
        <label>
          Gender
          <input
            type="text"
            name="gender"
            value={details.gender}
            placeholder="Gender"
            onChange={handleChange}
          />
        </label>
        <label>
          Mobile
          <input
            type="number"
            name="mobile"
            value={details.mobile}
            placeholder="Mobile"
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth
          <input
            type="date"
            name="dob"
            value={details.dob}
            placeholder="Date of Birth"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="btns">
        <div className="button" onClick={updateDetails}>
          Update Profile
        </div>
        {/* <div>{!visible ? showDetails() : ""}</div> */}
        <div className="button" onClick={() => setLoginUser({})}>
          Logout
        </div>
        <div className="button" onClick={() => setVisible("visible")}>
          Show Details
        </div>
      </div>
      <div style={{ visibility: visible }}>
        <h2>User Details:</h2>
        <div>
          <table>
            <tr>
              <td>
                <b>Name:</b>
              </td>
              <td>{user.name}</td>
              <td>
                <b>Email:</b>
              </td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>
                <b>Age:</b>
              </td>
              <td>{details.age}</td>
              <td>
                <b>Date of Birth:</b>
              </td>
              <td>{details.dob}</td>
            </tr>
            <tr>
              <td>
                <b>Gender:</b>
              </td>
              <td>{details.gender}</td>
              <td>
                <b>Mobile:</b>
              </td>
              <td>{details.mobile}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
