import AccountBalanceCell from './AccountBalanceCell';
import AccountNameCell from './AccountNameCell';

const ReportTableHelper = {
    renderAccoutNameCell({accountName, isControl, isTotalRow}) {
        return (
            <AccountNameCell 
                accountName={accountName} 
                isControl={isControl}
                isTotalRow={isTotalRow} 
            />
        );
    },
    renderAccountBalanceCell(row, metaData, onUpdate) {
        const { 
            amount, 
            accountId, 
            showEditor, 
            isControl, 
            isTotalRow 
        } = row;
        
        const { currency : { symbol, isoCode }, setReportData } = metaData;
        return (
            <AccountBalanceCell 
                amount={amount} 
                accountId={accountId}
                currencyIsoCode={isoCode}
                currency={symbol} 
                showEditor={showEditor}
                isControl={isControl}
                isTotalRow={isTotalRow}
                onUpdate={onUpdate}
                setReportData={setReportData} />
        );
    }

}

export default ReportTableHelper;