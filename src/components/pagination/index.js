import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { DOTS, usePagination } from "../../utils/use-pagination";
import { v4 as uuidv4 } from 'uuid';
import propTypes from 'prop-types';
import Dots from "./dots";
import Numbers from "./numbers";

function Pagination(props) {
  const cn = bem('Pagination');

  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    limit,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    limit
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className={cn()}>
      {
        paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <Dots key={uuidv4()} />;
          }

          return (
            <Numbers
              key={uuidv4()}
              pageNumber={pageNumber}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )
        })
      }
    </ul>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number,
  totalCount: propTypes.number,
  limit: propTypes.number,
  onPageChange: propTypes.func,
}

export default React.memo(Pagination);