'use es6';

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
    OBSIDIAN,
    OLAF
} from 'HubStyleTokens/colors';
import {
    getDropShadowStyles
} from './constants/getDropShadowStyles';
const PillLauncherContainer = styled.button.withConfig({
    displayName: "PillLauncher__PillLauncherContainer",
    componentId: "pfdwu4-0"
})(["border-top-left-radius:30px;border-bottom-left-radius:30px;border-top-right-radius:30px;border-bottom-right-radius:4px;height:50px;padding-left:25px;padding-right:25px;", ";", " transition:box-shadow 100ms ease-in-out;position:relative;&:hover{cursor:pointer;}"], ({
    disableDropShadow
}) => !disableDropShadow && getDropShadowStyles(), ({
    borderColor
}) => borderColor ? `border: 1px solid ${borderColor};` : 'border: none;');
const LauncherText = styled.span.withConfig({
    displayName: "PillLauncher__LauncherText",
    componentId: "pfdwu4-1"
})(["user-select:none;color:", ";white-space:nowrap;"], ({
    color
}) => color);

class PillLauncher extends Component {
    render() {
        const {
            ariaLabel,
            ariaHaspopup,
            badgeNumber,
            disableDropShadow,
            text,
            useDefaultColor,
            onClick,
            className,
            showBadge,
            style,
            overrideBorderColor,
            overrideTextColor
        } = this.props;
        const textColor = useDefaultColor ? OBSIDIAN : OLAF;

        const TextComponent = /*#__PURE__*/ _jsx(LauncherText, {
            color: overrideTextColor || textColor,
            isDark: useDefaultColor,
            children: text
        });

        return /*#__PURE__*/ _jsx(PillLauncherContainer, {
            "aria-label": ariaLabel,
            "aria-haspopup": ariaHaspopup,
            disableDropShadow: disableDropShadow,
            isDark: useDefaultColor,
            style: style,
            className: className,
            onClick: onClick,
            borderColor: overrideBorderColor,
            children: showBadge ? /*#__PURE__*/ _jsx(VizExNotificationBadge, {
                badgeLabel: badgeNumber,
                positioning: "on-circle",
                children: TextComponent
            }) : TextComponent
        });
    }

}

PillLauncher.displayName = 'PillLauncher';
PillLauncher.defaultProps = {
    onClick: () => {},
    showBadge: false,
    text: '',
    disableDropShadow: false
};
PillLauncher.propTypes = {
    ariaHaspopup: PropTypes.bool.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    badgeNumber: PropTypes.number,
    className: PropTypes.string,
    disableDropShadow: PropTypes.bool,
    onClick: PropTypes.func,
    overrideBorderColor: PropTypes.string,
    overrideTextColor: PropTypes.string,
    showBadge: PropTypes.bool.isRequired,
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
    useDefaultColor: PropTypes.bool.isRequired
};
export default PillLauncher;