import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NodeModule } from "./node/node.module";
import { Node } from "./node/node.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "haosql",
      database: "freebe-local",
      entities: [Node],
      synchronize: true,
    }),
    NodeModule,
  ],
})
export class AppModule {}
