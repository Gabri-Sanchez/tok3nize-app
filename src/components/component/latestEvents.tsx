"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";



export function LatestEvents() {
    
    const [seeCreations, setSeeCreations] = useState(true);
    const [creationsData, setCreationsData] = useState([]);
    const [deletionsData, setDeletionsData] = useState();
    const [transfersData, setTransferData] = useState();
    const [isUpdating, setIsUpdating] = useState(false);
    
    enum eventType {
      Creation,
      Deletion,
      Transfer
    }

    const formatBigNumber = (item : any) => {
      console.log(item)
      const num = Number(item.$bigint);
      console.log(num);
      return num;
    }


    const[showEvent, setShow] = useState(eventType.Creation);



    async function handleGetCreations(event: any) {
        event.preventDefault();

        setShow(eventType.Creation);
        setIsUpdating(true);
        const url = process.env.NEXT_PUBLIC_SERVER_URL;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getCreations`, {
                method: "GET"
            });

            const result = await response.json();

            console.log(result);
            setCreationsData(result);
        } catch (error : any) {
            console.log(error.message);
        } finally {
          setIsUpdating(false);
        }
        
    }

    useEffect(() => {
      setInterval(() => handleGetCreations(new Event('')), 10000)
    })

    useEffect(() => {
      handleGetCreations(new Event(''))
    }, [])

    async function handleGetTransfers(event: any) {
      event.preventDefault();

      setShow(eventType.Creation);
      
      const url = process.env.NEXT_PUBLIC_SERVER_URL;
      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getCreations`, {
              method: "GET"
          });

          const result = await response.json();

          console.log(result);

      } catch (error : any) {
          console.log(error.message);
      }
      
  }
  async function handleGetDeletions(event: any) {
    event.preventDefault();

    setShow(eventType.Creation);
    
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getCreations`, {
            method: "GET"
        });

        const result = await response.json();

        console.log(result);

    } catch (error : any) {
        console.log(error.message);
    }
    
  }

    const renderData = () => {
      switch (showEvent) {
        case eventType.Creation:
          return <table className="w-full text-left">
          <thead>
            <tr>
              <th>Property ID</th>
              <th>Owner Id</th>
              <th>Owner Wallet</th>
            </tr>
          </thead>
          <tbody>
            {creationsData.map((item : any) => 
              <tr key={"eventId-" + formatBigNumber(item.property)}>
                <td>{formatBigNumber(item.property)}</td>
                <td>{item.owner}</td>
                <td>{item.wallet}</td>
              </tr>
            )}
          </tbody>
        </table>;
        
        /* Deletions and transfers are not implemented
        
        case eventType.Deletion:
          return <div>Type B</div>;
        case eventType.Transfer:
          return <div>Type C</div>;
          <table className="w-full text-left">
          <thead>
            <tr>
              <th>Origin Wallet</th>
              <th>Destination Wallet</th>
              <th>Prop. Num.</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      */}
    };


    return(
        <section className="mb-8">
        <div className="">
            <h1 className="text-4xl font-bold mb-5">Latest Properties Created
              <Button>
                <RefreshCcw className={isUpdating ? "mr-2 h-4 w-4 animate-spin" : ""} onClick={handleGetCreations}></RefreshCcw>
              </Button>
            </h1>
            {/* For now, we only see the latest creations
            <h1 className="text-4xl font-bold mb-5">Latest Events</h1>
            <Button className="mt-4 text-white border mb-5 mr-5" onClick={handleGetCreations}>Creations</Button>
            <Button className="mt-4 text-white border mb-5 mr-5">Deletions</Button>
            <Button className="mt-4 text-white border mb-5">Transfers</Button> */}
        </div>
        {renderData()}
      </section>
    );
}