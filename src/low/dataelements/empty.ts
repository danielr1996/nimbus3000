import {DataElement} from "./dataelement.ts";

/**
 * Represents a optional DataElement or DataElementGroup that is not present
 * For more information see volume [Formals] Section H.1.5 "Auslassen von Datenstrukturen" of the FinTS 3.0 specification
 */
export class Empty extends DataElement<Empty>{
    serialize(): string {
        return "";
    }

    deserialize(str: string): Empty {
        return this;
    }

}
