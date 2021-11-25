import { useState, useEffect } from "react";
import networthServic from "../services/networthService";
import NetworthTransformer from "./NetworthTransformer";
import { CURRENCY } from '../commons/Constants';
import TableReport from "./TableReport"

function Networth ()  {
    const [ reportData, setReportData ] = useState(null);    
    const [ currency, setCurrency ] = useState(CURRENCY.DEFAULT_CURRENCY);    
    
    
    useEffect(() => {
        networthServic.getNetworth(currency)
            .then(data => {
                const _reportData = NetworthTransformer.transformResponse(data);
                setReportData(_reportData);
        });
    }, [currency]);

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };
    
    return (
        <>
        <header>Tracking your Networth</header>
        <div className="table-header">
            <span><strong>Select Currency</strong></span>
            <select value={currency} onChange={handleCurrencyChange}>
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
            </select>
        </div>
        {reportData && <TableReport 
            reportData={reportData}
            setReportData={setReportData} 
            />}
        </>

    );
}
export default Networth;