import classNames from 'classnames';
import PropTypes from 'prop-types';

function AccountNameCell (props) {
    const { accountName, isControl, isTotalRow } = props;
    return <label className={classNames({'strong-font': (isTotalRow || isControl)})}>{accountName}</label>
}
AccountNameCell.prototype = {
    accountName: PropTypes.string.isRequired,
    isControl: PropTypes.bool.isRequired,
    isTotalRow: PropTypes.bool.isRequired,
}
export default AccountNameCell;