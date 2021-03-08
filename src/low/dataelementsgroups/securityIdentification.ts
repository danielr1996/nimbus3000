import {DataElementGroup} from "./mod.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {MESSAGE_SENDER} from "../dataelements/constants.ts";
import {Empty} from "../dataelements/empty.ts";

export class SecurityIdentification extends DataElementGroup<SecurityIdentification>{
    constructor(
        public code = MESSAGE_SENDER,
        public cid?: Numeric,
        public id?: Numeric,
    ) {
        super();
    }

    deserialize(str: string): SecurityIdentification {
        return this;
    }

    serialize(): string {
        const dataElements = [this.code, this.cid ?? new Empty(), this.id ?? new Empty()];
        return DataElementGroup.serializeDataElements(dataElements);
    }
}
