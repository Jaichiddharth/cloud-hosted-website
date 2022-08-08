'use es6';

import {
    jsx as _jsx
} from "react/jsx-runtime";
import PropTypes from 'prop-types';
import {
    Component
} from 'react';
import emptyFunction from 'react-utils/emptyFunction';
import I18n from 'I18n';
import {
    getBrandStyle
} from '../visitor-widget/util/color';
import RecordPropType from 'conversations-prop-types/prop-types/RecordPropType';
import {
    SQUARE,
    CIRCLE,
    PILL
} from './constants/launcherShapes';
import PillLauncher from './PillLauncher';
import IconLauncher from './IconLauncher';
import ImageLauncher from './ImageLauncher';

class Launcher extends Component {
    constructor(...args) {
        super(...args);

        this.handleLaunch = () => {
            const {
                onOpen,
                onClose,
                open
            } = this.props;

            if (open) {
                onClose();
            } else {
                onOpen();
            }
        };
    }

    getAltText(open) {
        return open ? I18n.text('conversations-visitor-experience-components.visitorExperienceAriaLabels.close') : I18n.text('conversations-visitor-experience-components.visitorExperienceAriaLabels.open');
    }

    render() {
        const {
            badgeNumber,
            coloring: {
                accentColor,
                useDefaultColor
            },
            className,
            customImage,
            open,
            shape,
            text,
            showBadge,
            disableDropShadow,
            overrideBorderColor,
            overrideIconColor
        } = this.props;

        if (this.props.customImage && shape !== PILL) {
            return /*#__PURE__*/ _jsx(ImageLauncher, {
                className: `reagan--widget-loaded ${className}`,
                badgeNumber: badgeNumber,
                shape: shape,
                open: open,
                onClick: this.handleLaunch,
                tabIndex: "0",
                role: "button",
                type: "button",
                showBadge: showBadge,
                ariaLabel: this.getAltText(open),
                ariaHaspopup: open,
                disableDropShadow: disableDropShadow,
                overrideBorderColor: overrideBorderColor,
                customImage: customImage
            });
        }

        if (shape === PILL && this.props.text) {
            return /*#__PURE__*/ _jsx(PillLauncher, {
                className: `reagan--widget-loaded ${className}`,
                style: getBrandStyle(accentColor),
                badgeNumber: badgeNumber,
                useDefaultColor: useDefaultColor,
                onClick: this.handleLaunch,
                tabIndex: "0",
                role: "button",
                type: "button",
                text: text,
                overrideBorderColor: overrideBorderColor,
                overrideTextColor: overrideIconColor,
                showBadge: showBadge,
                ariaLabel: this.getAltText(open),
                ariaHaspopup: open,
                disableDropShadow: disableDropShadow
            });
        }

        return /*#__PURE__*/ _jsx(IconLauncher, {
            className: `reagan--widget-loaded ${className}`,
            style: getBrandStyle(accentColor),
            altText: this.getAltText(open),
            badgeNumber: badgeNumber,
            useDefaultColor: useDefaultColor,
            shape: shape,
            open: open,
            onClick: this.handleLaunch,
            tabIndex: "0",
            role: "button",
            type: "button",
            showBadge: showBadge,
            ariaLabel: this.getAltText(open),
            ariaHaspopup: open,
            disableDropShadow: disableDropShadow,
            overrideBorderColor: overrideBorderColor,
            overrideIconColor: overrideIconColor
        });
    }

}

Launcher.defaultProps = {
    customImage: null,
    shape: CIRCLE,
    text: null,
    onOpen: emptyFunction,
    onClose: emptyFunction,
    open: false
};
Launcher.propTypes = {
    badgeNumber: PropTypes.number,
    className: PropTypes.string,
    coloring: RecordPropType('ColoringRecord').isRequired,
    customImage: PropTypes.string,
    disableDropShadow: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    //optional color overrides
    overrideBorderColor: PropTypes.string,
    overrideIconColor: PropTypes.string,
    shape: PropTypes.oneOf([SQUARE, CIRCLE, PILL]),
    showBadge: PropTypes.bool,
    text: PropTypes.string
};
Launcher.displayName = 'Launcher';
export default Launcher;