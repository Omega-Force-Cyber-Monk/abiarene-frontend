import TicketQueue from "@/components/AdminDashboard/TicketQueue/TicketQueue";
import IssueCategory from "@/components/ManagerDashboard/Support/IssueCategory";

const SupportPage = () => {
  return (
    <div>
      <IssueCategory />
      <TicketQueue />
    </div>
  );
};

export default SupportPage;
