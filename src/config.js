const dev = {
  STRIPE_KEY: "pk_test_9w0hQZtoT0ZJpLKWs0z3PWEx00Eesbevfm",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-2-api-dev"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://6xho1bypo3.execute-api.eu-central-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_wzgZyGOUS",
    APP_CLIENT_ID: "7j9e3gdsvk883norrou543bn5g",
    IDENTITY_POOL_ID: "eu-central-1:aac00b3f-a566-404a-987c-fdcd129ee55c"
  },
  social: {
    FB: "529332871342680"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_9w0hQZtoT0ZJpLKWs0z3PWEx00Eesbevfm",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-2-api-prod"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://28kyxyvckl.execute-api.eu-central-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_nhNmsXIpT",
    APP_CLIENT_ID: "2bgec83q9vifirih1spcnvl9uk",
    IDENTITY_POOL_ID: "eu-central-1:d4e068a1-2afe-435a-8715-e46e345c365f"
  },
  social: {
    FB: "529332871342680"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};



