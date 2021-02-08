import React from "react";
import itemsPerPageOptions from "./itemsPerPageOptions";
import {
    Row,
    Col,
    Label,
    Pagination,
    PaginationItem,
    PaginationLink
  } from "reactstrap";
import Select from 'react-select';

const TablePagination = ({setItemsPerPage, setCurrentPage, currentPage, pageNumbers, totalPages}) => (
  <Row className="justify-content-end mb-5">
    <Col sm="2" className="mt-3">
      <Label className="control-label mr-2">Elementos por página</Label>
    </Col>
    <Col sm="2" className="mt-3">
      <Select
        classNamePrefix="select2-selection"
        className=""
        placeholder="10"
        options={itemsPerPageOptions}
        onChange={(v) => setItemsPerPage(v.value)}
      />
    </Col>
    <Pagination className="pagination pagination-rounded mt-3">
      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink
          previous
          onClick={() => setCurrentPage((page) => page - 1)}
        />
      </PaginationItem>
      {pageNumbers.map((number) => {
        return (
          <PaginationItem
            active={number === currentPage}
            key={number}
            id={number}
          >
            <PaginationLink onClick={() => setCurrentPage(number)}>
              {number}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem disabled={currentPage >= totalPages}>
        <PaginationLink
          next
          onClick={() => setCurrentPage((page) => page + 1)}
        />
      </PaginationItem>
    </Pagination>
  </Row>
);

export default TablePagination;
