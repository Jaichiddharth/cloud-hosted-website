'use es6';

import addAvailabilityMessageTimeout from './addAvailabilityMessageTimeout';
import {
    publishAvailabilityMessage
} from '../actions/publishAvailabilityMessage';
import getAvailabilityMessageTimeouts from '../selectors/getAvailabilityMessageTimeouts';
const FIVE_SECONDS_IN_MS = 5000;
export function addAvailabilityMessage({
    channel,
    threadId
}) {
    return (dispatch, getState) => {
        const timeouts = getAvailabilityMessageTimeouts(getState());

        if (!timeouts.get(channel)) {
            const timeout = setTimeout(() => {
                dispatch(publishAvailabilityMessage({
                    channel,
                    threadId
                }));
            }, FIVE_SECONDS_IN_MS);
            dispatch(addAvailabilityMessageTimeout(channel, timeout));
        }
    };
}