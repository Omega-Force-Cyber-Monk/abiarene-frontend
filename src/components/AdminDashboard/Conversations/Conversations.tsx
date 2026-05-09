import ConversationsCard from "./ConversationsCard";
import ConversationsTable from "./ConversationsTable";

const Conversations = () => {
  return (
    <div className=" space-y-6">
      <ConversationsCard />
      <ConversationsTable />
    </div>
  );
};

export default Conversations;
