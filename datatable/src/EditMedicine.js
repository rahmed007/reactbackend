import React, { useState } from "react";
import Popup from "reactjs-popup";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import axios from "axios";
import "reactjs-popup/dist/index.css";
import "./Popup.css";
import { gridRowsDataRowIdToIdLookupSelector } from "@mui/x-data-grid";

const EditMedicine = (props) => {
    let [dname, udname] = useState(props.rowData.name);
    let [fname, ufname] = useState(props.rowData.formula);
    let [mname, umname] = useState(props.rowData.manufacturer);
    let [expiry, uexpiry] = useState(dayjs(Date.now()));

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
                        <button>Add</button>
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
