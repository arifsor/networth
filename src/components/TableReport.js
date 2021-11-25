import PropTypes from 'prop-types';
import Table from './Table';
import ReportTableHelper from './TableReportHelper';

function TableReport(props) {
    const { reportData, setReportData } = props;
    const { viewRows, currency } = reportData;
    const columns = [
        {
            title: 'Account',
            key: 'accountName',
            width: '80%',
            component: ReportTableHelper.renderAccoutNameCell
        },
        {
            title: 'Balance',
            key: 'amount',
            width: '20%',
            align: 'right',
            component: ReportTableHelper.renderAccountBalanceCell
        },
    ];
    
    const metaData = { currency, setReportData };

    const onUpdateData = (index, value) => {
        setReportData({ 
            ...reportData, 
            viewRows: [...viewRows.slice(0, index), 
                { ...viewRows[index], ...value }, 
                ...viewRows.slice(index+1)
            ]
        });
    };

    return <Table columns={columns} 
        data={viewRows} 
        showHeader={false} 
        metaData={metaData}
        onUpdateData={onUpdateData} />
}

TableReport.prototype =  {
    reportData: PropTypes.object.isRequired,
    setReportData: PropTypes.func.isRequired
}

export default TableReport;