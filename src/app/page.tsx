
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import  { SearchProperty_Menu } from "@/components/component/searchProperty_Menu"
import { CreateProperty_Menu } from "@/components/component/createProperty_Menu";
import Image from "next/image";
import { LatestEvents } from "@/components/component/latestEvents";
//import { Main } from "@/components/component/main";

// @author: Gabriel Sánchez (gabrielsanchez.business@proton.me) : Ch3etah blockchain (cheetahblockchain@proton.me)

//////////////////////////////////////////////////////////////////////////
//                     .o;.                               .:o.          //
//                     ;MMNMXko;.    .';c. 'c;'     .;oOXMNMM.          //
//                     ;MN .:xKd' '  WOcM: dN;N0 .. 'd0d:. MM.          //
//                     ;MX     'xNM  WMWM: dMWMK ,MNd.     MM.          //
//                     ;MX   ,xKKKK  WMox: dokMK ,KKKKx'   MM.          //
//                     ;Ml           dxWM: dMNxl           kM.          //
//                     ;, :WWWN, :d;   NM: dM0   :x, :WWWN, l.          //
//                        ,kWMMMOlcc;  NM: dM0  :c:l0MMMXd.             //
//                       .l. :OMMMMNc  NM0xKM0  dWMMMMk, .d             //
//                        .dk:.MMMo ,Oc;:::::,xk. xMMX.lOl.             //
//                       .l. ;OMMM ;MMX:     cNMM'.MMMx' .d             //
//                        'dk; MMM :MMMMN' :WMMMM'.MMN.lOl.             //
//                       .l. ;OMMM  ;OMkc. 'cOMk, .MMMx' .d             //
//                       .WMO;.MMM   ;W:     lW'  .MMN cKMN             //
//                         cXMWMMM    ..     .    .MMMWM0;              //
//                           ,OMMMc               dMMWx.                //
//                       .0;   .dWMWl  k.   'd  dWMNl    cX             //
//                       .MMNl.   :KX  KOooo0k  WO,   .dWMM             //
//                       .MMNMMx.   .  ,.....,  .   ,OMWNMM             //
//                       .MMo.dWMK;    OWMMMNd    cXMXc kMM             //
//                       .MMWNNWMMMNl          .oWMMMNNNWMM             //
//                        ;;;;;;;;;;;,         ,;;;;;;;;;;              //
//////////////////////////////////////////////////////////////////////////


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <LatestEvents></LatestEvents>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black ">
        <CreateProperty_Menu></CreateProperty_Menu>
        <SearchProperty_Menu></SearchProperty_Menu>
      </div>
      <footer className="text-gray-300 pt-10">
        <p>
          Developed by Cheetah Blockchain. Contact at: gabrielsanchez.business@proton.me, cheetahblockchain@proton.me. 
          <a href="https://www.linkedin.com/in/gsanchez-esp" target="_blank">https://www.linkedin.com/in/gsanchez-esp</a>
        </p>
      </footer>
    </div>
  );
}
