import {DataElement} from "./dataelement.ts";

/**
 * Numeric Data
 * For more information see volume [Formals] Section B.4 "Datenformate" of the FinTS 3.0 specification
 */
export class Numeric extends DataElement<Numeric>{
    constructor(public num: number) {
        super();
    }

    deserialize(str: string): Numeric {
        return new Numeric(Number(str));
    }

    serialize(): string {
        return DataElement.escape(this.num.toString());
    }
}
