import axios from "axios";

import { PRODUCT_API_URL } from "../../../shared/constants/secrets";

type Products = {
  productId: string;
  quantity: number;
}

class ProductClient {
  async checkProductStock(productData: Array<Products>, token: string): Promise<boolean> {
    try {
      const headers = {
        Authorization: token,
      };
      console.info(
        `Sending request to Product API with data: ${JSON.stringify(productData)}`
      );
      let response = false;
      await axios
        .post(
          `${PRODUCT_API_URL}/check-stock`, 
          { products: productData }, 
          { headers }
        )
        .then((res) => {
          console.log(res);
          response = true;
        })
        .catch((error: any) => {
          console.error(error.message);
          response = false;
        });
      return response;
    } catch (error) {
      return false;
    }
  }
}

export default new ProductClient();
