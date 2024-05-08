export type messageType = {
    id: number;
    title: string;
    message: null;
    file: null;
    sender: {
        id: number;
        name: string;
        email: string;
    };
    receiver: {
        id: number;
        name: string;
        email: string;
    };
    updated_at: string;
    created_at: string;
};
