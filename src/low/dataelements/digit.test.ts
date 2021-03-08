import {Digit} from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.89.0/testing/asserts.ts";

// @ts-ignore
Deno.test("serialize 12", () => {
    const serialized = new Digit(1).serialize();
    const expected = `000000000001`;
    assertEquals(serialized, expected);
});
