import { useSearchParams } from "@remix-run/react";
import PropTypes from "prop-types";

// Definimos los tipos para TypeScript
interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / pageSize);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    setSearchParams(newParams);
    onPageChange(page); // Llamar a la función para actualizar el estado en el componente padre
  };

  const changePageSize = (size: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("pageSize", String(size));
    newParams.set("page", "1"); // Reiniciar a la primera página
    setSearchParams(newParams);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
      <div>
        <label
          htmlFor="pageSize"
          className="mr-2 text-gray-700 dark:text-white"
        >
          Mostrar:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => changePageSize(Number(e.target.value))}
          className="border p-1 rounded  "
        >
          {[10, 20, 50, 100].map((size) => (
            <option
              key={size}
              value={size}
              className="text-gray-700 dark:text-black"
            >
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="py-2 px-4 rounded-md bg-gray-500 text-white disabled:bg-gray-300"
        >
          Previos
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={`py-2 px-4 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-700 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="py-2 px-4 rounded-md bg-gray-500 text-white disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Definición de PropTypes (solo útil si usas JavaScript)
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
