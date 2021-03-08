/**
 * There seems to be no information in the official specifiction, therefore information is taken from
 * https://github.com/Prior99/fints/blob/6a181fc6a59180d57b526c6e3e50cf15f7953034/packages/fints/src/segments/hkidn.ts#L29
 */
import {DataElementGroup} from "./mod.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {Empty} from "../dataelements/empty.ts";

export class KIK extends DataElementGroup<KIK>{
    constructor(
        public countryCode: Numeric,
        public blz: Alphanumeric,
    ) {
        super();
    }

    deserialize(str: string): KIK {
        //@ts-ignore
        const [countryCode, blz] = DataElementGroup.deserializeDataElements(str, [Numeric, Alphanumeric]);
        // @ts-ignore
        return new KIK(countryCode, blz);
    }

    serialize(): string {
        const dataElements = [this.countryCode, this.blz];
        return DataElementGroup.serializeDataElements(dataElements);
    }
}
