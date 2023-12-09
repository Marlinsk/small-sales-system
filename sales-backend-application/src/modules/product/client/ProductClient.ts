import axios from "axios";

import { PRODUCT_API_URL } from "../../../shared/constants/secrets";

type Products = {
  productId: string;
  quantity: number;
}

class ProductClient {
  async checkProductStock(productData: Array<Products>, token: string, transactionid: string) {
    try {
      const headers = {
        Authorization: token,
        transactionid
      };
      console.info(
        `Sending request to Product API with data: ${
          JSON.stringify(productData)
        } and transactionID: ${transactionid}`
      );
      let response = false;
      await axios
        .post(
          `${PRODUCT_API_URL}/check-stock`, 
          { products: productData }, 
          { headers }
        )
        .then((res) => {
          console.info(
            `Success response from Product-API. transactionID: ${transactionid}`
          );
          response = true;
        })
        .catch((error: any) => {
          console.error(
            `Error response from Product-API. transactionID: ${transactionid}`
          );
          response = false;
        });
      return response;
    } catch (error) {
      console.error(
        `Error response from Product-API. transactionID: ${transactionid}`
      );
    }
  }
}

export default new ProductClient();
