import { useAuth } from "src/contexts/Auth/useAuth";
import SmallButton from "./SmallButton";
import { LogOut } from "lucide-react";

//LogoutButton component
const LogoutButton = () => {
    const { logOut } = useAuth();
    return (
        <SmallButton onClick={() => logOut()}>
            <LogOut size={32} />
        </SmallButton>
    );
};

export default LogoutButton;
