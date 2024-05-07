import { useWindowSize } from "hooks/useWindowSize";
import DesktopLayout from "./DesktopLayout";
import PhoneLayout from "./PhoneLayout";

//Layout component
const Layout = () => {
    const isLargeScreen = useWindowSize(768);
    return isLargeScreen ? <DesktopLayout /> : <PhoneLayout />;
};

export default Layout;
