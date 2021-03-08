
import {DataElementGroup} from "./mod.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {Empty} from "../dataelements/empty.ts";

export class SecurityProfile extends DataElementGroup<SecurityProfile>{
    constructor(
        public secProcedure: Alphanumeric,
        public version: Numeric,
    ) {
        super();
    }

    deserialize(str: string): SecurityProfile {
        return this;
    }

    serialize(): string {
        const dataElements = [this.secProcedure, this.version];
        return DataElementGroup.serializeDataElements(dataElements);
    }
}
