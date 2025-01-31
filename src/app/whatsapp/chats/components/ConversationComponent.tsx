import { ConversationProp } from "@/interfaces/conversation-interface";
import { Avatar } from "@/components/ui/avatar";

export default function ConversationComponent({
  id,
  name,
  lastMessage,
  avatar,
  time,
}: ConversationProp) {
  return (
    <div
      key={id}
      className="flex items-center gap-4 p-4 dark:hover:bg-black hover:bg-gray-100 cursor-pointer transition-colors"
    >
      <div className="relative flex-shrink-0">
        <Avatar className="h-12 w-12">
          <img src={avatar} alt={name} />
        </Avatar>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate">{name}</h3>
          <span className="text-sm text-gray-500 flex-shrink-0">
            {time.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
        </div>
      </div>
    </div>
  );
}
