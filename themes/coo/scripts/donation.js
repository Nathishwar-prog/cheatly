// Donation configuration and helper functions

const donationConfig = {
  github: {
    url: 'https://github.com/sponsors/Nathishwar-prog',
    enabled: true
  },
  buymeacoffee: {
    url: 'https://buymeacoffee.com/Nathishwar',
    enabled: true
  },
  kofi: {
    url: 'https://ko-fi.com/Nathishwar',
    enabled: true
  },
  paypal: {
    url: 'https://paypal.me/Nathishwar',
    enabled: true
  }
};

// Helper function to get donation URLs
hexo.extend.helper.register('donation_link', function (platform) {
  const config = donationConfig[platform];
  if (config && config.enabled) {
    return config.url;
  }
  return '#';
});

// Helper function to check if donations are enabled
hexo.extend.helper.register('donations_enabled', function () {
  return Object.values(donationConfig).some((config) => config.enabled);
});

// Helper function to get all enabled donation platforms
hexo.extend.helper.register('enabled_donations', function () {
  return Object.entries(donationConfig)
    .filter(([platform, config]) => config.enabled)
    .map(([platform, config]) => ({
      platform,
      url: config.url
    }));
});
