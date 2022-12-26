import './GloablStyles.module.scss'
import PropTypes from 'prop-types';

function GloablStyles({children}) {
    return ( children );
}

GloablStyles.propTypes = {
    children : PropTypes.node.isRequired
}

export default GloablStyles;