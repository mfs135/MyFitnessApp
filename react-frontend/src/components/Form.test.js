import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";


describe("Form Content", () => {
    //Test to see if AddGoal form submits correct data.
    test("AddGoal form submits correct data", () => {
      const mockOnSubmit = jest.fn();
      const modalId = "addGoalModal";
    
      render(<Form type="AddGoal" onSubmit={mockOnSubmit} modalId={modalId} />);
    
      // Open the modal by clicking the button
      const openModalButton = screen.getByRole("button",{ name: /add new goal/i });
      fireEvent.click(openModalButton);
    
      // Fill in the form fields
      const goalNameInput = screen.getByLabelText("Goal Name");
      fireEvent.change(goalNameInput, { target: { value: "New Goal" } });
    
      const durationInput = screen.getByLabelText("Duration");
      fireEvent.change(durationInput, { target: { value: "60" } });
    
      // Submit the form
      const submitButton = screen.getByText("Add Goal");
      fireEvent.click(submitButton);
    
      // Assert the onSubmit function is called with the correct data
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "New Goal",
        target_duration: 60,
      });
    });

    //Test to check if EditGoal works.
    test("EditGoal form fields entry and submits updated data", () => {
        const mockOnSubmit = jest.fn();
        const modalId = "editGoalModal";
        const existingGoal = {
          id: 1,
          title: "Existing Goal",
          target_duration: 120,
          progress: 30,
        };
      
        render(
          <Form
            type="EditGoal"
            onSubmit={mockOnSubmit}
            goal={existingGoal}
            modalId={modalId}
          />
        );
      
        const modal = screen.getByTestId("editgoalID");
        fireEvent.click(modal);
      
        expect(screen.getByLabelText("Goal Name").value).toBe("Existing Goal");
        expect(screen.getByLabelText("Target Duration").value).toBe("120");
        expect(screen.getByLabelText("Progress").value).toBe("30");
      
        const progressInput = screen.getByLabelText("Progress");
        fireEvent.change(progressInput, { target: { value: "50" } });
      
        const submitButton = screen.getByText("Update Goal");
        fireEvent.click(submitButton);
      
        //call the onSubmit function is called with the updated data
        expect(mockOnSubmit).toHaveBeenCalledWith({
          id: 1,
          title: "Existing Goal",
          target_duration: 120,
          progress: 50,
        });
      });
      
});


