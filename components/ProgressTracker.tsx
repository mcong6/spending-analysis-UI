import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

interface progressTrackerProps {
  activeStep: Number;
}
const ProgressTracker = ({ activeStep }: progressTrackerProps) => {
  const steps = ["Upload File", "Configuration", "Final Reveiw"];

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ProgressTracker;
