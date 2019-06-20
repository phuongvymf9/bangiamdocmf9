//import Sentry from 'sentry-expo';
import { SentrySeverity } from 'react-native-sentry';
import * as Sentry from '@sentry/browser';

//const dns = 'https://21a9b32d0a7f4031b51ddae54afa8b3b:3f5236f88fc94eb2be15f6bc25dbc040@sentry.io/1475160';

// Function to configure Sentry. Call this when your app mounts
export const configure = () => {
  Sentry.enableInExpoDevelopment = true;
  Sentry.init({dsn: "https://21a9b32d0a7f4031b51ddae54afa8b3b@sentry.io/1475160"});
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
