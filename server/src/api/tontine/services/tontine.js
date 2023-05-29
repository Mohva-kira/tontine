'use strict';

/**
 * tontine service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tontine.tontine');
