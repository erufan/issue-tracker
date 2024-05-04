import { Button } from "@radix-ui/themes";
import Link from "next/link";

const issuesPage = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">new issue</Link>
      </Button>
    </div>
  );
};

export default issuesPage;
