import type { CourseTalkTrack } from "../../course/courseTalkTracks";

export type TalkTrackCardProps = {
  talkTrack: CourseTalkTrack;
};

export function TalkTrackCard(props: TalkTrackCardProps) {
  return (
    <div className="notice">
      <div className="warning-title">Treino de fala</div>
      <div style={{ whiteSpace: "pre-wrap" }}>
        <strong>Cliente:</strong> {props.talkTrack.customer}
      </div>
      <div style={{ whiteSpace: "pre-wrap", marginTop: 10 }}>
        <strong>Você:</strong> {props.talkTrack.you}
      </div>
      <div style={{ whiteSpace: "pre-wrap", marginTop: 10 }}>
        <strong>Pergunta de checagem:</strong> {props.talkTrack.checkQuestion}
      </div>
    </div>
  );
}
