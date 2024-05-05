import Content from "./Content";
import Nav from "./Nav/Nav";

//DesktopLayout component
const DesktopLayout = () => {
    return (
        <div className="flex">
            <div className="flex flex-col">
                <div className="bg-background dark:bg-dbackground text-primary dark:text-dprimary w-full text-center font-black text-[40px]">
                    ReportMe
                </div>
                <Nav />
            </div>
            <div className="grow"><Content /></div>
        </div>
    );
};

export default DesktopLayout;
