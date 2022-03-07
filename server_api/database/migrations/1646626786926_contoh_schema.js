"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ContohSchema extends Schema {
  up() {
    this.create("contohs", (table) => {
      table.increments();
      table.string("contoh");
      table.timestamps();
    });
  }

  down() {
    this.drop("contohs");
  }
}

module.exports = ContohSchema;
