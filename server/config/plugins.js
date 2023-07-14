module.exports = ({ env }) => ({
    // ...
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'mtandjo@gmail.com',
          defaultReplyTo: 'mtandjo@gmail.com',
        },
      },
    },
    // ...
  });