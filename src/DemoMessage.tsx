import { useState } from "react";
import CustomButton from "./components/ui/CustomButton";

//DemoMessage component
const DemoMessage = () => {
  const [visible, setvisible] = useState(true);
  return (
    visible && (
      <div
        dir="ltr"
        className=" backdrop-blur fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center"
      >
        <div className=" flex flex-col gap-5 bg-dbackground p-10 text-white border-dlightBorder border rounded-xl">
          <p>
            This is a demo deployment of this project.
            <br /> You cant create or change data!
            <br /> you can sign in with any data.
          </p>
          <CustomButton onClick={() => setvisible(false)}>
            Continue
          </CustomButton>
        </div>
      </div>
    )
  );
};

export default DemoMessage;
