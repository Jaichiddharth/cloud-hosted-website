'use es6';

import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    jsxs as _jsxs
} from "react/jsx-runtime";
import {
    Component
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VizExNotificationBadge from 'visitor-ui-component-library/badge/VizExNotificationBadge';
import CloseIcon from './CloseIcon';
import OpenIcon from './OpenIcon';
import {
    CIRCLE,
    SQUARE
} from './constants/launcherShapes';
import {
    OBSIDIAN,
    OLAF
} from 'HubStyleTokens/colors';
import {
    getDropShadowStyles
} from './constants/getDropShadowStyles';
import {
    launcherHeight,
    launcherWidth
} from './constants/launcherDimensions';
import TwistFadeTransition from '../presentation-components/TwistFadeTransition';
const BaseLauncher = styled.button.withConfig({
    displayName: "IconLauncher__BaseLauncher",
    componentId: "sc-19sb00b-0"
})(["", ";", " transition:box-shadow 150ms ease-in-out;position:relative;&:hover{cursor:pointer;}&:focus{outline:none;}"], ({
    disableDropShadow
}) => !disableDropShadow && getDropShadowStyles(), ({
    borderColor
}) => borderColor ? `border: 1px solid ${borderColor};` : 'border: none;');
const SquareLauncher = styled(BaseLauncher).withConfig({
    displayName: "IconLauncher__SquareLauncher",
    componentId: "sc-19sb00b-1"
})(["border-radius:6px;height:", "px;width:", "px;"], launcherHeight, launcherWidth);
const CircleLauncher = styled(BaseLauncher).withConfig({
    displayName: "IconLauncher__CircleLauncher",
    componentId: "sc-19sb00b-2"
})(["border-radius:50%;height:", "px;width:", "px;"], launcherHeight, launcherWidth);
const LauncherIcon = styled.div.withConfig({
    displayName: "IconLauncher__LauncherIcon",
    componentId: "sc-19sb00b-3"
})(["position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;", ""], ({
    width,
    height
}) => `width: ${width}px; height: ${height}px;`);

class IconLauncher extends Component {
    renderIcon() {
        const {
            altText,
            open,
            useDefaultColor,
            overrideIconColor
        } = this.props;
        const color = useDefaultColor ? OBSIDIAN : OLAF;
        return /*#__PURE__*/ _jsxs("div", {
            open: open,
            alt: altText,
            children: [ /*#__PURE__*/ _jsx(TwistFadeTransition, { in: open,
                direction: "left",
                children: /*#__PURE__*/ _jsx(LauncherIcon, {
                    width: 20,
                    height: 20,
                    children: /*#__PURE__*/ _jsx(CloseIcon, {
                        color: overrideIconColor || color,
                        width: 20,
                        height: 20
                    })
                })
            }), /*#__PURE__*/ _jsx(TwistFadeTransition, { in: !open,
                direction: "right",
                children: /*#__PURE__*/ _jsx(LauncherIcon, {
                    width: 32,
                    height: 30,
                    children: /*#__PURE__*/ _jsx(OpenIcon, {
                        color: overrideIconColor || color,
                        width: 32,
                        height: 30
                    })
                })
            })]
        });
    }

    render() {
        const {
            ariaLabel,
            ariaHaspopup,
            badgeNumber,
            className,
            disableDropShadow,
            onClick,
            shape,
            showBadge,
            style,
            overrideBorderColor
        } = this.props;
        let ShapedLauncher;

        switch (shape) {
            case CIRCLE:
                ShapedLauncher = CircleLauncher;
                break;

            case SQUARE:
                ShapedLauncher = SquareLauncher;
                break;

            default:
                ShapedLauncher = CircleLauncher;
                break;
        }

        return /*#__PURE__*/ _jsx(VizExNotificationBadge, {
            badgeLabel: badgeNumber,
            showBadge: showBadge,
            positioning: "on-circle",
            children: /*#__PURE__*/ _jsx(ShapedLauncher, {
                "aria-label": ariaLabel,
                "aria-haspopup": ariaHaspopup,
                disableDropShadow: disableDropShadow,
                borderColor: overrideBorderColor,
                style: style,
                className: className,
                onClick: onClick,
                children: this.renderIcon()
            })
        });
    }

}

IconLauncher.displayName = 'IconLauncher';
IconLauncher.defaultProps = {
    open: false,
    onClick: () => {},
    showBadge: false,
    shape: CIRCLE
};
IconLauncher.propTypes = {
    altText: PropTypes.string.isRequired,
    ariaHaspopup: PropTypes.bool.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    badgeNumber: PropTypes.number,
    className: PropTypes.string,
    disableDropShadow: PropTypes.bool,
    onClick: PropTypes.func,
    open: PropTypes.bool.isRequired,
    overrideBorderColor: PropTypes.string,
    overrideIconColor: PropTypes.string,
    shape: PropTypes.oneOf([SQUARE, CIRCLE]),
    showBadge: PropTypes.bool.isRequired,
    style: PropTypes.object,
    useDefaultColor: PropTypes.bool.isRequired
};
export default IconLauncher;