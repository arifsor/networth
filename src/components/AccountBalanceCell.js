import PropTypes from 'prop-types';
import networthServic from '../services/networthService';
import NetworthTransformer from './NetworthTransformer';
import { formatMoney } from '../commons/Utility';
import classNames from 'classnames';

function AccountBalanceCell(props) {
    const { 
        amount, 
        accountId, 
        currency,
        currencyIsoCode,
        isControl,
        isTotalRow,
        showEditor, 
        onUpdate,
        setReportData
    } = props;

    const enableEditor = () => {
        onUpdate({showEditor:true});
    };
    
    const hanleAmountChange = (e) => {
        const newAmount = Number(e.target.value);
        if(amount !== newAmount) {
            onUpdate({showEditor:false});
            const requestBody = {
                currencyIsoCode,
                accounts: [
                    {
                        accountId,
                        amount: newAmount
                    }
                ]
            }
            networthServic.calculateNetworth(requestBody)
                .then(data => {
                    setReportData(NetworthTransformer.transformResponse(data));
                });
        } else {
            onUpdate({showEditor:false});
        }
    };

    if(isControl) {
        return (<span />);
    } else if(showEditor && !isControl && !isTotalRow) {
        return (
            <>
                <input 
                    type="number" 
                    style={{textAlign:"right"}}
                    onBlur={hanleAmountChange} 
                    defaultValue={amount} 
                    autoFocus/>
            </>
        );
    } else {
        return (<label 
                onClick={enableEditor} 
                className={classNames({'strong-font' : isTotalRow})}>
                    {currency} {formatMoney(amount)}
                </label>);
    }
    
}

AccountBalanceCell.prototype = {
    amount: PropTypes.number.isRequired, 
    accountId: PropTypes.number.isRequired, 
    currency: PropTypes.string.isRequired, 
    currencyIsoCode: PropTypes.string.isRequired, 
    showEditor: PropTypes.bool.isRequired, 
    onUpdate: PropTypes.func.isRequired,
    isControl: PropTypes.bool.isRequired,
    setReportData: PropTypes.func.isRequired
}
export default AccountBalanceCell;