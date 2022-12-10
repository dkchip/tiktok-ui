import { Link } from 'react-router-dom';

function Mainlayout({ children }) {
    return (
        <div>
            <h1>header</h1>
            {children}
        </div>
    );
}

export default Mainlayout;
