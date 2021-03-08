import { assertEquals } from "https://deno.land/std@0.89.0/testing/asserts.ts";
import {SegmentHead} from "./segmenthead.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {MessageRef} from "./mod.ts";

// @ts-ignore
Deno.test("serialize", () => {
    const serialized = new MessageRef(new Alphanumeric(`0`),new Numeric(0)).serialize();
    const expected = `0:0`;
    assertEquals(serialized, expected);
});
