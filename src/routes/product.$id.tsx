import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
  loader: async ({ params }) => {
    const {id}=params
    // console.log(id,typeof id)
    const res = await fetch(
      `http://localhost:3000/api/products/${id}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await res.json();

    return {
      product: data.data,
    };
  },

  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { product } = Route.useLoaderData();

  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/products/${product?.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      alert("Product deleted successfully");

      navigate({ to: "/products" });
    } catch (error) {

      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-white p-8 shadow-lg md:grid-cols-2">
        
        {/* IMAGE */}
        <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-10">
          <img
            src={product.image}
            alt={product.title}
            className="h-100 object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="rounded-full bg-black px-4 py-1 text-sm text-white">
              {product.category}
            </span>

            <h1 className="mt-5 text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {product.description}
            </p>

            <div className="mt-8">
              <h2 className="text-5xl font-bold">
                ${product.price}
              </h2>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4">
            <Link
              to="/product/edit/$id"
              params={product.id}
              className="rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="rounded-xl border border-red-500 px-6 py-3 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>

            <Link
              to="/products"
              className="rounded-xl border px-6 py-3 hover:bg-gray-100"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}