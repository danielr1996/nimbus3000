import { assertEquals } from "https://deno.land/std@0.89.0/testing/asserts.ts";
import {SegmentHead} from "./segmenthead.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";
import {Numeric} from "../dataelements/numeric.ts";

// @ts-ignore
Deno.test("serialize", () => {
    const serialized = new SegmentHead(new Alphanumeric('HNHBK'), new Numeric(2), new Numeric(3)).serialize();
    const expected = `HNHBK:2:3`;
    assertEquals(serialized, expected);
});
// @ts-ignore
Deno.test("serializeWithSegRef", () => {
    const serialized = new SegmentHead(new Alphanumeric('HNHBK'), new Numeric(2), new Numeric(3), new Numeric(3)).serialize();
    const expected = `HNHBK:2:3:3`;
    assertEquals(serialized, expected);
});
