export type apiDataType<T> = {
    data: T[];
    total: number;
    from: number;
    to: number;
    first_page_url: string;
    per_page: number;
    prev_page_url: string;
    current_page: number;
    next_page_url: string;
    last_page: number;
    last_page_url: string;
    path: string;
};

