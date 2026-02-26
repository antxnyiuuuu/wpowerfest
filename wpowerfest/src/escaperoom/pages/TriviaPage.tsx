import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { triviaApi } from '../api/trivia.api';
import { useUserStore } from '../store/userStore';
import type { Question, TriviaAnswer } from '../types/trivia.types';
import { QuestionCard } from '../components/trivia/QuestionCard';
import { ProgressBar } from '../components/trivia/ProgressBar';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';

export const TriviaPage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const users = useUserStore((state) => state.users);
  const setUser = useUserStore((state) => state.setUser);
  const setUsers = useUserStore((state) => state.setUsers);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<TriviaAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/escaperoom');
      return;
    }
    loadQuestions();
  }, [user, navigate]);

  const loadQuestions = async () => {
    try {
      const response = await triviaApi.getQuestions();
      if (response.success) {
        setQuestions(response.data);
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar preguntas');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      toast.error('Selecciona una respuesta');
      return;
    }

    const newAnswers = [
      ...answers,
      {
        questionId: questions[currentIndex].id,
        answerId: selectedAnswer,
      },
    ];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      submitTrivia(newAnswers);
    }
  };

  const submitTrivia = async (finalAnswers: TriviaAnswer[]) => {
    try {
      setSubmitting(true);
      const response = await triviaApi.validateAnswers({
        userId: user!.id,
        answers: finalAnswers,
      });

      if (response.success && response.data.correct) {
        // Actualizar el usuario en el store con triviaCompleted = true
        const updatedUser = { ...user!, triviaCompleted: true };
        setUser(updatedUser);
        
        // SIEMPRE construir el array de usuarios con ambos (usuario + partner)
        if (user!.partnerId && user!.partner) {
          const usersArray = [
            updatedUser,
            {
              id: user!.partner.id,
              firstName: user!.partner.firstName,
              lastName: user!.partner.lastName,
              email: user!.partner.email,
              whatsapp: user!.partner.whatsapp,
              triviaCompleted: true, // La trivia se completó para ambos
              createdAt: user!.createdAt,
              partnerId: user!.id,
            }
          ];
          console.log('✅ Actualizando store con ambos usuarios:', usersArray);
          setUsers(usersArray);
        } else {
          console.warn('⚠️ Usuario no tiene partner asociado');
        }
        
        toast.success('¡Trivia completada! Ahora selecciona tu turno');
        navigate('/escaperoom/select-timeslot');
      } else {
        toast.error('Respuestas incorrectas. Intenta nuevamente');
        // Reiniciar trivia
        setCurrentIndex(0);
        setAnswers([]);
        setSelectedAnswer(null);
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error('Registro cerrado');
        navigate('/escaperoom');
      } else {
        toast.error(error.message || 'Error al validar trivia');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-code-pattern py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card-glow">
          <ProgressBar progress={progress} />
          
          <div className="text-center mb-6">
            <p className="text-secondary font-display text-lg tracking-wider font-mono">
              <span className="text-code-green">question</span> {currentIndex + 1} <span className="text-gray-500">/</span> {questions.length}
            </p>
          </div>

          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />

          <div className="divider-code"></div>

          <Button
            onClick={handleNext}
            loading={submitting}
            disabled={!selectedAnswer}
            className="w-full"
          >
            {currentIndex === questions.length - 1 ? 'submit() ✓' : 'next() →'}
          </Button>
        </div>
      </div>
    </div>
  );
};
