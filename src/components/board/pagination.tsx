import { IconArrowLeft, IconArrowLeftGray, IconArrowRight, IconArrowRightGray } from "@utils/icon";

const ELLIPSIS = "···";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const pageNumbers = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={() => onPageChange(i)}
          className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === i ? "text-[#000]" : "text-[#818181]"} hover:bg-[#1e293b]`}
        >
          {i}
        </div>
      );
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(
          <div
            key={i}
            onClick={() => onPageChange(i)}
            className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === i ? "text-[#000]" : "text-[#818181]"} hover:bg-[#1e293b]`}
          >
            {i}
          </div>
        );
      }
      pageNumbers.push(
        <div
          key="ellipsis1"
          className="flex h-40 w-40 cursor-default select-none items-center justify-center text-20 font-normal text-[#818181]"
        >
          {ELLIPSIS}
        </div>
      );
      pageNumbers.push(
        <div
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === totalPages ? "text-[#000]" : "text-[#818181]"} hover:bg-[#1e293b]`}
        >
          {totalPages}
        </div>
      );
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(
        <div
          key={1}
          onClick={() => onPageChange(1)}
          className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === 1 ? "text-[#000]" : "text-[#818181]"} hover:bg-[#1e293b]`}
        >
          {1}
        </div>
      );
      pageNumbers.push(
        <div
          key="ellipsis1"
          className="flex h-40 w-40 cursor-default select-none items-center justify-center text-20 font-normal text-[#818181]"
        >
          {ELLIPSIS}
        </div>
      );
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(
          <div
            key={i}
            onClick={() => onPageChange(i)}
            className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === i ? "text-[#000]" : "text-[#818181]"} hover:bg-[#1e293b]`}
          >
            {i}
          </div>
        );
      }
    } else {
      pageNumbers.push(
        <div
          key={1}
          onClick={() => onPageChange(1)}
          className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === 1 ? "text-[#000]" : "text-[#818181]"} hover:bg-[#1e293b]`}
        >
          {1}
        </div>
      );
      pageNumbers.push(
        <div
          key="ellipsis1"
          className="flex h-40 w-40 cursor-default select-none items-center justify-center text-20 font-normal text-[#818181]"
        >
          {ELLIPSIS}
        </div>
      );
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <div
            key={i}
            onClick={() => onPageChange(i)}
            className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === i ? "text-[#000]" : "text-[#818181]"} hover:bg-[#1e293b]`}
          >
            {i}
          </div>
        );
      }
      pageNumbers.push(
        <div
          key="ellipsis2"
          className="flex h-40 w-40 cursor-default select-none items-center justify-center text-20 font-normal text-[#818181]"
        >
          {ELLIPSIS}
        </div>
      );
      pageNumbers.push(
        <div
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`flex cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === totalPages ? "text-[#000]" : "text-[#818181]"} hover:bg-[#1e293b]`}
        >
          {totalPages}
        </div>
      );
    }
  }

  return (
    <div className="mb-4 mt-4 flex items-center justify-center gap-1.5">
      {currentPage === 1 ? (
        <IconArrowLeftGray
          className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(currentPage - 1)}
          alt="arrow_left"
        />
      ) : (
        <IconArrowLeft
          className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(currentPage - 1)}
          alt="arrow_left"
        />
      )}
      {pageNumbers}
      {currentPage === totalPages ? (
        <IconArrowRightGray
          className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(currentPage + 1)}
          alt="arrow_right"
        />
      ) : (
        <IconArrowRight
          className={`flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
          onClick={() => onPageChange(currentPage + 1)}
          alt="arrow_right"
        />
      )}
    </div>
  );
}
