import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useSelector } from "react-redux";

export default function Video() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const { moTrailer } = useSelector((state) => state.movieTrailer);
  // console.log(moTrailer.results[0]);
  return (
    <>
      <AiFillPlayCircle
        color="red"
        fontSize={25}
        onClick={handleOpen}
        variant="gradient"
      />
      <Dialog
        style={{ backgroundColor: "#191e24" }}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody>
          {moTrailer.length > 0 ? (
            <iframe
              style={{ backgroundColor: "#191e24" }}
              height={400}
              className="w-full"
              src={`https://www.youtube.com/embed/${moTrailer[0].key}`}
            ></iframe>
          ) : (
            <h1
              className="text-center pt-10 pb-10 text-xl font-bold
            "
            >
              THE TRAILER IS NOT FOUND
            </h1>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}
