import {Alphanumeric, Numeric, Empty} from "../dataelements/mod.ts";
import {DataElementGroup} from "./dataelementgroup.ts";

/**
 *
 * For more information see volume [Formals] Section B.5.1 "Segmentkopf" of the FinTS 3.0 specification
 */
export class SegmentHead extends DataElementGroup<SegmentHead> {
    constructor(
        public type: Alphanumeric,
        public segNo: Numeric,
        public version: Numeric,
        public segRef?: Numeric,
    ) {
        super();
    }

    deserialize(str: string): SegmentHead {
        // @ts-ignore
        const [type, segNo, version, segRef] = DataElementGroup.deserializeDataElements(str, [Alphanumeric, Numeric, Numeric, Numeric]);
        // @ts-ignore
        return new SegmentHead(type, segNo, version, segRef)
    }

    serialize(): string {
        const dataElements = [this.type, this.segNo, this.version, this.segRef ?? new Empty()];
        return DataElementGroup.serializeDataElements(dataElements);
    }
}
