import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import DialogDefault from "../search/Dialog";
import { Button } from "@material-tailwind/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex hidden sm:ml-6 sm:block flex space-">
                  <div className="items-center text-gray-400	 flex space-x-4">
                    <div className="mr-5 flex flex-shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5vacmouI7KjLcl8kkUl4TjkKGNjdRm0Ne0g&usqp=CAU"
                        alt="Aflam"
                      />
                    </div>
                    <Link
                      className=" active:border-b-4 focus:border-b-4"
                      to={"/"}
                    >
                      Home
                    </Link>
                    <Link
                      className=" active:border-b-4 focus:border-b-4"
                      to={"/movies"}
                    >
                      Movies
                    </Link>
                    <Link
                      className=" active:border-b-4 focus:border-b-4"
                      to={"/series"}
                    >
                      Series
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-3 sm:pr-0">
                <DialogDefault />
                <Button
                  className="border-sky-500 ml-3 text-center text-white"
                  variant="outlined"
                >
                  {" "}
                  <Link to={"/signIn"}>Sign in</Link>
                </Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className="text-gray-400	flex-col	 flex space-x-4">
                <Link className="mb-1 ml-4" to={"/"}>
                  Home
                </Link>
                <Link to={"/movies"}>Movies</Link>
                <Link className="mb-2 mt-1" to={"/series"}>
                  Series
                </Link>
              </div>{" "}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
