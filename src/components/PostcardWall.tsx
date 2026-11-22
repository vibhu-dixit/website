import { useState, type FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

type Stamp = "star" | "sun" | "flower";

const stamps: { id: Stamp; mark: string; label: string }[] = [
  { id: "star", mark: "✳", label: "Star" },
  { id: "sun", mark: "☼", label: "Sun" },
  { id: "flower", mark: "✿", label: "Flower" },
];

const PostcardWallContent = () => {
  const postcards = useQuery(api.postcards.list);
  const submit = useMutation(api.postcards.submit);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [stamp, setStamp] = useState<Stamp>("star");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const sendPostcard = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus("");
    try {
      await submit({ name, city, message, stamp });
      setName("");
      setCity("");
      setMessage("");
      setStatus("Postcard received. It will appear here after review.");
    } catch {
      setStatus("The postcard could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="postcard-layout">
      <form className="postcard-form" onSubmit={sendPostcard}>
        <div className="postcard-form-top"><span>WRITE A POSTCARD</span><span>NO. 001</span></div>
        <p>Send a small note from wherever you are.</p>
        <label htmlFor="postcard-name">Your name <span>(optional)</span></label>
        <input id="postcard-name" maxLength={40} value={name} onChange={(event) => setName(event.target.value)} placeholder="Anonymous" />
        <label htmlFor="postcard-city">From</label>
        <input id="postcard-city" required minLength={2} maxLength={40} value={city} onChange={(event) => setCity(event.target.value)} placeholder="Your city" />
        <label htmlFor="postcard-message">Your note</label>
        <textarea id="postcard-message" required maxLength={180} rows={4} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="A thought, a hello, or a good question…" />
        <div className="postcard-stamp-label">CHOOSE A STAMP</div>
        <div className="postcard-stamps" role="group" aria-label="Choose a stamp">
          {stamps.map((choice) => (
            <button key={choice.id} type="button" aria-label={choice.label} aria-pressed={stamp === choice.id} onClick={() => setStamp(choice.id)}>
              {choice.mark}
            </button>
          ))}
        </div>
        <button className="postcard-submit" type="submit" disabled={sending}>{sending ? "SENDING…" : "SEND POSTCARD ↗"}</button>
        <p className="postcard-status" role="status">{status || "Notes are reviewed before they join the wall."}</p>
      </form>
      <div className="postcard-board" aria-live="polite">
        <div className="postcard-board-top"><span>FROM THE READERS</span><span>{postcards?.length ?? "—"} POSTCARDS</span></div>
        {postcards === undefined ? (
          <p className="postcard-empty">Opening the mail…</p>
        ) : postcards.length === 0 ? (
          <div className="postcard-grid">
            <article className="postcard-card">
              <span className="postcard-card-stamp" aria-hidden="true">✳</span>
              <p>Dear reader, this page is yours too. Leave a thought from wherever you are.</p>
              <div className="postcard-card-byline"><span>Vibhu<br />Editor's note</span></div>
            </article>
          </div>
        ) : (
          <div className="postcard-grid">
            {postcards.map((card) => (
              <article className="postcard-card" key={card._id}>
                <span className="postcard-card-stamp" aria-hidden="true">{stamps.find((item) => item.id === card.stamp)?.mark}</span>
                <p>{card.message}</p>
                <div className="postcard-card-byline"><span>{card.name}<br />{card.city}</span><time dateTime={new Date(card._creationTime).toISOString()}>{new Date(card._creationTime).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</time></div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PostcardWall = () => (
  <section id="postcards" aria-labelledby="postcards-title">
    <div>
      <div className="postcard-heading">
        <span className="eyebrow">// 06 &nbsp; READER CORRESPONDENCE</span>
        <h2 id="postcards-title">POSTCARDS</h2>
        <p>A little space for the people passing through. Leave a note and become part of this edition.</p>
      </div>
      {import.meta.env.VITE_CONVEX_URL ? <PostcardWallContent /> : <p className="postcard-empty">The postcard wall is being prepared. Check back soon.</p>}
    </div>
  </section>
);

export default PostcardWall;
