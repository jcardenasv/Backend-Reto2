import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Animal from "App/Models/Animal";

export default class AnimalsController {
  public async getAnimal({ request }: HttpContextContract) {
    const codigo = request.param("codigo");
    const animal = await Animal.find(codigo);
    return animal;
  }

  public async setAnimal({ request, response }: HttpContextContract) {
    try {
      const animalData = request.only([
        "codigo_animal",
        "nombre_animal",
        "especie",
        "raza",
        "genero",
        "edad",
      ]);
      const animalCode = animalData.codigo_animal;
      const existentAnimal: Number = await this.verifyAnimal(animalCode);
      if (existentAnimal === 0) {
        await Animal.create(animalData);
        response.status(200).json({ msg: "Animal registrado con exito" });
      } else {
        response
          .status(400)
          .json({ msg: "El codigo animal ya existe en la BD" });
      }
    } catch (err) {
      response.status(500).json({ msg: "Error en el servidor" });
    }
  }

  public async getAnimals(): Promise<Animal[]> {
    const animals = await Animal.all();
    return animals;
  }

  public async getAnimalsBySpecies({ request }: HttpContextContract) {
    const { search } = request.all();
    const animals = await Animal.query().where("especie", "like", `${search}%`);
    return animals;
  }

  public async getAnimalsByAge() {
    const animals = await Animal.query().where("edad", "<", "8");
    return animals;
  }

  public async updateAnimal({ request }: HttpContextContract) {
    const codigo = request.param("codigo");
    const animal = await Animal.findOrFail(codigo);
    const datos = request.all();
    (animal.nombre_animal = datos.nombre_animal),
      (animal.especie = datos.especie),
      (animal.raza = datos.raza),
      (animal.genero = datos.genero),
      (animal.edad = datos.edad),
      await animal.save();
    return { mensaje: "Registro modificado correctamente", estado: 200 };
  }

  public async deleteAnimal({ request }: HttpContextContract) {
    const codigo = request.param("codigo");
    await Animal.query().where("codigo_animal", codigo).delete();
    return { mensaje: "Registro eliminado correctamente", estado: 200 };
  }

  public async verifyAnimal(codigo_animal: Number): Promise<Number> {
    const total = await Animal.query()
      .where({ codigo_animal: codigo_animal })
      .count("*")
      .from("animals");
    return parseInt(total[0]["count(*)"]);
  }
}
