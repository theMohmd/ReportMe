import Nav from "./Nav/Nav";

//DesktopLayout component
const DesktopLayout = () => {
    return (
        <div className="flex">
            <div className="flex flex-col">
                <div className="bg-background dark:bg-dbackground text-primary dark:text-dprimary w-full text-center py-5 font-black text-[40px]">
                    ReportMe
                </div>
                <Nav />
            </div>
            <div className="bg-red-500 grow"></div>
        </div>
    );
};

export default DesktopLayout;
