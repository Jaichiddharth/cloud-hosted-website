'use es6';

import {
    createSelector
} from 'reselect';
import {
    getAssignedResponderInWidget
} from './getAssignedResponderInWidget';
import {
    getIsBot
} from 'conversations-internal-schema/responders/operators/responderGetters';
export const getIsUnassignedResponderInWidget = createSelector([getAssignedResponderInWidget], assignedResponder => {
    return !assignedResponder || getIsBot(assignedResponder);
});