import {DataElement} from "./dataelement.ts";

/**
 * Alphanumeric Data (without CR and LF)
 * For more information see volume [Formals] Section B.4 "Datenformate" of the FinTS 3.0 specification
 */
export class Alphanumeric extends DataElement<Alphanumeric>{
    constructor(public str: string) {
        super();
    }

    deserialize(str: string): Alphanumeric {
        return new Alphanumeric(DataElement.unescape(str));
    }

    serialize(): string {
        return DataElement.escape(this.str);
    }
}
