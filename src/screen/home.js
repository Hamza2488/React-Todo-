import { Alert } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input } from "../component/Input";

const Home = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const params = useParams()
  console.log(params);

  let add = () => {
    if (!text) {
      return;
    }

    setList([...list, text]);
    setText([""]);

    // console.log(list)
  };

  let del = (i) => {
    const newList = list.filter((element, index) => index !== i);
    //   console.log(newList)
    setList(newList);
  };

  let edit = (i) => {
    let a = prompt("Enter Text", list[i]);
    list[i] = a;
    setList([...list]);
  };
  return (
    <>
      <div className="App">
        <div className="nam">
          <h1>Todo App</h1>
          <div className="inp">
            <Box sx={{ mx: 5 }}>
              <Input
                sx={{ mx: 5 }}
                lable="Add Task"
                // type="text"
                className="input"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />

              <Button
                
                className="button1"
                variant="contained"
                onClick={add}
                lable="Add Task"
              />
            </Box>
          </div>
          <div className="list">
            <ul>
              {list.map((e, i) => {
                return (
                  <li key={i}>
                    {" "}
                    <span className="li">{e}</span>
                    <Button
                      className="button1"
                      onClick={() => edit(i)}
                      variant="contained"
                      lable="Edit"
                    />
                    <Button
                      className="button1"
                      onClick={() => del(i)}
                      lable="Delete"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
