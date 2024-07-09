import { render, screen } from "@testing-library/react";
import { getMonth } from ".";


describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", async () => {
            render(<div>{getMonth(new Date("2022-01-01"))}</div>)
            await screen.findByText("janvier")
        });
        it("the function return juillet for 2022-07-08 as date", async () => {
            render(<div>{getMonth(new Date("2022-07-08"))}</div>)
            await screen.findByText("juillet")
        });
    });
})

