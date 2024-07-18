import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// This component allows the scroll to go to the beginning when changing the view,
// otherwise, it would remain in the position of the previous view. 

const ScrollToTop = ({ location, children }) => {
    const prevLocation = useRef(location);

    useEffect(() => {
        if (location !== prevLocation.current) {
            window.scrollTo(0, 0);
        }
        prevLocation.current = location;
    }, [location]);

    return <>{children}</>; // Ensure children are rendered correctly
};

ScrollToTop.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired, // Adjust based on location shape
    children: PropTypes.node.isRequired // Use node to specify any valid React child
};

export default ScrollToTop;
