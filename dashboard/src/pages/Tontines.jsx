import React, {useState} from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  ContextMenu,
  DetailRow,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import { tontinesData, contextMenuItems, tontinesGrid } from "../data/dummy";
import { Header, Popup } from "../components";

const Tontines = () => {


  const [isOpen, setIsOpen] = useState(false);
  const [membersList, setMembersList] = useState(null)
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const gridTemplate = (props) => {
   
    return ( <>
    <table className="detailtable" width="100%">
    <colgroup>
      <col />
      <col />
      <col style={{}}/>
    </colgroup>
    <tbody>
      <tr>
        <td rowSpan={4} style={{}} className="photo">
          {/* <img src={props.ProductImage} /> */}
        </td>
        <td>
          <span style={{}}> Nom: </span>
          {props.OrderItems}
        </td>
        <td>
          <span style={{}}> Gestionnaire:</span>
          {props.CustomerName}
        </td>
      </tr>
      <tr>
        <td>
          <span style={{}}> Montant à cotiser: </span>
          {props.TotalAmount.toLocaleString('fr')}
        </td>
        <td>
          <span style={{}}> Prochaine echéance: </span>
          {props.nextDueDate}
        </td>
      </tr>
      <tr>
        <td>
          <span style={{}}> Date de debut: </span>
          {props.Date_debut}
        </td>
        <td>
          <span style={{}}> Périodicité: </span>
          {props.Periodicite}
        </td>
      </tr>
      <tr>
        <td>
          <span style={{}}> Date de fin: </span>
          {props.Date_fin}
        </td>
        <td>
          <span style={{}}> Participants: </span>
          <button onClick={ () => { setMembersList(props.MembersList); handleOpen(); }}> {props.members}</button>  
        </td>
      </tr>
    </tbody>
  </table> </>);
};


  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page" title="Tontines" />
    <Popup title="Pariticipants" isOpen={isOpen} handleOpen={handleOpen} > 
      {membersList?.length > 0  ?
        membersList.map((member, index) => (
  
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
             
              <li className="flex items-center" key={index}>
                {member.paid ?
                  <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  :
                  <svg class="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                }
                 {member.name}
              </li>
            </ul>
        ))
          : "Aucun membre dans cette tontine" + console.log(membersList)

      } 
    </Popup>
    <GridComponent
      id="gridcomp"
      dataSource={tontinesData}
      allowPaging
      allowSorting
      allowFiltering
      detailTemplate={gridTemplate}
      toolbar={['Search']}
      width="auto"
    >
      <ColumnsDirective>
        {tontinesGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
      <Inject
        services={[
          Resize,
          Sort,
          ContextMenu,
          Filter,
          Page,
          ExcelExport,
          Edit,
          PdfExport,
          DetailRow
        ]}
      />
    </GridComponent>
  </div>
  )
}

export default Tontines