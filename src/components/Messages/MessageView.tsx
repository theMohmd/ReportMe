import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import {
    ChevronLeftIcon,
    SquarePenIcon,
    Trash2Icon,
} from "lucide-react";
import { t } from "i18next";
import { useQuery } from "@tanstack/react-query";
import { apiGetMesseges } from "src/api/apiGetMesseges";
import Loader from "../ui/Loader";

//MessageView component
const MessageView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, error, isLoading } = useQuery({
        queryKey: ["messages", id],
        queryFn: () => apiGetMesseges(id ? parseInt(id) : undefined),
    });
    console.log(data)
    return (
        <div className="flex flex-col gap-2 p-5 pt-10 size-full">
            {isLoading && <Loader size={100} className="text-primary" />}
            {error && <Loader />}
            {data && (
            <>
                <div className="flex justify-between items-center px-2 mb-5">
                    <p className="px-2 text-3xl font-semibold text-primary dark:text-dprimary">
                        {data.data.data.title}
                    </p>
                    <div className=" flex gap-2">
                        <CustomButton onClick={() => navigate(-1)}>
                            <SquarePenIcon size={30} />
                        </CustomButton>
                        <CustomButton onClick={() => navigate(-1)}>
                            <Trash2Icon size={30} />
                        </CustomButton>
                        <CustomButton onClick={() => navigate(-1)}>
                            <ChevronLeftIcon size={30} />
                        </CustomButton>
                    </div>
                </div>
                <div className=" bg-background dark:bg-dbackground grow p-5 rounded-xl border border-lightBorder dark:border-dlightBorder ">{data.data.data.content}</div>
                </>
            )}
        </div>
    );
};

export default MessageView;
