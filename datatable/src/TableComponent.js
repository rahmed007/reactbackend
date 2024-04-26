import { React, useState } from "react";
import Clock from "react-live-clock";
import axios from "axios";
import dayjs from "dayjs";
import DataGridComponent from "./DataGridComponent";
import "./TableComponent.css";
import AddMedicine from "./AddMedicine";
// import { DataGrid } from "@mui/x-data-grid";
// import { cardActionAreaClasses } from "@mui/material";

let TableComponent = () => {
    let [kingname, updatekingname] = useState([]);
    let [indexId, updateIndexId] = useState(0);
    let [monarchName, updateMonarchName] = useState("");
    let [reignStart, updateReginStart] = useState(0);
    let [reignEnd, updateReginEnd] = useState(0);

    const postcreate = () => {
        console.log("this will delete last data");
        try {
            axios
                .post("http://localhost:8000/api/medicines", {
                    name: `${updateMonarchName}`,
                    formula: "paracetamol",
                    manufacturer: "getz",
                    expiry_date: "2025-07-08",
                })
                .then((res) => {
                    console.log(res);
                    alert(res.data.message);
                })
                .catch((error) => {
                    console.log(error.response.data);
                    alert(error.response.data.message);
                });
        } catch (error) {
            alert(error.response.data);
        }
        console.log("post complete");
    };

    const getrequest = () => {
        console.log(`requesting using axios at ${dayjs(Date.now())}`);
        axios
            .get(
                // `http://localhost:8000/temp?index=${indexId}&name=panadol&id=0c23544`
                `http://localhost:8000/api/medicines`
            )
            .then((res) => {
                // save and log the result
                console.log(res.data);
                updatekingname(res.data);
                if (res.data.status === "incorrect") {
                    console.log("error message");
                    updatekingname({
                        name: "no data found",
                        start: " ",
                        end: " ",
                    });
                    // must have a status in json data
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="mainDiv">
                <h1>This is Data Table Example</h1>
                <div className="clockDiv">
                    {/* <Clock ></Clock> */}
                    <Clock
                        interval={1000}
                        format={"HH:mm:ss A"}
                        ticking={true}
                    ></Clock>
                </div>
                <input
                    type="text"
                    value={indexId}
                    onChange={(evt) => {
                        updateIndexId(evt.target.value);
                    }}
                    placeholder="Enter the index!!!"
                ></input>
                <div className="buttonDiv">
                    <button onClick={getrequest}>Request</button>
                    <button onClick={postcreate}>Create</button>
                    <AddMedicine></AddMedicine>
                </div>
                <div className="addData">
                    <input
                        style={{ width: "90px" }}
                        type="text"
                        value={monarchName}
                        onChange={(evt) => {
                            updateMonarchName(evt.target.value);
                        }}
                        placeholder="Enter Monarch name"
                    ></input>
                    <input
                        type="number"
                        value={reignStart}
                        onChange={(evt) => {
                            updateReginStart(evt.target.value);
                        }}
                        placeholder="Enter start"
                    ></input>
                    <input
                        type="number"
                        value={reignEnd}
                        onChange={(evt) => {
                            updateReginEnd(evt.target.value);
                        }}
                        placeholder="Enter start"
                    ></input>
                </div>
                {/* <h2>{kingname.name}</h2>
        <h2>{`${kingname.start} ~ ${kingname.end}`}</h2> */}
                <DataGridComponent
                    key={0}
                    datatable={kingname}
                    updatetable={updatekingname}
                ></DataGridComponent>
            </div>
        </>
    );
};

export default TableComponent;
