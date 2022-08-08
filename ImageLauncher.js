'use es6';

import {
    jsxs as _jsxs
} from "react/jsx-runtime";
import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    Component
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VizExNotificationBadge from 'visitor-ui-component-library/badge/VizExNotificationBadge';
import {
    CIRCLE,
    SQUARE
} from './constants/launcherShapes';
import {
    launcherHeight,
    launcherWidth
} from './constants/launcherDimensions';
import CloseIcon from './CloseIcon';
import {
    OBSIDIAN
} from 'HubStyleTokens/colors';
import {
    getDropShadowStyles
} from './constants/getDropShadowStyles';
const LauncherWrapper = styled.div.withConfig({
    displayName: "ImageLauncher__LauncherWrapper",
    componentId: "z2j3et-0"
})(["height:", "px;width:", "px;"], launcherHeight, launcherWidth);
const BaseLauncher = styled.button.withConfig({
    displayName: "ImageLauncher__BaseLauncher",
    componentId: "z2j3et-1"
})(["height:", "px;width:", "px;overflow:hidden;position:relative;transition:box-shadow 100ms ease-in-out;transition:background-image 200ms ease-in-out;padding:0;", ";", " &:hover{cursor:pointer;}"], launcherHeight, launcherWidth, ({
    disableDropShadow
}) => !disableDropShadow && getDropShadowStyles(), ({
    borderColor
}) => borderColor ? `border: 1px solid ${borderColor};` : 'border: none;');
const SquareLauncher = styled(BaseLauncher).withConfig({
    displayName: "ImageLauncher__SquareLauncher",
    componentId: "z2j3et-2"
})(["border-radius:6px;"]);
const CircleLauncher = styled(BaseLauncher).withConfig({
    displayName: "ImageLauncher__CircleLauncher",
    componentId: "z2j3et-3"
})(["border-radius:50%;"]);
const BackgroundImage = styled.img.withConfig({
    displayName: "ImageLauncher__BackgroundImage",
    componentId: "z2j3et-4"
})(["width:", "px;height:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99;", " transition:opacity 0.2s cubic-bezier(.25,.8,.25,1);"], launcherWidth + 1, ({
    opacity
}) => `opacity: ${opacity};`);
const LauncherIcon = styled.div.withConfig({
    displayName: "ImageLauncher__LauncherIcon",
    componentId: "z2j3et-5"
})(["position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;"]);

class ImageLauncher extends Component {
    getIcon(open, isDark, customColor) {
        if (open) {
            return /*#__PURE__*/ _jsx(CloseIcon, {
                color: customColor || OBSIDIAN,
                width: 20,
                height: 20
            });
        } else {
            return null;
        }
    }

    renderContent() {
        const {
            open,
            useDefaultColor,
            overrideIconColor,
            customImage
        } = this.props;
        const icon = this.getIcon(open, useDefaultColor, overrideIconColor);
        return /*#__PURE__*/ _jsxs("div", {
            children: [ /*#__PURE__*/ _jsx(BackgroundImage, {
                opacity: open ? 0 : 1,
                src: customImage
            }), /*#__PURE__*/ _jsx(LauncherIcon, {
                open: open,
                children: icon
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
            overrideBorderColor,
            open,
            openStyles
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

        return /*#__PURE__*/ _jsx(LauncherWrapper, {
            className: className,
            onClick: onClick,
            children: showBadge ? /*#__PURE__*/ _jsx(VizExNotificationBadge, {
                badgeLabel: badgeNumber,
                positioning: "on-circle",
                children: /*#__PURE__*/ _jsx(ShapedLauncher, {
                    "aria-label": ariaLabel,
                    "aria-haspopup": ariaHaspopup,
                    disableDropShadow: disableDropShadow,
                    borderColor: overrideBorderColor,
                    shape: shape,
                    style: open ? openStyles : null,
                    children: this.renderContent()
                })
            }) : /*#__PURE__*/ _jsx(ShapedLauncher, {
                "aria-label": ariaLabel,
                "aria-haspopup": ariaHaspopup,
                style: open ? openStyles : null,
                shape: shape,
                children: this.renderContent()
            })
        });
    }

}

ImageLauncher.displayName = 'ImageLauncher';
ImageLauncher.defaultProps = {
    open: false,
    onClick: () => {},
    showBadge: false,
    shape: CIRCLE
};
ImageLauncher.propTypes = {
    ariaHaspopup: PropTypes.bool.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    badgeNumber: PropTypes.number,
    className: PropTypes.string,
    customImage: PropTypes.string,
    disableDropShadow: PropTypes.bool,
    onClick: PropTypes.func,
    open: PropTypes.bool,
    openStyles: PropTypes.object,
    overrideBorderColor: PropTypes.string,
    overrideIconColor: PropTypes.string,
    shape: PropTypes.oneOf([SQUARE, CIRCLE]),
    showBadge: PropTypes.bool.isRequired,
    useDefaultColor: PropTypes.bool
};
export default ImageLauncher;