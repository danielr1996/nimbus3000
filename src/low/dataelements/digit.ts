import {DataElement} from "./dataelement.ts";
import { Reflect } from "https://deno.land/x/reflect_metadata@v0.1.12/mod.ts";

/**
 * Digital Data (Padded to <length> char length)
 * For more information see volume [Formals] Section B.4 "Datenformate" of the FinTS 3.0 specification
 */
export class Digit extends DataElement<Digit>{
    protected length: number = 12;
    constructor(public num: number) {
        super();
    }


    deserialize(str: string): Digit {
        return new Digit(Number(str));
    }

    serialize(): string {
        //@ts-ignore
        return this.num.toString().padStart(this.length,`0`);
    }
}
