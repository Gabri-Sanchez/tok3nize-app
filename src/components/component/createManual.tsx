import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";

export function CreateManual(props : any) {

    const [isOpen, setIsOpen] = useState(false);

    return(
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button className={props.buttonClassName}>How to use</Button>
            </PopoverTrigger>
            <PopoverContent className={props.contentClassName}>
                <p>Fill in each field with the corresponding value of the property you want to create. Remember that the wallet must be entered correctly. One example of wallet is:
                0xDf6E2939FA6A70B9f3F2d84FC06034FACC5392d7
                </p>
            </PopoverContent>
        </Popover>
    );
    
}

