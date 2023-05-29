import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";

const Customers = () => {
  const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' }
  return (  <div className="m-2 md:m-10 p-2 md: p-10 bg-white rounded-3xl">
  <Header category="Page" title="Customers" />

  <GridComponent
  dataSource={customersData}
  allowPaging
  allowSorting
  allowFiltering
  toolbar={['Delete']}
  editSettings={editOptions}
  width="auto"

  >
    <ColumnsDirective>
      {customersGrid.map((item, index) => (
        <ColumnDirective key={index} {...item} /> 
      ))}
    </ColumnsDirective>
    <Inject services={[ Page, Edit, Toolbar, Sort, Selection, Filter]} />
  </GridComponent>
</div>);
};

export default Customers;
