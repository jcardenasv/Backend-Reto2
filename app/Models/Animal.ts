import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Animal extends BaseModel {
  @column({ isPrimary: true }) public codigo_animal: Number;
  @column() public nombre_animal: String;
  @column() public especie: Number;
  @column() public raza: Number;
  @column() public genero: Number;
  @column() public edad: Number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
