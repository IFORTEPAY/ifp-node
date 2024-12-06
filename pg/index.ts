import { Card } from "./card";
import { PGClient } from "./config/pgClient";
import { PGConfig } from "./config/pgConfig";
import { PGConfigOptions } from "./util/type";

class PG {
  private pgConfig: PGConfig;
  private pgClient: PGClient;
  card: Card;

  constructor(options: PGConfigOptions) {
    this.pgConfig = new PGConfig(options);
    this.pgClient = new PGClient(this.pgConfig);

    this.card = new Card(this.pgClient);
  }
}

export default PG;
