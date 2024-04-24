import React, { useState } from "react";
import Popup from "reactjs-popup";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import axios from "axios";
import "reactjs-popup/dist/index.css";
import "./Popup.css";

// import DeleteIcon from "@mui/icons-material/Delete";

const EditMedicine = (props) => {
    let [dname, udname] = useState(props.rowData.name);
    let [fname, ufname] = useState(props.rowData.formula);
    let [mname, umname] = useState(props.rowData.manufacturer);
    let [expiry, uexpiry] = useState(dayjs(Date.now()));

    const putRequest = (drugData) => {
        // const postHeader = { "Access-Control-Allow-Origin": "*" };
        // console.log("this will delete last data");
        console.log(props.rowData.id);
        try {
            axios.put(
                // `http://localhost:8000/api/medicines/${props.rowData.id}`,drugData
                `http://localhost:8000/api/medicines/${props.rowData.id}?name=${drugData.name}&manufacturer=${drugData.manufacturer}&formula=${drugData.formula}&expiry_date=${drugData.expiry_date}`
            );
            // .then((res) => {
            //     console.log("this is correct");
            //     console.log(res);
            //     alert(res.data.message);
            // })
            // .catch((error) => {
            //     console.log("this is error");
            //     console.log(error);
            //     props.updateData();
            //     // console.log(error.response.data);
            //     // alert(error.response.data.message);
            // });
        } catch (error) {
            console.log(error);
        }
        console.log("put complete");
    };

    return (
        <Popup
            trigger={
                <IconButton className="tableButton">
                    <EditIcon></EditIcon>
                </IconButton>
            }
            modal
            nested
            position="right center"
        >
            {(close) => (
                <div className="popupAddMedicine">
                    <h1> Edit Medicine</h1>
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
                                console.log(expiry.format("YYYY-MM-DD"));
                                putRequest({
                                    name: `${dname}`,
                                    formula: `${fname}`,
                                    manufacturer: `${mname}`,
                                    expiry_date: `${expiry.format(
                                        "YYYY-MM-DD"
                                    )}`,
                                });
                                props.updateData();
                            }}
                        >
                            Update
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

export default EditMedicine;
