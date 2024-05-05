//DesktopLayout component
const DesktopLayout = () => {
    return (
                <div
                    className="flex overflow-hidden flex-col w-screen md:flex-row h-dvh"
                >
                    <div className="h-full bg-green-500 duration-200 w-[240px]"></div>
                    <div className="bg-red-500 grow"></div>
                </div>
    )
};

export default DesktopLayout;
