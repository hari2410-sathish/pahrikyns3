import { useMemo } from "react";
import { matchQuery } from "../utils/messageFormatter";

export default function useMessageSearch(messages, query, filters) {
  return useMemo(() => {
    return messages.filter((m) =>
      matchQuery(m, query, filters)
    );
  }, [messages, query, filters]);
}
