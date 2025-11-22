const express = require('express');
const plexyWebServer = require('./index');

const shouldHostStorybook = process.argv.at(-1) === 'storybook';

console.log(`Starting @plexy/plexy-web-server ${shouldHostStorybook ? 'with storybook' : ''}`);

plexyWebServer(express(), { listen: true, shouldHostStorybook });
