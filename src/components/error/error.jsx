import { BiError } from "react-icons/bi";
import { useLocation } from 'react-router-dom';

function Err() {
  const location = useLocation();
  console.log("Err(): ", location.state);
  return (
    <div
      className={`relative dark:bg-black bg-mainColor top-0 left-0 w-screen h-screen flex justify-center items-center`}
    >
      <div className="flex flex-row gap-2 items-end ">
        <BiError className="text-[#ff0000] text-[32px]" />
        <p className=" font-roboto dark:text-gray-300 text-gray-900">{location.state}</p>
      </div>
    </div>
  );
}

export default Err;
