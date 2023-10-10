/* eslint-disable */

import {useRef, useState} from "react";
import {ModuleRegistry} from "@ag-grid-community/core";
import {GridChartsModule} from "@ag-grid-enterprise/charts";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {MenuModule} from "@ag-grid-enterprise/menu";
import {RangeSelectionModule} from "@ag-grid-enterprise/range-selection";
import {ColumnsToolPanelModule} from "@ag-grid-enterprise/column-tool-panel";
import {AgGridReact} from "@ag-grid-community/react";
import {AgChartsReact} from 'ag-charts-react';
import {AgChart} from 'ag-charts-community';

import './App.css';

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

const modules = [
    MenuModule,
    RangeSelectionModule,
    ColumnsToolPanelModule,
    ClientSideRowModelModule
];

ModuleRegistry.registerModules([
    ...modules,
    GridChartsModule,
]);

const App = () => {
    const chartRef = useRef();
    const [rowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ]);

    const [columnDefs] = useState([
        {field: "make"},
        {field: "model"},
        {field: "price"}
    ]);

    const [options, setOptions] = useState({
        autoSize: true,
        title: {
            text: 'Average expenditure on coffee',
        },
        subtitle: {
            text: 'per person per week in Krakozhia',
        },
        data: [
            {
                year: '2015',
                spending: 35,
            },
            {
                year: '2016',
                spending: 40,
            },
            {
                year: '2017',
                spending: 43,
            },
            {
                year: '2018',
                spending: 44,
            },
        ],
        series: [
            {
                xKey: 'year',
                yKey: 'spending',
            },
        ],
    });

    const click = () => {
        AgChart.updateDelta(chartRef.current.chart, {
            title: {text: "New Text"}
        })
    }

    return (
        <div>
            <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
                <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
            </div>
            <div>
                <button onClick={click}>Change Title</button>
                <AgChartsReact ref={chartRef} options={options}/>
            </div>
        </div>
    );
};

export default App;
