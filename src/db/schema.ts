
import { integer, numeric, pgTable, text, varchar } from "drizzle-orm/pg-core";



export const ProductTable=pgTable("products",{
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      title: varchar({ length: 255 }).notNull(),
      price:numeric().notNull(),
      description:text(),
      category:text().notNull(),
      image:text().default("https://picsum.photos/seed/product1/300/300xa_29640177.htm")
      

})