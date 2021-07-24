
import { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Form/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode.tsx";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import { auth, database } from "../services/firebase";


import "../styles/room.scss";

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const history = useHistory()

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push("/");
  }


  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }


  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk" />

          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>

        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} {questions.length > 1 ? "Perguntas" : "Pergunta"}</span>}
        </div>
        {/* {JSON.stringify(questions)} */}
        <div className="question-list">
          {questions.map(question => {

            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
               
               {!question.isAnswered && (
                 <>
                  <button  className="btn-checked"type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                  <img src={checkImg} alt="Marcar pergunta como respondida" />
                </button>

                <button className="btn-highligth" type="button" onClick={() => handleHighlightQuestion(question.id)}>
                  <img src={answerImg} alt="Dar destaque a pergunta" />
                </button>
                </>
               )}

                <button className="btn-delete" type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}