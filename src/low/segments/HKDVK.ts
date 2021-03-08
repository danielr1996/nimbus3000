
import {Segment} from "./segment.ts";
import {SegmentHead} from "../dataelementsgroups/segmenthead.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";

export class HKDVK extends Segment<HKDVK> {
    head: SegmentHead;

    constructor(
        segNo: Numeric,

    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HKDVK'), segNo, new Numeric(2))
    }

    deserialize(str: string): HKDVK {
        return this;
    }

    serialize(): string {
        return `HKDVK:${this.head.segNo}:2+CHF+EUR`;
    }
}
