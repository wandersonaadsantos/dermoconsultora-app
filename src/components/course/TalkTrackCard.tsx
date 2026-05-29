import type { CourseTalkTrack } from "../../course/courseTalkTracks";

export type TalkTrackCardProps = {
  talkTrack: CourseTalkTrack;
};

export function TalkTrackCard(props: TalkTrackCardProps) {
  return (
    <div className="notice">
      <div className="warning-title">Treino de fala</div>
      <div className="talk-line">
        <strong>Cliente:</strong> {props.talkTrack.customer}
      </div>
      <div className="talk-line">
        <strong>Você:</strong> {props.talkTrack.you}
      </div>
      <div className="talk-line">
        <strong>Pergunta de checagem:</strong> {props.talkTrack.checkQuestion}
      </div>
    </div>
  );
}
