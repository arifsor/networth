import PropTypes from 'prop-types';

function Table(props) {
    
    const { 
        columns, 
        data, 
        showHeader, 
        metaData, 
        onUpdateData 
    } = props;

    const onUpdate = (rowIndex, values) => {
        onUpdateData(rowIndex, values);
    };
    
    const renderTableHeader = () => {
        return (<tr>{columns.map((column) => <th key={column.key}>{column.title}</th>)}</tr>);
    };
    
    const renderTableRows = () => {
        return (
            <>
                {data.map((row, rowIndex) => {
                    return (
                        <tr key={`row_${rowIndex}`}> {columns.map((column, columnIndex) => {
                            const { key, width , align } = column;
                            return (
                                <td key={`${key}_${rowIndex}_${columnIndex}`} width={width} align={align || 'left'}>
                                    {column.component(row, metaData, onUpdate.bind(this, rowIndex))}
                                </td>
                            )})}
                        </tr>     
                    );
                })}    
            </>
        );
    };

    const renderTable = () => {
        return ( 
            <>
            { showHeader && renderTableHeader() }
            { renderTableRows() }
            </>
        );
    }
    
    return(
        <table border="1" width="100%">
            <tbody>
                {renderTable(columns, data)}
            </tbody>
        </table>
    )

}

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    metaData: PropTypes.object.isRequired,
    showHeader: PropTypes.bool.isRequired,
    onUpdateData: PropTypes.func.isRequired
}

export default Table;