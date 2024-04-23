import React, { useState } from "react";
import Popup from "reactjs-popup";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from 'axios';
import "reactjs-popup/dist/index.css";
import "./Popup.css";

const postcreate = (drugData) => {
  const postHeader = { "Access-Control-Allow-Origin": "*" };
  console.log("this will delete last data");
  try {
    axios
      .post(
        "http://localhost:8000/create",
        drugData,
        postHeader
      )
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        // console.log(error.response.data);
        // alert(error.response.data.message);
        console.log(error);
      });
  } catch (error) {
    alert(error.response.data);
  }
  console.log("post complete");
};

const AddMedicine = (props) => {
  let [dname, udname] = useState("");
  let [fname, ufname] = useState("");
  let [mname, umname] = useState("");
  let [expiry, uexpiry] = useState(dayjs(Date.now()));
  return (
    <Popup
      trigger={<button>Add New</button>}
      modal
      nested
      position="right center"
    >
      {(close) => (
        <div className="popupAddMedicine">
          <h1> Add New Medicine to Database</h1>
          <input
            placeholder="Medicine Name"
            onChange={(evt) => {
              udname(evt.target.value);
            }}
            value={dname}
          ></input>
          <input
            placeholder="Formula"
            onChange={(evt) => {
              ufname(evt.target.value);
            }}
            value={fname}
          ></input>
          <input
            placeholder="Manufacturer"
            onChange={(evt) => {
              umname(evt.target.value);
            }}
            value={mname}
          ></input>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expiry"
              defaultValue={dayjs(Date.now())}
              slotProps={{ textField: { size: "small" } }}
              onChange={(newval) => {
                uexpiry(dayjs(newval));
              }}
              value={expiry}
              // slotProps={{ textField: { style:{height:'20px'} } }}
            ></DatePicker>
          </LocalizationProvider>
          <div className="popupButton">
            <button
              onClick={() => {
                postcreate({
                  name: `${dname}`,
                  formula: `${fname}`,
                  manufacturer: `${mname}`,
                  expiry: `${expiry}`,
                });
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddMedicine;
