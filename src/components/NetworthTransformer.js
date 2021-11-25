const _flatternAccounts = (viewRows, account) => {
    const { 
        accountId, 
        accountName, 
        isControl,  
        amount, 
        accounts 
    } = account;
    
    viewRows.push({
        accountId, 
        accountName,
        isControl,
        amount: (amount && amount.balance) || 0,
        showEditor: false
    });
    
    if(accounts && accounts.length > 0) {
        accounts.map(subAccount => _flatternAccounts(viewRows, subAccount));    
    }
}

const transformResponse = (response) => {
    const {currency, assets, liabilities } = response;
    const viewRows = [];
    viewRows.push({    
        accountId: null, 
        accountName: 'Net Worth',
        isControl: false,
        isTotalRow: true,
        amount: response.networthValue,
        showEditor: false
    });
    viewRows.push({    
        accountId: null, 
        accountName: 'Assets',
        isControl: true,
        amount: undefined,
        showEditor: false
    });
    assets.accounts.forEach(account => {
        _flatternAccounts(viewRows, account);
    });
    viewRows.push({    
        accountId: null, 
        accountName: 'Total Assets',
        isControl: false,
        isTotalRow: true,
        amount: assets.total,
        showEditor: false
    });

    viewRows.push({    
        accountId: 0, 
        accountName: 'Liabilities',
        isControl: true,
        amount: undefined,
        showEditor: false
    });
    liabilities.accounts.forEach(account => {
        _flatternAccounts(viewRows, account);
    });
    viewRows.push({    
        accountId: null, 
        accountName: 'Total Liabilities',
        isControl: false,
        isTotalRow: true,
        amount: liabilities.total,
        showEditor: false
    });

    return { viewRows, currency };
};

const NetworthTransformer = {
    _flatternAccounts,
    transformResponse
}

export default NetworthTransformer;