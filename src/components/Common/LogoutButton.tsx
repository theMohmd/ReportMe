import { useAuth } from "contexts/Auth/useAuth";
import CustomButton from "components/ui/CustomButton";
import { LogOut } from "lucide-react";

//LogoutButton component
const LogoutButton = () => {
    const { logOut } = useAuth();
    return (
        <CustomButton onClick={() => logOut()}>
            <LogOut />
        </CustomButton>
    );
};

export default LogoutButton;
