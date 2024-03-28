import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div
      style={{ height: "24.3em" }}
      className="flex flex-col h-96 mt-40 text-center text-white"
    >
      <h1 className="text-red-400 text-2xl">error page |404</h1>
      <Link to={"/"}>
        <Button className="bg-red-500 mt-6">back to home</Button>
      </Link>
    </div>
  );
};

export default Error;
