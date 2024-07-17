"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
//const BN = require('bn.js'); This isn't necessary now
import { Loader2 } from "lucide-react";


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
import { Result } from "postcss";


//This component
export function SearchProperty_Menu() { 

    const formatBigNumber = (item : any) => {
      console.log(item)
      const num = Number(item.$bigint);
      console.log(num);
      return num;
    }

    const formatDate = (item : any) => {
        const unixDate : number = Number(item.$bigint)        
        const date : Date = new Date(unixDate * 1000);
        console.log("Date in UNIX format: " + unixDate + "\n");
        console.log("Date:" + date.toLocaleDateString() + "\n");
        return date.toLocaleDateString();
    }
    
    const [data, setData] = useState({
        ownerId: "",
        wallet: "",
        notary: "",
        propId: ""
    });


    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState([]);

    const [loadingButton, setLoadingButton] = useState('');

    const handleChange = (event : any) => {
        const { name, value } = event.target;

        setData(values => ({
            ...values,
            [name]: value,
        }))
        
    }


    async function handleByIdSearch(event: any) {
        event.preventDefault();
        const url = process.env.NEXT_PUBLIC_SERVER_URL;
        try {
            setLoadingButton("ownerId");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getPropertiesByOwnerId?ownerId=${data.ownerId}`, {
                method: "GET"
            });

            const result = await response.json();

            console.log(result);
            setDialogData(result);
            setIsDialogOpen(true);

        } catch (error : any) {
          alert(error.message);
            console.log(error.message);
        } finally {
          setLoadingButton("");
          setIsDialogOpen(true);
        }
        
    }

    async function handleByWallet(event: any) {
        event.preventDefault();
        const url = process.env.NEXT_PUBLIC_SERVER_URL;
        try {
            setLoadingButton("wallet");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getPropertiesByOwnerWallet?wallet=${data.wallet}`, {
                method: "GET"
            });
            
            const result = await response.json();
            console.log(result);
            setDialogData(result);
            setIsDialogOpen(true);
            setLoadingButton("wallet");

        } catch (error : any) {
            setDialogData(error.message);
            setIsDialogOpen(true);
            console.log(error.message);
        } finally {
          setLoadingButton("");
          setIsDialogOpen(true);
        }
        
    }

    async function handleByNotary(event: any) {
      event.preventDefault();
      const url = process.env.NEXT_PUBLIC_SERVER_URL;
      try {
          setLoadingButton("notary");
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getPropertiesByNotary?notary=${data.notary}`, {
              method: "GET"
          });
          
          const result = await response.json();
          console.log(result);
          setDialogData(result);
          


      } catch (error : any) {
        alert(error.message);
          console.log(error.message);
      } finally {
        setLoadingButton("");
        setIsDialogOpen(true);
      }
    }
      async function handleByPropId(event: any) {
        event.preventDefault();
        const url = process.env.NEXT_PUBLIC_SERVER_URL;
        try {
            setLoadingButton("propId");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getPropertyById?propId=${data.propId}`, {
                method: "GET"
            });
            
            const result = await response.json();
            console.log(result);
            setDialogData(result);
            
            
  
  
        } catch (error : any) {
            alert(error.message);
            console.log(error.message);
        } finally {
          setLoadingButton("");
          setIsDialogOpen(true);
        }
  }

    return(
        <>
        <section>
        <h2 className="text-3xl font-bold mb-4 text-white">Search properties</h2>
        <h3>Remember, no data will appe</h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Input 
            name="ownerId"
            value={data.ownerId}
            onChange={handleChange}
            placeholder="Owner ID" />
            <Button className="text-white border" onClick={handleByIdSearch}>
              {loadingButton == "ownerId" ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <></>}
              Search
            </Button>
          </div>
          <div className="flex space-x-4">
            <Input placeholder="Wallet"
            name="wallet"
            value={data.wallet} 
            onChange={handleChange}/>
            <Button className="text-white border" onClick={handleByWallet}>
              {loadingButton == "wallet" ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <></>}
              Search</Button>
          </div>
          <div className="flex space-x-4">
            <Input placeholder="Notary"
            name="notary"
            value={data.notary}
            onChange={handleChange}
            />
            <Button className="text-white border" onClick={handleByNotary}>
              {loadingButton == "notary" ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <></>}
              Search
            </Button>
          </div>
          <div className="flex space-x-4">
            <Input placeholder="Property Id"
            name="propId"
            value={data.propId}
            onChange={handleChange}
            />
            <Button className="text-white border" onClick={handleByPropId}>
              {loadingButton == "propId" ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <></>}
              Search
            </Button>
          </div>

          {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
             <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <DialogContent className="max-w-full p-4  rounded-md">
              <DialogHeader>
                 <DialogTitle>Search Results</DialogTitle>
             </DialogHeader>
            
            <table className="results-table min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th>Prop. Num.</th>
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
                  {dialogData.map(item => 
                    <tr key={"prop-" + formatBigNumber(item[0])}>
                      <td className="px-6 py-4 whitespace-nowrap">{formatBigNumber(item[0])}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[1]}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[2]}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[3]}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[4]}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatBigNumber(item[5])}</td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">{formatBigNumber(item[7])}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatDate(item[8])}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[9]}</td>

                    </tr>
                    
                 )}
                </tbody>
              </table>
            

          </DialogContent>
          </div>
        </Dialog>
      )}

        </div>
      </section>
      
      </>
    );

}