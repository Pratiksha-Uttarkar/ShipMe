// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/api/v1/test", async (e) => {
    console.log("=======+++=======");
    console.log(e);
    let data = [];
    return fetch("http://localhost:3000/api/v1/category")
      .then((res) => res.json())
      .then((json) =>
        HttpResponse.json({
          data: json.data,
        })
      );
  }),
];
