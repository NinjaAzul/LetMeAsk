import { useAuth } from './../hooks/useAuth';
import { useEffect } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

type FirebaseQuestins = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");


  //ChildAdd = events firebase for performace in requests 

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", room => {
      console.log(room.val());
      const databaseRoom = room.val();
      console.log(databaseRoom)
      const firebaseQuestins: FirebaseQuestins = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestins).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
        }
      });
      // console.log(parsedQuestions);
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions)

    })

    return () => {
      roomRef.off("value");
    }

  }, [roomId, user?.id]);

  return { questions, title }
}