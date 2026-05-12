import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { ProductTable } from '../db/schema';
  
const db = drizzle(process.env.DATABASE_URL!);


interface IProducts{
  title:string,
  description:string,
  price:string,
  category:string

}

export const createProduct=async (data:IProducts)=>{
  // console.log("fun================>>>",data)

  const [res]=await db.insert(ProductTable).values(data).returning()
  // console.log(res)
    // console.log("this is createProduct fucntion")
    return res


}
export const getProducts =async ()=>{
  try {
    const products = await db.select().from(ProductTable);
  if(products.length <=0)
    return []
   
  return products
  } catch (err) {
    console.log(err)
    throw  new Error("query fail")
  }

}

export const getProductById=async (id:string)=>{
  try {
    // console.log(id)
  const pId = (Number)(id)
  // console.log(typeof pId)
  const [data]=await db.select().from(ProductTable).where(eq(ProductTable.id,pId))
  // console.log(data)
  return data
    
  } catch (error) {
    console.log("error during get product by id query",error)
    throw new Error("get by id error")
    
  }
 

}
export const updateProductById=async (data:IProducts,{id})=>{
  // console.log(data,id)
  const [res]=await db.update(ProductTable).set(data).where(eq(ProductTable.id,id)).returning()
  // console.log(res)
  return res

}
export const deleteProductById=async (id)=>{
     await db.delete(ProductTable).where(eq(ProductTable.id, id));
    return { success: true };
    // console.log(result)

}



