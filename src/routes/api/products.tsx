import { createProduct, getProducts } from '#/db'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/products')({
  server: {
    handlers: {
      GET: async () => {
        // console.log("get function triggered!")
        try {
          const data = await getProducts()
          // console.log(data)
          return Response.json({
            msg: 'get function triggerd!',
            data: data,
          })
        } catch (error) {
          console.log(err)
          throw Error('api fail')
        }
      },
      POST: async ({ request }) => {
        const body = await request.json()

        // console.log('post method triggered')
        // console.log(body)
        const res = await createProduct(body)

        return Response.json({
          msg: 'Products Created Successfully!',
          data: res,
        })
      },
    },
  },
})
