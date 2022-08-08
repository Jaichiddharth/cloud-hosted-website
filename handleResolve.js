'use es6';

import {
    buildError
} from 'conversations-error-reporting/error-reporting/builders/buildError';
import {
    reportError
} from 'conversations-error-reporting/error-reporting/reportError';
export const handleResolve = resolveCallback => promiseResult => {
    try {
        resolveCallback(promiseResult);
    } catch (error) {
        const resolveError = buildError(error && error.message, {
            name: 'ResolveError'
        });
        reportError({
            error: resolveError,
            fingerprint: ['{{ default }}', 'ResolveError']
        });
        throw error;
    }
};