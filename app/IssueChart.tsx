"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress: inProgress, closed }: Props) => {
  const data: { label: string; value: number }[] = [
    { label: "open", value: open },
    { label: "in-progress", value: inProgress },
    { label: "closed", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
