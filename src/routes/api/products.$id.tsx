import { deleteProductById, getProductById, updateProductById } from '#/db'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/products/$id')({
    server:{
        handlers:{
            GET:async({params})=>{
                const {id}=params
                // console.log(id)
                // console.log(typeof id)
               const res=await getProductById(id)

               return Response.json({
                mdg:`product of id:${id} fetched`,
                data:res
               })

            },

            PATCH:async ({request,params})=>{
                const body=await request.json()
                const {id}=params
                // console.log(body)
                // console.log(id)
                const res=await updateProductById(body,{id})
                return Response.json({
                    msg:`product of id:${id} is updated!`
                   , res
                })


            },
            DELETE:async ({params})=>{
                const {id}=params
                const res=await deleteProductById(id)
                return Response.json({
                    msg:`product of id:${id} deleted!`,
                    res
                })

            }

        }
    }
 
})

