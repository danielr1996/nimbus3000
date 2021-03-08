import {assertEquals} from "https://deno.land/std@0.89.0/testing/asserts.ts";
import {HNHBK} from "./HNHBK.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";
import {Digit} from "../dataelements/digit.ts";
import {MessageRef} from "../dataelementsgroups/messageref.ts";
//@ts-ignore
Deno.test("serializeWithMsgRef", () => {
    const serialized = new HNHBK(new Numeric(1,), new Digit(137), new Numeric(300), new Alphanumeric(`dialogId`), new Numeric(42), new MessageRef(new Alphanumeric(`0`), new Numeric(1))).serialize();
    const expected = `HNHBK:1:3+000000000137+300+dialogId+42+0:1`;
    assertEquals(serialized, expected);
});

//@ts-ignore
Deno.test("serializeWithoutMsgRef", () => {
    const serialized = new HNHBK(new Numeric(1,), new Digit(137), new Numeric(300), new Alphanumeric(`dialogId`), new Numeric(42)).serialize();
    const expcted = `HNHBK:1:3+000000000137+300+dialogId+42`;
    assertEquals(serialized, expcted);
});
