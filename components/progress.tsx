import React from "react";
import { Progress } from "antd";

type ProgressBarProps = {
    progressValue: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progressValue }) => (
    <Progress percent={progressValue} showInfo={false} />
);

export default ProgressBar;
