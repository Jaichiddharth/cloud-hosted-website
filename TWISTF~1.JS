'use es6';

import {
    jsx as _jsx
} from "react/jsx-runtime";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
    Transition
} from 'react-transition-group';
const TransitionComponent = styled.div.withConfig({
    displayName: "TwistFadeTransition__TransitionComponent",
    componentId: "h102zq-0"
})(["transition:transform 0.16s linear 0s,opacity 0.06s linear;opacity:0;", " ", ""], ({
    direction
}) => direction === 'left' ? 'transform: rotate(25deg) scale(0);' : 'transform: rotate(-25deg) scale(0);', ({
    direction,
    transitionState
}) => {
    if (transitionState === 'entering' || transitionState === 'entered') {
        return `opacity: 1; transform: rotate(0deg) scale(1);`;
    }

    if (direction === 'left' && (transitionState === 'exiting' || transitionState === 'exiting')) {
        return 'opacity: 0; transform: rotate(-25deg) scale(0.5);';
    }

    if (direction === 'right' && (transitionState === 'exiting' || transitionState === 'exiting')) {
        return 'opacity: 0; transform: rotate(25deg) scale(0.5);';
    }

    return '';
});

const TwistFadeTransition = ({ in: inProp,
    children,
    direction
}) => {
    if (!Transition) {
        return inProp ? children : null;
    }

    return /*#__PURE__*/ _jsx(Transition, { in: inProp,
        timeout: 200,
        appear: true,
        children: state => {
            return /*#__PURE__*/ _jsx(TransitionComponent, {
                direction: direction,
                transitionState: state,
                children: children
            });
        }
    });
};

TwistFadeTransition.defaultProps = {
    direction: 'right',
    in: true
};
TwistFadeTransition.propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['left', 'right']),
    in: PropTypes.bool.isRequired
};
TwistFadeTransition.displayName = 'TwistFadeTransition';
export default TwistFadeTransition;