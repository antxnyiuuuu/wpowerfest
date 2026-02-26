import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userApi } from '../api/user.api';
import { useUserStore } from '../store/userStore';
import { registerMultipleSchema } from '../utils/validation';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const setUsers = useUserStore((state) => state.setUsers);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registrationClosed, setRegistrationClosed] = useState(false);
  const [closedMessage, setClosedMessage] = useState('');
  const [nextOpening, setNextOpening] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(1); // 1 = Persona 1, 2 = Persona 2

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(registerMultipleSchema),
  });

  const goToStep2 = async () => {
    // Validar campos de Persona 1 antes de avanzar
    const isValid = await trigger(['firstName1', 'lastName1', 'email1', 'whatsapp1']);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const goToStep1 = () => {
    setCurrentStep(1);
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      
      // Registrar 2 usuarios
      const response = await userApi.registerMultiple({
        users: [
          {
            firstName: data.firstName1,
            lastName: data.lastName1,
            email: data.email1,
            whatsapp: data.whatsapp1,
          },
          {
            firstName: data.firstName2,
            lastName: data.lastName2,
            email: data.email2,
            whatsapp: data.whatsapp2,
          },
        ],
      });
      
      if (response.success) {
        console.log('✅ Registro exitoso. Usuarios creados:', response.data);
        setRegisteredUsers(response.data);
        setUsers(response.data); // Guardar AMBOS usuarios en el store
        console.log('✅ Usuarios guardados en store:', response.data);
        setRegistered(true);
        toast.success('¡Registro exitoso para ambas personas!');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setRegistrationClosed(true);
        setClosedMessage(error.response.data.error || 'Registro cerrado');
        setNextOpening(error.response.data.nextOpening || '');
      } else {
        toast.error(error.message || 'Error al registrarse');
      }
    } finally {
      setLoading(false);
    }
  };

  if (registrationClosed) {
    return (
      <div className="min-h-screen bg-code-pattern py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card-glow border-warning/50">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-error"></div>
                <div className="terminal-dot bg-warning"></div>
                <div className="terminal-dot bg-success"></div>
              </div>
              <div className="p-6 text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="subtitle-code text-warning mb-4">
                  Access Denied
                </h2>
                <p className="text-gray-300 font-mono text-sm mb-3">
                  <span className="text-error">Error:</span> {closedMessage}
                </p>
                {nextOpening && (
                  <div className="p-4 rounded-lg border border-warning/30 mt-4" style={{backgroundColor: '#161b22'}}>
                    <p className="text-gray-400 text-sm font-mono">
                      <span className="text-code-green">nextOpening:</span>
                    </p>
                    <p className="text-secondary font-semibold mt-1 font-mono">"{nextOpening}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (registered) {
    return (
      <div className="min-h-screen bg-code-pattern py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card-glow">
            <div className="terminal-window mb-6">
              <div className="terminal-header">
                <div className="terminal-dot bg-error"></div>
                <div className="terminal-dot bg-warning"></div>
                <div className="terminal-dot bg-success"></div>
              </div>
              <div className="p-6 text-center">
                <div className="text-5xl mb-3">✓</div>
                <p className="text-success font-bold text-2xl font-display">
                  Registration Successful!
                </p>
                <p className="text-gray-400 font-mono text-sm mt-2">
                  <span className="text-code-green">status:</span> <span className="text-success">"completed"</span>
                </p>
                <p className="text-gray-400 font-mono text-sm mt-2">
                  <span className="text-code-green">users:</span> <span className="text-success">2</span>
                </p>
              </div>
            </div>
            
            <h1 className="subtitle-code text-center mb-4">
              Siguiente: Trivia Challenge
            </h1>
            
            <p className="text-code text-center mb-6 font-mono text-sm">
              Una sola trivia compartida para ambas personas. Cualquiera puede responder.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  navigate('/escaperoom/trivia');
                }}
                className="w-full"
              >
                Iniciar Trivia Compartida →
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-code-pattern py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Botón de Reenviar QR en la parte superior */}
        <div className="mb-4 text-right">
          <Button
            onClick={() => navigate('/escaperoom/resend-qr')}
            variant="outline"
            className="text-sm"
          >
            📧 Reenviar QR
          </Button>
        </div>

        <div className="card-glow">
          <div className="text-center mb-8">
            <h1 className="title-code mb-3">
              Escape Room
            </h1>
            <p className="text-code font-mono text-sm">
              <span className="text-code-green">{'{'}</span>Registra a 2 personas para el desafío<span className="text-code-green">{'}'}</span>
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <div className={`h-2 w-2 rounded-full transition-all ${currentStep === 1 ? 'bg-secondary w-8' : 'bg-gray-600'}`}></div>
              <div className={`h-2 w-2 rounded-full transition-all ${currentStep === 2 ? 'bg-code-green w-8' : 'bg-gray-600'}`}></div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative overflow-hidden">
            {/* Slider Container */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
            >
              {/* Persona 1 - Slide 1 */}
              <div className="w-full flex-shrink-0 space-y-5">
                <div className="border border-secondary/30 rounded-lg p-6 bg-secondary/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-secondary font-bold font-mono">👤 Persona 1</h3>
                    <Button
                      type="button"
                      onClick={goToStep2}
                      variant="outline"
                      className="text-sm"
                    >
                      Siguiente →
                    </Button>
                  </div>
                  
                  <div className="space-y-5">
                    <Input
                      label="firstName"
                      placeholder="Nombre..."
                      {...register('firstName1')}
                      error={errors.firstName1?.message as string}
                      maxLength={30}
                      onKeyDown={(e) => {
                        const key = e.key;
                        if (
                          !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(key) &&
                          key !== 'Backspace' &&
                          key !== 'Delete' &&
                          key !== 'Tab' &&
                          key !== 'ArrowLeft' &&
                          key !== 'ArrowRight'
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />

                    <Input
                      label="lastName"
                      placeholder="Apellido..."
                      {...register('lastName1')}
                      error={errors.lastName1?.message as string}
                      maxLength={30}
                      onKeyDown={(e) => {
                        const key = e.key;
                        if (
                          !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(key) &&
                          key !== 'Backspace' &&
                          key !== 'Delete' &&
                          key !== 'Tab' &&
                          key !== 'ArrowLeft' &&
                          key !== 'ArrowRight'
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />

                    <Input
                      label="email"
                      type="email"
                      placeholder="dev1@example.com"
                      {...register('email1')}
                      error={errors.email1?.message as string}
                      onKeyPress={(e) => {
                        if (e.key === ' ') {
                          e.preventDefault();
                        }
                      }}
                    />

                    <Input
                      label="whatsapp"
                      type="tel"
                      placeholder="0987654321"
                      {...register('whatsapp1')}
                      error={errors.whatsapp1?.message as string}
                      maxLength={10}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Persona 2 - Slide 2 */}
              <div className="w-full flex-shrink-0 space-y-5 pl-8">
                <div className="border border-code-green/30 rounded-lg p-6 bg-code-green/5">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      type="button"
                      onClick={goToStep1}
                      variant="outline"
                      className="text-sm"
                    >
                      ← Anterior
                    </Button>
                    <h3 className="text-code-green font-bold font-mono">👤 Persona 2</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <Input
                      label="firstName"
                      placeholder="Nombre..."
                      {...register('firstName2')}
                      error={errors.firstName2?.message as string}
                      maxLength={30}
                      onKeyDown={(e) => {
                        const key = e.key;
                        if (
                          !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(key) &&
                          key !== 'Backspace' &&
                          key !== 'Delete' &&
                          key !== 'Tab' &&
                          key !== 'ArrowLeft' &&
                          key !== 'ArrowRight'
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />

                    <Input
                      label="lastName"
                      placeholder="Apellido..."
                      {...register('lastName2')}
                      error={errors.lastName2?.message as string}
                      maxLength={30}
                      onKeyDown={(e) => {
                        const key = e.key;
                        if (
                          !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(key) &&
                          key !== 'Backspace' &&
                          key !== 'Delete' &&
                          key !== 'Tab' &&
                          key !== 'ArrowLeft' &&
                          key !== 'ArrowRight'
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />

                    <Input
                      label="email"
                      type="email"
                      placeholder="dev2@example.com"
                      {...register('email2')}
                      error={errors.email2?.message as string}
                      onKeyPress={(e) => {
                        if (e.key === ' ') {
                          e.preventDefault();
                        }
                      }}
                    />

                    <Input
                      label="whatsapp"
                      type="tel"
                      placeholder="0987654321"
                      {...register('whatsapp2')}
                      error={errors.whatsapp2?.message as string}
                      maxLength={10}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="divider-code"></div>

                <Button
                  type="submit"
                  loading={loading}
                  className="w-full"
                >
                  {loading ? 'Procesando...' : 'register(2) →'}
                </Button>
              </div>
            </div>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400 font-mono">or</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => navigate('/escaperoom/search')}
              variant="outline"
              className="w-full"
            >
              ¿Ya te registraste? Realiza la trivia →
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
