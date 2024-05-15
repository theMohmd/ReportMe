import LayoutRoutes from "./LayoutRoutes";
import Nav from "./Nav/Nav";

//DesktopLayout component
const DesktopLayout = () => {
    return (
        <div className="flex">
            <div className="flex flex-col">
                <div className="w-full font-black pt-10 text-center bg-background text-primary text-[30px] dark:bg-dbackground dark:text-dprimary">
                    ReportMe
                </div>
                <Nav />
            </div>
            <div className="flex overflow-y-auto p-5 pt-10 mx-auto max-w-[1200px] size-full">
                <LayoutRoutes />
            </div>
        </div>
    );
};

export default DesktopLayout;
