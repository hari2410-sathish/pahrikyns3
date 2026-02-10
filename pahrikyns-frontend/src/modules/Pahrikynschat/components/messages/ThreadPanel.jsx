import { listenReplies, sendReply } from "../../api/threadApi";

export default function ThreadPanel({ message, onClose }) {
  const [replies, setReplies] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    return listenReplies(message.id, setReplies);
  }, []);

  const send = () => {
    sendReply(message.id, {
      text,
      user: currentUser.name,
    });
    setText("");
  };

  return (
    <div className="thread-panel">
      <h3>Thread</h3>

      <div className="parent">{message.text}</div>

      {replies.map(r => (
        <div key={r.id}>{r.user}: {r.text}</div>
      ))}

      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
