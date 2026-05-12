import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/products')({
  component: RouteComponent,
  loader: async () => {
    const res = await fetch('http://localhost:3000/api/products')
    if (!res.ok) {
      return { products: null }
    }

    const data = await res.json()
    return {
      products: data,
    }
  },
})

function RouteComponent() {
  const { products } = Route.useLoaderData()
  //   const {id}=Route.useParams()
  if (!products) return <div>no products</div>
  if (!products?.data?.length) return <div>no datas</div>

  return (
    <div className="grid gap-4 p-6 grid-cols-3 ">
      {products.data.splice(0,10).map((product) => {
        const { id, title, description, price, category, image } = product ?? {}
        const pId=String(id)
        // console.log("id",pId,"type of id", typeof pId)
        return (
          <Link key={pId} to="/product/$id" params={{id}}>
            <div className="max-w-sm rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
              <img
                src={image}
                alt={title}
                loading='lazy'
                className="h-48 w-full object-contain rounded-lg"
              />

              <div className="mt-4 space-y-2">
                <h2 className="text-lg font-semibold">{title}</h2>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${price}</span>

                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
