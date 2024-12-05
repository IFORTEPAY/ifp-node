import { ApiClient } from "./api/apiClient";
import { ApiConfig } from "./api/apiConfig";
import { Card } from "./card/card";
import { ApiConfigOptions } from "./util/type";

class IFortepay {
  private apiConfig: ApiConfig;
  private apiClient: ApiClient;
  card: Card;

  constructor(options: ApiConfigOptions) {
    this.apiConfig = new ApiConfig(options);
    this.apiClient = new ApiClient(this.apiConfig);

    this.card = new Card(this.apiClient);
  }
}

export default IFortepay;
