import {Alphanumeric} from "./alphanumeric.ts";
import { assertEquals } from "https://deno.land/std@0.89.0/testing/asserts.ts";

// @ts-ignore
Deno.test("serialize", () => {
    const serialized = new Alphanumeric(`Hello World`).serialize();
    const expcted = `Hello World`;
    assertEquals(serialized, expcted);
});
// @ts-ignore
Deno.test("serializeWithSpecialChars", () => {
    const serialized = new Alphanumeric(`+:'?@`).serialize();
    const expcted = `?+?:?'???@`;
    assertEquals(serialized, expcted);
});
