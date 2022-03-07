"use strict";

const User = use("App/Models/User");

class UserController {
  responseData(sukses, data) {
    return {
      sukses: sukses,
      data: data,
    };
  }

  async login({ auth, request, response }) {
    try {
      let req = request.only(["email", "password"]);
      let token = await auth.attempt(req.email, req.password, true);
      return response.status(200).json(this.responseData(true, token));
    } catch (e) {
      return response.status(401).json(this.responseData(false, e.message));
    }
  }

  async index({ response }) {
    const users = await User.all();
    return response.status(202).json(this.responseData(true, users));
  }

  async simpan({ request, response }) {
    try {
      const userInfo = request.only(["username", "email", "password"]);
      const user = new User();
      user.username = userInfo.username;
      user.email = userInfo.email;
      user.password = userInfo.password;

      if (await user.save()) {
        return response
          .status(201)
          .json(this.responseData(true, "User berhasil ditambahkan"));
      } else {
        return response
          .status(400)
          .json(this.responseData(false, "User gagal ditambahkan"));
      }
    } catch (error) {
      return response.status(500).json(this.responseData(false, error.message));
    }
  }

  async hapus({ request, response }) {
    try {
      const req = request.only(["id"]);
      const user = await User.findBy("id", req.id);
      if (!user) {
        return response
          .status(400)
          .json(this.responseData(false, "User tidak ditemukan"));
      }
      await user.delete();
      return response
        .status(200)
        .json(this.responseData(true, "User Berhasil dihapus"));
    } catch (e) {
      return response.status(500).json(this.responseData(false, e.message));
    }
  }

  async ubah({ request, response }) {
    try {
      const req = request.only(["id", "username", "email", "password"]);
      const user = await User.findBy("id", req.id);
      if (!user) {
        return response
          .status(400)
          .json(this.responseData(false, "User tidak ditemukan"));
      }
      user.username = req.username;
      user.email = req.email;
      user.password = req.password;
      if (await user.save()) {
        return response
          .status(200)
          .json(this.responseData(true, "User Berhasil diubah"));
      } else {
        return response
          .status(400)
          .json(this.responseData(false, "User gagal diubah"));
      }
    } catch (e) {
      return response.status(500).json(this.responseData(false, e.message));
    }
  }
}

module.exports = UserController;
