import {DataElementGroup} from "./mod.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {MESSAGE_SENDER} from "../dataelements/constants.ts";
import {Empty} from "../dataelements/empty.ts";
import format from "https://deno.land/x/date_fns@v2.15.0/format/index.js";
export class SecurityDate extends DataElementGroup<SecurityDate>{
    constructor(
        public code = new Numeric(1),
        public date: Date = new Date(),
    ) {
        super();
    }

    deserialize(str: string): SecurityDate {
        return this;
    }

    serialize(): string {
        // const dataElements = [this.code, this.cid ?? new Empty(), this.id ?? new Empty()];
        // return DataElementGroup.serializeDataElements(dataElements);
        return `${this.code.serialize()}:${format(this.date, 'yyyyMMdd',null)}:${format(this.date, 'HHMMss',null)}`;
    }
}
