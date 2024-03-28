import React from "react";
import Search from "./Search";
import { CiSearch } from "react-icons/ci";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function DialogDefault() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        className="flex border-sky-500 text-center text-white"
        label="Search"
        onClick={handleOpen}
        variant="outlined"
      >
        <CiSearch className="text-lg" />
        search
      </Button>
      <Dialog className="h-11/12" open={open} handler={handleOpen}>
        <DialogHeader className="text-current	">
          Search Documentaion
        </DialogHeader>
        <DialogBody>
          <Search />
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={handleOpen}>
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
