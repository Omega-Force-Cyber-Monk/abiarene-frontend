import IssueCategory from "@/components/ManagerDashboard/Support/IssueCategory";
import ManagerTicketQueue from "@/components/ManagerDashboard/Support/ManagerTicketQueue";

const SupportPage = () => {
  return (
    <div>
      <IssueCategory />
      <ManagerTicketQueue />
    </div>
  );
};

export default SupportPage;
