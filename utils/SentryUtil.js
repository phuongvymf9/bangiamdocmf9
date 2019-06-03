import Sentry from 'sentry-expo';
import { SentrySeverity } from 'react-native-sentry';

const dns = 'https://236ba4ba28904af098b599737002f683:a7d34d961567472398df32947ad98652@sentry.io/1219568';

// Function to configure Sentry. Call this when your app mounts
export const configure = () => {
  Sentry.enableInExpoDevelopment = true;
  Sentry.config(dns).install();
};

export const setExtraContext = () => {
  Sentry.setExtraContext({
    store: store.getState(),
  });
};

export const setTagsContext = (ctx) => {
  Sentry.setTagsContext({
    environment: ctx.environment,
  });
};

export const setUserContext = (ctx) => {
  Sentry.setUserContext(ctx);
};

export const captureError = (msg) => {
  Sentry.captureMessage(msg, {
    level: SentrySeverity.Error,
  });
};

export const captureWarning = (msg) => {
  Sentry.captureMessage(msg, {
    level: SentrySeverity.Warning,
  });
};
