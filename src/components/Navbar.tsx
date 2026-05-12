import { Link } from "@tanstack/react-router"

export const Navbar=()=>{


    return(
        <>
        <nav className="p-8 bg-amber-50 ">
        <div className="flex justify-around">
            <h1 className="text-3xl font-bold text-red-900">SHOP<span className="text-violet-700">DOT</span>COM</h1>

            <Link to='/products' className="text-xl font-bold text-green-600">Products</Link>
            <Link to='/product/create' className="text-xl font-bold text-green-600">Create Products +</Link>
        </div>
        </nav>
        </>
    )
}