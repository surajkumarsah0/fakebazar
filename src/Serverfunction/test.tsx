import {db} from "#/db/index.ts"
import { ProductTable } from "#/db/schema";
import { createServerFn } from "@tanstack/react-start";




export const getProductsUsingServerFunction=createServerFn().handler(async ()=>{
     try {
        const products = await db.select().from(ProductTable);
        // console.log("serverside",products)
      if(products.length <=0){
        return {
      msg:"no data available!"
      }}
       
       return {
            msg: 'get function triggerd!',
            products,
          }

      } catch (err) {
        console.log(err)
        throw  new Error("query fail")
     }
})