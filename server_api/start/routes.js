"use strict";

const { route } = require("@adonisjs/framework/src/Route/Manager");
const UserController = require("../app/Controllers/Http/UserController");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.get("/user", () => {
  return {
    user: [
      {
        name: "Badu",
        usia: 23,
      },
      {
        name: "Doni",
        usia: 30,
      },
    ],
  };
});

Route.group(() => {
  Route.get("semua_user", "UserController.index");
  Route.post("simpan", "UserController.simpan");
  Route.delete("hapus", "UserController.hapus");
  Route.put("ubah", "UserController.ubah");
})
  .prefix("/api")
  .middleware("auth");

Route.post("login", "UserController.login");
