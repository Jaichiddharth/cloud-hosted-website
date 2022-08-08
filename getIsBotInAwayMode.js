'use es6';

import {
    createSelector
} from 'reselect';
import {
    getAssignedResponderInWidget
} from '../../responders/selectors/getAssignedResponderInWidget';
import {
    getIsBot
} from 'conversations-internal-schema/responders/operators/responderGetters';
import {
    getIsWidgetInAwayMode
} from './getIsWidgetInAwayMode';
export const getIsBotInAwayMode = createSelector([getIsWidgetInAwayMode, getAssignedResponderInWidget], (isWidgetInAwayMode, assignedResponder) => Boolean(isWidgetInAwayMode && assignedResponder && getIsBot(assignedResponder)));