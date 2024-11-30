import { render, screen, waitFor } from "@testing-library/react";
import StatsContent from "./StatsContent";
import AuthUser from "../components/AuthUser";

// Mock dependencies
jest.mock('../components/AuthUser', () => {

    const mockHttp = {
        get: jest.fn() // Mock the get method
        };
    return {
        __esModule: true,
        default: () => ({
            http: mockHttp
        }),
    };
});

describe("StatsContent", () => {

    //Test to check if Stats Content renders properly.
    test("fetchs excercises names and details properly and renders", async () => {
        const mockStatsData = {
            stats: [
              {
                name: "Running",
                details: [{ date: "2023-01-01", value: 5 }, { date: "2023-01-02", value: 10 }],
              },
              {
                name: "Cycling",
                details: [{ date: "2023-01-01", value: 8 }, { date: "2023-01-02", value: 15 }],
              },
            ],
          };
        
        const mockget = jest.fn().mockResolvedValue({data: mockStatsData});

        //Setup Mock Get request, to give dummy data to get all-goal-data request and send to StatsGraph Component.
        AuthUser().http.get = mockget;

        //Render File.
        render(<StatsContent />);
        //Check if theres loading... before content 
        expect(screen.getByTestId("loadingID")).toBeInTheDocument();
    
        //wait until loading is not on the screen anymore.
        await waitFor(() => {
            expect(screen.queryByTestId("loadingID")).not.toBeInTheDocument();
        })

        //Check if things are getting rendered.

        expect(screen.getByText("Exercise Statistics")).toBeInTheDocument();
        expect(screen.getByText("Running")).toBeInTheDocument();
        expect(screen.getByText("Cycling")).toBeInTheDocument();

    });

});