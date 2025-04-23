import { useEffect, useState } from "react";
import { Ellipsis } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import useUserStore from "@/zustand_store/userStore";
import { Preloader } from "@/components/common/preloader";
import { handleDeleteProduct, handleGetOwnerCarList } from "@/services/productServices";

export const OwnerCarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCars, setSelectedCars] = useState([]);

  const { user } = useUserStore();
  const username = user?.name;

  useEffect(() => {
    if (!username) return;

    const fetchCars = async () => {
      const data = await handleGetOwnerCarList({username});
      setCars(data.userCars);
      setLoading(false);
    };

    fetchCars();
  }, [username]);

  // Delete product
  const handleDelete = async (id) => {
    handleDeleteProduct({id, selectedCars, setSelectedCars, setCars});
  };

  const mappedCarListings = cars.map((listing) => ({
    id: listing.id,
    image: (
      <img src={JSON.parse(listing.image_url)[0]} alt="" className="w-16 h-10 object-cover rounded-xl"/>
    ),
    title: listing.car_name,
    price: `$${parseFloat(listing.car_price).toLocaleString()}`,
    rent: `$${parseFloat(listing.car_rent).toLocaleString()}/month`,
  }));

  const toggleSelection = (id) => {
    setSelectedCars((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const allSelected =
  mappedCarListings.length > 0 &&
  mappedCarListings.every((car) => selectedCars.includes(car.id));

  return (
    <div className="py-4 px-16">
      <h1 className="text-2xl font-bold mb-4">Your Listed Cars</h1>

      {loading ? (
        <>
        <div className="flex items-center justify-center h-72">
            <Preloader size={75}/>
        </div>
        </>
      ) : mappedCarListings.length === 0 ? (
        <div className="flex items-center justify-center h-80">
          <div className="flex flex-col w-full text-L-black p-4">
            <p className="text-2xl font-bold text-center">NO CAR AVAILABLE</p>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border !border-L-black overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-L-black hover:bg-L-black">
                <TableHead className="w-10">
                <Checkbox
                  className="!border-yellow"
                  checked={allSelected}
                  onCheckedChange={(checked) =>
                    setSelectedCars(
                      checked ? mappedCarListings.map((car) => car.id) : []
                    )
                  }
                />
                </TableHead>
                <TableHead className="py-4 text-yellow text-xl font-bold">#</TableHead>
                <TableHead className="py-4 text-yellow text-xl font-bold">Car Name</TableHead>
                <TableHead className="py-4 text-yellow text-xl font-bold">Price</TableHead>
                <TableHead className="py-4 text-yellow text-xl font-bold">Rent</TableHead>
                <TableHead className="py-4 text-yellow text-xl font-bold w-1/4">Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappedCarListings.map((car, index) => (
                <TableRow key={index}>
                  <TableCell>
                  <Checkbox
                    checked={selectedCars.includes(car.id)}
                    onCheckedChange={() => toggleSelection(car.id)}
                  />
                  </TableCell>
                  <TableCell className="w-1">{index + 1}</TableCell>
                  <TableCell className="w-1/4">{car.title}</TableCell>
                  <TableCell className="w-40">{car.price}</TableCell>
                  <TableCell className="w-40">{car.rent}</TableCell>
                  <TableCell className="flex gap-28">
                    {car.image}
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger><Ellipsis/></DropdownMenuTrigger>
                      <DropdownMenuContent className="rounded-3xl bg-L-black text-white flex flex-col items-center">
                        <DropdownMenuItem onClick={() => handleDelete(car.id)}
                        className="rounded-full w-full font-bold text-center cursor-pointer justify-center hover:!bg-[#ff3333]">Delete</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-full w-full font-bold text-center cursor-pointer justify-center">Update</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
