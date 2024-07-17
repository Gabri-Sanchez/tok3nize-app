
"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
const { stringify, parse } = require('flatted');
import { useRouter } from "next/router";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Loader2 } from "lucide-react";
import { CreateManual } from "./createManual";
import { Sue_Ellen_Francisco } from "next/font/google";

export function CreateProperty_Menu() {

  const [ownerName, setOwnerName] = useState();
  const [surface, setSurface] = useState();
  const [ownerId, setOwnerId] = useState();
  const [ownerWallet, setOwnerWallet] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState();
  const [notary, setNotary] = useState();
  const [registry, setRegistry] = useState();

  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOwnerNameChange = (e: any) => setOwnerName(e.target.value);
  const handleSurfaceChange = (e: any) => setSurface(e.target.value);
  const handleOwnerIdChange = (e: any) => setOwnerId(e.target.value);
  const handleOwnerWalletChange = (e : any) => setOwnerWallet(e.target.value);
  const handleLocationChange = (e : any) => setLocation(e.target.value);
  const handlePriceChange = (e : any) => setPrice(e.target.value);
  const handleDateChange = (e : any) => setDate(e.target.value);
  const handleNotaryChange = (e : any) => setNotary(e.target.value);
  const handleRegistryChange = (e: any) => setRegistry(e.target.value);

  async function handleSubmit(event: any) {
    event.preventDefault();
    try{
    setIsLoading(true);
    const unixDate : Number = Math.floor(Date.now() / 1000);
    const data = {
      property: {
        propId: 0,
        owner: ownerName,
        ownerId: ownerId,
        wallet: ownerWallet,
        location: location,
        surface: parseInt(surface || "0"),
        registry: registry,
        purchase_price: parseInt(price || "0"),
        date: unixDate,
        notary: notary
      }
    }
    
    console.log("Data: " + JSON.stringify(data))
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/createBuilding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    },)

    const result = await response.json();
    console.log('Success:', result);
  } catch(error) {
    console.log(error);
  } finally {
    setIsLoading(false);
    setIsDialogOpen(true);
  }
   
}

  const toDate = (item : any) => {
    const unixDate : number = Number(item)        
    const date : Date = new Date(unixDate * 1000);
    console.log("Date in UNIX format: " + unixDate + "\n");
    console.log("Date:" + date.toLocaleDateString() + "\n");
    return date.toLocaleDateString();
}
    return(
        <section>
          <div className="flex items-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Create property
            
          </h2>
          <CreateManual buttonClassName={"ml-4 px-4 py-2 border rounded text-white"} contentClassName={"bg-black text-white border border-white rounded p-4 max-w-sm w-full overflow-auto"}></CreateManual>
          </div>
          <form method="post" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input value={ownerName} onChange={handleOwnerNameChange} placeholder="Owner Name" />
            <Input value={surface} onChange={handleSurfaceChange} placeholder="Surface" />
            <Input value={ownerId} onChange={handleOwnerIdChange} placeholder="Owner ID" />
            <Input value={price} onChange={handlePriceChange} placeholder="Price" />
            <Input value={ownerWallet} onChange={handleOwnerWalletChange} placeholder="Wallet" />
            {/*<Input value={date} onChange={handleDateChange} placeholder="Date" type="date" />*/}
            <Input value={location} onChange={handleLocationChange} placeholder="Location" />
            <Input value={notary} onChange={handleNotaryChange} placeholder="Notary" />
            <Input value={registry} onChange={handleRegistryChange} placeholder="Registry" />
          </div>
          <Button className="mt-4 text-white border " onClick={handleSubmit}>
            {isLoading? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <></>}
            Create
          </Button>
          </form>
          {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
             <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <DialogContent className="max-w-full p-4  rounded-md">
              <DialogHeader>
                 <DialogTitle>Property Created Successfully</DialogTitle>
             </DialogHeader>
             <table className="results-table min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>

                    <th>Owner</th>
                    <th>ID</th>
                    <th>Wallet</th>
                    <th>Location</th>
                    <th>Surface</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Notary</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">{ownerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{ownerId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{ownerWallet}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{surface}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(Date.now()).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{notary}</td>

                    </tr>
                    
               
                </tbody>
              </table>
          </DialogContent>
          </div>
        </Dialog>
      )}
        </section>
    );
}