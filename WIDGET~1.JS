'use es6';

import {
    jsx as _jsx
} from "react/jsx-runtime";
import PropTypes from 'prop-types';
import {
    Component
} from 'react';
import styled from 'styled-components';
import RecordPropType from 'conversations-prop-types/prop-types/RecordPropType';
import {
    HEADER_HEIGHT
} from '../widget-dimensions/constants/dimensions';
import {
    getBrandStyle
} from '../visitor-widget/util/color';
export const FullHeightDiv = styled.div.withConfig({
    displayName: "WidgetHeaderStyleWrapper__FullHeightDiv",
    componentId: "sc-3tg38v-0"
})(["align-items:center;color:", ";display:flex;height:100%;padding:16px 16px;"], ({
    textColor
}) => textColor);
export const BackgroundPanelContent = styled.div.withConfig({
    displayName: "WidgetHeaderStyleWrapper__BackgroundPanelContent",
    componentId: "sc-3tg38v-1"
})(["height:", "px;border-radius:", ";"], HEADER_HEIGHT, ({
    mobile,
    inline
}) => mobile || inline ? '0' : '8px 8px 0 0');

class WidgetHeaderStyleWrapper extends Component {
    render() {
        const {
            inline,
            mobile,
            coloring: {
                accentColor,
                textColor
            }
        } = this.props;
        return /*#__PURE__*/ _jsx(BackgroundPanelContent, {
            className: 'widget-background-panel',
            style: getBrandStyle(accentColor),
            mobile: mobile,
            inline: inline,
            children: /*#__PURE__*/ _jsx(FullHeightDiv, {
                textColor: textColor,
                children: this.props.children
            })
        });
    }

}

WidgetHeaderStyleWrapper.displayName = 'WidgetHeaderStyleWrapper';
WidgetHeaderStyleWrapper.propTypes = {
    children: PropTypes.node,
    coloring: RecordPropType('ColoringRecord').isRequired,
    inline: PropTypes.bool.isRequired,
    mobile: PropTypes.bool
};
export default WidgetHeaderStyleWrapper;