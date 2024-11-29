import { render, screen, waitFor } from "@testing-library/react";
import DashboardContent from "./DashboardContent";
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

describe("DashboardContent", () => {
  test("fetches goal data and renders progress and goal cards", async () => {

    const mockget = jest.fn().mockResolvedValue({
        data: {
            progress: 75,
            total_progress: 30,
            daily_progress: 20,
            achieved_goals: [
              { title: "Goal 1",duration: 100, daily_progress: 30 },
              { title: "Goal 2",duration: 200 , daily_progress: 45 },
            ],
            pending_goals: [
              { title: "Goal 3", daily_progress: 40 },
              { title: "Goal 4" , daily_progress: 20 },
            ]      
        }
    });

    // Mock successful API response
    AuthUser().http.get = mockget;

    render(<DashboardContent />);
    // Use act to wrap state updates
  
    // Check if the loading spinner is initially displayed
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();

    // Wait for the component to render content after loading
    await waitFor(() => {
      expect(screen.queryByTestId("loading-container")).not.toBeInTheDocument();
    });

    // Check if progress bar is rendered with correct value
    expect(screen.getByText("Overall Progress")).toBeInTheDocument();
    expect(screen.getByText(/75%/)).toBeInTheDocument();

    // Check if achieved goals are rendered
    expect(screen.getByText("Achieved Goals")).toBeInTheDocument();
    expect(screen.getByText("Goal 1")).toBeInTheDocument();
    expect(screen.getByText("Goal 2")).toBeInTheDocument();

    // Check if pending goals are rendered
    expect(screen.getByText("Pending Goals")).toBeInTheDocument();
    expect(screen.getByText("Goal 3")).toBeInTheDocument();
    expect(screen.getByText("Goal 4")).toBeInTheDocument();
  });

});
