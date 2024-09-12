import { DataSource } from "typeorm";
import { Node } from "../../entities/Node";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "192.168.31.253",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Node],
});