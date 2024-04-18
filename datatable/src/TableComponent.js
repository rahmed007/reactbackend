import { React, useState } from "react";
import Clock from "react-live-clock";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import dayjs from "dayjs";
import DataGridComponent from "./DataGridComponent";
import "./TableComponent.css";

const rows = [
  { name: "Elizabeth", start: 1565, end: 1603, id: 0 },
  { name: "James I", start: 1603, end: 1625, id: 1 },
  { name: "Charles I", start: 1625, end: 1649, id: 2 },
  {
    name: "Cromwell",
    start: 1649,
    end: 1660,
    commonwealth: true,
    id: 3,
  },
  { name: "Charles II", start: 1660, end: 1685, id: 4 },
  { name: "James II", start: 1685, end: 1689, id: 5 },
  { name: "W&M", start: 1689, end: 1702, id: 6 },
  { name: "Anne", start: 1702, end: 1714, id: 7 },
  { name: "George I", start: 1714, end: 1727, id: 8 },
  { name: "George II", start: 1727, end: 1760, id: 9 },
  { name: "George III", start: 1760, end: 1820, id: 10 },
  { name: "George IV", start: 1820, end: 1820, id: 11 },
];

let TableComponent = () => {
  let [kingname, updatekingname] = useState([]);
  let [indexId, updateIndexId] = useState(0);
  let [monarchName, updateMonarchName] = useState("");
  let [reignStart, updateReginStart] = useState(0);
  let [reignEnd, updateReginEnd] = useState(0);

  const deleteLast = () => {
    console.log("this will delete last data");
  };

  const getrequest = () => {
    console.log(`requesting using axios at ${dayjs(Date.now())}`);
    axios
      .get(
        `http://localhost:8000/temp?index=${indexId}&name=panadol&id=0c23544`
      )
      .then((res) => {
        // save and log the result
        console.log(res.data);
        updatekingname(res.data);
        if (res.data.status === "incorrect") {
          console.log("error message");
          updatekingname({ name: "no data found", start: " ", end: " " });
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
          <Clock interval={1000} format={"HH:mm:ss A"} ticking={true}></Clock>
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
          <button onClick={deleteLast}>Delete Last</button>
        </div>
        <div className="addData">
          <input
          style={{'width':'90px'}}
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
        <DataGridComponent key={0} datatable={kingname}></DataGridComponent>
      </div>
    </>
  );
};

export default TableComponent;
