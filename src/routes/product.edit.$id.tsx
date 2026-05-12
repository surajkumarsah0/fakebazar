import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/product/edit/$id')({
  loader: async ({ params }) => {
    const {id}=params
    const res = await fetch(`https://fakebazar.netlify.app/api/products/${id}`)

    if (!res.ok) {
      throw new Error('Failed to fetch product')
    }

    const data = await res.json()

    return {
      product: data.data,
    }
  },

  component: RouteComponent,
})

function RouteComponent() {
  const { product } = Route.useLoaderData()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(
      `https://fakebazar.netlify.app/api/products/${product.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(formData),
      }
    )

    if (!res.ok) {
      alert('Failed to update product')
      return
    }

    alert('Product updated successfully')

    navigate({ to: '/products' })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md rounded-xl p-6"
      >
        <label htmlFor="title" className='font-bold p-4'>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
  <label htmlFor="description" className='font-bold p-4'>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          rows={4}
        />
  <label htmlFor="price" className='font-bold p-4'>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
  <label htmlFor="category" className='font-bold p-4'>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
  <label htmlFor="image" className='font-bold p-4'>Image Link</label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}