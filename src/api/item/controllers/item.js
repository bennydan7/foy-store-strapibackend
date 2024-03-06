'use strict';

/**
 * item controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::item.item', {
  /**
   * Create a new item
   * @param {*} ctx - Koa context
   */
  async create(ctx) {
    // Access the Strapi service to handle CRUD operations
    const { strapi } = ctx;
    const { name, shortDescription, longDescription, price, image, category, image2 } = ctx.request.body;

    try {
      // Create a new item in the "items" collection
      const newItem = await strapi.services.item.create({
        name,
        shortDescription,
        longDescription,
        price,
        image,
        category,
        image2,
      });

      // Send the newly created item as the response
      ctx.send(newItem);
    } catch (error) {
      // Handle errors, e.g., validation errors
      ctx.badRequest(error.message);
    }
  },

  /**
   * Retrieve all items
   * @param {*} ctx - Koa context
   */
  async find(ctx) {
    // Access the Strapi service to handle CRUD operations
    const { strapi } = ctx;

    try {
      // Retrieve all items from the "items" collection
      const items = await strapi.services.item.find();

      // Send the list of items as the response
      ctx.send(items);
    } catch (error) {
      // Handle errors, e.g., database errors
      ctx.badRequest(error.message);
    }
  },

  /**
   * Retrieve a specific item by ID
   * @param {*} ctx - Koa context
   */
  async findOne(ctx) {
    // Access the Strapi service to handle CRUD operations
    const { strapi } = ctx;
    const { id } = ctx.params;

    try {
      // Retrieve the item with the specified ID from the "items" collection
      const item = await strapi.services.item.findOne({ id });

      if (!item) {
        // Handle case where item is not found
        ctx.notFound('Item not found');
      }

      // Send the retrieved item as the response
      ctx.send(item);
    } catch (error) {
      // Handle errors, e.g., database errors
      ctx.badRequest(error.message);
    }
  },
  // Additional controller actions can be added based on your requirements
});
