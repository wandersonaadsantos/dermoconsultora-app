import { useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { CourseDiagram } from "../components/course/CourseDiagram";
import { CourseSection } from "../components/course/CourseSection";
import { ExerciseCard } from "../components/course/ExerciseCard";
import { ProblemGuide } from "../components/course/ProblemGuide";
import { QuizCard } from "../components/course/QuizCard";
import { RelatedProducts } from "../components/course/RelatedProducts";
import { SafePhraseCard } from "../components/course/SafePhraseCard";
import { TalkTrackCard } from "../components/course/TalkTrackCard";
import { courseTalkTracks } from "../course/courseTalkTracks";
import { courseModules } from "../course/courseModules";
import { useReadingProgress } from "../study/useReadingProgress";

export function CourseModule() {
  const nav = useNavigate();
  const params = useParams();
  const moduleId = String(params.moduleId ?? "");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reading = useReadingProgress();

  const module = useMemo(() => courseModules.find((m) => m.id === moduleId) ?? null, [moduleId]);
  const isRead = reading.isRead(moduleId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (rootRef.current) {
      rootRef.current.scrollTop = 0;
      rootRef.current.scrollLeft = 0;
    }
  }, [moduleId]);

  if (!module) {
    return (
      <div className="screen">
        <h1>Módulo não encontrado</h1>
        <div className="toolbar">
          <Button type="button" variant="primary" onClick={() => nav("/study")}>
            Voltar para a trilha
          </Button>
          <Button type="button" variant="secondary" onClick={() => nav("/consult")}>
            Consultar produtos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="screen course-module-screen screen-stack">
      <h1>{module.title}</h1>

      <div className="toolbar">
        <Button type="button" variant="secondary" onClick={() => nav("/study")}>
          Voltar para a trilha
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/consult")}>
          Consultar produtos
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/safety")}>
          Checklist rápido
        </Button>
      </div>

      <div className="notice">{module.summary}</div>

      <CourseSection icon="🎯" title="Objetivo" description="O que você deve conseguir fazer ao terminar este módulo.">
        <div className="prose">{module.objective}</div>
      </CourseSection>

      <CourseSection icon="📖" title="Conteúdo" description="Leitura curta, com foco no balcão.">
        <div className="prose">{module.content}</div>
      </CourseSection>

      {module.diagram ? (
        <CourseSection icon="🖼️" title="Diagrama de estudo" description="Imagem esquemática para fixar a estrutura.">
          <CourseDiagram id={module.diagram} />
        </CourseSection>
      ) : null}

      <CourseSection icon="💬" title="Exemplo prático" description="Como isso aparece na conversa com o cliente.">
        <div className="prose">{module.practicalExample}</div>
      </CourseSection>

      <SafePhraseCard phrase={module.safePhrase} />

      <CourseSection icon="🚫" title="O que evitar" description="Frases e atitudes que aumentam risco.">
        <div className="prose">{module.avoid}</div>
      </CourseSection>

      {module.problemGuide?.length ? (
        <CourseSection
          icon="🧴"
          title="Problemas e produtos que ajudam"
          description="Tipos de produto cosmético por queixa. Sempre confirmar no rótulo; se sair do cosmético, chamar o farmacêutico."
        >
          <ProblemGuide items={module.problemGuide} />
        </CourseSection>
      ) : null}

      {module.quiz?.length ? (
        <CourseSection
          icon="✅"
          title="Quiz de fixação"
          description="Recordar ativamente fixa mais que reler. Responda e confira na hora; concluir marca o módulo como lido."
        >
          <QuizCard quiz={module.quiz} onComplete={() => reading.markAsRead(module.id)} />
        </CourseSection>
      ) : null}

      <CourseSection icon="✍️" title="Aprofundar" description="Reflexão aberta para treinar a resposta com suas palavras.">
        <ExerciseCard exercise={module.exercise} />
      </CourseSection>

      {courseTalkTracks[module.id]?.length ? (
        <CourseSection
          icon="🗣️"
          title="Treino de fala"
          description="Treine respostas curtas e seguras para objeções comuns, sem prometer resultado e sem fechar diagnóstico."
        >
          <div>
            {courseTalkTracks[module.id]!.map((t) => (
              <TalkTrackCard key={t.id} talkTrack={t} />
            ))}
          </div>
        </CourseSection>
      ) : null}

      <RelatedProducts moduleId={module.id} />

      <div className="notice course-reading-progress">
        {isRead ? (
          <div>
            <div className="course-reading-progress-text">Módulo marcado como lido</div>
            <div className="toolbar">
              <Button type="button" variant="secondary" onClick={() => reading.unmarkAsRead(module.id)}>
                Desmarcar
              </Button>
            </div>
          </div>
        ) : (
          <div className="toolbar">
            <Button type="button" variant="primary" onClick={() => reading.markAsRead(module.id)}>
              Marcar como lido
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
