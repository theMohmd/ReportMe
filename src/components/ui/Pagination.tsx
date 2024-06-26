import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useLang } from "src/contexts/Lang/useLang";

type PaginationProps = {
    setPage: (input: number) => void;
    pageCount: number;
    initialPage: number;
};
const Pagination = ({ setPage, pageCount, initialPage }: PaginationProps) => {
    const { lang } = useLang();
    if (pageCount < 2) return null;
    return (
        <ReactPaginate
            containerClassName="flex font-semibold m-2 font-vazir justify-center gap-2 list-none "
            pageClassName={
                "rounded-full size-8 flex items-center justify-center [&>*]:left-[1px] [&>*]:top-[2px] z-[0] [&>*]:relative "
            }
            activeClassName="bg-dbutton text-background "
            onPageChange={(event) => setPage(event.selected)}
            breakLabel="..."
            previousLabel={
                lang === "en" ? <ChevronLeftIcon /> : <ChevronRightIcon />
            }
            nextLabel={
                lang === "en" ? <ChevronRightIcon /> : <ChevronLeftIcon />
            }
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            nextClassName="flex items-center justify-center"
            previousClassName="flex items-center justify-center"
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            initialPage={initialPage}
        />
    );
};

export default Pagination;
