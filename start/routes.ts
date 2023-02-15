/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  // Animals
  Route.get("/buscar-animal/:codigo", "AnimalsController.getAnimal");
  Route.get("/listar-animales", "AnimalsController.getAnimals");
  Route.get("/filtra-especie", "AnimalsController.getAnimalsBySpecies");
  Route.get("/animales-menores", "AnimalsController.getAnimalsByAge");
  Route.post("/ingresar-registro", "AnimalsController.setAnimal");

  Route.put("/actualizar-registro/:codigo", "AnimalsController.updateAnimal");
  Route.delete("/borrar-registro/:codigo", "AnimalsController.deleteAnimal");
}).prefix("/api");
